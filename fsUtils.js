import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function writeToFile(filePath, data, async = true) {
    const fullPath = path.join(__dirname, filePath);
    
    if (async) {
        fs.writeFile(fullPath, data, 'utf8', (err) => {
            if (err) {
                console.error(`Ошибка записи в ${filePath}:`, err.message);
            } else {
                console.log(`Файл ${filePath} успешно записан (асинхронно)`);
            }
        });
    } else {
        try {
            fs.writeFileSync(fullPath, data, 'utf8');
            console.log(`Файл ${filePath} успешно записан (синхронно)`);
        } catch (err) {
            console.error(`Ошибка записи в ${filePath}:`, err.message);
        }
    }
}

export function readFromFile(filePath, async = true) {
    const fullPath = path.join(__dirname, filePath);
    
    if (async) {
        fs.readFile(fullPath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Ошибка чтения ${filePath}:`, err.message);
            } else {
                console.log(`Содержимое ${filePath}:`);
                console.log(data);
            }
        });
    } else {
        try {
            const data = fs.readFileSync(fullPath, 'utf8');
            console.log(`Содержимое ${filePath}:`);
            console.log(data);
        } catch (err) {
            console.error(`Ошибка чтения ${filePath}:`, err.message);
        }
    }
}

export function updateFile(filePath, newData) {
    writeToFile(filePath, newData);
}

export function deleteFile(filePath, async = true) {
    const fullPath = path.join(__dirname, filePath);
    
    if (async) {
        fs.unlink(fullPath, (err) => {
            if (err) {
                console.error(`Ошибка удаления ${filePath}:`, err.message);
            } else {
                console.log(`Файл ${filePath} удален`);
            }
        });
    } else {
        try {
            fs.unlinkSync(fullPath);
            console.log(`Файл ${filePath} удален`);
        } catch (err) {
            console.error(`Ошибка удаления ${filePath}:`, err.message);
        }
    }
}

export function cleanFile(filePath) {
    const fullPath = path.join(__dirname, filePath);
    
    fs.readFile(fullPath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Ошибка чтения:`, err.message);
            return;
        }
        
        let cleaned = data.replace(/[0-9]/g, '');
        
        cleaned = cleaned.toLowerCase();
        
        fs.writeFile(fullPath, cleaned, 'utf8', (err) => {
            if (err) {
                console.error(`Ошибка записи:`, err.message);
            } else {
                console.log(`Файл ${filePath} очищен от шума`);
            }
        });
    });
}

export function copyFile(sourcePath, destPath) {
    const fullSourcePath = path.join(__dirname, sourcePath);
    const fullDestPath = path.join(__dirname, destPath);
    
    fs.copyFile(fullSourcePath, fullDestPath, (err) => {
        if (err) {
            console.error(`Ошибка копирования:`, err.message);
        } else {
            console.log(`Файл ${sourcePath} скопирован в ${destPath}`);
        }
    });
}

export function createFolder(folderPath, async = true) {
    const fullPath = path.join(__dirname, folderPath);
    
    if (async) {
        fs.mkdir(fullPath, { recursive: true }, (err) => {
            if (err) {
                console.error(`Ошибка создания папки:`, err.message);
            } else {
                console.log(`Папка ${folderPath} создана`);
            }
        });
    } else {
        try {
            fs.mkdirSync(fullPath, { recursive: true });
            console.log(`Папка ${folderPath} создана`);
        } catch (err) {
            console.error(`Ошибка создания папки:`, err.message);
        }
    }
}

export function deleteFolder(folderPath, async = true) {
    const fullPath = path.join(__dirname, folderPath);
    
    if (async) {
        fs.rm(fullPath, { recursive: true, force: true }, (err) => {
            if (err) {
                console.error(`Ошибка удаления папки:`, err.message);
            } else {
                console.log(`Папка ${folderPath} удалена`);
            }
        });
    } else {
        try {
            fs.rmSync(fullPath, { recursive: true, force: true });
            console.log(`Папка ${folderPath} удалена`);
        } catch (err) {
            console.error(`Ошибка удаления папки:`, err.message);
        }
    }
}

function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (file === 'node_modules' || file === '.git' || file.startsWith('.env')) {
            return;
        }
        
        if (stat.isDirectory()) {
            getAllFiles(fullPath, fileList);
        } else {
            fileList.push(fullPath);
        }
    });
    
    return fileList;
}

export function listAllFiles() {
    console.log('Все файлы проекта (кроме служебных):');
    const files = getAllFiles(__dirname);
    files.forEach(file => {
        console.log(`  ${file.replace(__dirname, '')}`);
    });
    console.log(`Всего файлов: ${files.length}`);
}

/**
 * Удаление всех файлов и папок, кроме служебных
 */
export function cleanProject() {
    const files = fs.readdirSync(__dirname);
    
    files.forEach(file => {
        const fullPath = path.join(__dirname, file);
        const stat = fs.statSync(fullPath);
    
        const excludeList = [
            'node_modules',
            '.git',
            '.env',
            '.env.example',
            '.gitignore',
            'package.json',
            'package-lock.json'
        ];
        
        if (excludeList.includes(file)) {
            console.log(`Пропускаем: ${file}`);
            return;
        }
        
        if (stat.isDirectory()) {
            fs.rmSync(fullPath, { recursive: true, force: true });
            console.log(`Удалена папка: ${file}`);
        } else {
            fs.unlinkSync(fullPath);
            console.log(`Удален файл: ${file}`);
        }
    });
}