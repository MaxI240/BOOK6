document.addEventListener('DOMContentLoaded', () => {
    const book = document.querySelector('.book');
    const pages = document.querySelectorAll('.page');
    let currentPage = 0;
    
    // Initialize page positions
    pages.forEach((page, index) => {
        page.style.transform = `rotateY(${index === 0 ? 0 : -180}deg)`;
        page.style.zIndex = pages.length - index;
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && currentPage < pages.length - 1) {
            currentPage++;
            flipPage(currentPage);
        } else if (e.key === 'ArrowLeft' && currentPage > 0) {
            currentPage--;
            flipPage(currentPage);
        }
    });

    function flipPage(pageIndex) {
        pages.forEach((page, index) => {
            const angle = index <= pageIndex ? 0 : -180;
            page.style.transform = `rotateY(${angle}deg)`;
            page.style.zIndex = pages.length - Math.abs(pageIndex - index);
        });
    }
});
