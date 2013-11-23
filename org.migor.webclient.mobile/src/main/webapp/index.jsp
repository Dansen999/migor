<%@ page import="java.util.Date" %>
<!DOCTYPE html>
<html>
<head>
    <title>Migor Location Chat</title>

    <%
        long buildDate = new Date().getTime();
    %>

    <link href="css/migor-mobile.css?_=<%=buildDate%>" rel="stylesheet" type="text/css"/>
    <link href="css/jquery.mobile-1.3.2.min.css?_=<%=buildDate%>" rel="stylesheet" type="text/css"/>

    <%-- Plugins --%>
    <script type="text/javascript" src="js/plugin/jquery-1.10.2.js?_=<%=buildDate%>"></script>
    <script type="text/javascript" src="js/plugin/jquery.mobile-1.3.2.js?_=<%=buildDate%>"></script>



    <!-- EXECUTE INIT SCRIPT -->
    <script type="text/javascript">
        $(document).ready(function(){
            $('#startButton')
                    .button('disable')
                    .on('click', function() {
                        $.mobile.changePage( "chat.jsp", {
                                    transition: 'fade'
                                }
                        );
                    }
            );


            $('#username').on('change', function(event) {
                if ($('#username').val().length > 2) {
                    $('#startButton').button('enable');
                } else {
                    $('#startButton').button('disable');
                }
            });
        });


        version = '${project.version}';
        buildNumber = '${buildNumber}';

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

    <div data-theme="a" data-role="header">
        <h1>Migor Location Chat</h1>
    </div>

    <div id="login-content" data-role="content" style="padding-top: 120px;">
            <p>
                <input id="username" type="text" value="" placeholder="Username" />
            </p>
            <p>
                <button id="startButton" data-role="button">Start</button>
            </p>
    </div>

</div>

</body>
</html>