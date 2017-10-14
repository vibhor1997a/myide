$(document).ready(function () {
    $('#run').click(function () {
        alert('Hello!');
        $.post('/run', {
            code: $('#code').val()
        ,   stdin: $('#stdin').val() 
        }, function (data, status) {
            console.log("Done!", status);
            console.log(data);
        });
    });
});