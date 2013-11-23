$.widget("migor.geoLocation", {

    watchId: null,

    latitude: null,
    longitude: null,
    accuracy: null,

    options: {
        autoSend: false,
        mode: 'simple'
    },
    _create: function () {
        var self = this;


        var latitude = $('<span></span>');
        var longitude = $('<span></span>');
        var accuracy = $('<span></span>');

        self.watchId = navigator.geolocation.watchPosition(function (position) {


            latitude.html(position.coords.latitude);
            longitude.html(position.coords.longitude);
            accuracy.html(position.coords.accuracy);


            self.latitude = (position.coords.latitude);
            self.longitude = (position.coords.longitude);
            self.accuracy = (position.coords.accuracy);

            self.send();
            self._autoSend();
        }, function (error) {
            var err = error.code;

            switch (err) {
                case error.PERMISSION_DENIED:
                    migor.dialog.openErrorDialog('No permission to get location info');
                    break;
                case error.POSITION_UNAVAILABLE:
                    migor.dialog.openErrorDialog('Location info no available');
                    break;
                case error.TIMEOUT:
                    migor.dialog.openErrorDialog('Timeout while getting location info');
                    break;
            }

            window.console.log(error.message);
        });

        self.element.empty();
        self.element
            .append(latitude)
            .append(',')
            .append(longitude)
            .append(',')
            .append(accuracy);
    },
    _destroy: function () {
        var self = this;
        navigator.geolocation.clearWatch(self.watchId);
    },
    send: function () {
        var self = this;
        if (self.latitude != null) {
            migor.rest.request(UserService.setLocation,
                {$entity: JSON.stringify({
                    latitude: self.latitude,
                    longitude: self.longitude,
                    accuracy: self.accuracy})
                }
            );
        }
    },
    getPosition: function () {
        return{
            latitude: self.latitude,
            longitude: self.longitude,
            accuracy: self.accuracy
        };
    },
    _autoSend: function () {
        var self = this;


        setTimeout(function () {
            if (self.options.autoSend) {
                self.send();
                self._autoSend();
            }
        }, 10000);


    }

});