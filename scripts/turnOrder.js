import { ActorPF2e } from "../systems/pf2e/module/actor/actor.js";

export class TurnOrder {
  static getTurnOrder() {
    const actors = game.actors.contents;
    return actors.sort((a, b) => {
      const aInit = a.getRollData().initiative.value;
      const bInit = b.getRollData().initiative.value;
      return bInit - aInit;
    });
  }
}
