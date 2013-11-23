/**
 * @author Daniel Scheidle
 *         daniel.scheidle@ucs.at
 *         Unique Computing Solutions GmbH
 */
migor.pageNodeStatus = new function () {

    this.options = {
        "id": 'nodeStatus',
        "closable": true,
        "label": 'Status',

        // function defined in the js client stub
        // name is Classname.Methodname
        "funcGetEntries": NodeStatusAdminService.getEntries
    };

    var table = null;

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
        content.append(refreshButton);


        self.displayDataTable(content);
    };

    this.refresh = function () {
        table.fnDraw();
    };


    this.displayDataTable = function (content, data) {
        var self = this;

        table = $('<table width="100%"></table>');
        content.append(table);

        table.dataTable({
            "bServerSide": true,
            "fnServerData": function (aSource, aoData, successCallback) {
                migor.rest.request(self.options.funcGetEntries, {}, function (data, totalRecords) {
                    successCallback({aaData: data, iTotalDisplayRecords: totalRecords, iTotalRecords: totalRecords});
                }, null, true);
            },
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
                { "mData": "id", sTitle: "Node", sClass: "right", "bSortable": false, "bVisible": true,
                    "mRender": function (tableData, type, full) {
                        return migor.utils.escapeHtml(tableData);
                    }
                },
                { "mData": "startedAt", sTitle: "Started At", sClass: "center", "bSortable": false, "bVisible": true, "sWidth": '250px',
                    "mRender": function (tableData, type, full) {
                        return migor.utils.escapeHtml(tableData);
                    }
                },
                { "mData": "lastModifiedAt", sTitle: "Last Modified At", sClass: "center", "bSortable": false, "bVisible": true, "sWidth": '250px',
                    "mRender": function (tableData, type, full) {
                        return migor.utils.escapeHtml(tableData);
                    }
                }
            ]
        });
    };
};
