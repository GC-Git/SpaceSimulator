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

export const AllowedFluidType = [
  "water",
  "fuel",
  "air",
  "coolant"
]
export type AllowedFluidType = typeof AllowedFluidType[number];

export interface FluidContainerComponent {
  capacity: number; // Maximum capacity of the container
  currentVolume: number; // Current volume of fluid in the container
  fluidType?: AllowedFluidType; // Optional type of fluid contained, e.g., "water", "fuel"
}

export interface LeakageComponent {
  leakageRate: number;
}

export interface HeatComponent {
  temperature: number; // Current temperature of the component
  maxTemperature: number; // Maximum safe temperature before damage occurs
  heatGenerationRate: number; // Rate at which the component generates heat
  heatDissipationRate: number; // Rate at which the component dissipates heat
}

export const AllowedConnectionTypes = [
  "fluid",
  "power"
]
export type AllowedConnectionTypes = typeof AllowedConnectionTypes[number];

export interface ConnectionComponent {
  connections: {
    targetEntityId: string; // ID of the entity this component connects to
    direction: "in" | "out"; // Direction of the connection
    connectionType: AllowedConnectionTypes; // Type of connection, e.g., "fluid", "power"
    flowRate?: number;
    fluidType?: AllowedFluidType; // Optional type of fluid for fluid connections
  }[];
}