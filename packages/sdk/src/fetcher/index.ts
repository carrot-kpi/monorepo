import { BigNumber, Contract, constants, providers, utils } from 'ethers'
import {
  KPI_TOKENS_MANAGER_ABI,
  CHAIN_ADDRESSES,
  KPI_TOKEN_ABI,
  ORACLE_ABI,
  FACTORY_ABI,
  MULTICALL_ABI,
  ChainId,
} from '../commons'
import { KpiToken } from '../entities/kpi-token'
import { Template, TemplateSpecification } from '../entities/template'
import { Oracle } from '../entities/oracle'
import { isCID, enforce } from '../utils'
import { CoreFetcher } from './core'

// platform related interfaces
const KPI_TOKEN_INTERFACE = new utils.Interface(KPI_TOKEN_ABI)
const ORACLE_INTERFACE = new utils.Interface(ORACLE_ABI)
const KPI_TOKENS_MANAGER_INTERFACE = new utils.Interface(KPI_TOKENS_MANAGER_ABI)

// platform related functions
const KPI_TOKEN_TEMPLATE_FUNCTION = KPI_TOKEN_INTERFACE.getFunction('template()')
const KPI_TOKEN_FINALIZED_FUNCTION = KPI_TOKEN_INTERFACE.getFunction('finalized()')
const KPI_TOKEN_DESCRIPTION_FUNCTION = KPI_TOKEN_INTERFACE.getFunction('description()')
const KPI_TOKEN_DATA_FUNCTION = KPI_TOKEN_INTERFACE.getFunction('data()')
const KPI_TOKEN_ORACLES_FUNCTION = KPI_TOKEN_INTERFACE.getFunction('oracles()')
const KPI_TOKEN_EXPIRATION_FUNCTION = KPI_TOKEN_INTERFACE.getFunction('expiration()')

const ORACLE_TEMPLATE_FUNCTION = ORACLE_INTERFACE.getFunction('template()')
const ORACLE_FINALIZED_FUNCTION = KPI_TOKEN_INTERFACE.getFunction('finalized()')
const ORACLE_DATA_FUNCTION = KPI_TOKEN_INTERFACE.getFunction('data()')

const MANAGER_TEMPLATE_FUNCTION =
  KPI_TOKENS_MANAGER_INTERFACE.getFunction('template(uint256)')

// platform related function data
const KPI_TOKEN_TEMPLATE_FUNCTION_DATA = KPI_TOKEN_INTERFACE.encodeFunctionData(
  KPI_TOKEN_TEMPLATE_FUNCTION
)
const KPI_TOKEN_FINALIZED_FUNCTION_DATA = KPI_TOKEN_INTERFACE.encodeFunctionData(
  KPI_TOKEN_FINALIZED_FUNCTION
)
const KPI_TOKEN_DESCRIPTION_FUNCTION_DATA = KPI_TOKEN_INTERFACE.encodeFunctionData(
  KPI_TOKEN_DESCRIPTION_FUNCTION
)
const KPI_TOKEN_DATA_FUNCTION_DATA = KPI_TOKEN_INTERFACE.encodeFunctionData(
  KPI_TOKEN_DATA_FUNCTION
)
const KPI_TOKEN_ORACLES_FUNCTION_DATA = KPI_TOKEN_INTERFACE.encodeFunctionData(
  KPI_TOKEN_ORACLES_FUNCTION
)
const KPI_TOKEN_EXPIRATION_FUNCTION_DATA = KPI_TOKEN_INTERFACE.encodeFunctionData(
  KPI_TOKEN_EXPIRATION_FUNCTION
)

const ORACLE_TEMPLATE_FUNCTION_DATA = ORACLE_INTERFACE.encodeFunctionData(
  ORACLE_TEMPLATE_FUNCTION
)
const ORACLE_FINALIZED_FUNCTION_DATA = ORACLE_INTERFACE.encodeFunctionData(
  ORACLE_FINALIZED_FUNCTION
)
const ORACLE_DATA_FUNCTION_DATA =
  ORACLE_INTERFACE.encodeFunctionData(ORACLE_DATA_FUNCTION)

