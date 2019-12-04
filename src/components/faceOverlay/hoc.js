import Vue from "vue";
import * as _ from "lodash";

export const hoc = (_component, fetchData) => {
  const component = _.cloneDeep(_component);

  //メソッドを拡張
  component.methods = Object.assign({}, component.methods);

  //拡張データ
  const extendData = fetchData();
  //固有のメソッドを拡張
  component.methods = Object.assign(component.methods, extendData.methods);

  return Vue.component("hoc", {
    data: () => {
      return {
        state: extendData.state
      };
    },
    //!!Hoc側のmountedはラップされるcomponentのmountedの後に実行される
    mounted() {
      // console.log(">>>2", this.keyname);
      //拡張mounted実行
    },
    render(createElement, context) {
      return createElement(component, {
        props: {
          ...this.state
        }
      });
    }
  });
};
