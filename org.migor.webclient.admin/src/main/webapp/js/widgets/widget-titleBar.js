/**
 * 09.07.13 11:10
 * @author Daniel Scheidle
 *         daniel.scheidle@ucs.at
 *         Unique Computing Solutions GmbH
 */
(function( $ ) {

    $.widget( "hpip.titleBar", {
        options: {
            headline: "Administration",
            subHeadline: "> revision 1",
            info:""
        },

        _create: function() {
            var that = this;

            var logo = $('<div class="logo"><img height="90px" src="images/gps.gif"></div>');
            var headline = $('<div class="headline"></div>').text(that.options.headline);

            var subHeadLine = $('<div class="subHeadline"></div>').text(that.options.subHeadline);
            headline.append(subHeadLine);

            var company = $('<div class="company"></div>').append(that.options.info);

            that.element.append(logo);
            that.element.append(headline);
            that.element.append(company);
            that.element.append('<div class="clear"></div>');


            that.element.addClass('header');
        },

        _destroy : function() {
            this.element.empty();
        },

        _setOption: function ( key, value ) {
        }

    });

}( jQuery ));
