import os from 'os';

export function getSystemInfo() {

    console.log(`Платформа: ${os.platform()}`);

    const freeMemoryGB = os.freemem() / 1024 / 1024 / 1024;
    console.log(`Свободная память: ${freeMemoryGB.toFixed(2)} GB`);
    
    console.log(`Домашняя директория: ${os.homedir()}`);
    
    console.log(`Имя ПК: ${os.hostname()}`);

    console.log('Сетевые интерфейсы:');
    const networkInterfaces = os.networkInterfaces();

    for (const [name, interfaces] of Object.entries(networkInterfaces)) {
        interfaces.forEach(iface => {
            if (iface.family === 'IPv4') {
                console.log(`  → ${name}: ${iface.address}`);
            }
        });
    }
}

export function isMemoryMoreThan4GB() {
    const freeMemoryGB = os.freemem() / 1024 / 1024 / 1024;
    const result = freeMemoryGB > 4;
    
    console.log(`Свободно: ${freeMemoryGB.toFixed(2)} GB`);
    console.log(`Памяти больше 4 ГБ? ${result ? 'ДА' : 'НЕТ'}`);
    
    return result;
}

export function getSystemInfoSecure() {
    import('dotenv').then(dotenv => {
        dotenv.config();
        
        const mode = process.env.MODE;
        
        if (mode === 'admin') {
            getSystemInfo();
        } else {
            console.log('Доступ запрещен');
        }
    });
}