import request from '@hex/gf-ui/src/util/request';

class TableDefineApi {
  addComputed(params) {
    return request({
      url: '/table/define/computed/add',
      method: 'post',
      data: params
    })
  }

  remove(params) {
    return request({
      url: '/table/define/computed/remove',
      method: 'get',
      params
    })
  }

  getDefines(params) {
    return request({
      url: '/table/define/getDefines',
      method: 'post',
      data: params
    })
  }

}

export default new TableDefineApi()