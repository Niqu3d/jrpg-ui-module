export class CharacterSheet extends FormApplication {
  constructor(actor) {
    super();
    this.actor = actor;
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions(), {
      id: "JRPG-character-sheet",
      title: this.actor.name,
      template: "modules/JRPG-foundryvtt-module/templates/characterSheet.html",
      width: 400,
      height: "auto",
    });
  }

  getData() {
    return {
      character: {
        name: this.actor.name,
        portrait: this.actor.data.img,
        hp: this.actor.data.data.attributes.hp.value,
        maxHp: this.actor.data.data.attributes.hp.max,
        data: this.actor.data.data
      }
    };
  }
}
