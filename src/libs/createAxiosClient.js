import Axios from 'axios';

let createdClient = null;

const createClient = () => {
  if (createdClient) return createdClient;

  const client = Axios.create({
    baseURL: import.meta.env.VITE_API_BASEURL,
    transformRequest: [
      (data, headers) => {
        set(headers, 'Content-Type', 'application/json');

        return JSON.stringify(data);
      },
    ],
  });

  createdClient = client;

  return client;
};

export default createClient;
