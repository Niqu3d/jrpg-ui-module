export default class LoDCharacterSheet extends ActorSheet {
    constructor(actor) {
        super(actor);
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "lod-character-sheet",
            title: "Legend of Dragoon Character Sheet",
            template: "modules/jrpg-ui-module/templates/Character-Sheet.html",
            width: 500,
            height: "auto",
            resizable: true,
            closeOnSubmit: false,
            classes: ["lod-ui", "sheet"],
            tabs: [
                {
                    navSelector: ".sheet-tabs",
                    contentSelector: ".sheet-body",
                    initial: "description"
                }
            ]
        });
    }

    getData() {
        const data = super.getData();
        const actor = this.actor;

        data.healthPercentage = (actor.system?.attributes?.hp?.value / actor.system?.attributes?.hp?.max) * 100;

        // Add more data as needed for the template
        data.str = actor.system?.abilities?.str?.value || 0;
        data.dex = actor.system?.abilities?.dex?.value || 0;
        data.con = actor.system?.abilities?.con?.value || 0;
        data.int = actor.system?.abilities?.int?.value || 0;
        data.wis = actor.system?.abilities?.wis?.value || 0;
        data.cha = actor.system?.abilities?.cha?.value || 0;

        data.strMod = actor.system?.abilities?.str?.mod || 0;
        data.dexMod = actor.system?.abilities?.dex?.mod || 0;
        data.conMod = actor.system?.abilities?.con?.mod || 0;
        data.intMod = actor.system?.abilities?.int?.mod || 0;
        data.wisMod = actor.system?.abilities?.wis?.mod || 0;
        data.chaMod = actor.system?.abilities?.cha?.mod || 0;

        data.ac = actor.system?.derived?.ac || 0;
        data.hp = actor.system?.attributes?.hp?.value || 0;
        data.maxHp = actor.system?.attributes?.hp?.max || 0;

        data.saves = {
            fortitude: {
                value: actor.system?.saves?.fortitude?.value || 0,
                proficiency: actor.system?.saves?.fortitude?.proficiency || 0
            },
            reflex: {
                value: actor.system?.saves?.reflex?.value || 0,
                proficiency: actor.system?.saves?.reflex?.proficiency || 0
            },
            will: {
                value: actor.system?.saves?.will?.value || 0,
                proficiency: actor.system?.saves?.will?.proficiency || 0
            }
        };

        // Add skills data (example)
        data.skills = Object.entries(actor.system.skills).map(([name, skill]) => ({
            name: name,
            value: skill.value || 0,
            modifier: skill.mod || 0
        }));

        // ... add more data as needed (inventory, spells, etc.) ...

        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);

        // Example: Add an event listener for a button
        html.find('.roll-attack').click(this._onRollAttack.bind(this));

        // Handle changes to health (example)
        html.find('input[name="system.attributes.hp.value"]').on("change", this._onHealthChange.bind(this));
    }

    async _onRollAttack(event) {
        event.preventDefault();
        // Implement your attack roll logic here (e.g., using Roll class)
    }

    async _onHealthChange(event) {
        const newHp = event.target.value;
        const maxHp = this.actor.system?.attributes?.hp?.max || 0;

        if (newHp > maxHp) {
            ui.notifications.warn(`Current HP cannot exceed Max HP.`);
            return;
        }

        await this.actor.update({
            'system.attributes.hp.value': newHp
        });
    }

    async _updateObject(event, formData) {
        event.preventDefault();
        await this.actor.update(formData);
        this.render();
    }
}
