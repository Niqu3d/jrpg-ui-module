export default class ExtendedActor extends Actor {
    prepareData() {
        super.prepareData();

        // Example: Calculate derived statistics for PF2e
        if (!this.system.derived) {
            this.system.derived = {};
        }

        // Armor Class (AC)
        this.system.derived.ac = 10 + this.system.abilities.dex.mod;
        if (this.system.armor.type) {
            this.system.derived.ac += this.system.armor.armor.value;
        }
        if (this.system.shield.type) {
            this.system.derived.ac += this.system.shield.armor.value;
        }

        // Hit Points (HP)
        this.system.attributes.hp.value =
            this.system.attributes.hp.max
            + (this.system.abilities.con.mod * this.system.details.level);

        // Attack Bonus (Melee)
        if (!this.system.skills) {
            this.system.skills = {};
        }
        this.system.skills.melee.attackBonus =
            this.system.abilities.str.mod
            + this.system.proficiencies.martial.value;

        // Attack Bonus (Ranged)
        this.system.skills.ranged.attackBonus =
            this.system.abilities.dex.mod
            + this.system.proficiencies.ranged.value;

        // Saving Throws
        this.system.saves.fortitude.value =
            this.system.abilities.con.mod
            + this.system.saves.fortitude.proficiency;
        this.system.saves.reflex.value =
            this.system.abilities.dex.mod
            + this.system.saves.reflex.proficiency;
        this.system.saves.will.value =
            this.system.abilities.wis.mod
            + this.system.saves.will.proficiency;
    }
}

Hooks.on('createActor', (actor) => {
    if (actor.system) {
        Object.assign(actor, new ExtendedActor(actor.data));
    }
});
