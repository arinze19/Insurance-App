interface queryInterface {
    [key: string]: string
}

const urlBuilder = (query?: queryInterface): string => {
  let url = 'http://localhost:4000?';

  for (let prop in query) {
    url += `${[prop]}=${query[prop]}&`;
  }

  return url;
};


export default urlBuilder;
