function animateProgressWrap(wrap) {
    const target = parseInt(wrap.dataset.value, 10);
    const circle = wrap.querySelector('.progress-ring__progress');
    const text = wrap.querySelector('.progress-text');
    if (!circle || !text || Number.isNaN(target)) {
        return;
    }

    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    // Reset to 0% before animating.
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;
    text.textContent = 0;

    if (wrap._rafId) {
        cancelAnimationFrame(wrap._rafId);
    }

    const duration = 1200; // ms
    const start = performance.now();

    function animate(now) {
        const progress = Math.min((now - start) / duration, 1);
        const current = Math.round(progress * target);
        const offset = circumference - (current / 100) * circumference;

        circle.style.strokeDashoffset = offset;
        text.textContent = current;

        if (progress < 1) {
            wrap._rafId = requestAnimationFrame(animate);
        } else {
            wrap._rafId = null;
        }
    }

    wrap._rafId = requestAnimationFrame(animate);
}

function animateProgressIn(container) {
    if (!container) {
        return;
    }

    container.querySelectorAll('.progress-wrap').forEach(animateProgressWrap);
}

// Animate on first load for the initially active tab.
document.addEventListener('DOMContentLoaded', () => {
    animateProgressIn(document.querySelector('.tab-content.active-content'));
});




function openTab(event, tabId) {
    let contents = document.getElementsByClassName("tab-content");
    for (let content of contents) {
        content.classList.remove("active-content");
    }

    let buttons = document.getElementsByClassName("tab-btn");
    for (let btn of buttons) {
        btn.classList.remove("active");
    }

    document.getElementById(tabId).classList.add("active-content");
    event.currentTarget.classList.add("active");

    // Re-run progress animation for the newly opened tab.
    animateProgressIn(document.getElementById(tabId));
}
