/* eslint-disable */
import {readFileSync, writeFileSync} from 'fs';

const inputFile = 'src/mock/words.json';
const outputFile = 'src/mock/db_new.json';

const jsonData = JSON.parse(readFileSync(inputFile, 'utf8'));

const dbKeys = Object.keys(jsonData);
let id = 463;

const eng = [
  "mostly cloudy",
  "climate type",
  "mostly clear",
  "mostly sunny",
  "scorching heat",
  "no cloud",
  "high temperature",
  "snow cover",
  "black ice",
  "low temperature",
  "gale-force",
  "snowdrift snowbank",
  "subarctic",
  "subantarctic"
];

const rus = [
  "облачно, с прояснениями",
  "тип климата",
  "в основном ясно",
  "в основном солнечно",
  "палящий зной, пекло",
  "ни облачка",
  "высокая температура",
  "снежный покров",
  "аледь, гололед",
  "низкая температура", 
  "шквальный, штормовой",
  "сугроб, снежный занос",
  "субарктический",
  "субантарктический"
  ];

// console.log(eng.length, rus.length);
// console.log(jsonData.europeanCountries.words);
// dbKeys.forEach((keyName) => {
//   jsonData[keyName].forEach(e => {
//     e.id = id;
//     id++;
//   });
// });

for (let i = 0; i < eng.length; i++) {
  jsonData.weather.words.push({
    eng: [eng[i]],
    rus: [rus[i]],
    id: id,
  });
  id++;
}

// dbKeys.forEach((keyName) => {
//   jsonData[keyName].id = id;
//   id++;
// });

writeFileSync(outputFile, JSON.stringify(jsonData, null, 2));
