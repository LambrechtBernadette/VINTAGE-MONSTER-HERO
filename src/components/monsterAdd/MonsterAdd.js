import template from "./template.js";
import DB from "../monsterList/DB.js";

export default class MonsterAdd {
    constructor(onCreate) {
        this.onCreate = onCreate;
        this.element = this.createElement();
        this.bindEvents();
    }

    createElement() {
        const aside = document.createElement("aside");
        aside.className = "deco-frame md:w-1/3 p-6 bg-[var(--murk)]/60 self-start";
        aside.innerHTML = template();
        return aside;
    }

    bindEvents() {
        this.element.querySelector(".btn-submit").addEventListener("click", (e) => {
            e.preventDefault();
            this.submit();
        });
    }

    async submit() {
        const monster = {
            name: this.element.querySelector(".input-name").value,
            type: this.element.querySelector(".input-type").value,
            dangerLevel: Number(this.element.querySelector(".input-danger").value),
            year: Number(this.element.querySelector(".input-year").value),
        };
        const created = await DB.create(monster);
        this.onCreate?.(created);
        this.reset();
    }

    reset() {
        this.element.querySelector(".input-name").value = "";
        this.element.querySelector(".input-danger").value = "";
        this.element.querySelector(".input-year").value = "";
    }
}
