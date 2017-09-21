export class AttachedSessionAction {
  public readonly state: string;
  public readonly data: any;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
