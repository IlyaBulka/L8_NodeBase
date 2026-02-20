
export async function fetchData(url) {
    const result = {
        data: [],
        isLoading: true,
        error: null
    };
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP ошибка: ${response.status}`);
        }
        
        const data = await response.json();
        
        result.data = data;
        result.isLoading = false;
        
        console.log('Загрузка завершена');
        
    } catch (error) {
        result.error = error;
        result.isLoading = false;
        console.log('Ошибка загрузки:', error.message);
    }
    
    return result;
}