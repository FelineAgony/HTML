const crawl = document.querySelector('.crawl');
// Получение высоты элемента контейнера ".star-wars"
const containerHeight = document.querySelector('.star-wars').offsetHeight;
// Получение высоты элемента "crawl"
const crawlHeight = crawl.offsetHeight;

// Определение функции animate
function animate() {
  // Установка начального положения элемента "crawl"
crawl.style.top = containerHeight * 2.2 + 'px';
// Использывание библиотеки TweenMax для анимирования элемента "crawl"
  TweenMax.to(crawl, 60, {
    top: -crawlHeight + 'px',
    ease: Linear.easeNone,
    onComplete: function() {
      // Вызов функции animate снова, когда анимация завершится
      animate();
    }
  });
}
// Вызов функции animate для запуска анимации
animate();