<%@ page import="java.util.Date" %>
<!DOCTYPE html>
<html>
<head>
    <title>Migor Location Chat</title>

    <meta name="viewport" content="initial-scale=1, maximum-scale=1">

    <%
        long buildDate = new Date().getTime();
    %>

    <link href="css/migor-mobile.css?_=<%=buildDate%>" rel="stylesheet" type="text/css"/>
    <link href="css/jquery.mobile-1.3.2.min.css?_=<%=buildDate%>" rel="stylesheet" type="text/css"/>

    <%-- Plugins --%>
    <script type="text/javascript" src="/migor/services/rest/rest.js?_=<%=buildDate%>"></script>

    <script type="text/javascript" src="js/plugin/jquery-1.10.2.js?_=<%=buildDate%>"></script>
    <script type="text/javascript" src="js/plugin/jquery.mobile-1.3.2.js?_=<%=buildDate%>"></script>
    <script type="text/javascript" src="js/rest.js?_=<%=buildDate%>"></script>


    <!-- EXECUTE INIT SCRIPT -->
    <script type="text/javascript">
        version = '${project.version}';
        buildNumber = '${buildNumber}';
        timestamp = new Date(${timestamp});
        socket = null;
        userName = null;

        if (window.location.protocol == 'http:') {
            endpoint = 'ws://' + window.location.host + ':8000/migor/services/socket/chat/global';
        } else {
            endpoint = 'wss://' + window.location.host + ':8443/migor/services/socket/chat/global';
        }

        $(document).ready(function () {
            $('#login-button').on('click', function () {
                login();
            });
            $('#login-username').keypress(function(e) {
                if(e.which == 13) {
                    login();
                }
            });
        });
        $(document).on('pagebeforeshow', "#index", function () {
            logout();
        });
        $(document).on('pagebeforeshow', "#chat", function () {
            socket.send(JSON.stringify({type: 'TOPIC', content: {senderName: userName}}));
            $('#chat-send-button').on('click', function () {
                send();
            });
            $('#chat-send-message').keypress(function(e) {
                if(e.which == 13) {
                    send();
                }
            });
        });
        function logout() {
                    if (socket != null) {
                        try {socket.close();} catch (e) {}
                        socket = null;
                    }
                }
        function login() {
            userName = $('#login-username').val();
            if (userName.length > 0) {
                if (window.WebSocket) {
                    logout();
                    socket = new WebSocket(endpoint);
                    socket.onmessage = function (event) {
                        onMessage(event.data);
                    };
                    socket.onerror = function (event) {
                        $.mobile.changePage("index.jsp", {transition: 'fade'});
                    };
                    socket.onopen = function (event) {
                        $('#chat-content').empty();
                        socket.send(JSON.stringify({type: 'LOGIN', content: {senderName: userName}}));
                        $.mobile.changePage("chat.jsp", {transition: 'fade'});
                    }

                } else {

                }
            }
        }
        function onMessage(message) {
            if (message != null && message != '') {
                var json = JSON.parse(message);

                if (json.type == 'MSG') {
                    $('#chat-content').append('<p><span class="userName">'+json.content.senderName+': </span><span class="message">'+json.content.message+'</span></p>');
                } else if (json.type == 'SERVER') {
                    $('#chat-content').append('<p><span class="message">* '+json.content.message+'</span></p>');
                } else if (json.type == 'TOPIC') {
                    $('#chat-content').append('<p><span class="message">* '+json.content.message+'</span></p>');
                }

                $(document).scrollTop($(document).height());
            }
        }

        function onError(message) {

                }

        function send() {
            var messageInput = $('#chat-send-message');
            var message = messageInput.val();
            if (message.length > 0) {
                messageInput.val('');
                if (socket) {
                    $('#chat-content').append('<p><span class="userName own">'+userName+': </span><span class="message">'+message+'</span></p>');
                    $(document).scrollTop($(document).height());
                    socket.send(JSON.stringify({type: 'MSG', content: {senderName: userName, message: message}}));
                }
            }
        }
    </script>
</head>
<body>

<div id="index" data-role="page">

    <div data-theme="a" data-role="header" data-tap-toggle="false">
        <h1>Migor Chat</h1>
    </div>

    <div id="login-content" data-role="content" style="padding-top: 120px;">
        <p>
            <input id="login-username" type="text" value="" placeholder="Username"/>
        </p>

        <p>
            <button id="login-button" data-role="button">Start</button>
        </p>
    </div>

</div>

</body>
</html>