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
  finished = true;
  active = false;
  title: string;
  definition: string;
  key: string;
  response_date: string;
  activation_date?: string;
  actor: Actor;
  description?: string;
  icon: string;
  actor_id: string;

  constructor(data: any) {
    Object.assign(this, data);
    // Take actors from process
    this.actor_id = data['actor'];
    this.response_date = data['timestamp'];

    const rnd = Math.floor(Math.random() * randomIcons.length);
    this.icon = randomIcons[rnd];
  }
}
