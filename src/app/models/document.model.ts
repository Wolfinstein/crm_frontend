export class DocumentModel{
  constructor(
    public id: string,
    public name: string,
    public extension: string,
    public content: string,
    public description: string
  ) { }
}
