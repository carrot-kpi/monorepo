import { BigNumber } from 'ethers'

export class TemplateSpecification {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly tags: string[],
    public readonly formSpecification: string,
    public readonly calldataEncoder: string,
    public readonly dataDecoder: string
  ) {}
}

export class Template {
  constructor(
    public readonly id: BigNumber,
    public readonly address: string,
    public readonly version: BigNumber,
    public readonly specification: TemplateSpecification
  ) {}
}
