export default class extendActor {
    prepareData() {
        super.prepareData(); // Call the parent class's prepareData method

        // Create the derived data object if it doesn't exist
        if (!this.actor.system.derived) {
            this.actor.system.derived = {};
        }

        // Calculate Armor Class (AC)
        this.actor.system.derived.ac = 10 + (this.actor.system.abilities.dex.mod || 0);
        if (this.actor.system.armor?.type) {
            this.actor.system.derived.ac += this.actor.system.armor.armor.value || 0;
        }
        if (this.actor.system.shield?.type) {
            this.actor.system.derived.ac += this.actor.system.shield.armor.value || 0;
        }

        // Calculate Hit Points (HP)
        const conMod = this.actor.system.abilities.con.mod || 0;
        const level = this.actor.system.details?.level || 1; // Default to level 1 if not set
        this.actor.system.derived.hp = {
            value: this.actor.system.attributes.hp.max + (conMod * level),
            max: this.actor.system.attributes.hp.max
        };

        // Calculate Attack Bonus (Melee)
        if (!this.actor.system.skills) {
            this.actor.system.skills = {};
        }
        this.actor.system.skills.melee = this.actor.system.skills.melee || {};
        this.actor.system.skills.melee.attackBonus =
            (this.actor.system.abilities.str.mod || 0) + (this.actor.system.proficiencies?.martial?.value || 0);

        // Calculate Attack Bonus (Ranged)
        this.actor.system.skills.ranged = this.actor.system.skills.ranged || {};
        this.actor.system.skills.ranged.attackBonus =
            (this.actor.system.abilities.dex.mod || 0) + (this.actor.system.proficiencies?.ranged?.value || 0);

        // Calculate Saving Throws (Fortitude, Reflex, Will)
        this.actor.system.saves.fortitude = this.actor.system.saves.fortitude || {};
        this.actor.system.saves.reflex = this.actor.system.saves.reflex || {};
        this.actor.system.saves.will = this.actor.system.saves.will || {};
        this.actor.system.saves.fortitude.value =
            (this.actor.system.abilities.con.mod || 0) + (this.actor.system.saves.fortitude.proficiency || 0);
        this.actor.system.saves.reflex.value =
            (this.actor.system.abilities.dex.mod || 0) + (this.actor.system.saves.reflex.proficiency || 0);
        this.actor.system.saves.will.value =
            (this.actor.system.abilities.wis.mod || 0) + (this.actor.system.saves.will.proficiency || 0);
    }
}
