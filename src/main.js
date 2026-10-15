import './style.css'
import DB from './components/monsterList/DB.js'
import MonsterAdd from './components/monsterAdd/MonsterAdd.js'
import MonstersList from './components/monsterList/MonstersList.js'

DB.setApiURL('https://6aba69405b549d818d6262fc.mockapi.io/')

const appElement = document.querySelector('#app')
//on  va chercher "#app" dans l'index.html
const app = {
    append({addElement, listElement}) {
        appElement.append(addElement, listElement)
    }
}
const monstersList = new MonstersList()
//crée un objet à partir de la classe MonstersList 
const monsterAdd = new MonsterAdd((monparam) => monstersList.add(monparam))
//crée un objet à partir de la classe MonsterAdd et donne à son constructeur une fonction anonyme
app.append({addElement: monsterAdd.element, listElement: monstersList.element})
/*ajoute les objets HTML de monster.add et monstersList dans l'index.html, ils sont lié* .element est une propriété contenant l'élément DOM correspondant 
sije change qq chose dasn monsterAdd.element ou monstersList.element, ça se reflétera automatiquement dans l'index.html */
