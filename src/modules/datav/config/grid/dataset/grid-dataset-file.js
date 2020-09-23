export default {
    columnDefs: [
        { headerName: "文件名称", field: "fileName", editable: true},
        { headerName: "业务名称", field: "fileName", editable: true},
        { headerName: "目标表名称", field: "tableName", editable: true},
        {
            colId: "#op",
            headerName: "操作",
            cellRenderer: "OpCellRender",
            suppressSizeToFit: true,
            pinned: "right",
            cellRenderParams: {
                opButtons: [
                    {
                        key: "update",
                        title: "表结构维护",
                        onClick: (params)=>{
                            params.api.execCmd('cmdUpdate', params);
                        }
                    },
                ],
            },
        }
    ],
    rowData : [],
    ext: {
        fetchUrl:'',
        statusBar: false, //是否显示状态栏
        autoFitColumnMode: 1, //自动列宽模式：1-根据内容自适应，当有剩余宽度时再自动Fit到窗口大小， 2-根据内空自适应    3-根据窗口大小自适应
        pagingMode: false, //是否分页模式
        pageOptions: {},
    }
}