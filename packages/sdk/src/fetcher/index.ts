import { BigNumber, Contract, providers, utils } from 'ethers'
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
  public static async fetchKpiTokens(
    provider: providers.Provider,
    addresses?: string[]
  ): Promise<{ [address: string]: KpiToken }> {
    const { chainId } = await provider.getNetwork()
    enforce(chainId in ChainId, `unsupported chain with id ${chainId}`)
    const chainAddresses = CHAIN_ADDRESSES[chainId as ChainId]
    const multicall = new Contract(chainAddresses.multicall, MULTICALL_ABI, provider)
    const factoryContract = new Contract(chainAddresses.factory, FACTORY_ABI, provider)

    const kpiTokenAmounts = await factoryContract.kpiTokensAmount()
    if (kpiTokenAmounts.isZero()) return {}
    const tokenAddresses =
      addresses && addresses.length > 0
        ? addresses
        : await factoryContract.enumerate(0, kpiTokenAmounts)

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
    const kpiTokenTemplateSpecifications = await CoreFetcher.fetchContentFromIpfs(
      allKpiTokenSpecificationCids.map((cid) => ({
        cid: `${cid}/base.json`,
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

    const oracles = await Fetcher.fetchOracles(provider, allOracleAddresses)

    const allKpiTokens: { [address: string]: KpiToken } = {}
    outerLoop: for (let i = 0; kpiTokenAmounts.gt(i); i++) {
      const kpiTokenTemplate = KPI_TOKEN_INTERFACE.decodeFunctionResult(
        KPI_TOKEN_TEMPLATE_FUNCTION,
        kpiTokenResult[i * 6 + 3]
      )[0]
      const rawKpiTokenTemplateSpecification = JSON.parse(
        kpiTokenTemplateSpecifications[`${kpiTokenTemplate.specification}/base.json`]
      )
      if (!rawKpiTokenTemplateSpecification) continue

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
        new TemplateSpecification(
          kpiTokenTemplate.specification,
          rawKpiTokenTemplateSpecification.name,
          rawKpiTokenTemplateSpecification.description,
          rawKpiTokenTemplateSpecification.tags,
          rawKpiTokenTemplateSpecification.repository,
          rawKpiTokenTemplateSpecification.commitHash
        )
      )

      const kpiTokenAddress = tokenAddresses[i]
      allKpiTokens[kpiTokenAddress] = new KpiToken(
        chainId,
        kpiTokenAddress,
        template,
        kpiTokenOracles,
        description,
        kpiTokenExpiration,
        kpiTokenFinalized,
        kpiTokenData
      )
    }
    return allKpiTokens
  }

  public static async fetchOracles(
    provider: providers.Provider,
    addresses: string[]
  ): Promise<{ [address: string]: Oracle }> {
    if (addresses.length === 0) return {}

    const { chainId } = await provider.getNetwork()
    enforce(chainId in ChainId, `unsupported chain with id ${chainId}`)
    const chainAddresses = CHAIN_ADDRESSES[chainId as ChainId]
    const multicall = new Contract(chainAddresses.multicall, MULTICALL_ABI, provider)

    const [, oraclesResult] = await multicall.callStatic.aggregate(
      addresses.flatMap((address: string) => {
        return [
          [address, ORACLE_TEMPLATE_FUNCTION_DATA],
          [address, ORACLE_FINALIZED_FUNCTION_DATA],
          [address, ORACLE_DATA_FUNCTION_DATA],
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
    for (let i = 0; i < addresses.length; i++) {
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
      const oracleAddress = addresses[i]
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
    return oracles
  }

  private static async fetchTemplates(
    chainId: ChainId,
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
    provider: providers.Provider,
    ids?: number[]
  ): Promise<Template[]> {
    const { chainId } = await provider.getNetwork()
    enforce(chainId in ChainId, `unsupported chain with id ${chainId}`)
    return await Fetcher.fetchTemplates(
      chainId,
      new Contract(
        CHAIN_ADDRESSES[chainId as ChainId].kpiTokensManager,
        KPI_TOKENS_MANAGER_ABI,
        provider
      ),
      ids
    )
  }

  public static async fetchOracleTemplates(
    provider: providers.Provider,
    ids?: number[]
  ): Promise<Template[]> {
    const { chainId } = await provider.getNetwork()
    enforce(chainId in ChainId, `unsupported chain with id ${chainId}`)
    return await Fetcher.fetchTemplates(
      chainId,
      new Contract(
        CHAIN_ADDRESSES[chainId as ChainId].oraclesManager,
        KPI_TOKENS_MANAGER_ABI,
        provider
      ),
      ids
    )
  }
}
