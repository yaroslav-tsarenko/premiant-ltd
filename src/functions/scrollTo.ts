export const scrollPage = (direction: 'top' | 'bottom') => {
    if (direction === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (direction === 'bottom') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
};