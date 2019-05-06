import { Renderer } from './renderer';

const config: GameConfig = {
  title: 'A bot\'s life',
  width: 1204,
  height: 768,
  parent: 'game',
  backgroundColor: '#18216D'
};

window.onload = () => {
  const game = new Renderer(config);
};
