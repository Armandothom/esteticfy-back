const Utils = require("./utils");

exports.update = (tableName, data = {}, conditions = {}) => {
  const dKeys = Object.keys(data);
  const dataTuples = dKeys.map((k, index) => `${k} = $${index + 1}`);
  const updates = dataTuples.join(", ");
  const len = Object.keys(data).length;

  let text = `UPDATE ${tableName} SET ${updates}`;

  if (!Utils.isObjEmpty(conditions)) {
    const keys = Object.keys(conditions);
    const condTuples = keys.map((k, index) => `${k} = $${index + 1 + len}`);
    const condPlaceholders = condTuples.join(" AND ");

    text += ` WHERE ${condPlaceholders} RETURNING *`;
  }

  const values = [];
  Object.keys(data).forEach((key) => {
    values.push(data[key]);
  });
  Object.keys(conditions).forEach((key) => {
    values.push(conditions[key]);
  });

  return { text, values };
};

exports.remove = (tableName, conditions = {}) => {
  let text = `DELETE FROM ${tableName}`;
  if (!Utils.isObjEmpty(conditions)) {
    const keys = Object.keys(conditions);
    const condTuples = keys.map((k, index) => `${k} = $${index + 1}`);
    const condPlaceholders = condTuples.join(" AND ");

    text += ` WHERE ${condPlaceholders}`;
  }
  const values = [];

  Object.keys(conditions).forEach((key) => {
    values.push(conditions[key]);
  });
  return { text, values };
};
