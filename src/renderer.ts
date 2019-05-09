import { Game } from 'phaser';
import { World } from '@fleporcq/abotslife-core';
import { SceneMain } from './scene-main';

export class Renderer extends Game {

  private sceneMain: SceneMain;

  constructor(GameConfig: GameConfig, world: World) {
    super(GameConfig);
    this.sceneMain = new SceneMain(world);
    this.scene.add(this.sceneMain.sys.config['key'], this.sceneMain, true);
  }

}
