import template from "./template.js";
import DB from "./DB.js";
import Monster from "../monster/Monster.js";

export default class MonstersList {
    constructor() {
        // initialise la liste des monstres et crée l'élément DOM pour la liste, puis charge les monstres depuis la base de données
        this.monsters = [];
        this.element = this.createElement();
        this.tbody = this.element.querySelector(".monster-list");
        this.countEl = this.element.querySelector(".monster-count");
        this.load();
    }

    createElement() {
        // crée un élément <section> pour contenir la liste des monstres, lui applique des classes CSS et y injecte le HTML du template. Retourne l'élément créé.
        const section = document.createElement("section");
        section.className = "deco-frame md:w-2/3 p-6 bg-[var(--murk)]/40";
        section.innerHTML = template();
        return section;
    }

    async load() {
        // charge tous les monstres depuis la base de données et les ajoute à la liste
        const monsters = await DB.findAll();
        this.monsters = monsters.map((data) => this.createMonster(data));
        this.updateCount();
    }

    createMonster(data) {
        //data reçoit la réponse de l'API
        const monster = new Monster(data, this);
        //this est l'objet MonstersList
        //ajoute l'élément DOM du monstre à la liste dans le tbody
        this.tbody.append(monster.render());
        return monster;
    }

    add(data) {
        //data prends la réponse de l'api
        this.monsters.push(this.createMonster(data));
        //donne la réponse de l'api à createMonster qui crée un objet monstre à partir de celle-ci
        //puis il stocke l'objet dans la liste monsters
        this.updateCount();
    
    }

    deleteOneById(id) {
        //supprime le monstre correspondant à l'id fourni de la liste this.monsters et met à jour le compteur
        this.monsters = this.monsters.filter((monster) => monster.id !== id);
        //supprime également l'élément DOM du monstre correspondant
        this.updateCount();
    }

    updateCount() {
        this.countEl.textContent = this.monsters.length;
    }
}
