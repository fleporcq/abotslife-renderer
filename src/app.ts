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
  const world = new World(10, 10);
  const firmware = `
      if(sensor('distance').measure() < 1){
        const random = Math.random();
        random < 0.33 ? turnRight() : random < 0.66 ? turnLeft() : turnBack();
      } else {
        forward();
      }
    `;
  // const firmware = `
  //     if(sensor('shock').measure()){
  //       const random = Math.random();
  //       random < 0.33 ? turnRight() : random < 0.66 ? turnLeft() : turnBack();
  //     } else {
  //       forward();
  //     }
  //   `;
  const bot = new ScriptedBot();
  bot.addSensor(SensorType.DISTANCE);
  bot.addSensor(SensorType.SHOCK);
  bot.flash(firmware);
  const bot2 = new ScriptedBot();
  bot2.addSensor(SensorType.DISTANCE);
  bot2.addSensor(SensorType.SHOCK);
  bot2.flash(firmware);
  const bot3 = new ScriptedBot();
  bot3.addSensor(SensorType.DISTANCE);
  bot3.addSensor(SensorType.SHOCK);
  bot3.flash(firmware);
  world.add(bot, new Pose(1, 2, Orientation.EAST));
  world.add(bot2, new Pose(5, 5, Orientation.SOUTH));
  world.add(bot3, new Pose(3, 8, Orientation.WEST));
  world.add(new Wall(), new Pose(2, 3, Orientation.EAST));
  world.add(new Wall(), new Pose(3, 3, Orientation.EAST));
  world.add(new Wall(), new Pose(4, 2, Orientation.EAST));
  world.add(new Wall(), new Pose(9, 5, Orientation.EAST));

  const renderer = new Renderer(config, world);

};
