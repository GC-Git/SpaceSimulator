function HealthSystem(world) {
  for (const entity of world.entities.values()) {
    if (!entity.hasComponents("Health", "Skills")) continue;
    const health = entity.getComponent("Health");
    const skills = entity.getComponent("Skills");

    // Example: Reduce all skills if health is low
    if (health.value < 7) {
      for (let key in skills) {
        // Reduce skill by 1 if health is low, but not below 0
        skills[key] = Math.max(0, skills[key] - 1);
      }
      world.addLog(`${entity.getComponent("Identity").name} is weakened by low health!`);
    }
  }
}

module.exports = HealthSystem;