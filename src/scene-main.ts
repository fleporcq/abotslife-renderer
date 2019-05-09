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
  private worldBoundaries: Vector2;
  private viewMin: Vector2;
  private viewMax: Vector2;
  private chunks: Chunk[];
  private world: World;
  private nextWorld: World;

  private keyUp: Key;
  private keyDown: Key;
  private keyLeft: Key;
  private keyRight: Key;

  constructor(world: World, tileSize: number = 64, chunkSize: number = 7, cameraSpeed: number = 64) {
    super({ key: 'SceneMain' });
    this.world = world;
    this.tileSize = tileSize;
    this.chunkSize = chunkSize;
    this.cameraSpeed = cameraSpeed;
  }

  public getWorld(): World {
    return this.world;
  }

  public getNextWorld(): World {
    return this.nextWorld;
  }

  public getTileSize(): number {
    return this.tileSize;
  }

  public getChunkSize(): number {
    return this.chunkSize;
  }

  public preload() {
    this.load.image('ground', 'assets/ground.png');
    this.load.image('bot', 'assets/bot.png');
    this.load.image('wall', 'assets/wall.png');
  }

  public create() {
    const tickInterval = 300;
    this.nextWorld = this.world.clone();
    setInterval(() => {
      this.world = this.nextWorld;
      this.nextWorld = this.world.clone();
      this.nextWorld.next();

    }, tickInterval);

    this.worldBoundaries = new Phaser.Math.Vector2(
      this.world.getWidth() * this.tileSize,
      this.world.getWidth() * this.tileSize
    );
    this.viewMin = new Phaser.Math.Vector2(
      this.cameras.main.worldView.x + (this.cameras.main.worldView.width / 2),
      this.cameras.main.worldView.y + (this.cameras.main.worldView.height / 2)
    );
    this.viewMax = new Phaser.Math.Vector2(
      this.worldBoundaries.x - this.viewMin.x,
      this.worldBoundaries.y - this.viewMin.y
    );
    this.followPoint = this.viewMin.clone();

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
      if (this.followPoint.y > this.viewMin.y + this.cameraSpeed) {
        this.followPoint.y -= this.cameraSpeed;
      } else {
        this.followPoint.y = this.viewMin.y;
      }
    }
    if (this.keyDown.isDown) {
      if (this.followPoint.y < this.viewMax.y - this.cameraSpeed) {
        this.followPoint.y += this.cameraSpeed;
      } else {
        this.followPoint.y = this.viewMax.y;
      }
    }
    if (this.keyLeft.isDown) {
      if (this.followPoint.x > this.viewMin.x + this.cameraSpeed) {
        this.followPoint.x -= this.cameraSpeed;
      } else {
        this.followPoint.x = this.viewMin.x;
      }
    }
    if (this.keyRight.isDown) {
      if (this.followPoint.x < this.viewMax.x - this.cameraSpeed) {
        this.followPoint.x += this.cameraSpeed;
      } else {
        this.followPoint.x = this.viewMax.x;
      }

    }

    this.cameras.main.centerOn(this.followPoint.x, this.followPoint.y);
  }

}
