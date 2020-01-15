// Who knew the scoring in bowling was so unusual!
// Had to do some further reading and found this site, with a hilarious video explaining the scoring (watch at 2x lol)
// http://ten-pin-bowling.com/how-to-bowl/how-to-score-bowling.php

// My first thought is how do I want to store the frames...

// function Frame(frameIndex) {
//   this.rolls = {
//     1: null,
//     2: null
//   };
//   this.frameIndex = frameIndex;
//   this.score = 0;
// }

// I initially thought that was a good idea but soon realized that this created a hassle navigating to the next or the second next roll.

// So I changed tack to record the separate rolls and dynamically create the frames as needed.

function Roll(frameIndex, pins, bowlNumber) {
  this.frameIndex = frameIndex;
  this.pins = pins;
  this.bowlNumber = bowlNumber;
}

let bowlingGame = {
  frameIndex: 0,
  rollIndex: 1,
  rolls: [],

  roll(pins) {
    //   if strike move to next frame and reset rollIndex
    if (pins === 10) {
      this.rolls.push(new Roll(this.frameIndex, 10, this.rolls.length));
      this.rollIndex = 1;
      this.frameIndex++;
      return;
    }

    // if not a strike and another shot to go, bump up roll index
    if (pins < 10 && this.rollIndex < 2) {
      this.rolls.push(new Roll(this.frameIndex, pins, this.rolls.length));
      this.rollIndex++;
    }
    // if this is the second shot, move on to next frame
    else {
      this.rolls.push(new Roll(this.frameIndex, pins, this.rolls.length));
      this.rollIndex = 1;
      this.frameIndex++;
    }
  },

  getFrames() {
    let frames = {};
    for (let x = 0; x < 10; x++) {
      frames[x] = {};
      frames[x].rolls = this.rolls.filter(r => r.frameIndex === x);
    }
    return frames;
  },

  score() {
    let frames = this.getFrames();
    let totalScore = 0;

    for (let x in frames) {
      let currentFrame = frames[x];

      try {
        //   strike
        if (currentFrame.rolls[0].pins === 10) {
          totalScore +=
            10 +
            this.rolls[currentFrame.rolls[0].bowlNumber + 1].pins +
            this.rolls[currentFrame.rolls[0].bowlNumber + 2].pins;
        }

        //   spare
        else if (
          currentFrame.rolls[0].pins + currentFrame.rolls[1].pins ===
          10
        ) {
          totalScore +=
            10 + this.rolls[currentFrame.rolls[1].bowlNumber + 1].pins;
        }

        //   miss
        else if (currentFrame.rolls[0].pins + currentFrame.rolls[1].pins < 10) {
          totalScore += currentFrame.rolls[0].pins + currentFrame.rolls[1].pins;
        }
      } catch (error) {
        // for when fetching score before end of match
      }
    }
    return totalScore;
  }
};

// console.log(bowlingGame.roll(8));
// console.log(bowlingGame.roll(2));

// console.log(bowlingGame.roll(7));
// console.log(bowlingGame.roll(3));

// console.log(bowlingGame.roll(3));
// console.log(bowlingGame.roll(4));

// console.log(bowlingGame.roll(10));

// console.log(bowlingGame.roll(2));
// console.log(bowlingGame.roll(8));

// console.log(bowlingGame.roll(10));

// console.log(bowlingGame.roll(10));

// console.log(bowlingGame.roll(8));
// console.log(bowlingGame.roll(0));

// console.log(bowlingGame.roll(10));

// console.log(bowlingGame.roll(8));
// console.log(bowlingGame.roll(2));

// console.log(bowlingGame.roll(9));

// console.log(bowlingGame.score()); //170

console.log(bowlingGame.roll(10));
console.log(bowlingGame.roll(10));
console.log(bowlingGame.roll(10));
console.log(bowlingGame.roll(10));
console.log(bowlingGame.roll(10));
console.log(bowlingGame.roll(10));
console.log(bowlingGame.roll(10));
console.log(bowlingGame.roll(10));
console.log(bowlingGame.roll(10));
console.log(bowlingGame.roll(10));
console.log(bowlingGame.roll(10));
console.log(bowlingGame.roll(10));
console.log(bowlingGame.score()); //300
