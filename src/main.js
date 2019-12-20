import Vue from "vue";
import App from "./App.vue";

import { ContextStore } from "./context/Store";
import { PRODUCT_TYPE } from "./constants";

Vue.config.productionTip = false;

const _CONTENTS = {
  [PRODUCT_TYPE.LENS]: { categoryId: null, productId: null },
  [PRODUCT_TYPE.CHEEKS]: { categoryId: null, productId: null },
  [PRODUCT_TYPE.EYESHADOWS]: { categoryId: null, productId: null },
  [PRODUCT_TYPE.LIPS]: { categoryId: null, productId: null },
  [PRODUCT_TYPE.EYELUSH]: { categoryId: null, productId: null }
};

//CONTENTSを初期化
ContextStore.initFormat("CONTENTS", _CONTENTS);

new Vue({
  render: h => h(App)
}).$mount("#app");
