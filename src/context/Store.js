import * as _ from "lodash";

/**
 * ContextStoreを拡張
 * initFormatでキー名に対するフォーマットを行う
 */
const Formatter = store => {
  let formats = {};

  const initFormat = (keyName, format) => {
    formats[keyName] = format;
    console.log("Formatter init", formats);
  };

  const setContext = (keyName, params) => {
    if (formats[keyName]) {
      formats[keyName] = _.assign(formats[keyName], params);
      // console.log("Formatter update", formats[keyName]);
      store.setContext(keyName, formats[keyName]);
    } else {
      store.setContext(keyName, params);
    }
  };

  return {
    initFormat,
    subscribe: store.subscribestore,
    getContext: store.getContext,
    setContext
  };
};

const _ContextStore = () => {
  let callbacks = [];
  let data = {};

  const subscribe = () => {
    _.each(callbacks, callback => {
      callback(data);
    });
  };

  const getContext = callback => {
    callbacks.push(callback);
    if (Object.keys(data).length > 0) {
      subscribe();
    }
  };

  const setContext = (keyName, params) => {
    data[keyName] = params;
    subscribe();
  };

  return {
    subscribe,
    getContext,
    setContext
  };
};
// export const ContextStore = _ContextStore();
export const ContextStore = Formatter(_ContextStore());
