import template from "./template.js";
import DB from "../monsterList/DB.js";

export default class Monster {
    constructor(data, onDelete) {
        this.data = data;
        this.onDelete = onDelete;
        this.element = this.render();
    }

    render() {
        const wrapper = document.createElement("tbody");
        wrapper.innerHTML = template(this.data);
        const row = wrapper.firstElementChild;

        row.querySelector(".btn-edit").addEventListener("click", () => row.classList.add("isEditing"));
        row.querySelector(".btn-check").addEventListener("click", () => this.save(row));
        row.querySelector(".btn-delete").addEventListener("click", () => this.delete());

        return row;
    }

    async save(row) {
        this.data = {
            ...this.data,
            name: row.querySelector(".input-name").value,
            type: row.querySelector(".input-type").value,
            dangerLevel: Number(row.querySelector(".input-danger").value),
            year: Number(row.querySelector(".input-year").value),
        };
        this.data = await DB.updateOne(this.data);

        // re-rendu complet de la ligne pour synchroniser les spans d'affichage
        const newRow = this.render();
        row.replaceWith(newRow);
        this.element = newRow;
    }

    async delete() {
        await DB.deleteOne(this.data.id);
        this.element.remove();
        this.onDelete?.(this.data.id);
    }
}
