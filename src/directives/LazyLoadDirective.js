export default {
  inserted: el => {
    function loadImage() {
      const imageElement = Array.from(el.children).find(
          el => el.nodeName === 'IMG'
      );

      console.log('loadImage');
      if(imageElement) {
        imageElement.addEventListener('load', () => {
          setTimeout(() => el.classList.add('loaded'), 100);
        });
        imageElement.addEventListener('error', () => console.log('error'));
        imageElement.src = imageElement.dataset.url;
      }
    }

    function handleIntersect(entries, observer) {
      entries.forEach(entry => {
        if(!entry.isIntersecting) {
          return;
        } else {
          loadImage();
          observer.unobserve(el);
          console.log('loaded');
        }
      });
    }

    function createObserve() {
      const option = {
        root: null,
        threshold: '0'
      }
      const observer = new IntersectionObserver(handleIntersect, option);
      observer.observe(el);
    }

    if(!window['IntersectionObserver']) {
      loadImage();
      console.log('IntersectionObserve');
    } else {
      createObserve();
      console.log('No IntersectionObserve');
    }
  }
}
