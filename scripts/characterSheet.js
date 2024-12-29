export class CharacterSheet extends FormApplication {
    constructor(actor) {
        super({ actor: actor });
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "jrpg-ui-character-sheet",
            title: "Character Sheet",
            template: "templates/Character-Sheet.html",
            width: 400,
            height: "auto",
            resizable: true,
            closeOnSubmit: false
        });
    }

    getData() {
        return {
            actor: this.actor,
            system: this.actor.system
        };
    }

    activateListeners(html) {
        super.activateListeners(html);

        // Example: Handle changes to HP value (requires a form input in the template)
        html.find('input[name="system.attributes.hp.value"]').on('change', (event) => {
            const newHp = parseInt(event.target.value);
            this.actor.update({ "system.attributes.hp.value": Math.clamped(newHp, 0, this.actor.system.attributes.hp.max) });
        });
    }

    async _updateObject(event, formData) {
        event.preventDefault();
        await this.actor.update(formData);
        this.render();
    }
}
