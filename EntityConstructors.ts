import {
  HumanTraits,
  Identity,
  Traits,
  Skills,
  Needs,
  Health,
  Task,
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