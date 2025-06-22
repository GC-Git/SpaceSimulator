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
  Connection
} from './Components';
import { HumanTraitTypes, SkillTypes } from './Constants';

// Define the World interface minimally for typing (expand as needed)
interface World {
  createEntity(): EntityBuilder;
}

// Define the EntityBuilder interface for chaining addComponent
interface EntityBuilder {
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


export function createRadiator(world: World, name: string, fluidResevoir: number = 100, heatCapacity: number = 100, heatDissipationRate: number = 10) {
  return world.createEntity()
    .addComponent("Identity", Identity(name, "Radiator"))
    .addComponent("FluidContainer", FluidContainer(fluidResevoir, fluidResevoir, "coolant"))
    .addComponent("Leakage", Leakage(0))
    .addComponent("Heat", Heat(20, heatCapacity, 0, heatDissipationRate)) 
}

export function createPipe(
  world: World,
  name: string,
  fluidType: string,
  capacity: number = 100,
  connections: Array<{
    targetEntityId: string;
    direction: "in" | "out";
    connectionType: "fluid" | "power";
    flowRate?: number;
    fluidType?: string;
  }> = []
) {
  return world.createEntity()
    .addComponent("Identity", Identity(name, "Pipe"))
    .addComponent("FluidContainer", FluidContainer(capacity, capacity, fluidType))
    .addComponent("Leakage", Leakage(0))
    .addComponent("Heat", Heat(20, 100, 0, 0))
    .addComponent("Connection", Connection(connections));
}