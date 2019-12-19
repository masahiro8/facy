import * as _ from "lodash";
import FaceMesh from "./FaceMesh.vue";
import { hoc } from "./hoc.js";

const Cheeks = hoc(FaceMesh, () => {
  return {
    state: {}
  };
});

export default Cheeks;
