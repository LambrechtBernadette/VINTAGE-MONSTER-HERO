import template from "./template.js";
import DB from "../monsterList/DB.js";

export default class MonsterAdd {
 
    constructor(onCreate) {
        //s'exécute automatiquement quand on écrit new monsterAdd
        this.mafonctionAnonyme = onCreate;
        //stocke la fonction anonyme pour ne pas quelle disparaisse.
        this.element = this.createElement();
        //crée l'objet HTML qui va être inclu dans la page index.html
        this.bindEvents();
        //crée un événement sur le bouton dans l'objet HTML.
    }

    createElement() {
        const aside = document.createElement("aside");
        // crée l'objet HTML de balise <aside> 
        aside.className = "deco-frame md:w-1/3 p-6 bg-[var(--murk)]/60 self-start";
        // lui donne du CSS
        aside.innerHTML = template();
        // met dans l'objet HTML une string de code HTML venant de template.js
        return aside;
        //stocke l'objet dans this.element
    }

    bindEvents() {
        this.element.querySelector(".btn-submit").addEventListener("click", (e) => {
            //sélectionne le bouton dans l'objet HTML stocké dans this.element et lui attache un événement click
            e.preventDefault();
            //empêche le comportement par défaut du formulaire (rechargement de la page)
            this.submit();
            //attache ma méthode submit au bouton
        });
    }

    async submit() {
        const monster = {
            name: this.element.querySelector(".input-name").value,
            type: this.element.querySelector(".input-type").value,
            dangerLevel: Number(this.element.querySelector(".input-danger").value),
            year: Number(this.element.querySelector(".input-year").value),
        };
        //crée un objet littéral (créé sans classe) contenant les infos du monstre.
        const created = await DB.create(monster);
        // on envoie à l'api les données de monster et on stocke la réponse de l'api dans created.
        this.mafonctionAnonyme?.(created);
        // (monster) => monstersList.add(monster) ← éxécute la fonction anonmyme et lui donne created en entrée, dans "monster" 
        this.reset();
        //appelle la méthode reset() pour vider les champs du formulaire
    }

    reset() {
        this.element.querySelector(".input-name").value = "";
        this.element.querySelector(".input-danger").value = "";
        this.element.querySelector(".input-year").value = "";
    }
}
