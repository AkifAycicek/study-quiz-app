import Http from '@libs/Http';

export class QuestionApi extends Http {
  list() {
    return super.get('posts');
  }
}

export default new QuestionApi();
