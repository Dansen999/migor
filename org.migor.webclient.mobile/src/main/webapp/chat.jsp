<%@ page import="java.util.Date" %>
<!DOCTYPE html>
<html>
<head>
    <title>Migor Location Chat</title>

    <%
        String buildDate = "${timestamp}";
    %>

    <link href="css/migor-mobile.css?_=<%=buildDate%>" rel="stylesheet" type="text/css"/>
    <link href="css/jquery.mobile-1.3.2.min.css?_=<%=buildDate%>" rel="stylesheet" type="text/css"/>


    <%-- Plugins --%>
    <script type="text/javascript" src="js/plugin/jquery-1.10.2.js?_=<%=buildDate%>"></script>
    <script type="text/javascript" src="js/plugin/jquery.mobile-1.3.2.js?_=<%=buildDate%>"></script>


    <script type="text/javascript" src="js/widget/widget-chat.js?_=<%=buildDate%>"></script>


    <!-- EXECUTE INIT SCRIPT -->
    <script type="text/javascript">
        $(document).ready(function () {
            $('#chat-content').chat();
            $('#send').on('click', function () {
                var message = $('#message').val();
                if (message.length > 0) {
                    $('#chat-content').chat('send', message);
                }
            });
        });

        version = '${project.version}';
        buildNumber = '${buildNumber}';
        socketPath = "ws://${socketURL}";
        try {
            timestamp = new Date(${timestamp});
        } catch (exception) {
            // ignore
        }
    </script>

    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
</head>
<body>

<div data-role="page">

    <div data-role="header" data-position="fixed">
        <h1>Migor Location Chat</h1>
    </div>

    <div id="chat-content" data-role="content">

    </div>

    <div data-role="footer" data-position="fixed">
        <div class="ui-grid-a">
            <div class="ui-block-a" style="width: 70%;">
                <input id="message" type="text" value="" placeholder="Message..."/>
            </div>

            <div class="ui-block-b" style="width: 30%;">
                <button id="send" data-role="button">send</button>
            </div>
        </div>
    </div>
</div>

</body>
</html>