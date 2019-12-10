import * as _ from "lodash";
import { faceapi } from "./api";
import { ContextStore } from "../context/Store";

export const FACE_STORE_CONTEXT_KEYS = {
  EYES: "eyes",
  FACE: "face"
};

const _faceStore = () => {
  // let images = [];

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
  const uploadImage = params => {
    return new Promise(async resolved => {
      // console.log("uploadimage", params);
      const response = await faceapi.post("/face", params);
      if (response.result) {
        let data = { ...formats };
        data.points = JSON.parse(response.data)["points"];
        data.base64 = params.face_image;
        data.id = _.random(9999999999);
        console.log("data", data);
        // images.push(data);
        ContextStore.setContext(FACE_STORE_CONTEXT_KEYS.EYES, data.points);
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
