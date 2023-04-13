const app = document.querySelector('#app');
let numberOfCards = 0;
const lefts = [];
const tops = [];

const setRandomPosition = (elements, element) => {
  const screenMultiplier = 1.5;
  const elementsLength = elements.length;
  // Get the width and height of the viewport
  const viewportWidth = window.innerWidth * screenMultiplier;
  const viewportHeight = window.innerHeight * screenMultiplier;

  // Get the width and height of the element
  const elementWidth = element.offsetWidth;
  const elementHeight = element.offsetHeight;

  // Calculate a random position for the element
  let left = Math.floor(
    Math.random() *
      screenMultiplier *
      (viewportWidth - elementWidth + elementsLength)
  );
  let top = Math.floor(
    Math.random() *
      screenMultiplier *
      (viewportHeight - elementHeight + elementsLength)
  );

  if (lefts.includes(left) || tops.includes(top)) {
    setRandomPosition(element);
  }

  // Set the position of the element
  element.style.left = left + 'px';
  element.style.top = top + 'px';
};

document.addEventListener('DOMContentLoaded', () => {
  (function () {
    numberOfCards =
      +prompt('Enter the number of cards. (default: 25)', 0) || 25;
  })();

  (function () {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < numberOfCards; i++) {
      const item = document.createElement('div');
      const img = document.createElement('img');
      img.src = `https://source.unsplash.com/random/?3d-renders&${i + 1}`;
      item.appendChild(img);
      const wnh = ['auto', '150', '250'];
      const wnhLen = wnh.length;
      let wRV = Math.floor((Math.random() * wnhLen) % wnhLen);
      let hRV = Math.floor((Math.random() * wnhLen) % wnhLen);
      let w = wnh[wRV];
      let h = wnh[hRV];
      while (w === 'auto' && h === 'auto') {
        wRV = Math.floor((Math.random() * wnhLen) % wnhLen);
        hRV = Math.floor((Math.random() * wnhLen) % wnhLen);
        w = wnh[wRV];
        h = wnh[hRV];
      }

      const colors = ['red', 'dark', 'blue', 'orange', 'yellow'];
      const cLen = colors.length;
      const cRV = Math.floor((Math.random() * cLen) % cLen);

      item.classList.add(
        'card',
        `${colors[cRV]}-card`,
        `height-${h}`,
        `width-${w}`
      );
      fragment.appendChild(item);
    }
    app.appendChild(fragment);
  })();

  (function () {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      setRandomPosition(cards, card);
    });
  })();

  window.onmousemove = (event) => {
    const clientX = event.clientX,
      clientY = event.clientY;
    const xDec = clientX / window.innerWidth,
      yDec = clientY / window.innerHeight;

    const maxX = window.innerWidth,
      maxY = window.innerHeight;

    const panX = maxX * xDec * -1,
      panY = maxY * yDec * -1;

    app.animate(
      {
        transform: `translate(${panX}px, ${panY}px)`,
      },
      {
        duration: 4000,
        fill: 'forwards',
        easing: 'ease',
      }
    );
  };
});
