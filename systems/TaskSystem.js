function TaskSystem(world) {
        for (const entity of world.entities.values()) {
        if (!entity.hasComponents("Task", "Identity")) continue;
        
        // All entities should have a Task and Identity component
        // Assign needs if they exist, null if not. Check if entity has required
        // components before accessing them to avoid errors.
        // As of now we assume all entities have the same needs if they HAVE needs.

        const task = entity.getComponent("Task");
        const id = entity.getComponent("Identity");
        const needs = entity.hasComponents("Needs") ? entity.getComponent("Needs") : null;

        // --- HUNGER MANAGEMENT ---
        // Assign eating task if hunger is high
        if (needs && needs.hunger > 3 && task.task !== "eating") {
            // Probability increases with hunger, 0% at 3, 100% at 10+
            const chance = Math.min(1, (needs.hunger - 4) / 7); // 0 at 3, 1 at 10
            if (Math.random() < chance) {
            task.task = "eating";
            world.addLog(`${id.name} starts eating.`);
            continue;
            }
        }
        // --- END HUNGER MANAGEMENT ---

        // --- FATIGUE MANAGEMENT ---
        // Rest if fatigued
        if (needs && needs.fatigue > 4 && task.task !== "resting") {
            // Probability increases with fatigue, 0% at 4, 100% at 10+
            const chance = Math.min(1, (needs.fatigue - 5) / 6); // 0 at 4, 1 at 10
            if (Math.random() < chance) {
            task.task = "resting";
            world.addLog(`${id.name} starts resting.`);
            continue;
            }
        }
        // --- END FATIGUE MANAGEMENT ---

        if (!task.task) {
            task.task = "patrolling"; // simple idle task
            world.addLog(`${id.name} starts ${task.task}.`);
        }
    }
}
module.exports = TaskSystem;