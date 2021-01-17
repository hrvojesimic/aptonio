onmessage = function (e) {
  console.log('Message received from main script');
  var workerResult = e.data + ' i tebi!';
  postMessage(workerResult);
};
