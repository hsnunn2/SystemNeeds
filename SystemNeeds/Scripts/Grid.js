$(document).ready(function () {
    var vmURL = "https://localhost:44320/api/NeedViewModel/GETVM";

    var theme = 'arctic';

    var needSource =
    {

        type: "GET",
        datatype: "json",
        credentials: true,
        datafields: [
            { name: 'ID', type: 'int' },
            { name: 'Name', type: 'string'},
            { name: 'Description', type: 'string'},
            { name: 'NeedDate', type: 'date'},
            { name: 'ProjectList', type: 'array' }

        ],
       // id: 'NeedProject.ID',
        url: vmURL,
        ID: 'ID',
        pager: function (pagenum, pagesize, oldpagenum) {
            // callback called when a page or page size is changed.
        }
    };
    var vmDataAdapter = new $.jqx.dataAdapter(needSource);
    //alert(needSource.length);
   // var vmDataAdapter = new $.jqx.dataAdapter(needSource, {
   //     contentType: 'application/json; charset=utf-8',
   //    downloadComplete: function (data, textStatus, jqXHR) {
    //        return data.d;
    //    }
    //});

    
     var cpdSource =
      {
         datatype: "json",
          withCredentials: true,
          datafields: [
              { name: 'Id', type: 'number' },
              { name: 'Title', type: 'string' },
              { name: 'InServiceDate', type: 'date' }
  
          ],
         localdata: vmDataAdapter.records.ProjectList,
          pager: function (pagenum, pagesize, oldpagenum) {
              // callback called when a page or page size is changed.
          }
      };
      
    var nestedGrids = new Array();

    var cpdsDataAdapter = new $.jqx.dataAdapter(cpdSource);
    // var cpds = cpdsDataAdapter.records;
    // alert("CPDS " + cpds.records.);

    var initrowdetails = function (index, parentElement, gridElement, record) {
        //var id = record.uid.toString();
        var id = record.ID.toString();
       // alert("ID > " + id);
        //debugger;
      //  alert("record.CPDList.length = " + record.ProjectList.length.toString());
        var grid = $($(parentElement).children()[0]);
        nestedGrids[index] = grid;
        var filtergroup = new $.jqx.filter();
        var filter_or_operator = 1;
        var filtervalue = id.toString();
        var filtercondition = 'equal';
        var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);

        var projectssbyid = [];
        for (var m = 0; m < record.ProjectList.length; m++) {
            // var result = filter.evaluate(cpds[m]["NeedID"]);
            // if (result)
            projectssbyid.push(record.ProjectList[m]);
        }

        var cpdssource = {
            datatype: "json",
            withCredentials: true,
            datafields: [
                { name: 'Id', type: 'integer' },
                { name: 'Title', type: 'string' },
                { name: 'InServiceDate', type: 'date' },
                { name: 'LastModified', type: 'date' }
            ],
            id: 'Id',
            localdata: projectssbyid
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
                { text: 'System-Need ID', dataField: 'ID', width: 60 },
                { text: 'Need Title', dataField: 'Name', width: 200 },
                { text: 'Need Description', dataField: 'Description', width: 200 },
                { text: 'Need Date', dataField: 'NeedDate', cellsformat: 'yyyy-MM-dd', width: 120 },
                //{
                //   text: 'CPDs Assigned', datafield: 'CPDAssignedToNeeds', width: 100,
                  //  cellsrenderer: function (row, colum, value) {
                   //     var cell = '<div style="margin-top:5px;">';
                    //    cell += '<div style="background: #058dc7; float: left; width: ' + value + 'px; height: 16px;"></div>';
                    //    cell += '<div style="margin-left: 5px; float: left;">' + value.toString() + '%' + '</div>';
                     //   cell += '</div>';
                     //   return cell;
                   // }
                    
               // }//,
                //{ text: 'CPD List', dataField: 'CPDList', width: 200 }

            ]
});
    $("#print").jqxButton();
    $("#excelExport").jqxButton({ theme: theme });
    $("#excelExport").click(function () {
        $("#grid").jqxGrid('exportdata', 'xls', 'jqxGrid', false);
    });

    $("#print").click(function () {
        var gridContent = $("#grid").jqxGrid('exportdata', 'html');
        var newWindow = window.open('', '', 'width=800, height=500'),
            document = newWindow.document.open(),
            pageContent =
                '<!DOCTYPE html>\n' +
                '<html>\n' +
                '<head>\n' +
                '<meta charset="utf-8" />\n' +
                '<title>jQWidgets Grid</title>\n' +
                '</head>\n' +
                '<body>\n' + gridContent + '\n</body>\n</html>';
        document.write(pageContent);
        document.close();
        newWindow.print();
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