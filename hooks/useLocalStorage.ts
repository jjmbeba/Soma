export const useLocalStorage = () => {
    const getLocalStorage = (key: string) => {
        if (typeof window !== 'undefined') {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        }
        return null;
    };

    const setLocalStorage = (key: string, value: any) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(value));
        }
    };

    return { getLocalStorage, setLocalStorage };
};

