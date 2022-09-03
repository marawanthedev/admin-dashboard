import { http } from "../../../util/restAPI";
import assert from "../../../util/assertion";

const BASE_URL = "";

const doSmth = async (data) => {
  // const res = await http.post(`${BASE_URL}`, data);

  // // assertion use
  // return assert(res, res.data, "Add booking failed", res);
  return [1, 2, 3];
};

const productsService = {
  //functions
  doSmth,
};

export default productsService;