export abstract class Fetcher extends CoreFetcher {
  public static async fetchKpiToken(
    chainId: ChainId,
    address: string,
    provider: providers.Provider
  ): Promise<KpiToken | null> {
    enforce(!!address && address !== constants.AddressZero, 'invalid kpi token address')

    const chainAddresses = CHAIN_ADDRESSES[chainId]
    const multicall = new Contract(
      chainAddresses.multicall[chainId],
      MULTICALL_ABI,
      provider
    )

    const [, kpiTokenResult] = await multicall.callStatic.aggregate([
      [address, KPI_TOKEN_FINALIZED_FUNCTION_DATA],
      [address, KPI_TOKEN_DESCRIPTION_FUNCTION_DATA],
      [address, KPI_TOKEN_DATA_FUNCTION_DATA],
      [address, KPI_TOKEN_TEMPLATE_FUNCTION_DATA],
      [address, KPI_TOKEN_ORACLES_FUNCTION_DATA],
      [address, KPI_TOKEN_EXPIRATION_FUNCTION_DATA],
    ])

    const kpiTokenFinalized = KPI_TOKEN_INTERFACE.decodeFunctionResult(
      KPI_TOKEN_FINALIZED_FUNCTION,
      kpiTokenResult[0]
    )[0]
    const kpiTokenDescriptionCid = KPI_TOKEN_INTERFACE.decodeFunctionResult(
      KPI_TOKEN_DESCRIPTION_FUNCTION,
      kpiTokenResult[1]
    )[0]
    if (!isCID(kpiTokenDescriptionCid)) return null
    const kpiTokenData = KPI_TOKEN_INTERFACE.decodeFunctionResult(
      KPI_TOKEN_DATA_FUNCTION,
      kpiTokenResult[2]
    )[0]
    const kpiTokenTemplate = KPI_TOKEN_INTERFACE.decodeFunctionResult(
      KPI_TOKEN_TEMPLATE_FUNCTION,
      kpiTokenResult[3]
    )[0]
    const kpiTokenOracleAddresses = KPI_TOKEN_INTERFACE.decodeFunctionResult(
      KPI_TOKEN_ORACLES_FUNCTION,
      kpiTokenResult[4]
    )[0]
    const kpiTokenExpiration = KPI_TOKEN_INTERFACE.decodeFunctionResult(
      KPI_TOKEN_EXPIRATION_FUNCTION,
      kpiTokenResult[5]
    )[0].toNumber()

    const [, oraclesResult] = await multicall.callStatic.aggregate(
      kpiTokenOracleAddresses.flatMap((oracleAddress: string) => {
        return [
          [oracleAddress, ORACLE_TEMPLATE_FUNCTION_DATA],
          [oracleAddress, ORACLE_FINALIZED_FUNCTION_DATA],
          [oracleAddress, ORACLE_DATA_FUNCTION_DATA],
        ]
      })
    )

    const allOracleSpecificationCids: string[] = []
    for (let i = 0; i < oraclesResult.length; i += 3) {
      const cid = ORACLE_INTERFACE.decodeFunctionResult(
        ORACLE_TEMPLATE_FUNCTION,
        oraclesResult[i]
      )[0].specification
      if (!isCID(cid)) return null
      if (allOracleSpecificationCids.indexOf(cid) < 0)
        allOracleSpecificationCids.push(cid)
    }

    const oracleTemplateSpecifications = await CoreFetcher.fetchContentFromIpfs(
      allOracleSpecificationCids.map((cid) => ({
        cid: `${cid}/base.json`,
        validUntil: Date.now() + 86_400_000,
      }))
    )

    if (!isCID(kpiTokenTemplate.specification)) return null
    // TODO: fetch base.json in KPI token templates too
    const kpiTokenTemplateSpecification = JSON.parse(
      (
        await CoreFetcher.fetchContentFromIpfs([
          {
            cid: kpiTokenTemplate.specification,
            validUntil: Date.now() + 86_400_000,
          },
        ])
      )[kpiTokenTemplate.specification]
    )

    const kpiTokenDescription = Object.values(
      await CoreFetcher.fetchContentFromIpfs([
        { cid: kpiTokenDescriptionCid, validUntil: Number.MAX_SAFE_INTEGER },
      ])
    ).map((content) => JSON.parse(content))[kpiTokenDescriptionCid]

    const oracles = []
    for (let i = 0; i < kpiTokenOracleAddresses.length; i++) {
      const oracleAddress = kpiTokenOracleAddresses[i]
      const rawTemplate = ORACLE_INTERFACE.decodeFunctionResult(
        ORACLE_TEMPLATE_FUNCTION,
        oraclesResult[i * 3]
      )[0]
      const templateSpecification = JSON.parse(
        oracleTemplateSpecifications[`${rawTemplate.specification}/base.json`]
      )
      if (!templateSpecification) return null
      const template: Template = {
        ...rawTemplate,
        id: rawTemplate.id.toNumber(),
        specification: templateSpecification,
      }
      oracles.push(
        new Oracle(
          chainId,
          oracleAddress,
          template,
          ORACLE_INTERFACE.decodeFunctionResult(
            ORACLE_FINALIZED_FUNCTION,
            oraclesResult[i * 3 + 1]
          )[0],
          ORACLE_INTERFACE.decodeFunctionResult(
            ORACLE_DATA_FUNCTION,
            oraclesResult[i * 3 + 2]
          )[0]
        )
      )
    }

    const template = new Template(
      kpiTokenTemplate.id.toNumber(),
      kpiTokenTemplate.addrezz,
      kpiTokenTemplate.version,
      kpiTokenTemplateSpecification
    )
    return new KpiToken(
      chainId,
      address,
      template,
      oracles,
      kpiTokenDescription,
      kpiTokenExpiration,
      kpiTokenFinalized,
      kpiTokenData
    )
  }

