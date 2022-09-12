export class TemplateSpecification {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly tags: string[],
    public readonly creationForm: string,
    public readonly page: string
  ) {}
}

export class Template {
  constructor(
    public readonly id: number,
    public readonly address: string,
    public readonly version: number,
    public readonly specification: TemplateSpecification
  ) {}
}
