document.querySelectorAll('.menu-expand').forEach(element => {
    element.addEventListener('click', function (e) {
        e.preventDefault();
        const mainSection = document.querySelector('.main-section');
        mainSection.classList.toggle('sec-menu-expand');
    });
});