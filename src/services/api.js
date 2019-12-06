import axios from "axios";
import { POINTS, PRODUCT } from "./endpoints";

const request = options => {
  const onSuccess = response => {
    console.log("onSuccess !! ", response);
    //ここでステータスを判定
    if (response.status === 200) {
      // console.log("onSuccess !! ", response);
      return {
        result: true,
        ...response
      };
    } else {
      // console.log('onError !! ', response.data);
      if (response.data.status === 503) {
        alert("メンテナンス中");
      }
      return {
        result: false,
        ...response
      };
    }
  };

  const onError = error => {
    // console.log('onError !! ', error);
    return {
      result: false,
      ...error.response
    };
  };

  return axios(options)
    .then(onSuccess)
    .catch(onError);
};

const connect = {
  get: async (url, params = {}) => {
    //キャッシュ
    const response = await request({
      method: "GET",
      url: url,
      params: params
    });
    return response;
  },

  post: (url, params) => {
    console.log("post", params);
    return request({
      method: "POST",
      url: url,
      data: params,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  },
  put: (url, params) => {
    return request({
      method: "POST",
      url: url,
      data: params,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  },
  delete: (url, params) => {
    return request({
      method: "DELETE",
      url: url,
      data: params,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  }
};

export const faceapi = {
  get: (service, params) => {
    const URL = POINTS + service;
    return connect.get(URL, params);
  },
  post: (service, params) => {
    const URL = POINTS + service;
    return connect.post(URL, params);
  },
  put: async (service, id, params) => {
    const URL = POINTS + service + "/" + id;
    return connect.post(URL, params);
  },
  delete: async (service, params) => {
    const URL = POINTS + service;
    return connect.post(URL, params);
  }
};

export const productapi = {
  get: async (service, params) => {
    const URL = PRODUCT + service;
    return await connect.get(URL, params);
  },
  post: (service, params) => {
    const URL = PRODUCT + service;
    return connect.post(URL, params);
  },
  put: async (service, id, params) => {
    const URL = PRODUCT + service + "/" + id;
    return connect.post(URL, params);
  },
  delete: async (service, params) => {
    const URL = PRODUCT + service;
    return connect.post(URL, params);
  }
};
