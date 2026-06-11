# Snake-game
# Snake Game

![Image](https://images.openai.com/static-rsc-4/btd5UFFNNRiOiQt3r2ixsUgdAKVNVpIif_2RrSmGeHVau6V8Jwzq-3af74kgWtDtj3amgNJULIPprsvcz9S5JpYHr2nlW8t2N793l-n00sjdAakCO6XkM9nGH1TbCCpH4h4Fh0DeLT1flxZR7oFPqebxN6BojKPiDCyumS2Yi8JI_WSlycTxudhtTVTnGmPO?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/Rk9EMv__e9O9oIMzN5bNMFV2ajC8Q_4JpVwyRpuT3qEwAC-_Irw671lNU8Dzpf6D6P8KGnQxj8EmwwYg1xmSUZ7dVuy60XWOJ1dzRtZ_D-8u2zMOWrdenk0hsLRH9b1I8P-Qfc-Rng4LtOXCDmylr2FxwFinlqU-XOqYWurFJLdIqBqJIpRmTSZq2LhonYIn?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/ZFA9ReNp7H0a_2QVO8UjoEOC7oZ3oT3YduAlG8mkSWk_Puma2xPnoDHtLn2zAILtH1BDEwYdq0igW59O6BFtAGyFSIhuCgyFFVXIwzLNmFUhMYGgW1uioqscYCsZLvjrGYyFa-VNBNyZq8hp8JcpObo9XkZCwxcKNEvsiFuW9GYkylKOs50dodgIPu8dpBK_?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/2CVnadV1Th8eChb7JnzMwTq3QpsskPPwyqbZqNqPTGtMHRJ_SzUFU1ixjRoh3ThG9rrh8_Fw6t867IQr8sCgz4IF3nxPhjmL6hxY18_Bxe4402Tm0AxSFuMVuqKZM0M3C8nQRiQdadmaz8qhVER1ysLaV89PbVdxqTLzWGzhXL4yEFl4_jCMZam8mkuV1H2x?purpose=fullsize)

## Introduction

**Snake Game** is a classic arcade game in which the player controls a snake that moves around the screen to eat food. As the snake eats food, it grows longer, making the game more challenging.

## How the Game Works

1. The snake starts with a small length.
2. The player controls the snake using the **Arrow Keys** (Up, Down, Left, Right).
3. Food appears randomly on the screen.
4. When the snake eats the food, its length increases.
5. The score increases with each food item collected.
6. The game ends if the snake hits the wall or its own body.

## Main Components

### 1. Snake

* Controlled by the player.
* Moves continuously in one direction.
* Grows longer after eating food.

### 2. Food

* Appears randomly on the game board.
* Increases the snake's length and score when eaten.

### 3. Game Board

* The area where the snake moves.
* Contains the snake and food items.

### 4. Score System

* Tracks the number of food items collected.
* Displays the player's current score.

### 5. Game Over Screen

* Appears when the snake collides with a wall or itself.
* Displays the final score.
* Allows the player to restart the game.

## Features

* Simple keyboard controls.
* Increasing difficulty as the snake grows.
* Real-time score tracking.
* Endless gameplay until collision.
* Fun and educational for beginners.

## Flow Chart

```text
Start Game
     ↓
Create Snake
     ↓
Generate Food
     ↓
Move Snake
     ↓
Food Eaten?
 ┌───┴───┐
 No     Yes
 ↓       ↓
Continue  Increase Score
 ↓        Grow Snake
 └────┬────┘
      ↓
Collision with Wall
or Snake Body?
 ┌───┴───┐
 No     Yes
 ↓       ↓
Continue Game
         ↓
      Game Over
         ↓
 Restart/Exit
```

## Advantages

* Improves hand-eye coordination.
* Enhances concentration and reflexes.
* Easy to understand and play.
* Suitable for all age groups.
* Helps beginners learn game development concepts.

## Technologies Used (for a Web-Based Snake Game)

* **HTML** – Structure of the game.
* **CSS** – Styling and design.
* **JavaScript** – Game logic and controls.
* **Canvas API** – Drawing the snake and food.

## Conclusion

The Snake Game is one of the most popular classic arcade games. The objective is to control a growing snake, collect food, and avoid collisions. Its simple gameplay, increasing challenge, and easy controls make it an excellent project for learning game development using HTML, CSS, and JavaScript.
