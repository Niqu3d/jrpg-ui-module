//not being used just yet as char sheet needs to work first

export class TurnOrder {
    static getTurnOrder(actors) {
        return actors.sort((a, b) => {
            const aInit = a.getRollData().initiative.value || 0;
            const bInit = b.getRollData().initiative.value || 0;
            return bInit - aInit;
        });
    }
}
