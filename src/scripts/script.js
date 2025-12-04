
// Import dayConfigs
const script = document.createElement('script');
script.src = './scripts/dayConfigs.js';
document.head.appendChild(script);

const DEBUG_MODE = false; // Set to false for release
const RESET_PROGRESS_ON_LOAD = false; // Set to true to clear progress on reload

if (RESET_PROGRESS_ON_LOAD) {
    Object.keys(localStorage)
        .filter(key => key.startsWith('advent_day_'))
        .forEach(key => localStorage.removeItem(key));
}

function runCalendar() {
    function isDaySolved(day) {
        return localStorage.getItem('advent_day_' + day + '_solved') === '1';
    }
    function markDaySolved(day) {
        localStorage.setItem('advent_day_' + day + '_solved', '1');
    }
    const calendar = document.getElementById('calendar');
    const startDay = 8;
    const endDay = 25;
    const dayConfigs = window.dayConfigs;
    const daysCount = endDay - startDay + 1;
    const daysPerRow = 6;
    const today = new Date();
    let todayDay = null;
    if (today.getMonth() === 11) {
        todayDay = today.getDate();
    }
    // DEBUG: Simulate a different 'today' (only affects December logic)
    // Uncomment one of the following lines to simulate a different 'today':
    // todayDay = 8; // Simulate 8th December
    // todayDay = 9; // Simulate 9th December
    // todayDay = 15; // Simulate 15th December
    if (DEBUG_MODE) {
        console.log(`[DEBUG] Today: ${today.toDateString()}, month: ${today.getMonth()} (11=Dec)`);
        console.log(`[DEBUG] Simulated todayDay: ${todayDay}`);
    }
    for (let i = 0; i < daysCount; i++) {
        const day = startDay + i;
        const dayElem = document.createElement('div');
        dayElem.className = 'day';
        dayElem.textContent = day;
        const posInRow = (i % daysPerRow) + 1;
        let isSpecial = false;
        if (posInRow === 3 || posInRow === daysPerRow) {
            isSpecial = true;
        }
        if (isSpecial) {
            dayElem.classList.add('special-game');
        }
        dayElem.style.position = 'relative';
        const config = dayConfigs[day];
        const isTemplate = config && config.template;
        const markBtn = document.createElement('button');
        markBtn.className = 'manual-check-btn';
        markBtn.style.position = 'absolute';
        markBtn.style.top = '9px';
        markBtn.style.left = '8px';
        markBtn.style.width = '18px';
        markBtn.style.height = '18px';
        markBtn.style.background = isDaySolved(day) ? 'rgba(26,71,42,0.7)' : 'rgba(255,255,255,0.7)';
        markBtn.style.border = '1.5px solid #c41e3a';
        markBtn.style.borderRadius = '4px';
        markBtn.style.padding = '0';
        markBtn.style.zIndex = 3;
        markBtn.tabIndex = 0;
        let checkIcon = document.createElement('span');
        checkIcon.className = 'day-check-icon';
        checkIcon.innerHTML = '✔';
        checkIcon.style.fontSize = '0.78em';
        checkIcon.style.lineHeight = '1';
        checkIcon.style.opacity = isDaySolved(day) ? '1' : '0';
        checkIcon.style.transition = 'opacity 0.2s';
        checkIcon.style.pointerEvents = 'none';
        checkIcon.style.color = isDaySolved(day) ? '#fff' : '#388e3c';
        checkIcon.style.textShadow = isDaySolved(day) ? '0 0 2px #388e3c, 0 0 6px #388e3c' : '0 0 2px #fff';
        markBtn.appendChild(checkIcon);
        if (isSpecial) {
            markBtn.style.cursor = 'pointer';
            let tooltip = null;
            function showTooltip(e) {
                if (tooltip) return;
                tooltip = document.createElement('span');
                tooltip.textContent = isDaySolved(day) ? 'Click to unmark' : 'Click to mark as completed';
                tooltip.style.position = 'fixed';
                tooltip.style.background = '#222';
                tooltip.style.color = '#fff';
                tooltip.style.fontSize = '0.85em';
                tooltip.style.padding = '2px 8px';
                tooltip.style.borderRadius = '6px';
                tooltip.style.whiteSpace = 'nowrap';
                tooltip.style.opacity = '1';
                tooltip.style.pointerEvents = 'none';
                tooltip.style.transition = 'opacity 0.15s';
                tooltip.style.zIndex = '99999';
                tooltip.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)';
                document.body.appendChild(tooltip);
                const rect = markBtn.getBoundingClientRect();
                tooltip.style.left = (rect.right + 8) + 'px';
                tooltip.style.top = (rect.top - 2) + 'px';
            }
            function hideTooltip() {
                if (tooltip) {
                    tooltip.style.opacity = '0';
                    setTimeout(() => {
                        if (tooltip && tooltip.parentNode) tooltip.parentNode.removeChild(tooltip);
                        tooltip = null;
                    }, 150);
                }
            }
            markBtn.addEventListener('mouseenter', showTooltip);
            markBtn.addEventListener('mouseleave', hideTooltip);
            markBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (isDaySolved(day)) {
                    localStorage.removeItem('advent_day_' + day + '_solved');
                    checkIcon.style.opacity = '0';
                    markBtn.style.background = 'rgba(255,255,255,0.7)';
                    checkIcon.style.color = '#388e3c';
                    checkIcon.style.textShadow = '0 0 2px #fff';
                } else {
                    markDaySolved(day);
                    checkIcon.style.opacity = '1';
                    markBtn.style.background = 'rgba(26,71,42,0.7)';
                    checkIcon.style.color = '#fff';
                    checkIcon.style.textShadow = '0 0 2px #388e3c, 0 0 6px #388e3c';
                }
            });
        } else {
            markBtn.disabled = true;
            markBtn.style.cursor = 'default';
        }
        dayElem.appendChild(markBtn);
        let isClickable = false;
        if (DEBUG_MODE) {
            isClickable = !!dayConfigs[day];
            console.log(`[DEBUG] Day ${day}: DEBUG_MODE active, clickable = ${isClickable}`);
        } else if (today.getMonth() === 11) {
            isClickable = (todayDay && day <= todayDay) && !!dayConfigs[day];
            if (todayDay) {
                console.log(`[DEBUG] Day ${day}: December, todayDay=${todayDay}, clickable=${isClickable}`);
            }
        } else {
            isClickable = false;
            console.log(`[DEBUG] Day ${day}: Not December, not clickable`);
        }
        if (isClickable) {
            dayElem.classList.add('clickable');
            dayElem.addEventListener('click', function() {
                if (DEBUG_MODE) {
                    console.log(`[DEBUG] Day ${day} clicked`);
                }
                const config = dayConfigs[day];
                if (config.template) {
                    const img = new window.Image();
                    img.src = config.img;
                    img.onload = function() {
                        const aspectRatio = img.naturalWidth / img.naturalHeight;
                        let winWidth, winHeight;
                        const availHeight = window.screen.availHeight - 40;
                        const extraContentHeight = 320;
                        if (aspectRatio < 0.9) {
                            winWidth = Math.max(500, img.naturalWidth + 120);
                            winHeight = Math.min(Math.max(img.naturalHeight + extraContentHeight, 800), availHeight);
                        } else {
                            winWidth = Math.max(img.naturalWidth + 180, 600);
                            winHeight = Math.min(Math.max(img.naturalHeight + extraContentHeight, 600), availHeight);
                        }
                        const params = new URLSearchParams({
                            img: config.img,
                            answer: config.answer,
                            day: day
                        });
                        if (config.blur) params.append('blur', config.blur);
                        if (config.hint1) params.append('hint1', config.hint1);
                        const popup = window.open(
                            `./popups/popup-single-character.html?${params.toString()}`,
                            '_blank',
                            `width=${winWidth},height=${winHeight}`
                        );
                        window.addEventListener('message', function handler(e) {
                            if (e.data && e.data.type === 'advent-day-solved' && e.data.day === day) {
                                markDaySolved(day);
                                window.location.reload();
                                window.removeEventListener('message', handler);
                            }
                        });
                    };
                } else if (config.custom) {
                    window.open(config.custom, '_blank');
                }
            });
        } else {
            dayElem.classList.add('disabled');
        }
        calendar.appendChild(dayElem);
    }
}

let domReady = false;
let configsReady = false;

function tryRunCalendar() {
    if (domReady && configsReady) runCalendar();
}

document.addEventListener('DOMContentLoaded', function() {
    domReady = true;
    tryRunCalendar();
});

script.onload = function() {
    configsReady = true;
    tryRunCalendar();
};
