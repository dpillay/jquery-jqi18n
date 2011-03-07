$(document).ready(function() {
    $.jqi18n("dictionary", {
        common : {
            greeting : "Hello! {0} {1}",
            title : {
                text : "Yippe!"
            }
        }
    });
    var msg = $.jqi18n("common.greeting", "jquery", "user");
    $("#demo_label").html(msg);
});
