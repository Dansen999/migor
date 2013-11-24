rest = new function () {

    /**
     *
     * @param restFunc
     * @param [params]
     * @param [successCallback]
     * @param [validationCallback]
     */
    this.request = function (restFunc, params, successCallback, validationCallback) {

        if (typeof(restFunc) === 'function') {

            if (params == null) {
                params = {};
            }


            params["$callback"] = function (code, request, response) {
//                var response = ;

                if (response != null && response.status != null) {
                    switch (response.status) {
                        // Status OK
                        case 0:
                            if (typeof(successCallback) === 'function') {
                                successCallback.call(this, response.content, response.totalRecords)
                            }
                            break;
                        // Validation error
                        case 100:
                            if (typeof(validationCallback) === 'function') {
                                validationCallback.call(this, response.affectedFields)
                            }
                            break;
                        // Other errors
                        default :
                            // TODO
                            break;
                    }
                } else {
                    migor.dialog.openErrorDialog(code + ': ' + request.responseText);
                }

            };

            restFunc.call(this, params);
        }
    };



    /**
     *
     * @param url
     * @param urlReplacements
     * @returns {*}
     */
    this.replaceInUrl = function (url, urlReplacements) {
        var self = this;

        if (urlReplacements == null)
            return url;
        for (var key in urlReplacements) {
            //noinspection JSUnfilteredForInLoop
            var value = urlReplacements[key];
            if (value == null || value == "") {
                //noinspection JSUnfilteredForInLoop
                url = url.replace(key, " ");
            }
            else {
                //noinspection JSUnfilteredForInLoop
                url = url.replace(key, self.urlEncodePathParameter(value));
            }
        }
        return url;
    };

    /**
     * Encode special characters which are known to
     * cause problems when used in an URL as path
     * parameter
     *
     * @param value     string to encode
     */
    this.urlEncodePathParameter = function (value) {

        // be on the safe side
        if (value == null) {
            return null;
        }
        var _value = '' + value;

        var encodeMe = {
            "?": "%3F",
            "%": "%25",
            "/": "%2F"
        };
        var result = "";
        for (var i = 0; i < _value.length; i++) {
            result += encodeMe[_value.charAt(i)] == undefined ? _value.charAt(i) : encodeMe[_value.charAt(i)];
        }
        return result;
    };

    this.block = function () {
        $.blockUI({ message: $('#block'), css: { position: 'relative', top: '0px', left: '0px', width: '100%', height: '100%', 'vertical-align': 'middle', background: 'none', color: '#fff'} });
    };

    this.unblock = function () {
        $.unblockUI();
    };


};
