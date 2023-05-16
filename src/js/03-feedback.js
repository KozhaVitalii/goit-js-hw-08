import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
    formEl: document.querySelector('.feedback-form'),
    emailEl: document.querySelector('.feedback-form [name="email"]'),
    messageEl: document.querySelector('.feedback-form [name="message"]'),
};

// повесили слушатель событий на кнопку и поля ввода данных:
refs.formEl.addEventListener('submit', onFormSubmit);
refs.emailEl.addEventListener('input', throttle(onTextareaInput, 500));
refs.messageEl.addEventListener('input', throttle(onTextareaInput, 500)); 

populateTextarea();

function onFormSubmit(evt) {
evt.preventDefault(); // убираем перезагрузку страницы

// добавим проверку, если одно из полей не заполнено, ругаемся:     
  if (!refs.emailEl.value || !refs.messageEl.value) {
    alert('Необхідно заповнити всі поля форми');
    return;
  }
  const emailValue = refs.emailEl.value;
  const messageValue = refs.messageEl.value;

  console.log('Email:', emailValue);
  console.log('Message:', messageValue);
  
  evt.currentTarget.reset(); // очищаем форму после отправки. Метод формы reset(), сбрасываем значение всех полей.
  localStorage.removeItem(STORAGE_KEY); // заменяем предыдущую запись через константу
  
}

/*
 * - Получаем значение поля
 * - Сохраняем его в хранилище
 * - Можно добавить throttle
 */
// Приводим значение в json формат через stringify:
function onTextareaInput(evt) {
const state = {
        email: refs.emailEl.value,
        message: refs.messageEl.value,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

/*
 * - Получаем значение из хранилища
 * - Если там что-то было, обновляем DOM
 */

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY); // записываем в переменную текущее значение лок.хранилища

  if (savedMessage) {
    const { email, message } = JSON.parse(savedMessage); // разбираем сохраненное сообщение обратно в отдельные значения

    refs.emailEl.value = email; // обновляем значение поля emailEl
    refs.messageEl.value = message; // обновляем значение поля messageEl
  }
}




