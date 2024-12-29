// scripts/index.js
import { CharacterSheet } from './characterSheet.js';
import ExtendedActor from './actor.js';

Hooks.on("ready", () => {
    new JRPGUI().render(true);
});

class JRPGUI extends FormApplication {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "jrpg-ui", // Use the same ID as in module.json
            title: "JRPG UI Module by Niqu3d",
            template: "templates/app.html",
            width: 800,
            height: "auto",
        });
    }

    getData() {
        const actors = game.actors.contents;

        return {
            characters: actors.map(actor => ({
                name: actor.name,
                portrait: actor.data.img,
                hp: actor.system.attributes.hp.value,
                maxHp: actor.system.attributes.hp.max,
                _id: actor._id,
                healthPercentage: (actor.system.attributes.hp.value / actor.system.attributes.hp.max) * 100
            }))
        };
    }

    activateListeners(html) {
        super.activateListeners(html);

        // Handle character sheet clicks
        html.find('.character-item').click(event => {
            const li = $(event.currentTarget);
            const actorId = li.data('actor-id');
            const actor = game.actors.get(actorId);
            new CharacterSheet(actor).render(true);
        });
    }
}

// Register the ExtendedActor class
Hooks.on('createActor', (actor) => {
    if (actor.system) {
        Object.assign(actor, new ExtendedActor(actor.data));
    }
});
