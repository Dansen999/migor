/**
 * 09.07.13 11:10
 * @author Daniel Scheidle
 *         daniel.scheidle@ucs.at
 *         Unique Computing Solutions GmbH
 */
$(function () {

    $.widget("hpip.a1Button", {

        options: {
            label: '',
            clickCallback: null
        },
        _create: function(){
            var that = this;

            // create button link
            var link = $('<a href=""></a>');
            link.append('<span class="button-left"></span>');
            link.append($('<span class="button-center"></span>').text(that.options.label));
            link.append('<span class="button-right"></span>');

            // add click event
            that._on(true, link, {click: 'clickAction'});

            // append to element, add classes
            that.element.addClass("hpip-button");
            that.element.append(link);
        },
        clickAction: function(event) {
            var that = this;
            if (typeof(that.options.clickCallback) === 'function') {
                that.options.clickCallback.call(this);
            }
        }

    });
});