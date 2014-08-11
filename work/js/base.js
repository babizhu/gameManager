var host;
var substringMatcher;

$(document).ready(function ($) {

    var argHost = $.request.queryString["host"];
    var hostName = $.request.queryString["hostName"];

    if ((argHost == undefined || argHost == "undefined") && window.location.pathname.indexOf("index.html") == -1) {//排除一些外部链接
        top.location = "./index.html";
    }
//    alert( );
    $("#top a").each(function () {
        if( $(this).attr("href").indexOf("http:") != 0 ){
            $(this).attr("href", $(this).attr("href") + "?host=" + argHost + "&hostName=" + hostName + "&");
        }
    });

    host = "http://" + argHost + "/";

    substringMatcher = function (strs, count) {
        return function findMatches(q, cb) {

            if (count == undefined) {
                count = 100000;
            }
            var matches, substrRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function (i, str) {
                if (substrRegex.test(str)) {
                    // the typeahead jQuery plugin expects suggestions to a
                    // JavaScript object, refer to typeahead docs for more info


                    matches.push({ value: str });
                    if (matches.length >= count) {
                        //break;
                        return false;
                    }
                }
            });

            cb(matches);
        };
    };

    $("#hostName").text(hostName);
//    alert( host );
    var doc = document, inputs = doc.getElementsByTagName('input'), supportPlaceholder = 'placeholder'in doc.createElement('input'), placeholder = function (input) {
        var text = input.getAttribute('placeholder'), defaultValue = input.defaultValue;
        if (defaultValue == '') {
            input.value = text
        }
        input.onfocus = function () {
            if (input.value === text) {
                this.value = ''
            }
        };
        input.onblur = function () {
            if (input.value === '') {
                this.value = text
            }
        }
    };
    if (!supportPlaceholder) {
        for (var i = 0, len = inputs.length; i < len; i++) {
            var input = inputs[i], text = input.getAttribute('placeholder');
            if (input.type === 'text' && text) {
                placeholder(input)
            }
        }
    }

    jQuery.support.cors = true;
});