import * as _ from "lodash";

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
export const ContextStore = _ContextStore();
