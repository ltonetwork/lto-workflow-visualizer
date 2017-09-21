export class User {
  public readonly id: string;
  public readonly first_name: string;
  public readonly last_name: string;
  public readonly gender: 'male' | 'female';
  public readonly email: string;
  public readonly image: string;
  public readonly language: string;
  public readonly authz_groups: string[];
  public readonly name: string;
  public readonly username: string;
  public readonly signature: any;
  public readonly employment: any[];

  constructor(data: any) {
    Object.assign(this, data);
  }
}
