import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget.elements;

  for (let i = 1; i <= amount.value; i += 1) {
    const currentDelay = +delay.value + i * step.value;
    setTimeout(() => {
      createPromise(i, currentDelay)
        .then(({ position, delay }) => {
          notifySuccess(position, delay);
        })
        .catch(({ position, delay }) => {
          notifyFailure(position, delay);
        });
    }, currentDelay);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return Promise.resolve({ position, delay });
  } else {
    return Promise.reject({ position, delay });
  }
}

function notifyFailure(position, delay) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
    timeout: 4000,
    clickToClose: true,
    pauseOnHover: false,
    showOnlyTheLastOne: false,
  });
}

function notifySuccess(position, delay) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
    timeout: 4000,
    clickToClose: true,
    pauseOnHover: false,
    showOnlyTheLastOne: false,
  });
}