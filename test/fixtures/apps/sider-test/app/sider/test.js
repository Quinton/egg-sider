'use strict';

module.exports = app => {
  return async (...args) => {
    console.log(...args);
    return 2
  };
};
