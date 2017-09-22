import { ProcessAction } from './process-action';
import { Item } from './item';

interface IProcess {
  id: string;
  scenario: string;
  title: string;
  subject: string;
  state: 'running';
  end_date?: string;
  actions: ProcessAction[];
  item: {
    title: string;
    description: string;
    location: {
      lat: number;
      lng: number;
    }
    information: Array<{
      tite: string;
      description: string;
    }>;
  };
  finance: {
    fine: number;
    sellPrice: number;
    saldo: number;
  };
}

export class Process {
  id: string;
  scenario: string;
  title: string;
  subject: string;
  state: 'running';
  end_date?: string;
  actions: ProcessAction[];
  item: Item;
  finance: { fine: number; sellPrice: number; saldo: number; };

  constructor(data: any) {
    Object.assign(this, data);

    // Build actions
    let actions: ProcessAction[] = [];
    if (data['previous']) {
      actions = actions.concat(data['previous'].map((event: any) => {
        const e = new ProcessAction(event);
        e.finished = true;
        return e;
      }));
    }

    // Current action
    const currentEvent = new ProcessAction(data['current']);
    currentEvent.active = true;
    actions.push(currentEvent);

    // Next actions
    if (data['next']) {
      actions = actions.concat(data['next'].map((event: any) => new ProcessAction(event)));
    }

    this.actions = actions;

    this.item = new Item(data['item']);
  }
}
