export const Colors = {
  Reset: "\x1b[0m",
  Red: "\x1b[31m",
  BrightRed: "\x1b[91m",
  Green: "\x1b[32m",
  Yellow: "\x1b[33m",
  Blue: "\x1b[34m",
  Magenta: "\x1b[35m",
  Cyan: "\x1b[36m",
  White: "\x1b[37m"
} as const;
export type ColorNameTypes = keyof typeof Colors;

// Traits are a more generalized version of skills, representing personality traits or characteristics.
// They can be used to influence behavior, decision-making, and interactions with other entities.
export const AllowedHumanTraits = [
  "bravery",
  "paranoia"
] as const;
export type HumanTraitTypes = typeof AllowedHumanTraits[number];

// Skills are specific abilities or proficiencies that an entity can have.
// They can be used to determine how well an entity can perform certain tasks or actions.
export const AllowedSkills = [
  "maintenance",
  "medical"
] as const;
export type SkillTypes = typeof AllowedSkills[number];

// Human needs that must be managed for each entity.
export const AllowedHumanNeeds = [
  "hunger",
  "fatigue",
  "stress"
] as const;
export type HumanNeedTypes = typeof AllowedHumanNeeds[number];

export interface FluidPropertyTypes {
  name: string;
  thermalConductivity: number; // How well the fluid conducts heat
  specificHeat: number; // How much heat the fluid can store per unit mass
}

export const FluidTypes = {
  water: { name: "water", thermalConductivity: 0.606, specificHeat: 4.186 },
  fuel: { name: "fuel", thermalConductivity: 0.12, specificHeat: 2.1 },
  air: { name: "air", thermalConductivity: 0.0257, specificHeat: 1.005 },
  coolant: { name: "coolant", thermalConductivity: 0.5, specificHeat: 3.8 },
}

export type AllowedFluidType = keyof typeof FluidTypes;

export interface FluidContainerComponent {
  capacity: number; // Maximum capacity of the container
  currentVolume: number; // Current volume of fluid in the container
  fluidType?: AllowedFluidType; // Optional type of fluid contained, e.g., "water", "fuel"
}

export interface LeakageComponent {
  leakageRate: number;
}

export const InsulationTypes = {
  fiberglass: { name: "fiberglass", thermalConductivity: 0.04, durability: 0.8 },
  foam: { name: "foam", thermalConductivity: 0.03, durability: 0.9 },
  cellulose: { name: "cellulose", thermalConductivity: 0.05, durability: 0.7 },
  rockwool: { name: "rockwool", thermalConductivity: 0.035, durability: 0.85 },
  aerogel: { name: "aerogel", thermalConductivity: 0.013, durability: 0.95 },
}
export type AllowedInsulationType = keyof typeof InsulationTypes;

export interface InsulationComponent {
  material: AllowedInsulationType; // Type of insulation material used
  thickness: number; // Thickness of the insulation layer
  integrity: number; // Integrity of the insulation, representing how well it prevents heat transfer
}

export interface HeatComponent {
  temperature: number; // Current temperature of the component
  maxTemperature: number; // Maximum safe temperature before damage occurs
  heatGenerationRate: number; // Rate at which the component generates heat
}


export interface HeatRadiatorComponent extends HeatComponent {
  heatDissipationRate: number; // Rate at which the radiator dissipates heat
  efficiency: number; // Efficiency of the radiator in transferring heat away
}


export const AllowedConnectionTypes = [
  "fluid",
]
export type AllowedConnectionTypes = typeof AllowedConnectionTypes[number];

export interface BaseConnectionComponent {
  targetEntityId: string; // ID of the entity this component connects to
  direction: "in" | "out"; // Direction of the connection
  connectionType: AllowedConnectionTypes; // Type of connection, e.g., "fluid", "power"
}

export interface FluidConnectionComponent extends BaseConnectionComponent {
  connectionType: "fluid";
  flowRate: number;
  fluidType?: AllowedFluidType;
}

export interface SubEntitiesComponent {
  subEntityIds: Array<string |number>; // List of sub-entity IDs that this entity contains
}

export interface HitPointsComponent {
  current: number; // Current hit points of the entity
  maxValue: number; // Maximum hit points the entity can have
}