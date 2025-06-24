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
  Connection,
  Insulation,
  SubEntities,
  HitPoints
} from './Components';
import {   
  AllowedFluidType,
  FluidTypes,
  HumanTraitTypes, 
  SkillTypes,
  AllowedInsulationType,
  InsulationTypes,
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


export function createRadiator(world: World, name: string, fluidResevoir: number = 100, heatCapacity: number = 100) {
  return world.createEntity()
    .addComponent("Identity", Identity(name, "Radiator"))
    .addComponent("FluidContainer", FluidContainer(fluidResevoir, fluidResevoir, "coolant"))
    .addComponent("Leakage", Leakage(0))
    .addComponent("Heat", Heat(20, heatCapacity, 0)) 
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

export function createPipeOLD(
  world: World,
  name: string,
  fluidType: AllowedFluidType,
  capacity: number = 100,
  connections: Array<{
    targetEntityId: string;
    direction: "in" | "out";
    connectionType: "fluid" | "power";
    flowRate?: number;
    fluidType?: AllowedFluidType;
  }> = []
) {
  return world.createEntity()
    .addComponent("Identity", Identity(name, "Pipe"))
    .addComponent("FluidContainer", FluidContainer(capacity, capacity, fluidType))
    .addComponent("Leakage", Leakage(0))
    .addComponent("Heat", Heat(20, 100, 0))
    .addComponent("Connection", Connection(connections));
}