import request from '@hex/goframe-ui/src/util/request'

class AgnesToolManageApi {
    queryMsgObjList() {
        return request({
            url: '/agnes/msg/queryMsgObjList',
            method: 'get'
        })
    }

    save(params) {
        return request({
            url: '/aicm/bizAuth/save',
            method: 'post',
            data: params
        })
    }

}

export default new AgnesToolManageApi()