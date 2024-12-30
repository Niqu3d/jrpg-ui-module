Hooks.on("ready", () => {
    new JRPGUI().render(true);
});

class JRPGUI extends FormApplication {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "jrpg-ui-module",
            title: "Legend of Dragoon UI",
            template: "modules/jrpg-ui-module/templates/app.html",
            width: 400,
            height: "auto",
        });
    }

    getData() {
        const actors = game.actors.contents;

        return {
            characters: actors.map(actor => ({
                name: actor.name,
                portrait: actor.img,
                hp: actor.system?.attributes?.hp?.value || 0, // Access hp.value if hp exists, otherwise use 0
                maxHp: actor.system?.attributes?.hp?.max || 0, // Access hp.max if hp exists, otherwise use 0
                _id: actor._id,
                healthPercentage: (actor.system?.attributes?.hp?.value || 0) / (actor.system?.attributes?.hp?.max || 0) * 100
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
            actor.sheet.render(true);
        });
    }
}
