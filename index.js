import myD from "./ChatExport_2023-08-05/result.json" assert { type: "json" };

console.log(myD.messages[2]);
let val = {
  name: "Валерия",
  messages: 0,
  sym: 0,
};
let ih = {
  name: "Ihar",
  messages: 0,
  sym: 0,
};
let sans = {
  name: "Сансара",
  messages: 0,
  sym: 0,
};
let all = {
  name: "all",
  messages: 0,
  sym: 0,
};
for (let i = 0; i < myD.messages.length; i++) {
  switch (myD.messages[i].from) {
    case val.name:
      val.messages++;
      val.sym += myD.messages[i].text.length;
      break;
    case ih.name:
      ih.messages++;
      ih.sym += myD.messages[i].text.length;
      break;
    case sans.name:
      sans.messages++;
      sans.sym += myD.messages[i].text.length;
      break;
  }
  all.messages++;
  all.sym += myD.messages[i].text.length;
}

const persons = document.querySelector(".persons");
const table = document.querySelector(".table");
// persons.innerHTML = `
// ${val.name} количество сообщений ${val.messages} количество символов ${val.sym} <br>
// ${ih.name} количество сообщений ${ih.messages} количество символов ${ih.sym} <br>
// ${sans.name} количество сообщений ${sans.messages} количество символов ${sans.sym} <br>
// ${all.name} количество сообщений ${all.messages} количество символов ${all.sym} <br>`;
let text = `<tr><td></td><td>сообщений</td><td>% сообщений</td><td>символов</td><td>% символов</td></tr>`;
let text1 = `<tr><td>${val.name} </td><td>${val.messages}</td><td>${(
  100 /
  (all.messages / val.messages)
).toFixed(2)} %</td><td>${val.sym}</td><td>${(
  100 /
  (all.sym / val.sym)
).toFixed(2)} %</td></tr>`;
let text2 = `<tr><td>${ih.name} </td><td>${ih.messages}</td><td>${(
  100 /
  (all.messages / ih.messages)
).toFixed(2)} %</td><td>${ih.sym}</td><td>${(100 / (all.sym / ih.sym)).toFixed(
  2
)} %</td></tr>`;
let text3 = `<tr><td>${sans.name} </td><td>${sans.messages}</td><td>${(
  100 /
  (all.messages / sans.messages)
).toFixed(2)} %</td><td>${sans.sym}</td><td>${(
  100 /
  (all.sym / sans.sym)
).toFixed(2)} %</td></tr>`;
let text4 = `<tr><td>итого </td><td>${all.messages}</td><td></td><td>${all.sym}</td><td></td></tr>`;
table.innerHTML = text + text1 + text2 + text3 + text4;
