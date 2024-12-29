export default class ExtendedActor extends Actor {
    prepareData() {
        super.prepareData();

        // Example: Calculate a derived statistic
        if (!this.system.derivedData) {
            this.system.derivedData = {};
        }
        this.system.derivedData.armorClass = 10 + this.system.abilities.dex.mod;
    }
}

Hooks.on('createActor', (actor) => {
    if (actor.system) {
        Object.assign(actor, new ExtendedActor(actor.data));
    }
});
