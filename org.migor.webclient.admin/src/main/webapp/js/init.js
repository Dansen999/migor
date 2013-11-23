migor.bootstrap = new function () {

    this.init = function () {
        var self = this;
//        $('body').addClass('ui-widget');

        // Disable client side caching
        REST.antiBrowserCache = false;

        // init titleBar
        $('#migor-titleBar').titleBar({
            headline: "Migor - Administration",
            subHeadline: '> Version ' + version + ' Revision ' + buildNumber,
            info: $('<span></span>').geoLocation()
        });


        var menuSettings = [
            {
                "label": 'System',
                "menus": [
                    {page: migor.pageNodeStatus},
                    {page: migor.pageCacheEntries}
                ]
            },
            {
                "label": 'Location',
                "menus": [
                    {page: migor.pageLocationEntries}
                ]
            }
        ];


        // init menuBar
        var menu = $('#migor-menuBar');
        self.appendMenus(menu, menuSettings);


        var menuItem = $('<li></li>');
        var menuItemLink = $('<a href="#">About</a>');
        menuItemLink.click(function () {
            migor.dialog.openMessageDialog('About', '<span style="color: #649C21; font-size: 20px; font-family: A1TelekomMedium;">Migor</span></br><span style="margin-top: 10px; font-family: A1TelekomMedium;">Version ' + version + ' Revision ' + buildNumber + '</span></br></br><span style="font-size: 8px;">build on</span></br><span>' + timestamp + '</span>');
        });

        menuItem.append(menuItemLink);
        menu.append(menuItem);

        menu.menuBar({
            autoExpand: true,
            menuIcon: true,
            buttons: true
        });

        // init content
        $('#migor-content').tabs();

    };

    this.appendMenus = function (container, settings) {
        var self = this;
        $.each(settings, function (index, m) {
            var item;
            var itemContainer;

            if (m.menus != null) {
                item = $('<a href="#">' + m.label + '</a>');
                var subMenu = $('<ul></ul>');
                self.appendMenus(subMenu, m.menus);

                itemContainer = $('<li></li>');
                itemContainer.append(item);
                itemContainer.append(subMenu);
            } else if (m.page != null) {
                item = $('<a href="#">' + m.page.options.label + '</a>');
                item.click(function () {
                    migor.bootstrap.open(m.page);

                });
                itemContainer = $('<li></li>');
                itemContainer.append(item);
            }
            container.append(itemContainer);
        });
    };

    this.open = function (page, argument) {
        var id = page.options.id;
        var tab = $('#migor-content');

        var content = tab.find('#' + id);

        if (content.length == 0) {
            // create new tab
            var header = $('<a href="#' + id + '">' + page.options.label + '</a>');
            var newContent = $('<div id="' + id + '" class="ui-tabs-panel ui-widget-content ui-corner-bottom"></div>');

            if (page.options.closable) {
                var closeButton = $('<span class="ui-icon ui-icon-close"></span>');
                //noinspection JSUnusedLocalSymbols
                closeButton.click(function (event) {
                    header.parent().remove();
                    newContent.remove();
                    tab.tabs("refresh");
                });
                header.append(closeButton);
                header.addClass('closable');
            }


            tab.find('ul:first').append($('<li></li>').append(header));
            tab.append(newContent);

            page.init(newContent, argument);

            // refresh
            tab.tabs("refresh");
        } else {
            // refresh tab content
            page.refresh(content, argument);
        }
        // Activate current tab
        var index = tab.find('a[href="#' + id + '"]').parent().index();
        tab.tabs('option', 'active', index);
    };
};
