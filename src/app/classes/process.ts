import { ProcessAction } from './process-action';
import { Item } from './item';
import { Finance } from './finance';
import { Actor } from './actor';

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
  finance: Finance;

  source: any;

  constructor(data: any) {
    Object.assign(this, data);
    this.source = data;
    // Build actions
    this.actions = data['events'].map((e: any) => new ProcessAction(e));
    // Now go though actions and set actors
    this.actions.forEach((action) => {
      action.actor = new Actor(data['actors'][action.actor_id]);
    });

    this.item = new Item(data['object']);
    this.finance = new Finance({
      fine: 15000,
      sellPrice: 16000,
      saldo: -1000
    });

    // Set manually item location
    this.item.location = {
      lat: parseFloat(data['locatie']['lat']),
      lng: parseFloat(data['locatie']['lng'])
    };

    // Now we can build location history
    const history = this.actions.filter(a => a.location).map((action) => {
      return {
        title: action.title,
        location: action.location
      };
    });
    this.item.locationsHistory = history;
  }
}
