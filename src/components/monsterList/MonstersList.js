import template from "./template.js";
import DB from "./DB.js";
import Monster from "../monster/Monster.js";

export default class MonstersList {
    constructor() {
        this.monsters = [];
        this.element = this.createElement();
        this.tbody = this.element.querySelector(".monster-list");
        this.countEl = this.element.querySelector(".monster-count");
        this.load();
    }

    createElement() {
        const section = document.createElement("section");
        section.className = "deco-frame md:w-2/3 p-6 bg-[var(--murk)]/40";
        section.innerHTML = template();
        return section;
    }

    async load() {
        const monsters = await DB.findAll();
        this.monsters = monsters.map((data) => this.createMonster(data));
        this.updateCount();
    }

    createMonster(data) {
        const monster = new Monster(data, (id) => this.remove(id));
        this.tbody.append(monster.element);
        return monster;
    }

    add(data) {
        this.monsters.push(this.createMonster(data));
        this.updateCount();
    }

    remove(id) {
        this.monsters = this.monsters.filter((monster) => monster.data.id !== id);
        this.updateCount();
    }

    updateCount() {
        this.countEl.textContent = this.monsters.length;
    }
}
