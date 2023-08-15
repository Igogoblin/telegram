import myD from "./ChatExport_2023-08-05/result.json" assert { type: "json" };
let alphabet = new Map();
let valMap = new Map();
let iMap = new Map();
let sansMap = new Map();
console.log(myD.messages[2].from);
let val = {
  name: "Валерия",
  messages: 0,
  sym: 0,
  allLiteral: valMap,
  miss: 2,
  ath: 0,
};
let ih = {
  name: "Ihar",
  messages: 0,
  sym: 0,
  allLiteral: iMap,
  miss: 2,
  ath: 0,
};
let sans = {
  name: "Сансара",
  messages: 0,
  sym: 0,
  allLiteral: sansMap,
  miss: 2,
  ath: 0,
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
      if (myD.messages[i].text.length > 0) {
        if (typeof myD.messages[i].text == "object") {
          if (!myD.messages[i].text[0].text) {
            countLiteral(myD.messages[i].text[1], val.allLiteral);
          }
        } else {
          countLiteral(myD.messages[i].text, val.allLiteral);
        }
      }
      break;
    case ih.name:
      ih.messages++;
      ih.sym += myD.messages[i].text.length;
      if (myD.messages[i].text.length > 0) {
        if (typeof myD.messages[i].text == "object") {
          if (!myD.messages[i].text[0].text) {
            countLiteral(myD.messages[i].text[1], ih.allLiteral);
          }
        } else {
          countLiteral(myD.messages[i].text, ih.allLiteral);
        }
      }
      break;
    case sans.name:
      sans.messages++;
      sans.sym += myD.messages[i].text.length;
      if (myD.messages[i].text.length > 0) {
        if (typeof myD.messages[i].text == "object") {
          if (!myD.messages[i].text[0].text) {
            countLiteral(myD.messages[i].text[1], sans.allLiteral);
          }
        } else {
          countLiteral(myD.messages[i].text, sans.allLiteral);
        }
      }
      break;
  }
  all.messages++;
  all.sym += myD.messages[i].text.length;
  if (myD.messages[i].text.length > 0) {
    if (typeof myD.messages[i].text == "object") {
      if (!myD.messages[i].text[0].text) {
        countLiteral(myD.messages[i].text[1], alphabet);
      }
    } else {
      countLiteral(myD.messages[i].text, alphabet);
    }
  }

  if (myD.messages[i].from == "Ihar") {
    if (ih.ath > ih.miss) {
      ih.miss = ih.ath;
    }
    ih.ath = 0;
    val.ath++;
    sans.ath++;
  }
  if (myD.messages[i].from == "Валерия") {
    if (val.ath > val.miss) {
      val.miss = val.ath;
    }
    val.ath = 0;
    ih.ath++;
    sans.ath++;
  }
  if (myD.messages[i].from == "Сансара") {
    if (sans.ath > sans.miss) {
      sans.miss = sans.ath;
    }
    sans.ath = 0;
    val.ath++;
    ih.ath++;
  }
}
let s = myD.messages[2].text;
let sMap = new Map();
function countLiteral(s, myMap) {
  // console.log(s);
  // const isReg = /^[A-ZА-ЯЁ]+$/i;
  for (let j = 0; j < s.length; j++) {
    let our = s[j].toLowerCase();
    if (!myMap.has(our)) {
      myMap.set(our, 1);
      continue;
    } else if (myMap.has(our)) {
      myMap.set(our, +myMap.get(our) + 1);
      continue;
    }
  }
  return myMap;
}
console.log(countLiteral(s, sMap));
const persons = document.querySelector(".persons");
const table = document.querySelector(".table");
const lastDate = document.querySelector(".lastDate");
console.log(myD.messages[myD.messages.length - 1].date);
lastDate.textContent = myD.messages[myD.messages.length - 1].date;

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
const btn = document.querySelector(".btn");
const img = document.querySelector(".img");

const retro = document.querySelector(".retro");

// можно посчитать самую распространенную букву = V
// можно посчитать самое распространенное слово
// отсутствие в сообщениях

// btn.addEventListener("click", () => {
//   // img.classList.remove("non");
//   console.log(alphabet);
//   console.log(val.allLiteral);
//   console.log("ihar ,", ih.allLiteral);
//   console.log("sans ,", sans.allLiteral);
//   console.log(findLiteral(ih.allLiteral));
// });

function findLiteral(m) {
  let arr = [];
  for (let elem of m) {
    if (elem >= "a" && elem <= "я") {
      arr.push(elem);
    }
  }
  let a = arr[0][1];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][1] > a) {
      a = arr[i];
    }
  }
  return a;
}
let retr = `<tr><td></td><td>любимая буква</td><td>отсутствие сообщений</td></tr>`;
let retr1 = `<tr><td>${val.name}</td><td>${findLiteral(val.allLiteral)[0]}</td>
<td>${val.miss}</td></tr>`;
let retr2 = `<tr><td>${ih.name}</td><td>${findLiteral(ih.allLiteral)[0]}</td>
<td>${ih.miss}</td></tr>`;
let retr3 = `<tr><td>${sans.name}</td><td>${
  findLiteral(sans.allLiteral)[0]
}</td><td>${sans.miss}</td>
</tr>`;
retro.innerHTML = retr + retr1 + retr2 + retr3;
