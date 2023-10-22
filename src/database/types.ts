// Estructuras comunes utilizadas en la base de datos.

export interface Pet {
  name: string;
  level: number;
  xp: number;
  character: 'tapu';
  plant: Plant;
}

export interface User {
  pets: Pet[];
  plants: Plant[];
  devices: Device[];
}

export interface WaterEntry {
  previousSoilMoisture: number;
  previousTemperature: number;
}

export interface Plant {
  envTemperature: number;
  id: number;
  soilMoisture: number;
  watering: WaterEntry[];
}

export interface Device {
  battery: number;
  pet: Pet;
}
