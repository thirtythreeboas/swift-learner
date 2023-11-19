/* eslint-disable */
import {readFileSync, writeFileSync} from 'fs';

// const inputFile = 'src/mock/db.json';
const inputFile = 'src/mock/db_copy.json';
const outputFile = 'src/mock/db_new.json';

const jsonData = JSON.parse(readFileSync(inputFile, 'utf8'));

const dbKeys = Object.keys(jsonData);
let id = 133221;

// dbKeys.forEach((keyName) => {
//   jsonData[keyName].forEach(e => {
//     e.id = id;
//     id++;
//   });
// });

dbKeys.forEach((keyName) => {
  jsonData[keyName].id = id;
  id++;
});

writeFileSync(outputFile, JSON.stringify(jsonData, null, 2));
