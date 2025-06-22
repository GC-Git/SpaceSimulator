// --- Imports ---
const ReactorEventSystem = require('./systems/ReactorEventSystem.js');
const HealthSystem = require('./systems/HealthSystem.js');
const TaskSystem = require('./systems/TaskSystem.js');
const NeedsSystem = require('./systems/NeedsSystem.js');
const LogSystem = require('./systems/LogSystem.js');
const EntityConstructors = require('./EntityConstructors.js');
const HungerSystem = require('./systems/HungerSystem.js');
const FatigueSystem = require('./systems/FatigueSystem.js');

// --- ECS Base Classes ---
class Entity {
  constructor(id) {
    this.id = id;
    this.components = new Map();
  }
  addComponent(name, data) {
    this.components.set(name, data);
    return this;
  }
  getComponent(name) {
    return this.components.get(name);
  }
  hasComponents(...names) {
    return names.every(name => this.components.has(name));
  }
}

// --- World Class ---
class World {
  constructor() {
    this.entities = new Map();
    this.systems = [];
    this.nextId = 1;
    this.log = [];
    this.ended = false; // Flag to end simulation
  }

  createEntity() {
    const entity = new Entity(this.nextId++);
    this.entities.set(entity.id, entity);
    return entity;
  }

  addSystem(systemFn) {
    this.systems.push(systemFn);
  }

  runSystems() {
    for (const system of this.systems) {
      system(this);
    }
  }

  addLog(entry) {
    this.log.push(`[Tick ${this.tick || 0}] ${entry}`);
  }

  tickOnce() {
    this.tick = (this.tick || 0) + 1;
    this.runSystems();
  }
}

// --- Event System for prototyping ---
function EventSystem(world) {

}


function runSimulation(world, ticks, delay = 1000) {
  let currentTick = 0;

  const interval = setInterval(() => {
    console.log(`\n--- TICK ${currentTick + 1} ---`);
    world.tickOnce();

    currentTick++;
    if (currentTick >= ticks || world.ended) { // Check for end flag
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
EntityConstructors.createHuman(world, "Alice", "Pilot", { bravery: 7, paranoia: 3 }, { maintenance: 2, medical: 5 });
EntityConstructors.createHuman(world, "Bob", "Engineer", { bravery: 6, paranoia: 4 }, { maintenance: 8, medical: 2 });
EntityConstructors.createReactor(world, "Main Reactor");


// Add systems
world.addSystem(NeedsSystem);
world.addSystem(TaskSystem);
world.addSystem(EventSystem);
world.addSystem(HealthSystem);
world.addSystem(LogSystem);
world.addSystem(ReactorEventSystem);
world.addSystem(HungerSystem);
world.addSystem(FatigueSystem);

// Simulate 10 ticks
runSimulation(world, 200, 2000); // 10 ticks, 1 per second