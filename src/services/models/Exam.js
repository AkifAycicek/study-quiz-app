import BaseModel from '@models/_BaseModel';
import { locale } from '@plugins/i18n';
import { first } from 'lodash';
import { computed } from 'vue';

export class Exam extends BaseModel {
  constructor() {
    super({
      questions: [],
      finishedAt: null,
      startedAt: null,
    });
  }
  get currentQuestion() {
    return first(this.remainingQuestions);
  }
  get remainingTime() {
    return computed(this.questions?.reduce((time, { remainingTime }) => time + remainingTime, 0));
  }
  get remainingQuestions() {
    return computed(() => this.questions?.filter(({ finishedAt }) => isNil(finishedAt)) || []);
  }

  get solvedQuestions() {
    return computed(() => this.questions?.filter(({ finishedAt }) => !isNil(finishedAt)) || []);
  }

  reset() {
    this.questions?.forEach((question) => question.reset());
    return super.reset({
      finishedAt: null,
      startedAt: null,
    });
  }
  async start() {
    this.startedAt = new Date().toLocaleString(locale);

    while (this.startedAt && this.currentQuestion) {
      console.log(this.currentQuestion.remainingTime);
      this.currentQuestion.start();
      await this.currentQuestion.done;
    }
    if (this.startedAt) this.finish();
  }
  finish() {
    this.finishedAt = new Date().toLocaleString(locale);
    return this;
  }
  nextQuestion() {
    this.currentQuestion?.solve();
    if (this.currentQuestion) return;
    return this.finish();
  }
}
