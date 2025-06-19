// This is where needs are simulated and increase. NOT where needs are managed by entities.
// For example, if an entity is hungry, it will not automatically eat.
// Instead, it will increase hunger and the TaskSystem will assign an eating task if needed.

function NeedsSystem(world) {
    for (const entity of world.entities.values()) {
        if (!entity.hasComponents("Needs")) continue;
        const needs = entity.getComponent("Needs");
        
        // Simulate needs changes
        needs.hunger += Math.round(Math.random() * 5) / 10; // Random hunger increase (0.0 to 0.5, 1 decimal)
        needs.fatigue += Math.round(Math.random() * 3) / 10; // Random fatigue increase (0.0 to 0.3, 1 decimal)
        
        // Check hunger
        if (needs.hunger > 5) {
        const id = entity.getComponent("Identity");
        world.addLog(`${id.name} is getting very hungry.`);
        }

        // Check fatigue
        if (needs.fatigue > 5) {
        const id = entity.getComponent("Identity");
        world.addLog(`${id.name} is getting very tired.`);
        }
    }
}
module.exports = NeedsSystem;