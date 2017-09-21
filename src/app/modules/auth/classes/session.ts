import { User } from './user';

export class Session {
  public readonly id: string;
  public readonly user: any;

  constructor (data: any) {
    Object.assign(this, data);
    this.user = new User(data['user']);
  }
}
