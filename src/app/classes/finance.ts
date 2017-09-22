export class Finance {
  fine: number;
  sellPrice: number;
  saldo: number;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
