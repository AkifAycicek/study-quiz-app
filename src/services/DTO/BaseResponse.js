import { isArray } from 'lodash';

import Collection from '@libs/Collection';

class BaseResponse extends Collection {
  constructor() {
    super({ data: [] });
  }
  map(model) {
    this._model = model;

    return this;
  }

  getMapPath() {
    return '';
  }

  merge(attributes = {}) {
    if (!this._model) {
      return super.merge(attributes);
    }

    if (isArray(attributes)) {
      attributes = attributes.map((item) => this._model.create(item));
    } else {
      this._model.create(attributes);
    }
    return super.merge(attributes);
  }
}

export default BaseResponse;
