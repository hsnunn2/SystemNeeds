$(document).ready(function () {
    var vmURL = "https://localhost:44320/api/NeedViewModel/GetVM";
   
    var theme = 'arctic';

    var needSource =
    {
        datatype: "json",
        datafields: [
            { name: 'NeedID', type: 'int' },
            { name: 'NeedTitle', type: 'string' },
            { name: 'NeedDescription', type: 'string' },
            { name: 'NeedDate', type: 'date' },
            { name: 'ProjectList', type: 'array' }

        ],
        id: 'ID',
        url: vmURL,
        pager: function (pagenum, pagesize, oldpagenum) {
            // callback called when a page or page size is changed.
        }
    };
    var vmDataAdapter = new $.jqx.dataAdapter(needSource);

    /*  var cpdSource =
      {
          datatype: "json",
          datafields: [
              { name: 'ID', type: 'number' },
              { name: 'Title', type: 'string' },
              { name: 'InServiceDate', type: 'date' }
  
          ],
          localdata: vmDataAdapter.records.cpdlist,
          pager: function (pagenum, pagesize, oldpagenum) {
              // callback called when a page or page size is changed.
          }
      };
      */
    var nestedGrids = new Array();

    //var cpdsDataAdapter = new $.jqx.dataAdapter(cpdSource);
    // var cpds = cpdsDataAdapter.records;
    // alert("CPDS " + cpds.records.);

    var initrowdetails = function (index, parentElement, gridElement, record) {
        //var id = record.uid.toString();
        var id = record.NeedID.toString();
        debugger;
        //alert("record.CPDList.length = " + record.CPDList.length.toString());
        var grid = $($(parentElement).children()[0]);
        nestedGrids[index] = grid;
        var filtergroup = new $.jqx.filter();
        var filter_or_operator = 1;
        var filtervalue = id.toString();
        var filtercondition = 'equal';
        var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);

        var cpdsbyid = [];
        for (var m = 0; m < record.CPDList.length; m++) {
            // var result = filter.evaluate(cpds[m]["NeedID"]);
            // if (result)
            cpdsbyid.push(record.CPDList[m]);
        }

        var cpdssource = {
            datatype: "json",
            datafields: [
                { name: 'Id', type: 'int' },
                { name: 'Title', type: 'string' },
                { name: 'InServiceDate', type: 'date' },
                { name: 'LastModified', type: 'date' }
            ],
            id: 'Id',
            localdata: cpdsbyid
        }

        var nestedGridAdapter = new $.jqx.dataAdapter(cpdssource);
        if (grid != null) {
            grid.jqxGrid({
                source: nestedGridAdapter, width: 650, height: 120,
                columns: [
                    { text: 'Project ID', datafield: 'Id', width: 80 },
                    { text: 'Project Title', datafield: 'Title', width: 200 },
                    { text: 'In Service Date', datafield: 'InServiceDate', width: 150 },
                    { text: 'Last Modified', datafield: 'LastModified', width: 150 }
                ]
            });
        }
    }

    var renderer = function (row, column, value) {
        return '<span style="margin-left: 4px; margin-top: 9px; float: left;">' + value + '</span>';
    }



    $("#grid").jqxGrid(
        {
            width: 850,
            source: vmDataAdapter,
            selectionmode: 'multiplerowsextended',
            theme: theme,
            pageable: true,
            pageSize: 5,
            sortable: true,
            filterable: true,
            rowdetails: true,
            initrowdetails: initrowdetails,
            rowdetailstemplate: { rowdetails: "<div id='grid' style='margin: 10px;'></div>", rowdetailsheight: 160, rowdetailshidden: true },
            // rendergridrows: rendergridrows,
            // ready: function () {
            //  $("#grid").jqxGrid('showrowdetails', 1);
            // },
            columns: [
                { text: 'System-Need ID', dataField: 'NeedID', width: 60 },
                { text: 'Need Title', dataField: 'NeedTitle', width: 200 },
                { text: 'Need Description', dataField: 'NeedDescription', width: 200 },
                { text: 'Need Date', dataField: 'NeedDate', cellsformat: 'yyyy-MM-dd', width: 120 },
                {
                    text: 'CPDs Assigned', datafield: 'CPDAssignedToNeeds', width: 100,
                    cellsrenderer: function (row, colum, value) {
                        var cell = '<div style="margin-top:5px;">';
                        cell += '<div style="background: #058dc7; float: left; width: ' + value + 'px; height: 16px;"></div>';
                        cell += '<div style="margin-left: 5px; float: left;">' + value.toString() + '%' + '</div>';
                        cell += '</div>';
                        return cell;
                    }
                }//,
                //{ text: 'CPD List', dataField: 'CPDList', width: 200 }

            ]
        });

    $("#saveState").jqxButton({ theme: theme });
    $("#loadState").jqxButton({ theme: theme });
    var state = null;
    $("#saveState").click(function () {
        // save the current state of jqxGrid.
        state = $("#grid").jqxGrid('savestate');
    })
        ;
    $("#loadState").click(function () {
        // load the Grid's state.
        if (state) {
            $("#grid").jqxGrid('loadstate', state);
        }
        else {
            $("#grid").jqxGrid('loadstate');
        }
    });


    $('#events').jqxPanel({ width: 300, height: 300 });
    $("#grid").on("pagechanged", function (event) {
        $("#eventslog").css('display', 'block');
        if ($("#events").find('.logged').length >= 5) {
            $("#events").jqxPanel('clearcontent');
        }
        var args = event.args;
        var eventData = "pagechanged <div>Page:" + args.pagenum + ", Page Size: " + args.pagesize + "</div>";
        $('#events').jqxPanel('prepend', '<div class="logged" style="margin-top: 5px;">' + eventData + '</div>');
        // get page information.
        var paginginformation = $("#grid").jqxGrid('getpaginginformation');
        $('#paginginfo').html("<div style='margin-top: 5px;'>Page:" + paginginformation.pagenum + ", Page Size: " + paginginformation.pagesize + ", Pages Count: " + paginginformation.pagescount + "</div>");
    });
    $("#grid").on("pagesizechanged", function (event) {
        $("#eventslog").css('display', 'block');
        $("#events").jqxPanel('clearcontent');
        var args = event.args;
        var eventData = "pagesizechanged <div>Page:" + args.pagenum + ", Page Size: " + args.pagesize + ", Old Page Size: " + args.oldpagesize + "</div>";
        $('#events').jqxPanel('prepend', '<div style="margin-top: 5px;">' + eventData + '</div>');
        // get page information.          
        var paginginformation = $("#grid").jqxGrid('getpaginginformation');
        $('#paginginfo').html("<div style='margin-top: 5px;'>Page:" + paginginformation.pagenum + ", Page Size: " + paginginformation.pagesize + ", Pages Count: " + paginginformation.pagescount + "</div>");
    });

});