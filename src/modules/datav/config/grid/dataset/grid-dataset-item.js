export default {
    columnDefs: [
        {headerName: "序号", field: "id", cellClass: "left", valueGetter: params => params.node.rowIndex + 1},
        {headerName: "数据集名称", field: "dataSetName", cellClass: "left"},
        {
            headerName: "数据集类型", field: "dataSetType", cellClass: "left", valueFormatter: function (item) {
                if (item.value === 'rdb') {
                    return "数据库";
                }
                if (item.value === 'file') {
                    return "文件";
                }
                if (item.value === 'sdata') {
                    return "静态文件";
                }
                if (item.value === 'api') {
                    return "数据抽取";
                }
                return item.value;
            }
        },
        {
            headerName: "衍生数据集", field: "parentId", cellClass: "left", cellRenderer: function (params) {
                if (params.value) {
                    return ('<span style="font-weight:bold;">' + "是" + '</span>');
                } else {
                    return "否";
                }
            }
        },
        {headerName: "数据集描述", field: "dataSetNote", cellClass: "left"},
        {headerName: "创建人", field: "crtUser", cellClass: "left"},
        {headerName: "创建时间", field: "cDate", cellClass: "left"},
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
                        title: "衍生数据集",
                        onClick: (params) => {
                            params.api.execCmd('cmdSetDataset', params);
                        }
                    },
                ],
            }
        },
    ],
    rowMultiSelectWithClick: true,//点击及选择复选框
    suppressCellSelection: true,  //点击不选中单元格
    rowData: [],
    ext: {
        fetchUrl: "/agnes-datav/config/dataset/pageList",//后台查询数据的URL地址
        statusBar: true,     //是否显示状态栏
        autoFitColumnMode: 1,//自动列宽模式：1-根据内容自适应，当有剩余宽度时再自动Fit到窗口大小，2-根据内空自适应，3-根据窗口大小自适应
        pagingMode: true,    //是否分页模式
        pageOptions: {
            pageSize: 20,    //分页大小
            pageSizes: [10, 20, 50, 100, 1000],//可供选择的分页大小
            pagerCount: 5,                     //显示在状态栏上的页数字的个数
            prevText: "上一页",
            nextText: "下一页",
            // layout:"total, sizes, prev, pager, next, jumper"，详见ElementUI分页组件
            layout: "total, sizes, slot, prev, pager, next"
        },
        checkboxColumn: 1, //是否显示checkbox列
    }
};
