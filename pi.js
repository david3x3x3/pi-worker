var w = new Worker("./pi-worker.js");
var startTime = Date.now();
var digits1 = '';
var digits2 = '';
var count = 0;
w.onmessage = (e) => {
    count += 1;
    if (count <= 10) {
	digits1 = digits1 + e.data + '\n';
	document.getElementById("res1").innerHTML = `<pre>${digits1}</pre>`;
    } else if (count <= 20) {
	digits2 = digits2 + e.data + '\n';
	document.getElementById("res2").innerHTML = `<pre>${digits2}</pre>`;
    } else {
	var digits = digits2.split('\n');
	digits[digits.length-1] = e.data;
	digits.push("");
	digits.shift();
	digits2 = digits.join('\n');
	document.getElementById("res2").innerHTML = `<pre>${digits2}</pre>`;
    }
    // console.log(e.data);
};
// load the python script and send it to the worker
fetch("./pi.py.txt")
    .then((response) => response.text())
    .then(function (data) {
	w.postMessage({ python: data });
    });
