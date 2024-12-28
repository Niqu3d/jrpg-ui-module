export class CharacterSheet extends FormApplication {
  constructor(actor) {
    super({ actor: actor });
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions(), {
      id: "jrpg-ui-character-sheet",
      title: "Character Sheet",
      template: "templates/character-Sheet.html",
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

    // Example: Handle changes to HP value (requires a form input in the template)
    html.find('input[name="data.data.attributes.hp.value"]').on('change', (event) => {
      const newHp = parseInt(event.target.value);
      this.actor.update({ "data.data.attributes.hp.value": Math.clamped(newHp, 0, this.actor.data.data.attributes.hp.max) });
    });
  }

  async _updateObject(event, formData) {
    event.preventDefault();
    await this.actor.update(formData);
    this.render();
  }
}
