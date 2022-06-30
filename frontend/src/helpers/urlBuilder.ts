import { queryInterface } from "../types";

const urlBuilder = (query: queryInterface): string => {
  let url = '/policies?';

  for (let prop in query) {
    url += `${[prop]}=${query[prop]}&`;
  }

  return url;
};


export default urlBuilder;
