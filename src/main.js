import './style.css'
import DB from './components/monsterList/DB.js'
import MonsterAdd from './components/monsterAdd/MonsterAdd.js'
import MonstersList from './components/monsterList/MonstersList.js'

DB.setApiURL('https://6aba69405b549d818d6262fc.mockapi.io/')

const app = document.querySelector('#app')

const monstersList = new MonstersList()
const monsterAdd = new MonsterAdd((monster) => monstersList.add(monster))

app.append(monsterAdd.element, monstersList.element)

