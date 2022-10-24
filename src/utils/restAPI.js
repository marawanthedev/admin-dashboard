/* eslint-disable class-methods-use-this */
// East HTTP library

// library for making http requests
// @version 2.0.0
// @author Marwan Mostafa
// using es6 , fetching and arrow functions

import axios from 'axios';

class EasyAxios {
  baseUrl = process.env.REACT_APP_BASE_URL;

  getHeader = () => {
    const userInAuth = localStorage.getItem('user') !== undefined ? JSON.parse(localStorage.getItem('user')) : null;
    if (userInAuth) {
      return {
        'Content-type': 'application/json',
        token: userInAuth?.token,
      };
    }
    return null;
  };

  // make a http get request
  async get(url) {
    const res = await axios.get(`${this.baseUrl}${url}`, {
      headers: this.getHeader(),
    });
    return res;
  }

  // make a http post request
  async post(url, data) {
    const res = await axios.post(`${this.baseUrl}${url}`, data, { headers: this.getHeader() });
    return res;
  }

  // Make an http PUT Request
  async put(url, data) {
    const res = await axios.put(`${this.baseUrl}${url}`, data, { headers: this.getHeader() });
    return res;
  }

  // delete request
  async delete(url) {
    const res = await axios.delete(`${this.baseUrl}${url}`, { headers: this.getHeader() });
    return res;
  }
}

export const http = new EasyAxios();
