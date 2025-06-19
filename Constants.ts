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


