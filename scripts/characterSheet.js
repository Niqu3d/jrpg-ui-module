import { TurnOrder } from './turnOrder.js';
import { CharacterSheet } from './characterSheet.js'; // Import CharacterSheet class

Hooks.on("ready", () => {
  new JRPGUI().render(true);
});

class JRPGUI extends FormApplication {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions(), {
      id: "jrpg-ui", // Use the same ID as in module.json
      title: "JRPG UI Module by Niqu3d",
      template: "templates/app.html",
      width: 800,
      height: "auto",
    });
  }

  getData() {
    const actors = game.actors.contents;
    const sortedActors = TurnOrder.getTurnOrder(actors);

    return {
      characters: sortedActors.map(actor => ({
        name: actor.name,
        portrait: actor.data.img,
        hp: actor.data.data.attributes.hp.value,
        maxHp: actor.data.data.attributes.hp.max,
        _id: actor._id,
        healthPercentage: actor.data.data.attributes.hp.value / actor.data.data.attributes.hp.max * 100
      })),
      turnOrder: sortedActors.map(actor => actor.name)
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Handle character sheet clicks
    html.find('.character').click(event => {
      const actorId = $(event.currentTarget).data('actor-id');
      const actor = game.actors.get(actorId);
      new CharacterSheet(actor).render(true);
    });
  }
}
