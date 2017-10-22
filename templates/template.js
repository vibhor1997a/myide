function processData(input) {
    //Write your Code Here
}
process.stdin.resume();
process.stdin.setEncoding("utf-8");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});
process.stdin.on("end", function () {
    processData(_input);
});
