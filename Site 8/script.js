//Функция смены вкладок
function changeTab(index) {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.content');

    tabs.forEach((tab, tabIndex) => {
      if (tabIndex === index) {
        tab.classList.add('active');
        contents[tabIndex].classList.add('active');
      } else {
        tab.classList.remove('active');
        contents[tabIndex].classList.remove('active');
      }
    });
  }

  //Функция фильтра
  function changeFilter(event, filter) {
    // Показать только элементы, относящиеся к выбранной категории
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
    // Удаляем класс "active" у всех вкладок
  var tabs = document.getElementsByClassName('tab');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
  }
  // Добавляем класс "active" только к выбранной вкладке
  event.target.classList.add('active');
  }
  
  function loadMore() {
    // Показать следующие 12 элементов
    const hiddenItems = document.querySelectorAll('.work-item[style="display: none;"]');
    for (let i = 0; i < 12; i++) {
      if (hiddenItems[i]) {
        hiddenItems[i].style.display = 'block';
      }
    }
  
    // Скрыть кнопку Load More, если больше нет скрытых элементов
    const remainingHiddenItems = document.querySelectorAll('.work-item[style="display: none;"]');
    const loadMoreButton = document.querySelector('.load-more-button');
    if (remainingHiddenItems.length === 0) {
      loadMoreButton.style.display = 'none';
    }
}
  //Функция карусели
// Получаем все необходимые элементы
const carouselItems = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');

// Устанавливаем начальный активный элемент
let activeIndex = 0;

// Функция для изменения активного элемента карусели
function changeCarouselItem(index) {
  // Удаляем класс active у всех элементов
  carouselItems.forEach(item => item.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  // Добавляем класс active выбранному элементу
  carouselItems[index].classList.add('active');
  dots[index].classList.add('active');
}

// Функция для переключения к следующему слайду
function nextSlide() {
    activeIndex = (activeIndex + 1) % carouselItems.length;
    changeCarouselItem(activeIndex);
  }
  
  // Функция для автоматической прокрутки слайдов
  function startCarousel() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, 10000); // Интервал в миллисекундах (3 секунды)
  }

// Обработчик клика на кружок
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    activeIndex = index;
    changeCarouselItem(activeIndex);
    startCarousel(); // Перезапускаем автоматическую прокрутку после клика
  });
});

// Обработчик клика на стрелку влево
arrowLeft.addEventListener('click', () => {
  activeIndex = (activeIndex - 1 + carouselItems.length) % carouselItems.length;
  changeCarouselItem(activeIndex);
  startCarousel(); // Перезапускаем автоматическую прокрутку после клика
});

// Обработчик клика на стрелку вправо
arrowRight.addEventListener('click', () => {
  activeIndex = (activeIndex + 1) % carouselItems.length;
  changeCarouselItem(activeIndex);
  startCarousel(); // Перезапускаем автоматическую прокрутку после клика
});

// Запускаем автоматическую прокрутку слайдов
let carouselInterval = setInterval(nextSlide, 10000); // Интервал в миллисекундах (3 секунды)