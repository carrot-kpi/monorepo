import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { Interface } from '@ethersproject/abi'
import {
  FACTORY_ADDRESS,
  KPI_TOKENS_MANAGER_ADDRESS,
  KPI_TOKENS_MANAGER_ABI,
  ORACLES_MANAGER_ADDRESS,
  CACHER,
} from './commons/constants'
import {
  ChainId,
  IPFS_GATEWAY,
  MULTICALL2_ABI,
  Fetcher as CoreFetcher,
  MULTICALL2_ADDRESS,
  ADDRESS_ZERO,
  enforce,
  warn,
} from '@carrot-kpi/core-sdk'
import KPI_TOKEN_ABI from './abis/kpi-token.json'
import ORACLE_ABI from './abis/oracle.json'
import FACTORY_ABI from './abis/factory.json'
import { KpiToken, KpiTokenDescription } from './entities/kpi-token'
import { Template, TemplateSpecification } from './entities/template'
import { Oracle } from './entities/oracle'
import { BigNumber } from '@ethersproject/bignumber'
import { isCID } from './utils/cid'

// platform related interfaces
const KPI_TOKEN_INTERFACE = new Interface(KPI_TOKEN_ABI)
const ORACLE_INTERFACE = new Interface(ORACLE_ABI)
const KPI_TOKENS_MANAGER_INTERFACE = new Interface(KPI_TOKENS_MANAGER_ABI)

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

const MANAGER_TEMPLATE_FUNCTION = KPI_TOKENS_MANAGER_INTERFACE.getFunction('template(uint256)')

// platform related function data
const KPI_TOKEN_TEMPLATE_FUNCTION_DATA = KPI_TOKEN_INTERFACE.encodeFunctionData(KPI_TOKEN_TEMPLATE_FUNCTION)
const KPI_TOKEN_FINALIZED_FUNCTION_DATA = KPI_TOKEN_INTERFACE.encodeFunctionData(KPI_TOKEN_FINALIZED_FUNCTION)
const KPI_TOKEN_DESCRIPTION_FUNCTION_DATA = KPI_TOKEN_INTERFACE.encodeFunctionData(KPI_TOKEN_DESCRIPTION_FUNCTION)
const KPI_TOKEN_DATA_FUNCTION_DATA = KPI_TOKEN_INTERFACE.encodeFunctionData(KPI_TOKEN_DATA_FUNCTION)
const KPI_TOKEN_ORACLES_FUNCTION_DATA = KPI_TOKEN_INTERFACE.encodeFunctionData(KPI_TOKEN_ORACLES_FUNCTION)
const KPI_TOKEN_EXPIRATION_FUNCTION_DATA = KPI_TOKEN_INTERFACE.encodeFunctionData(KPI_TOKEN_EXPIRATION_FUNCTION)

const ORACLE_TEMPLATE_FUNCTION_DATA = ORACLE_INTERFACE.encodeFunctionData(ORACLE_TEMPLATE_FUNCTION)
const ORACLE_FINALIZED_FUNCTION_DATA = ORACLE_INTERFACE.encodeFunctionData(ORACLE_FINALIZED_FUNCTION)
const ORACLE_DATA_FUNCTION_DATA = ORACLE_INTERFACE.encodeFunctionData(ORACLE_DATA_FUNCTION)

export abstract class Fetcher extends CoreFetcher {
  public static async fetchTemplateSpecifications(cids: string[]): Promise<{ [cid: string]: TemplateSpecification }> {
    const oracleSpecifications: { [cid: string]: TemplateSpecification } = {}
    const uncachedCids = []
    for (const cid of cids) {
      const cachedSpecification = CACHER.get<TemplateSpecification>(cid)
      if (!!cachedSpecification) oracleSpecifications[cid] = cachedSpecification
      else uncachedCids.push(cid)
    }
    if (uncachedCids.length > 0) {
      const uncachedOracleTemplateSpecifications = await Promise.all(
        uncachedCids.map(async (templateCid: string) => {
          const response = await fetch(IPFS_GATEWAY + templateCid)
          const responseOk = response.ok
          warn(responseOk, `could not fetch template specification with cid ${templateCid}`)
          return [templateCid, responseOk ? await response.json() : null]
        })
      )
      for (const [cid, specification] of uncachedOracleTemplateSpecifications) {
        if (!specification) continue
        oracleSpecifications[cid] = specification
        CACHER.set(cid, specification, Date.now() + 86400) // valid for a day
      }
    }
    return oracleSpecifications
  }

