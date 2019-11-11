import * as _ from 'lodash';

export const FLAG_KEYS = {
  BW: { key: 'bw', id: 'ctrBW' },
  GRAY: { key: 'gray', id: 'ctrGray' },
  COL2: { key: 'col2', id: 'ctrCol2' },
  MEDI: { key: 'median', id: 'ctrMedian' },
  CENT: { key: 'center', id: 'ctrCenter' },
  VERT: { key: 'vertical', id: 'ctrVert' },
  HORI: { key: 'horizontal', id: 'ctrHori' },
  LINE: { key: 'line', id: 'ctrLine' },
  POIN: { key: 'point', id: 'ctrPoint' }
};

const _EffectFlags = () => {
  let flags = {
    bw: true,
    gray: false,
    col2: false,
    median: false,
    center: true,
    vertical: false,
    horizonta: false,
    line: false,
    point: false
  };

  let callbacks = [];

  const setCallback = func => {
    callbacks.push(func);
  };

  const setEffect = (key, val) => {
    flags[key] = val;
    _.map(callbacks, callback => {
      callback(flags);
    });
  };

  const getValue = key => {
    return flags[key];
  };

  return {
    setCallback,
    setEffect,
    getValue
  };
};

export const EffectFlags = _EffectFlags();
