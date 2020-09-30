export default {
    columnDefs: [
        {headerName: "数据集名称", field: "dataSetName", cellClass: "center", editable: false},
        {
            colId: "#op",
            headerName: "操作",
            cellRenderer: "OpCellRender",
            suppressSizeToFit: true,
            pinned: "right",
            width: 100,
            cellRenderParams: {
                opButtons: [
                    {
                        key: "update",
                        title: "编辑",
                        onClick: (params) => {
                            params.api.execCmd('cmdUpdate', params);
                        }
                    },
                    {
                        key: "delete",
                        title: "删除",
                        onClick: (params) => {
                            params.api.execCmd('cmdRemove', params);
                        }
                    },
                ],
            }
        }
    ],
    rowData: [],
    ext: {
        statusBar: true,
        autoFitColumnMode: 1,
        checkboxColumn: 0,
        pagingMode: false,
    }
}