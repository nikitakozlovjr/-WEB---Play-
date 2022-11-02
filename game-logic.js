//максимальное число 
let maxNumber;
//загаданное число
let hiddenNumber;
//создаем функции для определения максимального числа, исходя из выбора игрока
//максимальное число для первого уровня
const first = () => {
  maxNumber = 100;
  hiddenNumber = Math.round(Math.random() * maxNumber);
  setReverse();
}
//максимальное число для второго уровня
const second = () => {
  maxNumber = 250;
  hiddenNumber = Math.round(Math.random() * maxNumber);
  setReverse();
}
//максимальное число для третьего уровня
const three = () => {
  maxNumber = 500;
  hiddenNumber = Math.round(Math.random() * maxNumber);
  setReverse();
}
//максимальное число для четвертого уровня
const four = () => {
  maxNumber = 750;
  hiddenNumber = Math.round(Math.random() * maxNumber);
  setReverse();
}
//максимальное число для пятого уровня
const five = () => {
  maxNumber = 1000;
  hiddenNumber = Math.round(Math.random() * maxNumber);
  setReverse();
}

//создаем переменную, в которой будет первый уровень сложности;
const complexityFirst = document.querySelector('.first');
//создаем переменную, в которой будет второй уровень сложности;
const complexitySecond = document.querySelector('.second');
//создаем переменную, в которой будет третий уровень сложности;
const complexityThree = document.querySelector('.three');
//создаем переменную, в которой будет четвертый уровень сложности;
const complexityFour = document.querySelector('.four');
//создаем переменную, в которой будет пятый уровень сложности;
const complexityFive = document.querySelector('.five');

//вешаем слушателей на все уровни сложности
//первый
complexityFirst.addEventListener('click', first);
//второйcomplexityFirst
complexitySecond.addEventListener('click', second);
//третий
complexityThree.addEventListener('click', three);
//четвертый
complexityFour.addEventListener('click', four);
//пятый
complexityFive.addEventListener('click', five);

//создаем переменную с генерацией случайного числа
//let hiddenNumber = Math.round(Math.random() * maxNumber);

// переменные из блока подсказок 
const guesses = document.querySelector('.lastattemp'); // попытка
const result = document.querySelector('.resultOffer'); // результат попытки
const help = document.querySelector('.help');//подсказка
const stillAttemp = document.querySelector('.attempCountUser');//колличество попыток
const cardPlay = document.querySelector('.card-play');//карточка числа(игровая карточка)

// переменные с игрового поля
const attemp = document.querySelector('.attempField');
const submitAttemp = document.querySelector('.submitAttemp');

let attempCount = 1;
let resetButton;

const checkAttemp = () => {
  const userAttemp = Number(attemp.value);// вводим переменную, которая хранит послежнюю попытку игрока
  // если это первая попытка, то...
  if (attempCount === 1) {
    guesses.textContent = "Последняя попытка: ";
  }

  guesses.textContent = userAttemp;// добавляем последнюю попытку игрока в раздел "Попытки"
  // если игрок угадал, то...
  if (userAttemp === hiddenNumber) {
    result.textContent = "Поздравляем Вы угадали!!!";// выводим в параграф "Результат" поздравление
    cardPlay.style.background = "linear-gradient(45deg, #75BF63, #27C800)";//меняем фон карточки числа
    help.textContent = " ";
    setGameOver();
    //если количество попыток 10, то...
  } else if (attempCount === 10) {
    result.textContent = "У Вас не получилось угадать число!!!";// выводим в параграф "Результат" информирование об проигрыше
    cardPlay.style.background = "linear-gradient(45deg, #FF3535, #BD0000)";//меняем фон карточки числа
    help.textContent = " ";
    setGameOver();
    // если игра продолжается(игрок не угадал и попытки еще остались), то...
  } else {
    if (Math.abs(hiddenNumber - userAttemp) <= 10) {
      result.textContent = "Вы очень близко";
      cardPlay.style.background = "linear-gradient(45deg, #FFB279, #FF6D02)";//меняем фон карточки числа
    } else if (Math.abs(hiddenNumber - userAttemp) <= 30) {
      result.textContent = "Вы на правильном пути";
      cardPlay.style.background = "linear-gradient(45deg, #A29D04, #DEDA55)";//меняем фон карточки числа
    } else if (Math.abs(hiddenNumber - userAttemp) > 30) {
      result.textContent = "Вам стоит еще подумать";
      cardPlay.style.background = "linear-gradient(45deg, #00A6FF, #00A6FF)";//меняем фон карточки числа
    }
  
    if (userAttemp > hiddenNumber) {
        help.textContent = "Ваше число больше загаданного";
    } else if (userAttemp < hiddenNumber) {
        help.textContent = "Ваше число меньше загаданного";
    }
  }
  attempCount += 1;
  stillAttemp.textContent = 11 - attempCount;
  attemp.value = ' ';
  attemp.focus();
};

const setGameOver = () => {
  //ограждаем игрока от возможности нажать кнопку и ввести число
  attemp.disabled = true;
  submitAttemp.disabled = true;
  //делаем видимой кнопку начала игры заново
  resetButton = document.querySelector('.reversesubmit');
  resetButton.style.display = "block";
  // на созданную кнопку вешаем слушателя, который будет ждать клика на него и запускать функцию setReverse
  resetButton.addEventListener('click', setReverse);
};

const setReverse = () => {
  //количество попыток игрока делаем равным 1;
  attempCount = 1;
  //находим все строчные элементыы "a" контейнера resultParas;
  let resultParas = document.querySelectorAll(".resultParas span");
  //создаем цикл, которые делает все элементы контейнера resultParas пустыми
  for(let i = 0; i < resultParas.length; i += 1) {
    resultParas[i].textContent = " ";
  }
  //присваиваем элементу attempCountUser (кол-во попыток) число 10
  stillAttemp.textContent = "10";
  //фоновый цвет делаем прозрачным
  result.style.backgroundColor = "transparent";
  //даем возможность игроку снова вводить попытки и нажимать на кнопку
  attemp.disabled = false;
  submitAttemp.disabled = false;
  //фокусируем консоль на вводе числа и стираем значения
  attemp.value = '';
  attemp.focus();
  //кнопку с началом новой  игры
  resetButton.style.display = "none";
  //создаем новое рандомное число
  hiddenNumber = Math.round(Math.random() * maxNumber);
  //меняем фон карточки числа
  cardPlay.style.background = "linear-gradient(45deg, #922BF2, #C30196)";
};

submitAttemp.addEventListener("click", checkAttemp);
 

