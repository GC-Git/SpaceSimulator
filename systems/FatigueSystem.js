function FatigueSystem(world) {
    for (const entity of world.entities.values()) {
        if (!entity.hasComponents("Needs", "Task", "Identity")) continue;
        const task = entity.getComponent("Task");
        const needs = entity.getComponent("Needs");
        const id = entity.getComponent("Identity");
        
        // If currently resting, reduce fatigue
        if (task.task === "resting" && needs) {
            needs.fatigue = Math.max(0, needs.fatigue - 2); // decrease fatigue
            world.addLog(`${id.name} is resting. Fatigue now ${needs.fatigue}.`);
            if (needs.fatigue <= 0) {
                task.task = null;
                world.addLog(`${id.name} finished resting.`);
            }
            continue;
        }

    }
}
module.exports = FatigueSystem;