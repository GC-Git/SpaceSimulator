import {
  AllowedSkills,
  AllowedHumanTraits,
  SkillTypes,
  HumanTraitTypes,
  HumanNeedTypes,
  AllowedFluidType,
  AllowedConnectionTypes,
  HeatComponent,
  FluidContainerComponent,
  LeakageComponent,
  ConnectionComponent
} from "./Constants";

// --- Components ---

export function Identity(name: string, role: string) {
  return { name, role };
}

export function HumanTraits(input: Partial<Record<HumanTraitTypes, number>> = {}): Record<HumanTraitTypes, number> {
  // Fill all allowed human traits, defaulting to 0 if not provided
  return {
    bravery: input.bravery ?? 0,
    paranoia: input.paranoia ?? 0
  };
}

export function Traits<T extends string>(
  input: Partial<Record<T, number>> = {},
  allowedList: readonly T[]
): Record<T, number> {
  // Fill all allowed traits, defaulting to 0 if not provided
  const result = {} as Record<T, number>;
  for (const key of allowedList) {
    result[key] = input[key] ?? 0;
  }
  return result;
}

export function Skills(input: Partial<Record<SkillTypes, number>> = {}): Record<SkillTypes, number> {
  return {
    maintenance: input.maintenance ?? 0,
    medical: input.medical ?? 0
  };
}

export function Needs(
  hunger: number = 0,
  fatigue: number = 0,
  stress: number = 0
): Record<HumanNeedTypes, number> {
  return { hunger, fatigue, stress };
}

export function Health(value: number = 10, status: string = "healthy") {
  return { value, status };
}

export function Task(task: string | null = null) {
  return { task };
}

export function Heat(
  temperature: number = 20,
  maxTemperature: number = 100,
  heatGenerationRate: number = 1,
  heatDissipationRate: number = 0.5
): HeatComponent {
  return { temperature, maxTemperature, heatGenerationRate, heatDissipationRate };
}

export function FluidContainer(
  capacity: number = 100,
  currentVolume: number = 0,
  fluidType?: AllowedFluidType
): FluidContainerComponent {
  return { capacity, currentVolume, fluidType };
}

export function Leakage(leakageRate: number = 0): LeakageComponent {
  return { leakageRate };
}

export function Connection(
  connections: Array<{ 
    targetEntityId: string;
    direction: "in" | "out";
    flowRate?: number; 
    connectionType: AllowedConnectionTypes;
    fluidType?: AllowedFluidType;
  }> = []
): ConnectionComponent {
  return { connections };
}