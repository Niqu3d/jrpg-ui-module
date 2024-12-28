import { ActorPF2e } from "../systems/pf2e/module/actor/actor.js";

export class TurnOrder {
  static getTurnOrder() {
    const actors = game.actors.contents;
    return actors.sort((a, b) => {
      const aInit = a.getRollData().initiative.value || 0; // Handle actors without initiative
      const bInit = b.getRollData().initiative.value || 0;
      return bInit - aInit;
    });
  }
}
