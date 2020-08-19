const colCrtUser = {headerName: "创建人", field: "crtUser"};
const colCrtTm = {headerName: "创建时间", field: "crtTs"};
const colUpdUser = {headerName: "更新人", field: "updateUser"};
const colUpdTm = {headerName: "更新时间", field: "updateTs"};


function buildOpCol(width, buttons, extConfig) {
    let opButtons = [];

    buttons.forEach(x => {
        const item = {
            key: x.key,
            title: x.title,
            cellClass: x.cellClass,
            disabled: x.disabled,
            visiable: x.visiable,
            onClick: (params) => {
                params.api.execCmd(x.command || x.key, params);
            }
        };
        opButtons.push(item);
    });

    const basicConfig = {
        colId: "#op", headerName: "操作",
        cellRenderer: "OpCellRender",
        suppressSizeToFit: true,
        pinned: "left",
        width: width,
        cellRenderParams: {
            opButtons: opButtons
        }
    }

    let config = {...basicConfig, ...extConfig};

    return config;
}

export default {
    colCrtUser,
    colCrtTm,
    colUpdUser,
    colUpdTm,
    buildOpCol
}
