import Scene = Phaser.Scene;
import Vector2 = Phaser.Math.Vector2;
import Key = Phaser.Input.Keyboard.Key;
import { Chunk } from './chunk';
import { World } from '@fleporcq/abotslife-core';

export class SceneMain extends Scene {

  private chunkSize: number;
  private tileSize: number;
  private cameraSpeed: number;
  private followPoint: Vector2;
  private chunks: Chunk[];
  private world: World;

  private keyUp: Key;
  private keyDown: Key;
  private keyLeft: Key;
  private keyRight: Key;

  constructor(world: World, tileSize: number = 64, chunkSize: number = 7, cameraSpeed: number = 64) {
    super({ key: 'SceneMain' });
    this.tileSize = tileSize;
    this.chunkSize = chunkSize;
    this.cameraSpeed = cameraSpeed;
    this.world = world;
  }

  public getChunkSize(): number {
    return this.chunkSize;
  }

  public getTileSize(): number {
    return this.tileSize;
  }

  public getWorld(): World {
    return this.world;
  }

  public preload() {
    this.load.image('tile', 'assets/tile.png');
    this.load.image('bot', 'assets/bot.png');
    this.load.image('wall', 'assets/wall.png');
  }

  public create() {

    this.followPoint = new Phaser.Math.Vector2(
      this.cameras.main.worldView.x + (this.cameras.main.worldView.width / 2),
      this.cameras.main.worldView.y + (this.cameras.main.worldView.height / 2)
    );

    this.chunks = [];

    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }

  public getChunk(x, y) {
    for (const chunk of this.chunks) {
      if (chunk.getX() === x && chunk.getY() === y) {
        return chunk;
      }
    }
  }

  public update() {
    const snappedChunkX = Math.round(this.followPoint.x / (this.chunkSize * this.tileSize));
    const snappedChunkY = Math.round(this.followPoint.y / (this.chunkSize * this.tileSize));

    for (let x = snappedChunkX - 2; x < snappedChunkX + 2; x++) {
      for (let y = snappedChunkY - 2; y < snappedChunkY + 2; y++) {
        if (this.getChunk(x, y) == null) {
          this.chunks.push(new Chunk(this, x, y));
        }
      }
    }

    for (const chunk of this.chunks) {
      if (Phaser.Math.Distance.Between(
        snappedChunkX,
        snappedChunkY,
        chunk.getX(),
        chunk.getY()
      ) < 3) {
        if (chunk !== null) {
          chunk.load();
        }
      } else {
        if (chunk !== null) {
          chunk.unload();
        }
      }
    }

    if (this.keyUp.isDown) {
      this.followPoint.y -= this.cameraSpeed;
    }
    if (this.keyDown.isDown) {
      this.followPoint.y += this.cameraSpeed;
    }
    if (this.keyLeft.isDown) {
      this.followPoint.x -= this.cameraSpeed;
    }
    if (this.keyRight.isDown) {
      this.followPoint.x += this.cameraSpeed;
    }

    this.cameras.main.centerOn(this.followPoint.x, this.followPoint.y);
  }

}
