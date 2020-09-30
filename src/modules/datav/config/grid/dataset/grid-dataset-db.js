export default {
    columnDefs: [
        {headerName: "原字段", field: "columnName", hide: true},
        {headerName: "原类型", field: "columnType", cellClass: "center", editable: false, hide: true},
        {headerName: "显示字段", field: "columnLabel", cellClass: "center", editable: true},
        {headerName: "存储字段", field: "savedColumn", cellClass: "center", editable: false, hide: true},
        {
            headerName: "字段类型", field: "columnTypeName", editable: true, cellEditor: 'select',
            cellEditorParams: {
                values: ["text", "number", "date"],
                formatValue: function (value) {
                    return value;
                }
            },
            valueFormatter: function (params) {
                let fieldFormatDict = [{"value": "text", "label": "文本"},
                    {"value": "number", "label": "数值"},
                    {"value": "date", "label": "日期"}
                ];
                let value = params.value;
                let label = '未知';
                fieldFormatDict.forEach(function (data) {
                    if (data.value === value) {
                        label = data.label;
                    }
                });
                return label;
            }
        },
        {headerName: "格式化", field: "formatter", cellClass: "right", editable: true},
        {
            headerName: "是否显示", field: "visible", editable: true, cellEditor: 'select',
            cellEditorParams: {
                values: [true, false],
                formatValue: function (value) {
                    return value;
                },
                default: true
            },
            valueFormatter: function (params) {
                let fieldFormatDict = [{"value": true, "label": "是"},
                    {"value": false, "label": "否"}
                ];
                let value = params.value;
                let label = '否';
                fieldFormatDict.forEach(function (data) {
                    if (data.value === value) {
                        label = data.label;
                    }
                });
                return label;
            }
        },
        {
            headerName: "操作",
            colId: "#op",
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
                ],
            },
            hide: true
        },
    ],
    rowData: [],
    ext: {
        statusBar: true, //是否显示状态栏
        autoFitColumnMode: 1, //自动列宽模式：1-根据内容自适应，当有剩余宽度时再自动Fit到窗口大小， 2-根据内空自适应    3-根据窗口大小自适应
        checkboxColumn: 0,
        pagingMode: false,
    }
}