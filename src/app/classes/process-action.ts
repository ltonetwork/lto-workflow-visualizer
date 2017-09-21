import { Actor } from './actor';

export class ProcessAction {
  finished: boolean;
  active: boolean;
  title: string;
  definition: string;
  key: string;
  response_date: string;
  activation_date?: string;
  actor: Actor;

  constructor(data: any) {
    Object.assign(this, data);
    this.actor = new Actor(data['actor']);
  }
}
