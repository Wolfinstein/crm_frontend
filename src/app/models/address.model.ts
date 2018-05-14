export class AddressModel{
  constructor(
  public addressType: string,
  public country: string,
  public state: string,
  public city: string,
  public street: string,
  public houseNumber: string,
  public zipCode: string,
  public clientId : string
  ) { }
}