  public static async fetchKpiTokens(provider: providers.Provider): Promise<KpiToken[]> {
    const { chainId } = await provider.getNetwork()
    enforce(chainId in ChainId, `unsupported chain with id ${chainId}`)
    const chainAddresses = CHAIN_ADDRESSES[chainId as ChainId]
    const multicall = new Contract(chainAddresses.multicall, MULTICALL_ABI, provider)
    const factoryContract = new Contract(chainAddresses.factory, FACTORY_ABI, provider)

    const kpiTokenAmounts = await factoryContract.kpiTokensAmount()
    if (kpiTokenAmounts.isZero()) return []
    const tokenAddresses = await factoryContract.enumerate(0, kpiTokenAmounts)

    const [, kpiTokenResult] = await multicall.callStatic.aggregate(
      tokenAddresses.flatMap((address: string) => {
        return [
          [address, KPI_TOKEN_FINALIZED_FUNCTION_DATA],
          [address, KPI_TOKEN_DESCRIPTION_FUNCTION_DATA],
          [address, KPI_TOKEN_DATA_FUNCTION_DATA],
          [address, KPI_TOKEN_TEMPLATE_FUNCTION_DATA],
          [address, KPI_TOKEN_ORACLES_FUNCTION_DATA],
          [address, KPI_TOKEN_EXPIRATION_FUNCTION_DATA],
        ]
      })
    )

    const allKpiTokenSpecificationCids: string[] = []
    for (let i = 3; i < kpiTokenResult.length; i += 6) {
      const cid = KPI_TOKEN_INTERFACE.decodeFunctionResult(
        KPI_TOKEN_TEMPLATE_FUNCTION,
        kpiTokenResult[i]
      )[0].specification
      if (!!isCID(cid) && allKpiTokenSpecificationCids.indexOf(cid) < 0)
        allKpiTokenSpecificationCids.push(cid)
    }
    // TODO: fetch base.json in KPI token templates too
    const kpiTokenTemplateSpecifications = await CoreFetcher.fetchContentFromIpfs(
      allKpiTokenSpecificationCids.map((cid) => ({
        cid,
        validUntil: Date.now() + 86_400_000,
      }))
    )

    const allKpiTokenDescriptionCids: string[] = []
    for (let i = 1; i < kpiTokenResult.length; i += 6) {
      const cid = KPI_TOKEN_INTERFACE.decodeFunctionResult(
        KPI_TOKEN_DESCRIPTION_FUNCTION,
        kpiTokenResult[i]
      )[0]
      if (!!isCID(cid) && allKpiTokenDescriptionCids.indexOf(cid) < 0)
        allKpiTokenDescriptionCids.push(cid)
    }
    const kpiTokenDescriptions = await CoreFetcher.fetchContentFromIpfs(
      allKpiTokenDescriptionCids.map((cid) => ({
        cid,
        validUntil: Number.MAX_SAFE_INTEGER,
      }))
    )

    const allOracleAddresses: string[] = []
    for (let i = 4; i < kpiTokenResult.length; i += 6)
      allOracleAddresses.push(
        ...KPI_TOKEN_INTERFACE.decodeFunctionResult(
          KPI_TOKEN_ORACLES_FUNCTION,
          kpiTokenResult[i]
        )[0]
      )
    const [, oraclesResult] = await multicall.callStatic.aggregate(
      allOracleAddresses.flatMap((oracleAddress: string) => {
        return [
          [oracleAddress, ORACLE_TEMPLATE_FUNCTION_DATA],
          [oracleAddress, ORACLE_FINALIZED_FUNCTION_DATA],
          [oracleAddress, ORACLE_DATA_FUNCTION_DATA],
        ]
      })
    )

    const allOracleSpecificationCids: string[] = []
    for (let i = 0; i < oraclesResult.length; i += 3) {
      const cid = ORACLE_INTERFACE.decodeFunctionResult(
        ORACLE_TEMPLATE_FUNCTION,
        oraclesResult[i]
      )[0].specification
      if (!!isCID(cid) && allOracleSpecificationCids.indexOf(cid) < 0)
        allOracleSpecificationCids.push(cid)
    }
    const oracleTemplateSpecifications = await CoreFetcher.fetchContentFromIpfs(
      allOracleSpecificationCids.map((cid) => ({
        cid: `${cid}/base.json`,
        validUntil: Date.now() + 86_400_000,
      }))
    )

    const oracles: { [address: string]: Oracle } = {}
    for (let i = 0; i < allOracleAddresses.length; i++) {
      const {
        id: templateId,
        addrezz: templateAddress,
        specification,
        version,
      } = ORACLE_INTERFACE.decodeFunctionResult(
        ORACLE_TEMPLATE_FUNCTION,
        oraclesResult[i * 3]
      )[0]
      const unparsedSpecification =
        oracleTemplateSpecifications[`${specification}/base.json`]
      if (!unparsedSpecification) continue
      const parsedSpecification = JSON.parse(unparsedSpecification)
      const oracleAddress = allOracleAddresses[i]
      const template = new Template(
        templateId,
        templateAddress,
        version,
        new TemplateSpecification(
          specification,
          parsedSpecification.name,
          parsedSpecification.description,
          parsedSpecification.tags,
          parsedSpecification.repository,
          parsedSpecification.commitHash
        )
      )
      oracles[oracleAddress] = new Oracle(
        chainId,
        oracleAddress,
        template,
        ORACLE_INTERFACE.decodeFunctionResult(
          ORACLE_FINALIZED_FUNCTION,
          oraclesResult[i * 3 + 1]
        )[0],
        ORACLE_INTERFACE.decodeFunctionResult(
          ORACLE_DATA_FUNCTION,
          oraclesResult[i * 3 + 2]
        )[0]
      )
    }

    const allKpiTokens = []
    outerLoop: for (let i = 0; kpiTokenAmounts.gt(i); i++) {
      const kpiTokenTemplate = KPI_TOKEN_INTERFACE.decodeFunctionResult(
        KPI_TOKEN_TEMPLATE_FUNCTION,
        kpiTokenResult[i * 6 + 3]
      )[0]
      const kpiTokenTemplateSpecification = JSON.parse(
        kpiTokenTemplateSpecifications[kpiTokenTemplate.specification]
      )
      if (!kpiTokenTemplateSpecification) continue

      const kpiTokenFinalized = KPI_TOKEN_INTERFACE.decodeFunctionResult(
        KPI_TOKEN_FINALIZED_FUNCTION,
        kpiTokenResult[i * 6]
      )[0]
      const kpiTokenDescriptionCid = KPI_TOKEN_INTERFACE.decodeFunctionResult(
        KPI_TOKEN_DESCRIPTION_FUNCTION,
        kpiTokenResult[i * 6 + 1]
      )[0]
      const description = JSON.parse(kpiTokenDescriptions[kpiTokenDescriptionCid])
      if (!description) continue
      const kpiTokenData = KPI_TOKEN_INTERFACE.decodeFunctionResult(
        KPI_TOKEN_DATA_FUNCTION,
        kpiTokenResult[i * 6 + 2]
      )[0]
      const kpiTokenOracleAddresses = KPI_TOKEN_INTERFACE.decodeFunctionResult(
        KPI_TOKEN_ORACLES_FUNCTION,
        kpiTokenResult[i * 6 + 4]
      )[0]
      const kpiTokenExpiration = KPI_TOKEN_INTERFACE.decodeFunctionResult(
        KPI_TOKEN_EXPIRATION_FUNCTION,
        kpiTokenResult[i * 6 + 5]
      )[0].toNumber()

      const kpiTokenOracles: Oracle[] = []
      for (const address of kpiTokenOracleAddresses) {
        const oracle = oracles[address]
        if (!oracle) continue outerLoop
        kpiTokenOracles.push(oracle)
      }

      const template = new Template(
        kpiTokenTemplate.id.toNumber(),
        kpiTokenTemplate.addrezz,
        kpiTokenTemplate.version,
        kpiTokenTemplateSpecification
      )
      allKpiTokens.push(
        new KpiToken(
          chainId,
          tokenAddresses[i],
          template,
          kpiTokenOracles,
          description,
          kpiTokenExpiration,
          kpiTokenFinalized,
          kpiTokenData
        )
      )
    }
    return allKpiTokens
  }

