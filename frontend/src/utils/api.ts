import axios, { AxiosError } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 3000,
});

const api = {
  get: async function <T>(endpoint: `/${string}`) {
    const response: [null | T, null | string] = [null, null];

    try {
      const { data } = await instance.get(endpoint);

      response[0] = data;
    } catch (error) {
      let message = 'Sorry, something went wrong';
      if (error instanceof AxiosError) {
        message = error.response?.data?.error?.message;
      }

      response[1] = message;
    } finally {
      return response;
    }
  },
  post: async function <T>(
    endpoint: `/${string}`,
    body: { [k: string]: unknown }
  ) {
    const response: [null | T, null | string] = [null, null];

    try {
      const { data } = await instance.post(endpoint, body);

      response[0] = data;
    } catch (error) {
      let message = 'Sorry, something went wrong';
      if (error instanceof AxiosError) {
        message = error.response?.data?.error?.message;
      }

      response[1] = message;
    } finally {
      return response;
    }
  },
  delete: async function <T>(endpoint: `/${string}`) {
    const response: [null | T, null | string] = [null, null];

    try {
      const { data } = await instance.delete(endpoint);

      response[0] = data;
    } catch (error) {
      let message = 'Sorry, something went wrong';
      if (error instanceof AxiosError) {
        message = error.response?.data?.error?.message;
      }

      response[1] = message;
    } finally {
      return response;
    }
  },
};

export default api;
