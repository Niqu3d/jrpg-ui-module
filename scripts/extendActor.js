export default class extendActor {
    prepareData() {
        super.prepareData(); // Call the parent class's prepareData method

        if (!this.actor.system.derived) {
            this.actor.system.derived = {};
        }

        // Armor Class (AC)
        this.actor.system.derived.ac = 10 + (this.actor.system.abilities.dex.mod || 0);
        if (this.actor.system.armor?.type) {
            this.actor.system.derived.ac += this.actor.system.armor.armor.value || 0;
        }
        if (this.actor.system.shield?.type) {
            this.actor.system.derived.ac += this.actor.system.shield.armor.value || 0;
        }

        // Hit Points (HP) calculation
        const conMod = this.actor.system.abilities.con.mod || 0;
        const level = this.actor.system.details?.level || 1; // Default to level 1 if not set
        this.actor.system.attributes.hp.value = this.actor.system.attributes.hp.max + (conMod * level);

        // Attack Bonus (Melee)
        if (!this.actor.system.skills) {
            this.actor.system.skills = {};
        }
        this.actor.system.skills.melee = this.actor.system.skills.melee || {};
        this.actor.system.skills.melee.attackBonus =
            (this.actor.system.abilities.str.mod || 0) + (this.actor.system.proficiencies?.martial?.value || 0);

        // Attack Bonus (Ranged)
        this.actor.system.skills.ranged = this.actor.system.skills.ranged || {};
        this.actor.system.skills.ranged.attackBonus =
            (this.actor.system.abilities.dex.mod || 0) + (this.actor.system.proficiencies?.ranged?.value || 0);

        // Saving Throws (Fortitude, Reflex, Will)
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
