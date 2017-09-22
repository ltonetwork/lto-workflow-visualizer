export class Item {
  title: string;
  description: string;
  location: { lat: number; lng: number; };
  information: Array<{
    tite: string;
    description: string;
  }>;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
