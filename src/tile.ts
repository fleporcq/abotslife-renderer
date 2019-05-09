import Sprite = Phaser.GameObjects.Sprite;
import { Orientation } from '@fleporcq/abotslife-core';

export class Tile extends Sprite {
  constructor(scene, x, y, key, orientation?: Orientation) {
    super(scene, x * scene.getTileSize() + scene.getTileSize() / 2, y * scene.getTileSize() + scene.getTileSize() / 2, key);
    this.scene = scene;
    this.scene.add.existing(this);
    // this.setOrigin(scene.getTileSize() / 2, scene.getTileSize() / 2);
    switch (orientation) {
      case Orientation.SOUTH:
        this.setAngle(90);
        break;
      case Orientation.WEST:
        this.setAngle(180);
        break;
      case Orientation.NORTH:
        this.setAngle(270);
        break;
    }
  }
}
