import axios from "axios";
import { ENDPOINT } from "./constants";

const request = options => {
  const onSuccess = response => {
    //ここでステータスを判定
    if (response.data.status === 200) {
      // console.log("onSuccess !! ", response);
      return {
        result: true,
        ...response
      };
    } else {
      // console.log('onError !! ', response.data);
      if (response.data.status === 503) {
        vAlert.show("メンテナンス中");
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

export default {
  get: async (service, params = {}) => {
    //キャッシュ
    const URL = ENDPOINT.face + service;
    const response = await request({
      method: "GET",
      url: URL,
      params: params
    });
    return response;
  },

  post: (service, params) => {
    // console.log('post api params', params);
    return request({
      method: "POST",
      url: ENDPOINT.face + service,
      data: params,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  },
  put: (service, id, params) => {
    return request({
      method: "POST",
      url: ENDPOINT.face + service + "/" + id,
      data: params,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  },
  delete: (service, params) => {
    return request({
      method: "DELETE",
      url: ENDPOINT.face + service,
      data: params,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  }
};
