export default class CharacterSheet extends ActorSheet {
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
        const data = {
            actor: this.actor,
            system: this.actor.system,
        };

        // Add any custom data you need here
        // For example:
        // data.isSpecialClass = this.actor.data.class === 'SpecialClass';

        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);

        // Example: Handle changes to HP value (requires a form input in the template)
        html.find('input[name="system.attributes.hp.value"]').on('change', (event) => {
            const newHp = parseInt(event.target.value);
            this.actor.update({ "system.attributes.hp.value": Math.clamped(newHp, 0, this.actor.system.attributes.hp.max) });
        });

        // Add more event listeners for other UI elements as needed
    }

    async _updateObject(event, formData) {
        event.preventDefault();
        await this.actor.update(formData);
        this.render();
    }
}