  private static async fetchTemplates(
    managerContract: Contract,
    ids?: number[]
  ): Promise<Template[]> {
    let rawTemplates: {
      id: BigNumber
      addrezz: string
      version: BigNumber
      specification: string
    }[]
    if (ids && ids.length > 0) {
      const { chainId } = await managerContract.provider.getNetwork()
      enforce(chainId in ChainId, 'invalid chain id when trying to get templates by id')
      const chainAddresses = CHAIN_ADDRESSES[chainId as ChainId]
      const multicall = new Contract(
        chainAddresses.multicall,
        MULTICALL_ABI,
        managerContract.provider
      )
      const [, result] = await multicall.callStatic.aggregate(
        ids.map((id: number) => {
          return [
            managerContract.address,
            KPI_TOKENS_MANAGER_INTERFACE.encodeFunctionData(MANAGER_TEMPLATE_FUNCTION, [
              id,
            ]),
          ]
        })
      )
      rawTemplates = result.map(
        // eslint-disable-next-line
        (wrappedTemplate: any) =>
          KPI_TOKENS_MANAGER_INTERFACE.decodeFunctionResult(
            MANAGER_TEMPLATE_FUNCTION,
            wrappedTemplate
          )[0]
      )
    } else {
      const templatesAmount = await managerContract.templatesAmount()
      if (templatesAmount == 0) return []
      rawTemplates = await managerContract.enumerate(0, templatesAmount)
    }

    const specifications = await CoreFetcher.fetchContentFromIpfs(
      rawTemplates.map((rawTemplate) => ({
        cid: `${rawTemplate.specification}/base.json`,
        validUntil: Date.now() + 86_400_000,
      }))
    )

    return rawTemplates.map((rawTemplate) => {
      const parsedSpecification = JSON.parse(
        specifications[`${rawTemplate.specification}/base.json`]
      )
      return new Template(
        rawTemplate.id.toNumber(),
        rawTemplate.addrezz,
        rawTemplate.version.toNumber(),
        new TemplateSpecification(
          rawTemplate.specification,
          parsedSpecification.name,
          parsedSpecification.description,
          parsedSpecification.tags,
          parsedSpecification.repository,
          parsedSpecification.commitHash
        )
      )
    })
  }

  public static async fetchKpiTokenTemplates(
    chainId: ChainId,
    provider: providers.Provider,
    ids?: number[]
  ): Promise<Template[]> {
    return await Fetcher.fetchTemplates(
      new Contract(
        CHAIN_ADDRESSES[chainId].kpiTokensManager,
        KPI_TOKENS_MANAGER_ABI,
        provider
      ),
      ids
    )
  }

  public static async fetchOracleTemplates(
    chainId: ChainId,
    provider: providers.Provider,
    ids?: number[]
  ): Promise<Template[]> {
    return await Fetcher.fetchTemplates(
      new Contract(
        CHAIN_ADDRESSES[chainId].oraclesManager,
        KPI_TOKENS_MANAGER_ABI,
        provider
      ),
      ids
    )
  }
}
