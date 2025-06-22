// --- Imports ---
// import ReactorEventSystem from './systems/ReactorEventSystem';
// import HealthSystem from './systems/HealthSystem';
// import TaskSystem from './systems/TaskSystem';
// import NeedsSystem from './systems/NeedsSystem';
import LogSystem from './systems/LogSystem';
import * as EntityConstructors from './EntityConstructors';
// import HungerSystem from './systems/HungerSystem';
// import FatigueSystem from './systems/FatigueSystem';

// --- ECS Base Classes ---
class Entity {
  id: number;
  components: Map<string, any>;

  constructor(id: number) {
    this.id = id;
    this.components = new Map();
  }
  addComponent(name: string, data: any): this {
    this.components.set(name, data);
    return this;
  }
  getComponent<T = any>(name: string): T | undefined {
    return this.components.get(name);
  }
  hasComponents(...names: string[]): boolean {
    return names.every(name => this.components.has(name));
  }
}

// --- World Class ---
class World {
  entities: Map<number, Entity>;
  systems: Array<(world: World) => void>;
  nextId: number;
  log: string[];
  ended: boolean;
  tick?: number;

  constructor() {
    this.entities = new Map();
    this.systems = [];
    this.nextId = 1;
    this.log = [];
    this.ended = false;
  }

  createEntity(): Entity {
    const entity = new Entity(this.nextId++);
    this.entities.set(entity.id, entity);
    return entity;
  }

  addSystem(systemFn: (world: World) => void): void {
    this.systems.push(systemFn);
  }

  runSystems(): void {
    for (const system of this.systems) {
      system(this);
    }
  }

  addLog(entry: string): void {
    this.log.push(`[Tick ${this.tick || 0}] ${entry}`);
  }

  tickOnce(): void {
    this.tick = (this.tick || 0) + 1;
    this.runSystems();
  }
}

// --- Event System for prototyping ---
function EventSystem(world: World): void {
  // Implement event logic here if needed
}

function runSimulation(world: World, ticks: number, delay: number = 1000): void {
  let currentTick = 0;

  const interval = setInterval(() => {
    console.log(`\n--- TICK ${currentTick + 1} ---`);
    world.tickOnce();

    currentTick++;
    if (currentTick >= ticks || world.ended) {
      clearInterval(interval);
      if (world.ended) {
        console.log("\nSimulation ended.");
      } else {
        console.log("\nSimulation complete.");
      }
    }
  }, delay);
}

// --- Setup ---
const world = new World();

// Create Entities
// EntityConstructors.createHuman(world, "Alice", "Pilot", { bravery: 7, paranoia: 3 }, { maintenance: 2, medical: 5 });
// EntityConstructors.createHuman(world, "Bob", "Engineer", { bravery: 6, paranoia: 4 }, { maintenance: 8, medical: 2 });

EntityConstructors.createReactor(world, "Main Reactor");
EntityConstructors.createRadiator(world, "Reactor Radiator", 100, 100, 10);
EntityConstructors.createPipe(world, "Reactor to Radiator Pipe", "coolant", 60, [
    { targetEntityId: "Reactor Radiator", direction: "out", connectionType: "fluid", flowRate: 20, fluidType: "coolant" }
]);

// Add systems
// world.addSystem(NeedsSystem);
// world.addSystem(TaskSystem);
// world.addSystem(EventSystem);
// world.addSystem(HealthSystem);
// world.addSystem(LogSystem);
// world.addSystem(ReactorEventSystem);
// world.addSystem(HungerSystem);
// world.addSystem(FatigueSystem);

// Simulate 200 ticks, 1 per 2 seconds
runSimulation(world, 200, 2000);

console.log(world.entities);