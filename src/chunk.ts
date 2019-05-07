import Group = Phaser.GameObjects.Group;
import { SceneMain } from './scene-main';
import { Tile } from './tile';
import { Item, Position } from '@fleporcq/abotslife-core';

export class Chunk {

  private scene: SceneMain;

  private x: number;

  private y: number;

  private tiles: Group;

  constructor(scene: SceneMain, x: number, y: number) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.tiles = this.scene.add.group();
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public load() {
    this.unload();
    const chunkSize = this.scene.getChunkSize();

    for (let x = 0; x < chunkSize; x++) {
      for (let y = 0; y < chunkSize; y++) {
        const tileX = (this.x * chunkSize + x);
        const tileY = (this.y * chunkSize + y);
        const grid = this.scene.getWorld().getGrid();

        const position = new Position(tileX, tileY);
        if (grid.isInBound(position)) {
          const item: Item = grid.get(position);
          const type = item != null ? item.getType().toString().toLowerCase() : 'tile';
          this.tiles.add(new Tile(this.scene, tileX, tileY, type));
        }
      }
    }
  }

  public unload() {
    this.tiles.clear(true, true);
  }
}
