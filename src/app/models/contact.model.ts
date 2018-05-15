export class ContactModel {
  constructor(
    public name: string,
    public surname: string,
    public email: string,
    public position: string,
    public phone: string,
    public description: string,
    public clientId: string
  ) {
  }
}
