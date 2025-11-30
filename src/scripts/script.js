
// ========================================
// Christmas Advent Calendar Script
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    const calendar = document.getElementById('calendar');
    const startDay = 8;
    const endDay = 25;

    for (let day = startDay; day <= endDay; day++) {
        const dayElem = document.createElement('div');
        dayElem.className = 'day';
        dayElem.textContent = day;

        if (day === startDay) {
            dayElem.classList.add('clickable');
            dayElem.addEventListener('click', function() {
                // Dynamically size popup based on image size + content
                const img = new window.Image();
                img.src = './assets/images/0737_Shiny_Charjabug.webp';
                img.onload = function() {
                    // Add space for title, input, hints, and padding
                    const extraWidth = 120; // adjust as needed
                    const extraHeight = 350; // adjust as needed
                    const winWidth = Math.max(img.naturalWidth + extraWidth, 500);
                    const winHeight = Math.max(img.naturalHeight + extraHeight, 500);
                    window.open(
                        './popup.html',
                        '_blank',
                        `width=${winWidth},height=${winHeight}`
                    );
                };
            });
        } else {
            dayElem.classList.add('disabled');
        }

        calendar.appendChild(dayElem);
    }
});
