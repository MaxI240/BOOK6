let currentPage = 0;
const pages = document.querySelectorAll('.page');

function flipPage(element, pageNumber) {
    if (pageNumber === currentPage + 1) {
        element.style.transform = 'rotateY(-180deg)';
        element.style.zIndex = 100 - pageNumber;
        currentPage++;
    } else if (pageNumber === currentPage - 1) {
        element.style.transform = 'rotateY(0deg)';
        element.style.zIndex = 100 + pageNumber;
        currentPage--;
    }
}

// Initialize pages
pages.forEach((page, index) => {
    page.style.zIndex = 100 - index;
    if (index > 0) {
        page.style.transform = 'rotateY(-180deg)';
    }
});
