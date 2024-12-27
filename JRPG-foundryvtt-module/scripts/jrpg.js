Hooks.on('updateActor', (actor, data) => {
  // Ensure the health bar exists and update HP
  const healthBar = document.querySelector('.jrpg-character-sheet .health');
  if (healthBar && actor.data.data.attributes.hp) {
    const healthPercent = actor.data.data.attributes.hp.value / actor.data.data.attributes.hp.max * 100;
    healthBar.style.width = `${healthPercent}%`;
  }

  // Ensure the resolve bar exists and update Resolve (Mana)
  const manaBar = document.querySelector('.jrpg-character-sheet .mana');
  if (manaBar && actor.data.data.attributes.resolve) {
    const resolvePercent = actor.data.data.attributes.resolve.value / actor.data.data.attributes.resolve.max * 100;
    manaBar.style.width = `${resolvePercent}%`;
  }
});
