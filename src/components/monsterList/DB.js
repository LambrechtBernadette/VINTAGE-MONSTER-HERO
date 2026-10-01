export default class DB {

static setApiURL(data){
    this.apiURL = data;
}


    static async findAll(){
        const response = await fetch(this.apiURL + "monsters");
        return response.json();
        
        //retourne un tableau indexé d'objets litéraux que je transforme en objets monsters
    }

        // Crée un nouveau monstre dans la base de données

    static async create(monster){
        const response = await fetch(this.apiURL + "monsters", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(monster),
        });
        return response.json();
    }

    // Met à jour un monstre existant dans la base de données
    static async updateOne(monster){
        const response = await fetch(this.apiURL + "monsters/" + monster.id, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(monster),
        });
        return response.json();
    }

    // Supprime un monstre existant dans la base de données
    static async deleteOne(id){
        const response = await fetch(this.apiURL + "monsters/" + id, {
            method: "DELETE"
        });
        return response.json();
    }
}
