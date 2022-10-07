import { http } from './restAPI';

export const searchAllUtil = async (searchEndPoint) => {
  const res = http.get(searchEndPoint);
  console.log(`search all ${searchEndPoint}`);
  console.log(res);
  // todo to be updated with api
  return [];
};
