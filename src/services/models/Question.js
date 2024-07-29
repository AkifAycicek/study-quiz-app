import BaseModel from '@models/_BaseModel';

export class Question extends BaseModel {
  timer;
  resolve;
  done;
  selectedAnswer;

  get options() {
    return this.body?.split('\n');
  }

  constructor(attributes) {
    super({ ...attributes, answer: null, remainingTime: 30, finishedAt: null, startedAt: null });
    return this.reset();
  }

  start() {
    this.startedAt = Date.now();
    this.startTimer();
    return this;
  }
  solve(answer = this.selectedAnswer) {
    this.clearTimer();
    this.finishedAt = Date.now();
    this.answer = answer;
    this.resolve(true);
    return this;
  }

  reset() {
    this.clearTimer();
    this.timer = null;
    this.done = new Promise((resolve) => {
      this.resolve = resolve;
    });
    this.selectedAnswer = null;
    return super.reset();
  }
  startTimer() {
    this.timer = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime -= 1;
        return;
      }
      this.solve();
    }, 1000);
    return this;
  }
  clearTimer() {
    if (this.timer) clearInterval(this.timer);
    return this;
  }
}
