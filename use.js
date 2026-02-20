import { fetchData } from './fetchModule.js';
import { sortIgnoringSpaces } from './sortModule.js';
import { createFolder, writeToFile } from './fsUtils.js';


async function main() {
    console.log('Загрузка пользователей с JSONPlaceholder');
    const result = await fetchData('https://jsonplaceholder.typicode.com/users');
    
    if (result.error) {
        console.error('Не удалось загрузить данные. Завершение.');
        return;
    }
    
    const users = result.data;
    console.log(`Загружено пользователей: ${users.length}\n`);
    
    console.log('Сортировка пользователей по именам');

    const names = users.map(user => user.name);
    console.log('Имена до сортировки:', names);
    
    const sortedNames = sortIgnoringSpaces(names);
    console.log('Имена после сортировки:', sortedNames);

    createFolder('users', true);

    const namesText = sortedNames.join('\n');
    const emailsText = users.map(user => user.email).join('\n');

    setTimeout(() => {
        writeToFile('users/names.txt', namesText, true);
        writeToFile('users/emails.txt', emailsText, true);
    }, 500);
}
main();