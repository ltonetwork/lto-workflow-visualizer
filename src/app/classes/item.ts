export class Item {
  type: string; // auto
  title: string;
  description: string;
  location: { lat: number; lng: number; };
  foto: string;
  information: Array<Array<{
    tite: string;
    description: string;
  }>>;

  locationsHistory: Array<{
    title: string;
    location: {
      lat: number;
      lng: number;
    }
  }>;

  constructor(data: any) {
    Object.assign(this, data);
    this.title = this.type;

    // Set location
    this.location = {
      lat: 51.678418,
      lng: 7.809007
    };

    // Breake our information into arrays of 2 item
    // to show it nicely

    // Extract information
    const infoKeys = Object.keys(data).filter((key) => {
      return ['type', 'description', 'foto'].indexOf(key) === -1;
    });
    // Build information objects
    const infoObjects = infoKeys.map((key) => {
      return {
        title: key,
        description: data[key]
      };
    });

    // Build array of info objects
    const information: any[] = [];
    let row: any[] = [];
    infoObjects.forEach((infoItem: any, index: number) => {
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
