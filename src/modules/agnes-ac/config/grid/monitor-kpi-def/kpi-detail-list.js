export default {
    columnDefs: [],
    rowData:[],
    defaultColDef: {
        enableRowGroup: true,
        menuTabs: ['generalMenuTab', 'filterMenuTab', 'columnsMenuTab'],
    },
    tooltipShowDelay: 0,
    rowSelection: 'multiple',
    ext: {
        pagingMode: false, //是否分页
        checkboxColumn: 2, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: true,
    }
};
