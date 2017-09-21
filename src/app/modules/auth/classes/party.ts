export class Party {
  public readonly name: string;
  public readonly email: string;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
