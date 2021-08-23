const Utils = {};
Utils.isObject = (x) => x !== null && typeof x === "object";
Utils.isObjEmpty = (obj) =>
  Utils.isObject(obj) && Object.keys(obj).length === 0;
Utils.deleteProperty = (arrayProperties, obj) => {
  arrayProperties.forEach(arrayProperty => {
    delete obj[arrayProperty]
  });
  return obj;
}
module.exports = Utils;
