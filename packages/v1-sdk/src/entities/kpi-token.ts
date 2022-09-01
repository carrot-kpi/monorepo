import { ChainId, TvlPlatform, TokenMarketCapPlatform, TokenPricePlatform } from '@carrot-kpi/core-sdk'
import { Template } from './template'
import { Oracle } from './oracle'
import { getCreate2Address } from '@ethersproject/address'
import { pack, keccak256 } from '@ethersproject/solidity'
import { KPI_TOKENS_MANAGER_ADDRESS } from '../commons/constants'

enum Widget {
  TOKEN_MARKET_CAP,
  TOKEN_PRICE,
  TVL,
}

interface BaseFrontendWidgetDetails {
  from: number
  to: number
  granularity: number
}

interface TokenMarketCapDetails extends BaseFrontendWidgetDetails {
  tokenAddress: string
  pricingPlatform: TokenMarketCapPlatform
}

interface TokenPriceDetails extends BaseFrontendWidgetDetails {
  tokenAddress: string
  pricingPlatform: TokenPricePlatform
}

interface TvlDetails extends BaseFrontendWidgetDetails {
  pricingPlatform: TokenPricePlatform
  platform: TvlPlatform
}

type WidgetDetails<T extends Widget> = T extends Widget.TOKEN_MARKET_CAP
  ? TokenMarketCapDetails
  : T extends Widget.TOKEN_PRICE
  ? TokenPriceDetails
  : T extends Widget.TVL
  ? TvlDetails
  : never

interface WidgetSpecification {
  type: Widget
  details: WidgetDetails<WidgetSpecification['type']>
}

export interface KpiTokenDescription {
  ipfsHash: string
  title: string
  description: string
  tags: string[]
  widgets: WidgetSpecification[]
}

export class KpiToken {
  constructor(
    public readonly chainId: ChainId,
    public readonly address: string,
    public readonly template: Template,
    public readonly oracles: Oracle[],
    public readonly description: KpiTokenDescription,
    public readonly expiration: number,
    public readonly finalized: boolean,
    public readonly rawData: string
  ) {}

  public get expired(): boolean {
    return this.expiration <= Math.floor(Date.now() / 1000)
  }

  public static predictInstanceAddress(
    chainId: ChainId,
    creator: string,
    template: Template,
    descriptionIpfsHash: string,
    initializationData: string,
    oraclesInitializationData: string
  ): string {
    const minimalProxyInitCode = `363d3d373d3d3d363d73${template.address.substring(2)}5af43d82803e903d91602b57fd5bf3`
    return getCreate2Address(
      KPI_TOKENS_MANAGER_ADDRESS[chainId],
      keccak256(
        ['string'],
        [
          pack(
            ['string', 'string', 'string', 'string'],
            [creator, descriptionIpfsHash, initializationData, oraclesInitializationData]
          ),
        ]
      ),
      keccak256(['bytes'], [minimalProxyInitCode])
    )
  }
}
