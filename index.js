import dotenv from 'dotenv';

dotenv.config();

const {NAME, SURNAME, GROUP, LIST_NUMBER} = process.env;

console.log(`Имя: ${NAME}`);
console.log(`Фамилия: ${SURNAME}`);
console.log(`Группа: ${GROUP}`);
console.log(`Номер в списке: ${LIST_NUMBER}`);