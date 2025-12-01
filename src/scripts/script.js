
// ========================================
// Christmas Advent Calendar Script
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    // Helper: check if a day is solved
    function isDaySolved(day) {
        return localStorage.getItem('advent_day_' + day + '_solved') === '1';
    }

    // Helper: mark a day as solved
    function markDaySolved(day) {
        localStorage.setItem('advent_day_' + day + '_solved', '1');
    }
    const calendar = document.getElementById('calendar');
    const startDay = 8;
    const endDay = 25;

    // Day config: use template or custom popup
    const dayConfigs = {
        8: {
            template: true,
            img: './assets/images/charjabug.webp',
            answer: 'charjabug',
            title: 'WHO DIS OwO'
        },
        9: {
            template: true,
            img: './assets/images/sukuna.webp',
            answer: 'sukuna',
            title: 'WHO DIS OwO'
        },
        10: {
            template: false,
            custom: 'https://www.gazzetta.it/'
        }
        // Add more days as needed
    };

    for (let day = startDay; day <= endDay; day++) {
        const dayElem = document.createElement('div');
        dayElem.className = 'day';
        dayElem.textContent = day;
        // Checked icon if solved
        if (isDaySolved(day)) {
            const checkIcon = document.createElement('span');
            checkIcon.className = 'day-check-icon';
            checkIcon.innerHTML = '✔️';
            checkIcon.style.position = 'absolute';
            checkIcon.style.top = '1px';
            checkIcon.style.left = '1px';
            checkIcon.style.fontSize = '0.85em';
            checkIcon.style.lineHeight = '1';
            dayElem.style.position = 'relative';
            dayElem.appendChild(checkIcon);
        }

        if (dayConfigs[day]) {
            dayElem.classList.add('clickable');
            dayElem.addEventListener('click', function() {
                const config = dayConfigs[day];
                if (config.template) {
                    // Dynamically size popup based on image size + content
                    const img = new window.Image();
                    img.src = config.img;
                    img.onload = function() {
                        const extraWidth = 120;
                        const extraHeight = 350;
                        const winWidth = Math.max(img.naturalWidth + extraWidth, 500);
                        const winHeight = Math.max(img.naturalHeight + extraHeight, 500);
                        // Pass params for image, answer, and title, and day
                        const params = new URLSearchParams({
                            img: config.img,
                            answer: config.answer,
                            title: config.title || '',
                            day: day
                        });
                        const popup = window.open(
                            `./popup.html?${params.toString()}`,
                            '_blank',
                            `width=${winWidth},height=${winHeight}`
                        );
                        // Listen for solved message from popup
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
});
