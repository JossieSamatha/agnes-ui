export default {
    columnDefs: [
        { headerName: "行业领域", field: "industryField", cellClass: "centre"},
        { headerName: "用电量(mwh)", field: "number", cellClass: "centre"}
        ],
    rowData : [
        {"industryField":"电力-1", "number":"123"},
        {"industryField":"风能-2", "number":"456"}
        ],
    ext: {
        pagingMode: false,
    }
};
