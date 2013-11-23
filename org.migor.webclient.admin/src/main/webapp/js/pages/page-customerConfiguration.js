/**
 * @author Daniel Scheidle
 *         daniel.scheidle@ucs.at
 *         Unique Computing Solutions GmbH
 */
migor.pageCustomerConfiguration = new function () {

    this.options = {
        "id": 'customerConfig',
        "closable": true,
        "label": 'Customers',

        "funcGetEntities": null
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
            self.refresh(content);
        });

        content.append(refreshButton);

        self.displayDataTable(content);
    };

    this.refresh = function (content) {

        table.fnDraw();
    };


    this.resizeDataTables = function () {
        table.parent().css('height', hpip.pageCustomerConfiguration.getRemainingDataTableContentHeight() + "px");
        table.dataTable().fnAdjustColumnSizing();
    };

    this.getRemainingDataTableContentHeight = function () {
        // measured height from the top of the page until including the table headers
        var topHeight = 299;
        // measured height of the table footer + 20% buffer for safety
//        var bottomHeight = 40 *1.2;
        return $(window).height() - topHeight;
    };

    this.displayDataTable = function (content) {
        var self = this;

        table = $('<table></table>');
        content.append(table);

        table.dataTable({
            "sDom": '<"top dataTables_filter"l>rt<"bottom"ip><"clear">',
            "bServerSide": true,
//            "sAjaxSource": "/hpip",
            "fnServerData": function (aSource, aoData, successCallback) {
                hpip.rest.request(self.options.funcGetEntities, hpip.rest.generateArgsFromAoData(aoData), function (data, totalRecords) {
                    successCallback({aaData: data, iTotalDisplayRecords: totalRecords, iTotalRecords: totalRecords});
                });
            },
            // show 'processing' indicator when busy
            "bProcessing": false,
            "bPaginate": true,
            "bSort": false,
            "bInfo": true,
            "bFilter": true,

            // plug into jQuery UI theme
            "bJQueryUI": true,
            "sPaginationType": "full_numbers",
            // use rbt-default number of entries
            "aLengthMenu": hpip.configuration.dataTable.aLengthMenu,
            "iDisplayLength": hpip.configuration.dataTable.iDisplayLength,
            "bDestroy": true,
            "oLanguage": hpip.configuration.dataTable.oLanguage,

            "aoColumns": [
                { "mData": "msisdn", sTitle: "MSISDN", sClass: "center", "bSortable": false,
                    "mRender": function (tableData, type, full) {
                        return hpip.utils.escapeHtml(tableData);
                    }
                },
                { "mData": "businessAccount", sTitle: "Business Account", sClass: "left", "bSortable": false,
                    "mRender": function (tableData, type, full) {
                        if (tableData) {
                            return 'License plate: ' + hpip.utils.escapeHtml(tableData.licensePlate) + '<br/>' +
                                'City id: ' + hpip.utils.escapeHtml(tableData.cityId) + '<br/>' +
                                'Remaining minutes: ' + hpip.utils.escapeHtml(tableData.remainingMinutes) + '<br/>' +
                                'Remaining Eurocents: ' + hpip.utils.escapeHtml(tableData.remainingEuroCents)
                                ;
                        } else {
                            return '';
                        }
                    }
                },

                { "mData": "privateAccount", sTitle: "Private Account", sClass: "left", "bSortable": false,
                    "mRender": function (tableData, type, full) {
                        if (tableData) {
                            return 'License plate: ' + hpip.utils.escapeHtml(tableData.licensePlate) + '<br/>' +
                                'City id: ' + hpip.utils.escapeHtml(tableData.cityId) + '<br/>' +
                                'Remaining minutes: ' + hpip.utils.escapeHtml(tableData.remainingMinutes) + '<br/>' +
                                'Remaining Eurocents: ' + hpip.utils.escapeHtml(tableData.remainingEuroCents)
                                ;
                        } else {
                            return '';
                        }
                    }
                },
                { "mData": "modifiedAt", sTitle: "Modified At", sClass: "center", "bSortable": true,
                    "mRender": function (tableData, type, full) {
                        return hpip.utils.escapeHtml(tableData);
                    }
                }
            ]
        }).dataTable().columnFilter({
                sPlaceHolder: "head:after",
                aoColumns: [
                    { type: "text" }
                ]
            }
        );
    };
};
