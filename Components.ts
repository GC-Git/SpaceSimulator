import {
  AllowedSkills,
  AllowedHumanTraits,
  SkillTypes,
  HumanTraitTypes,
  HumanNeedTypes
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

