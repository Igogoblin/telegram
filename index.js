import myD from "./ChatExport_2023-08-05/result.json" assert { type: "json" };
//import t1 from "./userInfo/script";
let alphabet = new Map();
let valMap = new Map();
let iMap = new Map();
let sansMap = new Map();
let vWordsMap = new Map();
let iWordsMap = new Map();
let sWordsMap = new Map();
console.log(myD.messages[2].from);
let val = {
  name: "Валерия",
  messages: 0,
  sym: 0,
  allLiteral: valMap,
  miss: 2,
  ath: 0,
  reply: 0,
  allWords: vWordsMap,
};
let ih = {
  name: "Ihar",
  messages: 0,
  sym: 0,
  allLiteral: iMap,
  miss: 2,
  ath: 0,
  reply: 0,
  allWords: iWordsMap,
};
let sans = {
  name: "Сансара",
  messages: 0,
  sym: 0,
  allLiteral: sansMap,
  miss: 2,
  ath: 0,
  reply: 0,
  allWords: sWordsMap,
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
        favoriteWord(myD.messages[i].text, val.allWords);
      }
      //favoriteWord(myD.messages[i].text, val.allWords);
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
        favoriteWord(myD.messages[i].text, ih.allWords);
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
        favoriteWord(myD.messages[i].text, sans.allWords);
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
  // start find words -----------------------------------------------------

  // finish find words -------------------------------------------------------
  // here is reply start for find leteral-----------------------------------
  if (myD.messages[i].reply_to_message_id) {
    if (myD.messages[myD.messages[i].reply_to_message_id - 63479]) {
      let chel = myD.messages[myD.messages[i].reply_to_message_id - 63479].from;
      if (ih.name == chel) {
        ih.reply++;
      } else if (val.name == chel) {
        val.reply++;
      } else if (sans.name == chel) {
        sans.reply++;
      }
    }
  }
  // here is reply finish ----------------------------------
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

// function by find words -----------------------------------------------------
let testWord = myD.messages[38].text;
function countWords(stroke, myMap) {}
console.log("find words ", countWords(testWord, iWordsMap));

const persons = document.querySelector(".persons");
const table = document.querySelector(".table");
const lastDate = document.querySelector(".lastDate");

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
// можно посчитать самое распространенное слово              [А-Яа-яЁё]+
// отсутствие в сообщениях                      = V
// find to ризда локаштилея
// чаще кому отвечают                           = V
// сделать календарь после нахождения местопол

let txt = "но вы же понимаете, что весь шарм в зависти других dasfg";
let reg = /(\w+)/g;
// let res = txt.match(/([А-Яа-яЁё]+)/g);
// console.log(res);
function favoriteWord(txt, hMap) {
  if (typeof txt == "object") {
    txt = toString(txt[1]);
  }
  let res = txt.match(/([А-Яа-яЁё]+)/g);
  if (res == null) return;

  for (let i = 0; i < res.length; i++) {
    let word = res[i].toLowerCase();
    if (word == "undefined") continue;
    if (!hMap.has(word)) {
      hMap.set(word, 1);
      continue;
    } else if (hMap.has(word)) {
      hMap.set(word, +hMap.get(word) + 1);
      continue;
    }
  }
  return hMap;
}
let test = new Map();
console.log(favoriteWord(txt, test));
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
  console.log(val.allWords);
  return a;
}
function findFavoriteWord(m, ch) {
  let arr = [...m];
  // console.log(m, arr);
  let arrWords = [];
  let a = arr[2][1];
  console.log("first number ", a);
  // arrWords.push(arr[0][0]);
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][1] > a && arr[i][0].length > 2) {
      console.log("this is more then a ", arr[i][0]);
      a = arr[i][1];
      arrWords.push(arr[i][0]);
    }
    if (arr[i][0] == "поэтому") {
      console.log("poetomu ", arr[i][1]);
    }
  }
  console.log("max word ", arrWords);
  if (ch == 1) {
    return a;
  }
  return arrWords[arrWords.length - 1];
}
let retr = `<tr><td></td><td>любимая буква</td><td class="non">любимое слово</td><td>отсутствие сообщений</td><td>сколько раз ответили</td></tr>`;
let retr1 = `<tr><td>${val.name}</td><td>${findLiteral(val.allLiteral)[0]}</td>
<td class="non">${findFavoriteWord(val.allWords)}-${findFavoriteWord(
  val.allWords,
  1
)}</td><td>${val.miss}</td><td>${val.reply}</td></tr>`;
let retr2 = `<tr><td>${ih.name}</td><td>${
  findLiteral(ih.allLiteral)[0]
}</td><td class="non">${findFavoriteWord(ih.allWords)}-${findFavoriteWord(
  ih.allWords,
  1
)}</td>
<td>${ih.miss}</td><td>${ih.reply}</td></tr>`;
let retr3 = `<tr><td>${sans.name}</td><td>${
  findLiteral(sans.allLiteral)[0]
}</td><td class="non">${findFavoriteWord(sans.allWords)}-${findFavoriteWord(
  sans.allWords,
  1
)}</td><td>${sans.miss}</td><td>${sans.reply}</td>
</tr>`;
retro.innerHTML = retr + retr1 + retr2 + retr3;

// ---------------------------------------------------------------------------------
class UserInfo {
  constructor() {
    this.timeOpened = new Date();
    this.timezone = new Date().getTimezoneOffset() / 60;
  }
  pageon() {
    // file location
    return window.location.pathname;
  }

  referrer() {
    return document.referrer;
  }
  previousSites() {
    return history.length;
  }
  browserInfo() {
    return navigator;
  }
  dataCookies() {
    return decodeURIComponent(document.cookie.split(";"));
  }
  dataStorage() {
    return localStorage;
  }
  sizeScreen() {
    return {
      width: screen.width,
      height: screen.height,
      clientWidth: document.body.clientWidth,
      clientHeight: document.body.clientHeight,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      screenAvailWidth: screen.availWidth,
      screenAvailHeight: screen.availHeight,
      colorDepth: screen.colorDepth,
      pixelDepth: screen.pixelDepth,
    };
  }
  async position() {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return {
      long: pos.coords.longitude,
      lat: pos.coords.latitude,
      accuracy: pos.coords.accuracy,
      altitude: pos.coords.altitude,
      heading: pos.coords.heading,
      speed: pos.coords.speed,
      timestamp: pos.timestamp,
    };
  }
}
let info = new UserInfo();

console.log("this is file script");
async function t1() {
  console.log(info.pageon());
  console.log(info.referrer());
  console.log(info.previousSites());
  console.log(info.browserInfo());
  console.log(info.dataCookies());
  console.log(info.dataStorage());
  console.log(info.sizeScreen());
  // console.log(info.position());
}
t1();

console.log("");
