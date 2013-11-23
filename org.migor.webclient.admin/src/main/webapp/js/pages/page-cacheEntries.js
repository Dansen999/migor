/**
 * @author Daniel Scheidle
 *         daniel.scheidle@ucs.at
 *         Unique Computing Solutions GmbH
 */
migor.pageCacheEntries = new function () {

    this.options = {
        "id":'cacheEntries',
        "closable":true,
        "label": 'Cache Entries',

        // function defined in the js client stub
        // name is Classname.Methodname
        "funcGetEntries": CacheAdminService.getEntries
    };

    var table = null;
    var cacheSelection = null;

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
        refreshButton.on('click', function() {
            self.refresh();
        });
        content.append(refreshButton);

        var cacheSelectionContainer = $('<div style="float: right;"></div>');


        cacheSelection = $('<select></select>');
        for (var i=0; i<cacheAreas.length; i++) {
            cacheSelection.append('<option value="'+cacheAreas[i]+'">'+cacheAreas[i]+'</option> ');
        }
        cacheSelection.on('change', function() {
            self.refresh();
        });

        cacheSelectionContainer.append('<span>Cache Area: </span>');
        cacheSelectionContainer.append(cacheSelection);
        content.append(cacheSelectionContainer);

        self.displayDataTable(content);
    };

    this.refresh = function () {
        table.fnDraw();
    };


    this.displayDataTable = function(content, data) {
        var self = this;

        table = $('<table width="100%"></table>');
        content.append(table);

        table.dataTable({
            "bServerSide": true,
            "fnServerData": function(aSource, aoData, successCallback) {
                migor.rest.request(self.options.funcGetEntries, {"area": cacheSelection.val()}, function(data, totalRecords) {
                    successCallback({aaData: data, iTotalDisplayRecords: totalRecords, iTotalRecords: totalRecords});
                }, null, true);
            },
            "bProcessing": false,
            "bPaginate": false,
            "bSort": false,
            "bFilter": true,
            "bJQueryUI": true,
            "aLengthMenu": migor.configuration.dataTable.aLengthMenu,
            "iDisplayLength" : migor.configuration.dataTable.iDisplayLength,
            "bDestroy": true,
            "oLanguage": migor.configuration.dataTable.oLanguage,
            "aoColumns": [
                { "mData": "key", sTitle: "Key", sClass:"right", "bSortable": false, "bVisible": true, "sWidth": '100px',
                    "mRender": function ( tableData, type, full ) {
                        return migor.utils.escapeHtml(tableData);
                    }
                },
                { "mData": "value", sTitle: "Value", "bSortable": false, "bVisible": true,
                    "mRender": function ( tableData, type, full ) {
                        return migor.utils.escapeHtml(tableData);
                    }
                }
            ]
        });
    };
};
