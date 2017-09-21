import { ProcessAction } from './process-action';

export class Process {
  id: string;
  scenario: string;
  title: string;
  subject: string;
  state: 'running';
  end_date?: string;
  actions: ProcessAction[];

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
  }
}
