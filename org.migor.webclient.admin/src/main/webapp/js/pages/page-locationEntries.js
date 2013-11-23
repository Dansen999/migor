/**
 * @author Daniel Scheidle
 *         daniel.scheidle@ucs.at
 *         Unique Computing Solutions GmbH
 */
migor.pageLocationEntries = new function () {

    this.options = {
        "id": 'locationEntries',
        "closable": true,
        "label": 'Location Entries',

        // function defined in the js client stub
        // name is Classname.Methodname
        "funcGetEntries": UserService.getLocationMarks
    };

    var table = null;
    var map = null;

    this.init = function (content) {
        var self = this;


        var refreshButton = $('<div></div>');
        refreshButton.button(
            {
                label: 'refresh',
                icons: {
                    primary: 'ui-icon-refresh'
                }
            }
        );
        refreshButton.on('click', function () {
            self.refresh();
        });

        var buttonDiv = $('<div style="width: 100%;"></div>')
        buttonDiv.append(refreshButton);
        content.append(buttonDiv);

        migor.rest.request(self.options.funcGetEntries, {}, function (data, totalRecords) {
            self.displayDataTable(content, data);
            self.displayMap(content, data);

            content.append('<div class="clear"></div>');
        });

    };

    this.refresh = function () {
        var self = this;
        migor.rest.request(UserService.setLocation, {$entity: JSON.stringify(self.map.openMap('getMainMarkerLocation'))}, function () {
            table.fnDraw();
        });

    };

    this.displayMap = function (content, data) {
        var self = this;


        self.map = $('<div style="float: right; width:49%;height:389px"></div>');
        //map.openStreetMap({
        //    center: {lat: data.userLocation.latitude, lng: data.userLocation.longitude},
        //    zoom: 5, // Zoom level (1 to 18)
        //    zoombar: true // Show the zoombar? (true or false)
        //});
        content.append(self.map);

        self.map.openMap({callback: function () {
            self.refresh();
        }});
        self.map.openMap('center', data.userLocation.latitude, data.userLocation.longitude, 14);
        self.map.openMap('setMainMarker', data.userLocation);
        for (var i = 0; i < data.boundingBoxes.length; i++) {
            self.map.openMap('addBBox', data.boundingBoxes[i], 'yellow');
        }
        self.setLocationMarkers(data);


    };

    this.setLocationMarkers = function (data) {
        var self = this;
        self.map.openMap('setMarkers', data.locationMarks);
    };

    this.displayDataTable = function (content, data) {
        var self = this;

        table = $('<table width="100%"></table>');
        content.append($('<div style="float: left; width: 49%;"></div>').append(table));

        table.dataTable({
            "bServerSide": true,
            "fnServerData": function (aSource, aoData, successCallback) {
                migor.rest.request(self.options.funcGetEntries, {}, function (data, totalRecords) {
                    successCallback({aaData: data.locationMarks});
                    self.setLocationMarkers(data);

                }, null, true);
            },
            "aaData": data.locationMarks,
            "bProcessing": false,
            "bPaginate": false,
            "bSort": false,
            "bFilter": true,
            "bJQueryUI": true,
            "aLengthMenu": migor.configuration.dataTable.aLengthMenu,
            "iDisplayLength": migor.configuration.dataTable.iDisplayLength,
            "bDestroy": true,
            "oLanguage": migor.configuration.dataTable.oLanguage,
            "aoColumns": [
                { "mData": "locationMarkType", sTitle: "Type", sClass: "center", "bSortable": false, "bVisible": true, "sWidth": '50px',
                    "mRender": function (tableData, type, full) {
                        return migor.utils.escapeHtml(tableData);
                    }
                },
                { "mData": "name", sTitle: "Name", sClass: "right", "bSortable": false, "bVisible": true,
                    "mRender": function (tableData, type, full) {
                        return migor.utils.escapeHtml(tableData);
                    }
                },
                { "mData": "lastModifiedAt", sTitle: "Modified At", sClass: "center", "bSortable": false, "bVisible": true, "sWidth": '250px',
                    "mRender": function (tableData, type, full) {
                        return migor.utils.escapeHtml(tableData);
                    }
                }
            ]
        });
    };
};
