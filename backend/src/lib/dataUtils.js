function getIDByName(arr, name) {
  const obj = arr.find((element) => element.name === name);
  return obj.id;
}

function createUniqueArr(arr) {
  return [...new Set(arr.map((obj) => JSON.stringify(obj)))].map((str) =>
    JSON.parse(str)
  );
}

module.exports = {
  getIDByName,
  createUniqueArr,
};
