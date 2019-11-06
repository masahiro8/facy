/*
 * array.indexOfが遅いのでforで代替
 */
const exIndexOf = (arr, index) => {
  let flag = -1;
  for (let i = 0; i < arr.length; i++) {
    if (index === arr[i]) {
      flag = i;
    }
  }
  return flag;
};
