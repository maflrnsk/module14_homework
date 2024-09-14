const jsonString = `
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}`

const data = JSON.parse(jsonString);
const list = data.list;

const personArr = []
for (const person of list){
    const personObj = {
        name: person.name,
        age: parseInt(person.age),
        prof: person.prof
    }
    personArr.push(personObj);
}

const result = {
    list: personArr
}
console.log(result);