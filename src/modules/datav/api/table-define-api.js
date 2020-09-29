import request from "@hex/gf-ui/src/util/request";

class TableDefineApi {
    getDefines(params) {
        return request({
            url: '/table/define/getDefines',
            method: 'post',
            data: params
        })
    }
}

export default new TableDefineApi();