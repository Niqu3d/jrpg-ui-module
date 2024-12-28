export class CharacterSheet extends FormApplication {
  constructor(actor) {
    super({ actor: actor });
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions(), {
      id: "jrpg-ui-character-sheet",
      title: "Character Sheet",
      template: "templates/characterSheet.html",
      width: 400,
      height: "auto",
      resizable: true,
      closeOnSubmit: false
    });
  }

  getData() {
    const data = this.actor.data.toObject();
    return {
      actor: data,
      data: data.data
    };
  }

  activateListeners(html) {
    super.activateListeners(html);
    // Add any event listeners for your character sheet here
  }

  async _updateObject(event, formData) {
    event.preventDefault();
    await this.actor.update(formData);
    this.render();
  }
}
