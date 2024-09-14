const parser = new DOMParser();
const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`
const xmlDOM = parser.parseFromString(xmlString, "text/xml");
const studentNodes = xmlDOM.querySelectorAll("student");

const studentsArr = [];
studentNodes.forEach(student =>{
    const nameNode = student.querySelector("name");
    const age = student.querySelector("age").textContent;
    const prof = student.querySelector("prof").textContent;
    
    const firstName = nameNode.querySelector("first").textContent;
    const secondName = nameNode.querySelector("second").textContent;
    const lang = nameNode.getAttribute("lang");

    const studentObj = {
        name: `${firstName} ${secondName}`,
        age: parseInt(age),
        prof: prof,
        lang: lang
    }
    studentsArr.push(studentObj);
})

const result = {
    list: studentsArr
}

console.log(result);