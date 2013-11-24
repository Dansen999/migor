<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0;url=./index.jsp"/>

    <link href="css/migor-mobile.css" rel="stylesheet" type="text/css"/>
    <link href="css/jquery.mobile-1.3.2.min.css" rel="stylesheet" type="text/css"/>

    <script type="text/javascript" src="js/plugin/jquery-1.10.2.js"></script>
    <script type="text/javascript" src="js/plugin/jquery.mobile-1.3.2.js"></script>
</head>
<body>

<div id="chat" data-role="page">

    <div data-role="header" data-position="fixed" data-tap-toggle="false">
        <h1>Migor Chat</h1>
    </div>

    <div id="chat-content" data-role="content">

    </div>

    <div data-role="footer" data-position="fixed" data-tap-toggle="false">

        <div class="ui-grid-a">
            <div class="ui-block-a" style="width: 70%;">
                <input id="chat-send-message" type="text" value="" placeholder="Message..."/>
            </div>

            <div class="ui-block-b" style="width: 30%;">
                <button id="chat-send-button" data-role="button">send</button>
            </div>
        </div>

    </div>
</div>

</body>
</html>