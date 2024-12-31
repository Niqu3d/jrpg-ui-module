// index.js
Hooks.on("ready", () => {
    new JRPGUI().render(true);
});

class JRPGUI extends FormApplication {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "jrpg-ui-module",
            title: "Legend of Dragoon UI",
            template: "modules/jrpg-ui-module/templates/app.html",
            width: 600,
            height: "auto",
            popOut: true,
            resizable: true,
        });
    }

    getData() {
        const actors = game.actors.contents;

        return {
            characters: actors.map(actor => ({
                name: actor.name,
                portrait: actor.img,
                hp: actor.system?.attributes?.hp?.value || 0,
                maxHp: actor.system?.attributes?.hp?.max || 0,
                _id: actor._id,
                ac: actor.system?.derived?.ac || 0,
                str: actor.system?.abilities?.str?.value || 0,
                strMod: actor.system?.abilities?.str?.mod || 0,
                dex: actor.system?.abilities?.dex?.value || 0,
                dexMod: actor.system?.abilities?.dex?.mod || 0,
                con: actor.system?.abilities?.con?.value || 0,
                conMod: actor.system?.abilities?.con?.mod || 0,
                int: actor.system?.abilities?.int?.value || 0,
                intMod: actor.system?.abilities?.int?.mod || 0,
                wis: actor.system?.abilities?.wis?.value || 0,
                wisMod: actor.system?.abilities?.wis?.mod || 0,
                cha: actor.system?.abilities?.cha?.value || 0,
                chaMod: actor.system?.abilities?.cha?.mod || 0,
                healthPercentage:
                    actor.system?.attributes?.hp?.value
                        ? (actor.system.attributes?.hp?.value / actor.system.attributes?.hp?.max) * 100
                        : 0
            }))
        };
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.find('.character-item').click(event => {
            const li = $(event.currentTarget);
            const actorId = li.data('actor-id');
            const actor = game.actors.get(actorId);

            if (actor) {
                actor.sheet.render(true);
            } else {
                ui.notifications.error(`Actor with ID ${actorId} not found.`);
            }
        });
    }
}

// Ensure that the custom sheet is used when the actor's sheet is requested
Hooks.on('getActorSheet', (actor) => {
    if (actor instanceof game.actors.BaseActor) {
        actor.sheet = new LoDCharacterSheet(actor);
    }
});

// Remove the unused import and the createActor hook
// import { extendActor } from './extendActor.js';

// Hooks.on('createActor', (actor) => {
//   if (actor.system) {
//     Object.assign(actor, new extendActor(actor.data));
//   }
// });
