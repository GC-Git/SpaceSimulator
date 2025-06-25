import {
  HumanTraits,
  Identity,
  Traits,
  Skills,
  Needs,
  Health,
  Task,
  FluidContainer,
  Leakage,
  Heat,
  Insulation,
  SubEntities,
  HitPoints,
  HeatRadiator,
  FluidConnection
} from './Components';
import {   
  AllowedFluidType,
  FluidTypes,
  HumanTraitTypes, 
  SkillTypes,
  AllowedInsulationType,
  InsulationTypes,
  AllowedConnectionTypes
} from './Constants';

// Define the World interface minimally for typing (expand as needed)
interface World {
  createEntity(): EntityBuilder;
}

// Define the EntityBuilder interface for chaining addComponent
interface EntityBuilder {
  id: number | string;
  addComponent(name: string, component: any): EntityBuilder;
}

// Human entity constructor
export function createHuman(
  world: World,
  name: string,
  role: string,
  traits: Partial<Record<HumanTraitTypes, number>>,
  skills: Partial<Record<SkillTypes, number>>
) {
  return world.createEntity()
    .addComponent("Identity", Identity(name, role))
    .addComponent("Traits", HumanTraits(traits))
    .addComponent("Skills", Skills(skills))
    .addComponent("Needs", Needs())
    .addComponent("Health", Health())
    .addComponent("Task", Task());
}

// Reactor entity constructor (expand as needed)
export function createReactor(world: World, name: string) {
  return world.createEntity()
    .addComponent("Identity", Identity(name, "Reactor"));
}

export function createInsulatedPipe(
  world: World,
  name: string,
  fluidType: AllowedFluidType = "coolant",
  insulationType: AllowedInsulationType = "fiberglass",
) {
  // 1. Create the parent pipe entity first
  const pipe = world.createEntity();

  // 2. Add components, using pipe.id for naming
  pipe
    .addComponent("Identity", Identity(`${name} ${pipe.id}`, `${insulationType} Insulated Pipe`))
    .addComponent("HitPoints", HitPoints(100, 100));

  // 3. Create sub-entities using pipe.id in their names
  const pipeWall = world.createEntity()
    .addComponent("Identity", Identity(`${name} ${pipe.id} Wall`, `${insulationType} Pipe Wall`))
    .addComponent("Insulation", Insulation(insulationType, 0.2, 1))
    .addComponent("Heat", Heat(20, 100, 0));

  const pipeFluid = world.createEntity()
    .addComponent("Identity", Identity(`${name} ${pipe.id} Fluid`, "Internal Pipe Fluid"))
    .addComponent("FluidContainer", FluidContainer(100, 100, fluidType))
    .addComponent("Leakage", Leakage(0))
    .addComponent("Heat", Heat(20, 100, 0));

  // 4. Add sub-entities to the parent pipe
  pipe.addComponent("SubEntities", SubEntities([pipeWall.id, pipeFluid.id]));

  // 5. Return the parent pipe entity if needed
  return pipe;
}

export function createHeatRadiator(
  world: World,
  name: string,
  heatCapacity: number = 1000,
  hitPoints: number = 100,
  fluidType: AllowedFluidType = "coolant"
) {
  return world.createEntity()
    .addComponent("Identity", Identity(name, "Heat Radiator"))
    .addComponent("HitPoints", HitPoints(100, 100))
    .addComponent("HeatRadiator", HeatRadiator(heatCapacity))
    .addComponent("FluidContainer", FluidContainer(100, 100, fluidType))
}