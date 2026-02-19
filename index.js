import dotenv from 'dotenv';

dotenv.config();

const {NAME, SURNAME, GROUP, LIST_NUMBER} = process.env;

console.log(`Имя: ${NAME}`);
console.log(`Фамилия: ${SURNAME}`);
console.log(`Группа: ${GROUP}`);
console.log(`Номер в списке: ${LIST_NUMBER}`);

console.log(`\n`);

import { getSystemInfo, isMemoryMoreThan4GB, getSystemInfoSecure } from './os/index.js';

getSystemInfo();

isMemoryMoreThan4GB();

getSystemInfoSecure();

console.log(`\n`);

import { 
    writeToFile, 
    readFromFile, 
    cleanFile,
    createFolder,
    listAllFiles
} from './fsUtils.js';

createFolder('test-files', true);

setTimeout(() => {
    writeToFile('test-files/noisy.txt', 'Привет123вфыв213выф 123 ыыыыы!!! 456 ABCdef', true);
}, 100);

setTimeout(() => {
    readFromFile('test-files/noisy.txt', true);
}, 1000);

setTimeout(() => {
    cleanFile('test-files/noisy.txt');
}, 2000);

setTimeout(() => {
    listAllFiles();
}, 3000);

import { showMode } from './mode-test.js';
showMode();