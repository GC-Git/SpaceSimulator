function HungerSystem(world) {
    for (const entity of world.entities.values()) {
        if (!entity.hasComponents("Needs", "Task", "Identity")) continue;
        const task = entity.getComponent("Task");
        const needs = entity.getComponent("Needs");
        const id = entity.getComponent("Identity");

        // If currently eating, reduce hunger
        if (task.task === "eating") {
            needs.hunger = Math.max(0, needs.hunger - 2); // decrease hunger
            world.addLog(`${id.name} is eating. Hunger now ${needs.hunger.toFixed(1)}.`);
            if (needs.hunger <= 0) {
            task.task = null;
            world.addLog(`${id.name} finished eating.`);
            }
            continue;
        }
    }
}
module.exports = HungerSystem;