import * as _ from "lodash";
import api from "./constants";
import { ContextStore } from "../context/Store";

export const FACE_STORE_CONTEXT_KEYS = {
  FACE_POINTS: "FACE_POINTS"
};

const _faceStore = () => {
  let images = [];

  //形式
  let formats = {
    id: 0,
    base64: null,
    points: []
  };

  /**
   *
   * @param {base64} param0
   */
  const uploadImage = ({ base64 }) => {
    return new Promise(async resolved => {
      const response = await api.post("face", base64);
      if (response.result) {
        let data = { ...formats };
        data.points = response.points;
        data.base64 = base64;
        data.id = _.random(9999999999);
        images.push(data);
        ContextStore.setContext(
          FACE_STORE_CONTEXT_KEYS.FACE_POINTS,
          data.points
        );
        resolved({ result: true });
      } else {
        resolved({ result: false });
      }
    });
  };

  return {
    uploadImage
  };
};

export const faceStore = _faceStore();
