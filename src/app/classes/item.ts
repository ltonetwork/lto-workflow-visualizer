export class Item {
  title: string;
  description: string;
  location: { lat: number; lng: number; };
  information: Array<Array<{
    tite: string;
    description: string;
  }>>;

  constructor(data: any) {
    Object.assign(this, data);
    // Breake our information into arrays of 2 item
    // to show it nicely
    const information: any[] = [];
    let row: any[] = [];
    data['information'].forEach((infoItem: any, index: number) => {
      if (index % 2 === 0 && index !== 0) {
        information.push(row);
        row = [];
      }
      row.push(infoItem);
    });

    if (row.length !== 0) {
      information.push(row);
    }

    this.information = information;
  }
}
