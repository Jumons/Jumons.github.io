
function header(rootDir) {
    $.ajax({
        url: rootDir + "include/header.html",
        cache: false,
        async: false,
        success: function(html) {
            html = html.replace(/\{\$root\}/g, rootDir);
            $('#header').html(html);
        }
    });
}