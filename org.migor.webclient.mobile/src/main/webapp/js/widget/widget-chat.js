$.widget("migor.chat", {

    socket: null,

    options: {
        endpoint: '/migor/services/client/socket/chat'
    },
    _create: function () {
        var self = this;


        if (window.WebSocket) {
            var endpoint = 'ws://192.168.0.18:8080' + self.options.endpoint;

            self.socket = new WebSocket(endpoint);
            self.socket.onmessage = function (event) {
                self._onMessage(event.data);
            };
            self.socket.onerror = function (event) {
                self.element.prepend('<p class="message error">Cannot connect to web socket!!</p>');
            };
        } else {
            self.element.prepend('<p class="message error">Web sockets are not supported!!</p>');
        }

    },
    _destroy: function () {
        var self = this;

        if (self.socket) {
            self.socket.close();
            self.socket = null;
        }
    },
    _setOptions: function () {
        this._superApply(arguments);
    },
    _onMessage: function (message) {
        var self = this;

        self.element.prepend('<p class="message received">' + message + '</p>');
    },
    send: function (message) {
        var self = this;

        if (self.socket) {
            self.socket.send(message);
        }
    }
});

