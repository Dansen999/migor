/**
 * @author Daniel Scheidle
 *         daniel.scheidle@ucs.at
 *         Unique Computing Solutions GmbH
 */
migor.utils = new function () {


    this.getCities = function (callback) {
        // TODO implement service where only id and name is returned!
        migor.rest.request(CityAdminService.getCities, {}, callback);
    };

    this.getCaches = function (callback) {
        migor.rest.request(CacheAdminService.getCaches, {}, callback);
    };

    this.escapeHtml = function (string, trimLength) {
        if (string != null) {
            if (trimLength > 0 && string.length > trimLength) {
                return $('<div><span' + ' title="' + string + '"' + '>' + string.substring(0, trimLength) + '...' + '</span></div>').html();
            } else {
                return  $('<div></div>').text(string).html();
            }
        } else {
            return '';
        }
    };

    this.replaceString = function (text, string, replaceString) {
        if (text != null) {
            return text.replace(string, replaceString);
        } else {
            return '';
        }
    };

    this.mergeJson = function (json1, json2) {
        var json = {};
        for (var key1 in json1) {
            //noinspection JSUnfilteredForInLoop
            json[key1] = json1[key1];
        }
        for (var key2 in json2) {
            //noinspection JSUnfilteredForInLoop
            json[key2] = json2[key2];
        }
        return json;
    };

    /**
     * Returns a human readable and sortable date representation of the timestamp
     * @param displayShort     true if seconds should be trimmed in order to save display space
     * @param ts        timestamp
     * @return String   a human readable and sortable date representation of the timestamp
     */
    this.formatTimeStamp = function (ts, displayShort) {
        if (ts == null || ts <= 0) {
            return "";
        }
        var dateObject = new Date(ts);
        var year = dateObject.getFullYear();
        var month = dateObject.getMonth() + 1;
        var day = dateObject.getDate();
        var hour = dateObject.getHours();
        var minute = dateObject.getMinutes();
        var second = dateObject.getSeconds();
        if (!displayShort) {
            return  year + "-" + (month < 10 ? ("0" + month) : month) + "-" + (day < 10 ? ("0" + day) : day) + " " + (hour < 10 ? ("0" + hour) : hour) + ":" + (minute < 10 ? ("0" + minute) : minute) + ":" + (second < 10 ? ("0" + second) : second);
        }
        return year + "-" + (month < 10 ? ("0" + month) : month) + "-" + (day < 10 ? ("0" + day) : day) + " " + (hour < 10 ? ("0" + hour) : hour) + ":" + (minute < 10 ? ("0" + minute) : minute);
    };


};

