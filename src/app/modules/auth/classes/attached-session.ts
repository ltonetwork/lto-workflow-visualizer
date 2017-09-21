import { AttachedSessionAction } from './attached-session-action';
import { Party } from './party';
import { User } from './user';

export class AttachedSession {
  public readonly id: string;
  public readonly action: AttachedSessionAction;
  public readonly party: Party;
  public readonly user: User;

  constructor(data: any) {
    Object.assign(this, data);

    this.action = new AttachedSessionAction(data['action']);
    this.party = new Party(data['party']);
    this.user = new User(data['user']);
  }
}
