import { Component, onCleanup, createSignal } from 'solid-js';
import './Interests.css';

const all_items = [
  // General stuff
  'Likes Coding 💻',
  'Video Game Addict 🕹',
  'College Student 🎓',
  'Speaks English (supposedly) 🌐',
  '한국어를 공부하고 있어 🇰🇷',
  'Slow to reply to texts (sry)',
  // Computer stuff
  'Horrified by C++ 💻',
  'CMake?... say no more 😨💻',
  'Fallen in love with Rust 💻',
  'Fallen in love with TypeScript 💻',
  'Trash at CSS 💻',
  "' DROP DATABASE brain;--",
  '<img src/onerror=alert("🤔")>',
  // 🤔 stuff
  'Single & available 😘',
  'Notice me, senpai~ 😳',
  'Have horrible social anxiety 😰',
  'Trash music taste 🎵',
  "Can't even aim bruh 🕹",
  'Mint chocolate... why? 😣',
  'Who even read these texts? 🤔',
];

// Returns a copied array with elements shuffled
const shuffleArray = (array: any[]) => {
  let result = array.slice();

  for (let idx = result.length - 1; idx > 0; idx--) {
    const rnd = Math.floor(Math.random() * (idx + 1));
    [result[idx], result[rnd]] = [result[rnd], result[idx]];
  }

  return result;
};

const Interests: Component = () => {
  // shuffle items on each page visit
  const items = shuffleArray(all_items);

  // control variables
  const [switchElement, setSwitchElement] = createSignal(false);
  const [index, setIndex] = createSignal(0);
  const [textIn, setTextIn] = createSignal('About Me');
  const [textOut, setTextOut] = createSignal('');

  // update timer
  const timer = setInterval(() => {
    setIndex((index() + 1) % items.length);
    setTextOut(textIn());
    setTextIn(items[index()]);
    setSwitchElement(!switchElement());
  }, 4000);
  onCleanup(() => clearInterval(timer));

  return (
    <p class='interests'>
      <span
        class='interests-element'
        classList={{ 'interests-slide-in': !switchElement() }}
      >
        {switchElement() ? textOut() : textIn()}
      </span>
      <span
        class='interests-element'
        classList={{ 'interests-slide-in': switchElement() }}
      >
        {switchElement() ? textIn() : textOut()}
      </span>
    </p>
  );
};

export default Interests;
