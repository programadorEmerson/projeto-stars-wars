export const END_POINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

export const requestApi = async () => {
  const response = await fetch(END_POINT);
  const returnData = await response.json();
  const data = returnData.results.map((item) => {
    delete item.residents;
    return item;
  });
  return data;
};
