migor.rest = new function() {

    /**
     *
     * @param restFunc
     * @param [params]
     * @param [successCallback]
     * @param [validationCallback]
     * @param [loader]
     */
    this.request = function(restFunc, params, successCallback, validationCallback, loader) {

        if (typeof(restFunc) === 'function') {

            if (params == null) {
                params = {};
            }


            params["$callback"] = function(code, request, response) {
//                var response = ;
                if (loader) {
                    $.unblockUI();
                }
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
                            migor.dialog.openErrorDialog(response.errorMessage);
                            break;
                    }
                } else {
                    migor.dialog.openErrorDialog(code + ': ' +request.responseText);
                }

            };
            if (loader) {
                $.blockUI({ message: '<img src="images/ajax-loader.gif"/>' });
            }

            restFunc.call(this, params);
        }
    };

    /**
     * Sends a POST request via ajax of a multipart object.
     * During the request the screen is blocked and
     * an error message is shown if either the request fails
     * or the returned json object does not have its 'status'
     * property set to 'ok'.
     *
     * @param url               request url
     * @param [urlReplacements] optional map containing elements that
     *                          should be replaced in the url
     *                          (i.e. {"#{name}" : "NAME1"}.
     *                          Before elements are replaced they are
     *                          url-encoded to support special characters
     * @param [formObject]      the form object, i.e. <form></form>
     * @param [callbackFunction]function to call on success
     * @param [invalidFieldsCallback]
     * @param [loader]
     */
    this.postSubmitJSON = function(url, urlReplacements, formObject, callbackFunction, invalidFieldsCallback, loader) {
        var self = this;

//        self.block();
        if (loader) {
            $.blockUI({ message: '<img src="images/ajax-loader.gif"/>' });
        }
        formObject.ajaxSubmit({
            type: "POST",
            url: self.replaceInUrl(url,urlReplacements),
            dataType:'json',
            iframe:true,
            success: function(data) {
                if (loader) {
                    $.unblockUI();
                }
                if (data.status.statusCode == 401) {
                    if (typeof(invalidFieldsCallback) === 'function') {
                        invalidFieldsCallback.call(this, data);
                    } else {
                        migor.dialog.openErrorDialog(data.status.errorMessage);
                    }
                } else if (data.status.statusCode != 0) {
                    migor.dialog.openErrorDialog(data.status.errorMessage);
                } else {
                    callbackFunction(data);
                }
            },
            error:  function() {
                if (loader) {
                    $.unblockUI();
                }
                migor.dialog.openErrorDialog('Service not available');
            }
        });
    };

    this.generateArgsFromAoData = function(aoData) {

        var columns = aoData[1].value;

        var args = {};
        args["offset"] = aoData[3].value;
        args["span"] = aoData[4].value;


        for (var i=5; i<5+columns; i++) {
            var propIndex = i-5;
            var propName = aoData[i].value;

            var searchValue = aoData[7+columns+(propIndex*3)].value;
            if (aoData[7+columns+(propIndex*3)+2].value == true && searchValue != null && searchValue != '' && searchValue != '~') {

                if (searchValue.indexOf("~") >= 0) {
                    args[propName] = searchValue.split('~');
                } else {
                    args[propName] = searchValue;
                }
            }
        }
        return args;
    };

    /**
     *
     * @param url
     * @param urlReplacements
     * @returns {*}
     */
    this.replaceInUrl = function(url, urlReplacements) {
        var self = this;

        if (urlReplacements == null)
            return url;
        for (var key in urlReplacements) {
            //noinspection JSUnfilteredForInLoop
            var value= urlReplacements[key];
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
    this.urlEncodePathParameter = function(value) {

        // be on the safe side
        if (value == null) {
            return null;
        }
        var _value =''+value;

        var encodeMe = {
            "?":"%3F",
            "%":"%25",
            "/": "%2F"
        };
        var result="";
        for ( var i = 0; i < _value.length; i++ ) {
            result += encodeMe[_value.charAt(i)] == undefined ? _value.charAt(i) : encodeMe[_value.charAt(i)];
        }
        return result;
    };

    this.block = function() {
        $.blockUI({ message: $('#block'), css: { position:'relative', top:'0px', left:'0px', width:'100%', height:'100%', 'vertical-align':'middle', background: 'none', color: '#fff'} });
    };

    this.unblock = function() {
        $.unblockUI();
    };


};
