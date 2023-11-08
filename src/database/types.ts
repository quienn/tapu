// Estructuras comunes utilizadas en la base de datos.

export interface Pet {
  name: string;
  level: number;
  xp: number;
  character: 'tapu';
  moisturePercentage: number;
  temperature: number;
  maxTemperature: number;
  minTemperature: number;
  maxMoisturePercentage: number;
  minMoisturePercentage: number;
  species: string;
  battery: number;
}

export interface User {
  pets: Pet[];
}

