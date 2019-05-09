import Group = Phaser.GameObjects.Group;
import { SceneMain } from './scene-main';
import { Tile } from './tile';
import { Position } from '@fleporcq/abotslife-core';

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
    const grid = this.scene.getWorld().getGrid();
    const nextGrid = this.scene.getNextWorld().getGrid();

    for (let x = 0; x < chunkSize; x++) {
      for (let y = 0; y < chunkSize; y++) {
        const tileX = (this.x * chunkSize + x);
        const tileY = (this.y * chunkSize + y);

        const position = new Position(tileX, tileY);
        if (grid.isInBound(position)) {
          this.tiles.add(new Tile(this.scene, tileX, tileY, 'ground'));
          const item = grid.get(position);
          if (item != null) {
            const type = item.getType().toString().toLowerCase();
            const nextItem = nextGrid.getByWid(item.wid);
            this.tiles.add(new Tile(this.scene, tileX, tileY, type, item.getPose().orientation));
          }
        }
      }
    }
  }

  public unload() {
    this.tiles.clear(true, true);
  }
}
