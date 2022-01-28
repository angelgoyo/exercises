Array.prototype.updateOne = function (dataUpdate, index) {
  this[index] = { ...this[index], ...dataUpdate };
};

Array.prototype.deleteOne = function (index) {
  return this.splice(index, 1);
};
