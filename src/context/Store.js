import * as _ from "lodash";

/**
 * ContextStoreを拡張
 * initFormatでキー名に対するフォーマットを行う
 */
const Formatter = store => {
  let formats = {};

  const initFormat = (keyName, format) => {
    formats[keyName] = format;
    store.setContext(keyName, formats[keyName]);
  };

  const setContext = (keyName, params) => {
    if (formats[keyName]) {
      formats[keyName] = _.assign(formats[keyName], params);
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
      // console.log("----- subscribe", data);
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
    // console.log("----- setContext", keyName);
    data[keyName] = params;
    subscribe();
  };

  return {
    subscribe,
    getContext,
    setContext
  };
};
export const WrappedContextStore = _ContextStore();
export const ContextStore = Formatter(WrappedContextStore);
