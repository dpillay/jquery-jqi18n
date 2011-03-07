/**
 * jquery-jqi18n v1.0.0
 * 
 * @alias Dinesh Pillay < code [AT] dpillay [DOT] eml [DOT] cc >
 * @link https://github.com/dpillay/jquery-jqi18n
 * @license MIT License
 * 
 */
(function($) {
    var _messages = {};

    var methods = {
        localize : function(key, params) {
            var keys = key.split(".");
            if (keys.length == 1) {
                return _messages[keys[0]];
            } else {
                var _obj = _messages;
                for (i = 0; i < keys.length; ++i) {
                    if ("" == keys[i] || !_obj[keys[i]]) {
                        return undefined;
                    } else if (!(typeof _obj[keys[i]] === 'object')) {
                        return methods.map(_obj[keys[i]], params);
                    } else {
                        _obj = _obj[keys[i]];
                    }
                }
            }
            return undefined;
        },
        map : function(str, params) {
            if (!params)
                return str;
            return str.replace(/\{(\d+)\}/g, function(match, index) {
                if (params[index]) {
                    return params[index];
                }
                return "";
            });
        },
        dictionary : function(messages) {
            $.extend(true, _messages, messages);
        }
    };

    $.extend({
        jqi18n : function(method) {
            // Method calling logic
            if (methods[method]) {
                return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method === 'string') {
                var params = arguments[1];
                if (arguments.length > 1) {
                    if (!(params instanceof Array)) {
                        params = new Array();
                        for (i = 1; i < arguments.length; ++i) {
                            params.push(arguments[i]);
                        }
                    }
                }
                return methods.localize.apply(this, [ arguments[0], params ]);
            } else {
                $.error('Method ' + method + ' does not exist on jQuery.jqi18n');
            }
        }
    });
})(jQuery);
