import getTemplate from "./template.js";
import DB from "../monsterList/DB.js";

export default class Monster {
   
    constructor(data, monstersList) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.dangerLevel = data.dangerLevel;
        this.year = data.year;
        this.monstersList = monstersList;
        this.domElt = null;
    }

    render() {
        /* crée un élément template temporaire pour fabriquer du HTML avant de l'insérer ailleurs.*/
        const template = document.createElement("template");
        /*appelle la fonction template() importée depuis template.js, en lui passant this (l'instance du monstre, avec id, name, type, etc.). Cette fonction retourne une  <tr> avec toutes les infos du monstre, qui est injectée dans le <template>.*/
        template.innerHTML = getTemplate(this);
        // injecte le HTML dans le template temporaire
        this.domElt = template.content.firstElementChild;
        // récupère le premier élément enfant du contenu du template, qui est le <tr> représentant le monstre
        this.initEvents();
        // prépare des add event listener sur tous les boutons
        return this.domElt;
    }

    startEditing() {
        // ajoute la classe isEditing pour permettre la modification des champs du monstre
        this.domElt.classList.add("isEditing");
    }

    async save() {
        // lit les valeurs saisies dans les champs du formulaire et les met à jour dans l'objet Monster, puis met à jour l'affichage correspondant
        this.name = this.domElt.querySelector(".input-name").value;
        this.type = this.domElt.querySelector(".input-type").value;
        this.dangerLevel = Number(this.domElt.querySelector(".input-danger").value);
        // lit la valeur saisie dans le champ de l'année et la convertit en nombre
        this.year = Number(this.domElt.querySelector(".input-year").value);
        this.domElt.querySelector(".display-name").textContent = this.name;
        this.domElt.querySelector(".display-type").textContent = this.type;
        const dangerSpan = this.domElt.querySelector(".display-danger");
        // met à jour l'affichage du niveau de danger avec des icônes ☠️ et un titre correspondant
        dangerSpan.textContent = "☠️".repeat(this.dangerLevel);
        // met à jour le text content de l'élément affichant le niveau de danger
        dangerSpan.title = `Danger level ${this.dangerLevel}`;
        //un template literal qui insère la valeur numérique de this.dangerLevel (ex. 3) dans la chaîne, donnant par exemple "Danger level 3".
        this.domElt.querySelector(".display-year").textContent = this.year;
        // met à jour l'affichage de l'année du monstre
        this.domElt.classList.remove("isEditing");
        // retire la classe isEditing pour revenir à l'affichage normal

        return await DB.updateOne({
            // n'envoie que les champs du monstre à mettre à jour dans la base de données
            id: this.id,
            name: this.name,
            type: this.type,
            dangerLevel: this.dangerLevel,
            year: this.year,
        });
    }

    async delete() {
        // supprime le monstre de la base de données, retire son élément du DOM et le supprime de la liste des monstres
        await DB.deleteOne(this.id);
        this.domElt.remove();
        this.monstersList.deleteOneById(this.id);
    }

    initEvents() {
        // initialise les événements pour les boutons d'édition, de sauvegarde et de suppression
        this.domElt.querySelector(".btn-edit").addEventListener("click", () => {
            this.startEditing();
        });

        this.domElt.querySelector(".btn-check").addEventListener("click", () => {
            this.save();
        });

        this.domElt.querySelector(".btn-delete").addEventListener("click", () => {
            this.delete();
        });
    }
}
