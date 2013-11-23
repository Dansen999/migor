$.widget("migor.mobile", {

    user: null,

    options: {

    },
    _create: function () {
        var self = this;

        if (!self.user) {

            var loginTextField = $('<input class="ui-input-text ui-body-c ui-corner-all ui-shadow-inset" value="" placeholder="Username"/>').textinput({ preventFocusZoom: true });
            var loginButton = $('<a>Start</a>').buttonMarkup();

            self.element.empty();
            self.element.append($('<p></p>').append('<div style="margin-top: 100px;">&nbsp;</div>'));
            self.element.append($('<p></p>').append(loginTextField));
            self.element.append($('<p></p>').append(loginButton));
        }

    },
    _setOptions: function () {
        this._superApply(arguments);
    }
});

