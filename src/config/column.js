const colCrtUser = {headerName: "创建人", field: "createUser"};
const colCrtTm = {headerName: "创建时间", field: "createTime"};
const colUpdUser = {headerName: "更新人", field: "updateUser"};
const colUpdTm = {headerName: "更新时间", field: "updateTime"};


function buildOpCol(width, buttons) {
    let opButtons = [];

    buttons.forEach(x => {
        const item = {
            key: x.key,
            title: x.title,
            cellClass: x.cellClass,
            onClick: (params) => {
                params.api.execCmd(x.command || x.key, params);
            }
        };
        opButtons.push(item);
    });

    return {
        colId: "#op", headerName: "操作",
        cellRenderer: "OpCellRender",
        suppressSizeToFit: true,
        pinned: "right",
        width: width,
        cellRenderParams: {
            opButtons: opButtons
        }
    }
}

export default {
    colCrtUser,
    colCrtTm,
    colUpdUser,
    colUpdTm,
    buildOpCol
}
