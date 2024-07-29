import createAxiosClient from '@libs/createAxiosClient';

class Http {
  constructor() {
    each(['options', 'head', 'get'], (method) =>
      set(Http.prototype, method, async (url, options) => {
        const client = createAxiosClient();
        url = `${this.resource}/${url}`;
        return client.request({ method, url, ...options });
      }),
    );

    each(['post', 'put', 'patch', 'delete'], (method) =>
      set(Http.prototype, method, (url, data, options) => {
        const client = createAxiosClient();
        url = `${this.resource}/${url}`;
        return client.request({ method, url, data, ...options });
      }),
    );
  }

  get resource() {
    return '';
  }
}

export default Http;
