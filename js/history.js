export const history = {
  updateStorage: function (data) {
    const string = JSON.stringify(data);
    localStorage.setItem("history", string);
  },
  getFromStorage: function () {
    const string = localStorage.getItem("history");
    const arr = JSON.parse(string);
    this.data = [...arr];
  },
  clearStorage: function () {
    localStorage.removeItem("history");
  },
  data: [],
  push: function (city) {
    if (this.data.includes(city)) {
      return;
    }
    this.data.unshift(city);
    if (this.data.length === 4) {
      this.data.pop();
    }
    this.updateStorage(this.data);
  },
};
