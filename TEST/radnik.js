onmessage = function (e) {
  console.log(e);
  postMessage(e.data + ' i tebi!');
};
