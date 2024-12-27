import { TurnOrder } from './turnOrder.js';
import { ActionHandler } from './actionHandler.js';
import { CharacterSheet } from './characterSheet.js'; // Import CharacterSheet class

Hooks.on("ready", () => {
  new JRPGUI().render(true);
});

class JRPGUI extends FormApplication {
  // ... (defaultOptions, getData() as before)

  activateListeners(html) {
    super.activateListeners(html);

    // ... (Button click handlers as before)

    // Handle character sheet clicks
    html.find('.character').click(event => {
      const actorId = $(event.currentTarget).data('actor-id');
      const actor = game.actors.get(actorId);
      new CharacterSheet(actor).render(true);
    });
  }
}
