export default {
    columnDefs: [
        { headerName: "字段名", field: "name", editable: true, resizable: true},
        // { headerName: "操作", field: "operate" },
        {
            colId: "#op",
            headerName: "操作",
            cellRenderer: "OpCellRender",
            suppressSizeToFit: true,
            pinned: "right",
            width: 258,
            cellRenderParams: {
                opButtons: [
                    {
                        key: "rename",
                        title: "重命名",
                        onClick: (params)=>{
                            params.api.execCmd('rename', params);
                        }
                    },
                    {
                        key: "confirm",
                        title: "确定",
                        onClick: (params)=>{
                            params.api.execCmd('confirm', params);
                        }
                    },
                    {
                        key: "cancel",
                        title: "取消",
                        onClick: (params)=>{
                            params.api.execCmd('cancel', params);
                        }
                    }
                ],
            }
        }

    ],
    rowData : [
        {"name":"日期"},
        {"name":"数量"}
    ],
    ext: {
        pagingMode: false,
        checkboxColumn: 0 //是否显示checkbox列
    }
}