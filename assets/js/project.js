document.querySelectorAll('.progress-wrap').forEach(wrap => {
    const target = parseInt(wrap.dataset.value, 10);
    const circle = wrap.querySelector('.progress-ring__progress');
    const text = wrap.querySelector('.progress-text');

    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    // FORCE initial state (0%)
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;
    text.textContent = 0;

    let current = 0;
    const duration = 1200; // ms
    const start = performance.now();

    function animate(now) {
        const progress = Math.min((now - start) / duration, 1);
        current = Math.round(progress * target);

        const offset =
            circumference - (current / 100) * circumference;

        circle.style.strokeDashoffset = offset;
        text.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
});
