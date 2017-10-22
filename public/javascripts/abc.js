$(document).ready(function () {
    var a=$('#lang-selector').val();
    $('#lang-selector').val()=='Node.js'?a='node':a=a;
   
    $.get('templates/' + a, function (data, status) {
        editor.setValue(data);
    })
    $('#run').click(function () {
        $.post('/run', {
            code: editor.getValue()
            , stdin: $('#stdin').val()
            , lang: $('#lang-selector').val()
        }, function (data, status) {
            console.log(data);
            if (data.stdout) {
                $('#stdout').val(data.stdout);
                $('#stdout').show();
            }
            else {
                $('#stdout').hide();
            }
            if (data.stderr) {
                $('#stderr').val(data.stderr);
                $('#stderr').show();
            }
            else {
                $('#stderr').hide();
            }
        });
    });
    $('#lang-selector').change(function () {
        if ($('#lang-selector').val() == 'C' || $('#lang-selector').val() == 'Cpp') {
            editor.getSession().setMode("ace/mode/c_cpp");
        }
        else if ($('#lang-selector').val() == 'Java') {
            editor.getSession().setMode("ace/mode/java");
        }
        else if ($('#lang-selector').val() == 'Python') {
            editor.getSession().setMode("ace/mode/python");
        }
        else {
            editor.getSession().setMode("ace/mode/javascript");
        }
        $('#lang-selector').val()=='Node.js'?a='node':a=$('#lang-selector').val();
        $.get("templates/" + a, function (data, status) {
            editor.setValue(data);
        })
    });
    $('#toggle-theme').click(function () {
        if ($('#toggle-theme').prop('checked')) {
            editor.setTheme("ace/theme/twilight");
        }
        else {
            editor.setTheme("");
        }
    });
});