  public static async fetchKpiTokenDescriptions(cids: string[]): Promise<{ [cid: string]: KpiTokenDescription }> {
    const descriptions: { [cid: string]: KpiTokenDescription } = {}
    const uncachedCids = []
    for (const cid of cids) {
      const cachedDescription = CACHER.get<KpiTokenDescription>(cid)
      if (!!cachedDescription) descriptions[cid] = cachedDescription
      else uncachedCids.push(cid)
    }
    if (uncachedCids.length > 0) {
      const uncachedDescriptions = await Promise.all(
        uncachedCids.map(async (templateCid: string) => {
          const response = await fetch(IPFS_GATEWAY + templateCid)
          if (!response.ok) throw new Error(`could not fetch kpi token description with cid ${templateCid}`)
          return [
            templateCid,
            {
              ipfsHash: templateCid,
              ...(await response.json()),
            },
          ]
        })
      )
      for (const [cid, description] of uncachedDescriptions) {
        descriptions[cid] = description
        CACHER.set(cid, description, Number.MAX_SAFE_INTEGER) // valid forever (descriptions can't change)
      }
    }
    return descriptions
  }

  public static async fetchKpiToken(
    chainId: ChainId,
    address: string,
    provider: Web3Provider
  ): Promise<KpiToken | null> {
    enforce(!!address && address !== ADDRESS_ZERO, 'invalid kpi token address')

    const multicall2 = new Contract(MULTICALL2_ADDRESS[chainId], MULTICALL2_ABI, provider)

    const [, kpiTokenResult] = await multicall2.aggregate([
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
    const kpiTokenData = KPI_TOKEN_INTERFACE.decodeFunctionResult(KPI_TOKEN_DATA_FUNCTION, kpiTokenResult[2])[0]
    const kpiTokenTemplate = KPI_TOKEN_INTERFACE.decodeFunctionResult(KPI_TOKEN_TEMPLATE_FUNCTION, kpiTokenResult[3])[0]
    const kpiTokenOracleAddresses = KPI_TOKEN_INTERFACE.decodeFunctionResult(
      KPI_TOKEN_ORACLES_FUNCTION,
      kpiTokenResult[4]
    )[0]
    const kpiTokenExpiration = KPI_TOKEN_INTERFACE.decodeFunctionResult(
      KPI_TOKEN_EXPIRATION_FUNCTION,
      kpiTokenResult[5]
    )[0].toNumber()

    const [, oraclesResult] = await multicall2.aggregate(
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
      const cid = ORACLE_INTERFACE.decodeFunctionResult(ORACLE_TEMPLATE_FUNCTION, oraclesResult[i])[0].specification
      if (!isCID(cid)) return null
      if (allOracleSpecificationCids.indexOf(cid) < 0) allOracleSpecificationCids.push(cid)
    }

    const oracleTemplateSpecifications = await Fetcher.fetchTemplateSpecifications(allOracleSpecificationCids)

    if (!isCID(kpiTokenTemplate.specification)) return null
    const kpiTokenTemplateSpecification = (await Fetcher.fetchTemplateSpecifications([kpiTokenTemplate.specification]))[
      kpiTokenTemplate.specification
    ]

    const kpiTokenDescription = (await Fetcher.fetchKpiTokenDescriptions([kpiTokenDescriptionCid]))[
      kpiTokenDescriptionCid
    ]

    const oracles = []
    for (let i = 0; i < kpiTokenOracleAddresses.length; i++) {
      const oracleAddress = kpiTokenOracleAddresses[i]
      const rawTemplate = ORACLE_INTERFACE.decodeFunctionResult(ORACLE_TEMPLATE_FUNCTION, oraclesResult[i * 3])[0]
      const templateSpecification = oracleTemplateSpecifications[rawTemplate.specification]
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
          ORACLE_INTERFACE.decodeFunctionResult(ORACLE_FINALIZED_FUNCTION, oraclesResult[i * 3 + 1])[0],
          ORACLE_INTERFACE.decodeFunctionResult(ORACLE_DATA_FUNCTION, oraclesResult[i * 3 + 2])[0]
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

  public static async fetchKpiTokens(chainId: ChainId, provider: Web3Provider): Promise<KpiToken[]> {
    const multicall2 = new Contract(MULTICALL2_ADDRESS[chainId], MULTICALL2_ABI, provider)
    const factoryContract = new Contract(FACTORY_ADDRESS[chainId], FACTORY_ABI, provider)

    const kpiTokenAmounts = await factoryContract.kpiTokensAmount()
    if (kpiTokenAmounts.isZero()) return []
    const tokenAddresses = await factoryContract.enumerate(0, kpiTokenAmounts)

    const [, kpiTokenResult] = await multicall2.aggregate(
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
      const cid = KPI_TOKEN_INTERFACE.decodeFunctionResult(KPI_TOKEN_TEMPLATE_FUNCTION, kpiTokenResult[i])[0]
        .specification
      if (!!isCID(cid) && allKpiTokenSpecificationCids.indexOf(cid) < 0) allKpiTokenSpecificationCids.push(cid)
    }
    const kpiTokenTemplateSpecifications = await Fetcher.fetchTemplateSpecifications(allKpiTokenSpecificationCids)

    const allKpiTokenDescriptionCids: string[] = []
    for (let i = 1; i < kpiTokenResult.length; i += 6) {
      const cid = KPI_TOKEN_INTERFACE.decodeFunctionResult(KPI_TOKEN_DESCRIPTION_FUNCTION, kpiTokenResult[i])[0]
      if (!!isCID(cid) && allKpiTokenDescriptionCids.indexOf(cid) < 0) allKpiTokenDescriptionCids.push(cid)
    }
    const kpiTokenDescriptions = await Fetcher.fetchKpiTokenDescriptions(allKpiTokenDescriptionCids)

    const allOracleAddresses: string[] = []
    for (let i = 4; i < kpiTokenResult.length; i += 6)
      allOracleAddresses.push(
        ...KPI_TOKEN_INTERFACE.decodeFunctionResult(KPI_TOKEN_ORACLES_FUNCTION, kpiTokenResult[i])[0]
      )
    const [, oraclesResult] = await multicall2.aggregate(
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
      const cid = ORACLE_INTERFACE.decodeFunctionResult(ORACLE_TEMPLATE_FUNCTION, oraclesResult[i])[0].specification
      if (!!isCID(cid) && allOracleSpecificationCids.indexOf(cid) < 0) allOracleSpecificationCids.push(cid)
    }
    const oracleTemplateSpecifications = await Fetcher.fetchTemplateSpecifications(allOracleSpecificationCids)

    const oracles: { [address: string]: Oracle } = {}
    for (let i = 0; i < allOracleAddresses.length; i++) {
      const {
        id: templateId,
        addrezz: templateAddress,
        specification,
        version,
      } = ORACLE_INTERFACE.decodeFunctionResult(ORACLE_TEMPLATE_FUNCTION, oraclesResult[i * 3])[0]
      const templateSpecification = oracleTemplateSpecifications[specification]
      if (!templateSpecification) continue
      const oracleAddress = allOracleAddresses[i]
      const template = new Template(templateId, templateAddress, version, templateSpecification)
      oracles[oracleAddress] = new Oracle(
        chainId,
        oracleAddress,
        template,
        ORACLE_INTERFACE.decodeFunctionResult(ORACLE_FINALIZED_FUNCTION, oraclesResult[i * 3 + 1])[0],
        ORACLE_INTERFACE.decodeFunctionResult(ORACLE_DATA_FUNCTION, oraclesResult[i * 3 + 2])[0]
      )
    }

    const allKpiTokens = []
    outerLoop: for (let i = 0; kpiTokenAmounts.gt(i); i++) {
      const kpiTokenTemplate = KPI_TOKEN_INTERFACE.decodeFunctionResult(
        KPI_TOKEN_TEMPLATE_FUNCTION,
        kpiTokenResult[i * 6 + 3]
      )[0]
      const kpiTokenTemplateSpecification = kpiTokenTemplateSpecifications[kpiTokenTemplate.specification]
      if (!kpiTokenTemplateSpecification) continue

      const kpiTokenFinalized = KPI_TOKEN_INTERFACE.decodeFunctionResult(
        KPI_TOKEN_FINALIZED_FUNCTION,
        kpiTokenResult[i * 6]
      )[0]
      const kpiTokenDescriptionCid = KPI_TOKEN_INTERFACE.decodeFunctionResult(
        KPI_TOKEN_DESCRIPTION_FUNCTION,
        kpiTokenResult[i * 6 + 1]
      )[0]
      const description = kpiTokenDescriptions[kpiTokenDescriptionCid]
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

  private static async fetchTemplates(managerContract: Contract, ids?: number[]): Promise<Template[]> {
    let rawTemplates: { id: BigNumber; addrezz: string; version: BigNumber; specification: string }[]
    if (ids && ids.length > 0) {
      const { chainId } = await managerContract.provider.getNetwork()
      enforce(chainId in ChainId, 'invalid chain id when trying to get templates by id')
      const multicall2 = new Contract(MULTICALL2_ADDRESS[chainId as ChainId], MULTICALL2_ABI, managerContract.provider)
      const [, result] = await multicall2.aggregate(
        ids.map((id: number) => {
          return [
            managerContract.address,
            KPI_TOKENS_MANAGER_INTERFACE.encodeFunctionData(MANAGER_TEMPLATE_FUNCTION, [id]),
          ]
        })
      )
      rawTemplates = result.map(
        // eslint-disable-next-line
        (wrappedTemplate: any) =>
          KPI_TOKENS_MANAGER_INTERFACE.decodeFunctionResult(MANAGER_TEMPLATE_FUNCTION, wrappedTemplate)[0]
      )
    } else {
      const templatesAmount = await managerContract.templatesAmount()
      if (templatesAmount == 0) return []
      rawTemplates = await managerContract.enumerate(0, templatesAmount)
    }

    const specifications = await Fetcher.fetchTemplateSpecifications(
      rawTemplates.map((rawTemplate) => rawTemplate.specification)
    )

    return rawTemplates.map(
      (rawTemplate) =>
        new Template(
          rawTemplate.id.toNumber(),
          rawTemplate.addrezz,
          rawTemplate.version.toNumber(),
          specifications[rawTemplate.specification]
        )
    )
  }

  public static async fetchKpiTokenTemplates(
    chainId: ChainId,
    provider: Web3Provider,
    ids?: number[]
  ): Promise<Template[]> {
    return await Fetcher.fetchTemplates(
      new Contract(KPI_TOKENS_MANAGER_ADDRESS[chainId], KPI_TOKENS_MANAGER_ABI, provider),
      ids
    )
  }

  public static async fetchOracleTemplates(
    chainId: ChainId,
    provider: Web3Provider,
    ids?: number[]
  ): Promise<Template[]> {
    return await Fetcher.fetchTemplates(
      new Contract(ORACLES_MANAGER_ADDRESS[chainId], KPI_TOKENS_MANAGER_ABI, provider),
      ids
    )
  }
}
