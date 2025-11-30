// ========================================
// Christmas Advent Calendar Script
// ========================================

// Configuration
// DEBUG_MODE: Set to true for testing (all days clickable), false for production (only today clickable)
const DEBUG_MODE = true;
const START_DATE = 8;    // December 8
const END_DATE = 25;     // December 25

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createCalendar();
    createModal();
});

/**
 * Create the advent calendar grid
 */
function createCalendar() {
    const calendar = document.getElementById('calendar');
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth(); // 0-indexed, December = 11
    const isDecember = currentMonth === 11;

    // Generate days from December 8 to December 25
    for (let day = START_DATE; day <= END_DATE; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = day;
        dayElement.dataset.day = day;

        // Determine if this day should be clickable
        const isToday = isDecember && currentDay === day;
        const isPast = isDecember && currentDay > day;

        if (DEBUG_MODE) {
            // In debug mode, all days are clickable
            dayElement.classList.add('clickable');
            dayElement.addEventListener('click', () => openDay(day));
        } else {
            // In release mode, only today's date is clickable
            if (isToday) {
                dayElement.classList.add('clickable', 'today');
                dayElement.addEventListener('click', () => openDay(day));
            } else if (isPast) {
                dayElement.classList.add('past', 'disabled');
            } else {
                dayElement.classList.add('disabled');
            }
        }

        // Highlight today even in debug mode
        if (isToday) {
            dayElement.classList.add('today');
        }

        calendar.appendChild(dayElement);
    }
}

/**
 * Create modal element for displaying day content
 */
function createModal() {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.id = 'modal';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const modalTitle = document.createElement('h2');
    modalTitle.id = 'modal-title';

    const modalText = document.createElement('p');
    modalText.id = 'modal-text';

    const closeButton = document.createElement('button');
    closeButton.className = 'modal-close';
    closeButton.textContent = 'Chiudi ❄️';
    closeButton.addEventListener('click', closeModal);

    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalText);
    modalContent.appendChild(closeButton);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Close modal when clicking outside
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

/**
 * Open a specific day and show its content
 * @param {number} day - The day number to open
 */
function openDay(day) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');

    // Set content for the day (placeholder - can be customized)
    modalTitle.innerHTML = `🎄 ${day} Dicembre 🎄`;
    modalText.innerHTML = getMessageForDay(day);

    modal.classList.add('active');
}

/**
 * Close the modal
 */
function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
}

/**
 * Get the message for a specific day
 * @param {number} day - The day number
 * @returns {string} - The message for that day
 */
function getMessageForDay(day) {
    // Placeholder messages - these can be customized
    const messages = {
        8: "🎁 Sorpresa del giorno 8! 🎁",
        9: "🎁 Sorpresa del giorno 9! 🎁",
        10: "🎁 Sorpresa del giorno 10! 🎁",
        11: "🎁 Sorpresa del giorno 11! 🎁",
        12: "🎁 Sorpresa del giorno 12! 🎁",
        13: "🎁 Sorpresa del giorno 13! 🎁",
        14: "🎁 Sorpresa del giorno 14! 🎁",
        15: "🎁 Sorpresa del giorno 15! 🎁",
        16: "🎁 Sorpresa del giorno 16! 🎁",
        17: "🎁 Sorpresa del giorno 17! 🎁",
        18: "🎁 Sorpresa del giorno 18! 🎁",
        19: "🎁 Sorpresa del giorno 19! 🎁",
        20: "🎁 Sorpresa del giorno 20! 🎁",
        21: "🎁 Sorpresa del giorno 21! 🎁",
        22: "🎁 Sorpresa del giorno 22! 🎁",
        23: "🎁 Sorpresa del giorno 23! 🎁",
        24: "🎄 Vigilia di Natale! 🎄",
        25: "🎅 Buon Natale! 🎅"
    };

    return messages[day] || "🎁 Sorpresa! 🎁";
}
