/**
 * 09.07.13 16:46
 * @author Daniel Scheidle
 *         daniel.scheidle@ucs.at
 *         Unique Computing Solutions GmbH
 */
migor.dialog = new function() {

    var _defaultDialogWidth = 420;

    this.openEditor = function(dlgTitle, dlgContent, dlgWidth, okCallback, cancelCallback) {
        _showDialog(
            dlgTitle,
            dlgContent,
            {
                "Cancel": function() {
                    if (typeof(cancelCallback) === 'function') {
                        cancelCallback.call(this);
                    }
                    $( this ).dialog( "close" );
                },
                "Save": function() {
                    if (typeof(okCallback) === 'function') {
                        okCallback.call(this);
                    }
                }
            }, dlgWidth, '', '<span style="float: left; margin-right: .3em;  position: relative; class="ui-icon-table ui-icon ui-icon-pencil"></span>', 'top');

    };

    this.openWarnDialog = function(message, okCallback, cancelCallback) {
        var messageContent = $('<p style="text-align: center;"></p>').append(message);
        _showDialog(
            "Warning",
            messageContent,
            {
                "Cancel": function() {
                    if (typeof(cancelCallback) === 'function') {
                        cancelCallback.call(this);
                    }
                    $( this ).dialog( "close" );
                },
                "Ok": function() {
                    if (typeof(okCallback) === 'function') {
                        okCallback.call(this);
                    }
                    $( this ).dialog( "close" );
                }
            }, null, "ui-state-highlight", '<span style="float: left; margin-right: .3em;  position: relative;" class="ui-icon ui-icon-info"></span>');
    };

    this.openMessageDialog = function(title, message, closeCallback, width) {

        var messageContent = $('<p style="text-align: center;"></p>').append(message);
        _showDialog(
            title,
            messageContent,
            {
                "Ok": function() {
                    if (typeof(closeCallback) === 'function') {
                        closeCallback.call(this);
                    }
                    $( this ).dialog( "close" );
                }
            }, width, '', '<span style="float: left; margin-right: .3em; position: relative;" class="ui-icon ui-icon-info"></span>');
    };

    this.openErrorDialog = function(message, closeCallback) {

        var messageContent = $('<p style="text-align: center;"></p>').text(message);
        _showDialog(
            'Error',
            messageContent,
            {
                "Ok": function() {
                    if (typeof(closeCallback) === 'function') {
                        closeCallback.call(this);
                    }
                    $( this ).dialog( "close" );
                }
            }, null, "ui-state-error", '<span style="float: left; margin-right: .3em; position: relative;" class="ui-icon ui-icon-alert"></span>');
    };

    this.openDialog = function(dlgTitle, dlgContent, buttonCfg, dlgWidth, dialogClass, dialogIcon) {
        _showDialog(dlgTitle, dlgContent, buttonCfg, dlgWidth, dialogClass, dialogIcon);
    };

    function _showDialog(dlgTitle, content, buttonCfg, dialogWidth, dialogClass, dialogIcon, position) {

        var dwidth = dialogWidth ? dialogWidth : _defaultDialogWidth;

        var dialog = _createDialogDiv(dlgTitle );
        dialog.append(content);

        var pos = position?position:'center';

        dialog.dialog(
            {
                width: dwidth,
                minWidth: dwidth,
                maxHeight: $("body").height() - 10,
                autoOpen: true,
                modal: true,
                position:pos,
                buttons: buttonCfg,
                stack: false,
//                resizable: false,
                //add custom style classes to dialog container
//                dialogClass: dialogClass,
                open: function() {
                    dialog.parent().find('.ui-dialog-titlebar').prepend(dialogIcon).addClass(dialogClass);
                },
                close: function() {
                    $(this).dialog('destroy');
                    $(this).remove();
                }
            }
        );


        //add style to title-bar
        /*
         var titleBar = $("#" + dialogId ).parent().children().first();
         titleBar.addClass( titleClass );
         //insert alert icon into title-bar
         titleBar.prepend("<span style='float:left;margin-right:5px' class='ui-icon ui-icon-alert'></span>")
         */
    }

    function _createDialogDiv(dialogTitle) {

        return $("<div title=\""+dialogTitle+"\" class='ui_dialog_content ui_widget_content' style='width: auto; min_height: 50px; height: auto; max-height:"+400+"px;'></div>");
    }
};
