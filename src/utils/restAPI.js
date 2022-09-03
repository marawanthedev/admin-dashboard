// East HTTP library

// library for making http requests
// @version 2.0.0
// @author Marwan Mostafa
// using es6 , fetching and arrow functions

import axios from "axios";

class EasyAxios {
  getUserInAuth = () => {
    return localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : null;
  };
  getHeader = () => {
    const userInAuth = this.getUserInAuth();
    return {
      "Content-type": "application/json",
      authorization: userInAuth ? `Bearer ${userInAuth.token}` : null,
    };
  };
  // make a http get request
  async get(url) {
    const res = await axios.get(url, {
      headers: this.getHeader(),
    });
    return res;
  }

  // make a http post request
  async post(url, data) {
    const res = await axios.post(url, data, { headers: this.getHeader() });
    return res;
  }

  // Make an http PUT Request
  async put(url, data) {
    const res = await axios.put(url, data, { headers: this.getHeader() });
    return res;
  }
  // delete request
  async delete(url) {
    const res = await axios.delete(url, { headers: this.getHeader() });
    return res;
  }
}

export const http = new EasyAxios();
