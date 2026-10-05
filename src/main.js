import './style.css'
import DB from './components/monsterList/DB.js'
import MonsterAdd from './components/monsterAdd/MonsterAdd.js'
import MonstersList from './components/monsterList/MonstersList.js'

DB.setApiURL('https://6aba69405b549d818d6262fc.mockapi.io/')

const app = document.querySelector('#app')
//on  va chercher "#app" dans l'index.html
const monstersList = new MonstersList()
//crée un objet à partir de la classe MonstersList
const monsterAdd = new MonsterAdd((monster) => monstersList.add(monster))
//crée un objet à partir de la classe MonsterAdd et donne à son constructeur une fonction anonyme
app.append(monsterAdd.element, monstersList.element)
/*ajoute les objets HTML de monster.add et monstersList dans l'index.html, ils sont lié*/