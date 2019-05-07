import Sprite = Phaser.GameObjects.Sprite;

export class Tile extends Sprite {
  constructor(scene, x, y, key) {
    super(scene, x * scene.getTileSize(), y * scene.getTileSize(), key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.setOrigin(0);
  }
}
