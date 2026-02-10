document.querySelectorAll('.menu-expand').forEach(element => {
    element.addEventListener('click', function (e) {
        e.preventDefault();
        const mainSection = document.querySelector('.main-section');
        mainSection.classList.toggle('sec-menu-expand');
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const bars = document.querySelectorAll('.progress-wrapper');

    bars.forEach(wrapper => {
        const target = parseInt(wrapper.getAttribute('data-target'));
        const circle = wrapper.querySelector('.progress-bar');
        const countElement = wrapper.querySelector('.count');
        
        const radius = 36;
        const circumference = 2 * Math.PI * radius; 
        
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;

        const offset = circumference - (target / 100) * circumference;

        setTimeout(() => {
            circle.style.setProperty('--final-offset', offset);
            circle.style.animation = "progressAnim 2s cubic-bezier(0.4, 0, 0.2, 1) forwards";

            animateNumber(countElement, target);
        }, 100);
    });

    function animateNumber(element, target) {
        let startTime = null;
        const duration = 2000;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            element.innerText = Math.floor(progress * target);
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }
});