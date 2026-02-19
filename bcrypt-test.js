import bcrypt from 'bcryptjs';

async function testBcryptSpeed() {
    const passwords = [];
    
    for (let i = 1; i <= 13; i++) {
        passwords.push(`password${i}`);
    }
    
    const times = [];
    
    for (let i = 0; i < passwords.length; i++) {
        const start = Date.now();
        
        const hash = await bcrypt.hash(passwords[i], 10);
        
        const end = Date.now();
        const time = end - start;
        times.push(time);
        
        console.log(`Пароль ${i+1}: ${time}мс`);
        console.log(`Хеш: ${hash.substring(0, 30)}...\n`);
    }
    
    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    const min = Math.min(...times);
    const max = Math.max(...times);
    
    console.log(`Среднее: ${avg.toFixed(2)}мс`);
    console.log(`Минимальное: ${min}мс`);
    console.log(`Максимальное: ${max}мс`);
    console.log('ВЫВОД: Bcrypt специально замедлен, чтобы усложнить подбор паролей (атака перебором). Разброс времени связан с генерацией соли и случайными факторами в алгоритме.');
}

testBcryptSpeed();