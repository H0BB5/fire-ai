enum EQUIPMENT {
  Extinguisher = "Fire Extinguisher",
  Hose = "Fire Hose",
  System = "Fire System",
}

interface FireTag {
  name: string;
  address: string;
  equipment: EQUIPMENT;
  serial: string;
  location: string;
  unit: string;
  size: string;
  expiration: Date;
}
