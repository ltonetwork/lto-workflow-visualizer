import { Actor } from './actor';

const randomIcons = [
  'account_balance',
  'account_balance_wallet',
  'assignment',
  'dns',
  'euro_symbol',
  'group_work',
  'language',
  'receipt',
  'settings_phone'
];

export class ProcessAction {
  finished: boolean;
  active: boolean;
  title: string;
  definition: string;
  key: string;
  response_date: string;
  activation_date?: string;
  actor: Actor;
  icon: string;

  constructor(data: any) {
    Object.assign(this, data);
    this.actor = new Actor(data['actor']);

    const rnd = Math.floor(Math.random() * randomIcons.length);
    this.icon = randomIcons[rnd];
  }
}
