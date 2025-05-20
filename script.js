document.addEventListener('DOMContentLoaded', function() {
    const flipbook = document.querySelector('.flipbook');
    const pages = document.querySelectorAll('.page');
    let currentPage = 0;

    pages.forEach((page, index) => {
        page.style.zIndex = pages.length - index;
        page.style.transformOrigin = 'left center';
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && currentPage < pages.length - 1) {
            flipPage('next');
            currentPage++;
        } else if (e.key === 'ArrowLeft' && currentPage > 0) {
            flipPage('prev');
            currentPage--;
        }
    });

    function flipPage(direction) {
        const angle = direction === 'next' ? -180 : 0;
        pages[currentPage].style.transform = `rotateY(${angle}deg)`;
    }
});
