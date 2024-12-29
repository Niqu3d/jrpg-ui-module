// import { CharacterSheet } from './characterSheet.js';

Hooks.on("ready", () => {
    new JRPGUI().render(true);
});

class JRPGUI extends FormApplication {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "jrpg-ui-module", // Use the same ID as in module.json
            title: "JRPG UI Module by Niqu3d",
            template: "templates/app.html",
            width: 400,
            height: "auto",
            class: ["lod-ui"], // lod css style
        });
    }

    getData() {
        return {}; // testing
        /*        const actors = game.actors.contents;

              return {
                    characters: actors.map(actor => ({
                        name: actor.name,
                        portrait: actor.data.img,
                        hp: actor.system.attributes.hp.value,
                        maxHp: actor.system.attributes.hp.max,
                        _id: actor._id,
                        healthPercentage:
                            actor.system.attributes.hp.value / actor.system.attributes.hp.max * 100
                    }))
                };
        */
    }

    activateListeners(html) {
        super.activateListeners(html);

        /*
                // Handle character sheet clicks
                html.find('.character-item').click(event => {
                    const li = $(event.currentTarget);
                    const actorId = li.data('actor-id');
                    const actor = game.actors.get(actorId);
                    new CharacterSheet(actor).render(true);
                });
        */
    }
}
