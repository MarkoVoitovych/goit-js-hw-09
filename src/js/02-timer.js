import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    calendarEl: document.querySelector('[id = "datetime-picker"]'),
    startTimerBtn: document.querySelector('[data-start]'),
    timerValueEls: document.querySelectorAll('.value'),
    daysEl: document.querySelector('[data-days]'),
    hoursEl: document.querySelector('[data-hours]'),
    minutesEl: document.querySelector('[data-minutes]'),
    secondsEl: document.querySelector('[data-seconds]'),
};

let saleEndDate = null;
let timerId = null;

disableStartBtn();

refs.startTimerBtn.addEventListener('click', () => {
    onStartTimer();
    clearInterval(timerId);
    timerId = setInterval(onStartTimer, 1000);
    disableStartBtn();
});

flatpickr(refs.calendarEl, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            disableStartBtn();
            notifyFailure();
            return '';
        }
        AnableStartBtn();
        saleEndDate = selectedDates[0];
        clearInterval(timerId);
        refs.timerValueEls.forEach(elem => elem.textContent = '00');
    },
});

function onStartTimer() {
    const { days, hours, minutes, seconds } = convertMs(saleEndDate - Date.now());
    if (seconds < 0) {
        AnableStartBtn();
        return '';
    }
    refs.daysEl.textContent = addLeadingZero(days);
    refs.hoursEl.textContent = addLeadingZero(hours);
    refs.minutesEl.textContent = addLeadingZero(minutes);
    refs.secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, 0);
}

function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function notifyFailure() {
    Notify.failure('Please choose a date in the furute', {
        timeout: 2000,
        clickToClose: true,
        pauseOnHover: false,
        showOnlyTheLastOne: true,
    });
}

function disableStartBtn() {
    refs.startTimerBtn.setAttribute('disabled', 'true');
}

function AnableStartBtn() {
    refs.startTimerBtn.removeAttribute('disabled');
}