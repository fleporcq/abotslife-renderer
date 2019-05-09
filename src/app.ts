import { Renderer } from './renderer';
import { Orientation, Pose, ScriptedBot, SensorType, Wall, World } from '@fleporcq/abotslife-core';

const config: GameConfig = {
  title: 'A bot\'s life',
  width: 1204,
  height: 768,
  parent: 'game',
  backgroundColor: 'black'
};

window.onload = () => {
  const world = new World(22, 22);
  const bot = new ScriptedBot();
  bot.addSensor(SensorType.DISTANCE);
  bot.flash(`
      if(sensor('distance').measure() < 1){
        turnRight();
      } else {
        forward();
      }
    `);
  world.add(bot, new Pose(1, 2, Orientation.EAST));
  world.add(new Wall(), new Pose(2, 3, Orientation.EAST));
  world.add(new Wall(), new Pose(3, 3, Orientation.EAST));
  world.add(new Wall(), new Pose(4, 2, Orientation.EAST));
  setInterval(() => {
    world.next();
  }, 300);
  const renderer = new Renderer(config, world);

};
