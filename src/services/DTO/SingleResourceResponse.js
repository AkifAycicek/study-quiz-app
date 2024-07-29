import BaseResponse from './BaseResponse';

class SingleResourceResponse extends BaseResponse {
  reset() {
    this.set({});

    return this;
  }

  getModel() {
    const model = this.get(this.getMapPath());

    if (!model) return new this._model({});

    return model;
  }
}

export default SingleResourceResponse;
