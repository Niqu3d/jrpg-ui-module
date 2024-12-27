import { TurnOrder } from './turnOrder.js';
import { ActionHandler } from './actionHandler.js';
import { CharacterSheet } from './characterSheet.js'; // Import CharacterSheet class

Hooks.on("ready", () => {
  new JRPGUI().render(true);
});

class JRPGUI extends FormApplication {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions(), {
      id: "JRPG-foundryvtt-module",
      title: "JRPG UI Module by Niqu3d",
      template: "templates/app.html",
      width: 800,
      height: "auto",
    });
  }

  getData() {
    const actors = game.actors.contents;
    const sortedActors = actors.sort((a, b) => {
      // Get initiative from PF2e actor data
      const aInit = a.getRollData().initiative.value;
      const bInit = b.getRollData().initiative.value;
      return bInit - aInit;
    });

    return {
      characters: sortedActors.map(actor => ({
        name: actor.name,
        portrait: actor.data.img,
        hp: actor.data.data.attributes.hp.value,
        maxHp: actor.data.data.attributes.hp.max,
        _id: actor._id // Add actor ID for character sheet click handling
      })),
      turnOrder: sortedActors
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find("#action-buttons button:first-child").click(() => {
      ActionHandler.startTurn();
    });

    html.find("#action-buttons button:last-child").click(() => {
      ActionHandler.endTurn();
    });

    html.find("#action-buttons button:nth-child(3)").click(() => {
      ActionHandler.ready();
    });

    html.find("#action-buttons button:nth-child(4)").click(() => {
      ActionHandler.delay();
    });

    // Handle character sheet clicks
    html.find('.character').click(event => {
      const actorId = $(event.currentTarget).data('actor-id');
      const actor = game.actors.get(actorId);
      new CharacterSheet(actor).render(true);
    });
  }
}
