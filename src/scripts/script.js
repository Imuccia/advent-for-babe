
// ========================================
// Christmas Advent Calendar Script
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    const calendar = document.getElementById('calendar');
    const startDay = 8;
    const endDay = 25;

    // Day config: use template or custom popup
    const dayConfigs = {
        8: {
            template: true,
            img: './assets/images/0737_Shiny_Charjabug.webp',
            answer: 'charjabug',
            title: 'WHO DIS OwO'
        },
        9: {
            template: true,
            img: './assets/images/Sukuna_29.webp',
            answer: 'sukuna',
            title: 'WHO DIS OwO'
        },
        10: {
            template: false,
            custom: './popups/popup-10.html'
        }
        // Add more days as needed
    };

    for (let day = startDay; day <= endDay; day++) {
        const dayElem = document.createElement('div');
        dayElem.className = 'day';
        dayElem.textContent = day;

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
                        // Pass params for image, answer, and title
                        const params = new URLSearchParams({
                            img: config.img,
                            answer: config.answer,
                            title: config.title || ''
                        });
                        window.open(
                            `./popup.html?${params.toString()}`,
                            '_blank',
                            `width=${winWidth},height=${winHeight}`
                        );
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
