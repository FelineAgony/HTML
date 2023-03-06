const crawl = document.querySelector('.crawl');
const containerHeight = document.querySelector('.star-wars').offsetHeight;
const crawlHeight = crawl.offsetHeight;

function animate() {
crawl.style.top = containerHeight * 2.2 + 'px';
  TweenMax.to(crawl, 60, {
    top: -crawlHeight + 'px',
    ease: Linear.easeNone,
    onComplete: function() {
      animate();
    }
  });
}

animate();