document.querySelectorAll('.progress-wrap').forEach(wrap => {
    const value = parseInt(wrap.dataset.value, 10);
    const circle = wrap.querySelector('.progress-ring__progress');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset =
        circumference - (value / 100) * circumference;

    // sync text
    wrap.querySelector('.progress-text').textContent = value;

    let current = 0;
    const target = value;
    const interval = setInterval(() => {
        current++;
        wrap.querySelector('.progress-text').textContent = current;
        if (current >= target) clearInterval(interval);
    }, 10);
});
