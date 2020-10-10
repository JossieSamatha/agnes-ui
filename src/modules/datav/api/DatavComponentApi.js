import request from '@hex/gf-ui/src/util/request';

class DatavComponentApi {
  add(params) {
    return request({
      url: '/datav/component/add',
      method: 'post',
      data: params
    })
  }

  edit(params) {
    return request({
      url: '/datav/component/edit',
      method: 'post',
      data: params
    })
  }

  getByName(params) {
    return request({
      url: '/datav/component/getByName',
      method: 'post',
      data: params
    })
  }

  queryFieldList(params) {
    return request({
      url: '/datav/component/queryFieldList',
      method: 'post',
      data: params
    })
  }

  queryList(params) {
    return request({
      url: '/datav/component/queryList',
      method: 'post',
      data: params
    })
  }

  remove(params) {
    return request({
      url: '/datav/component/remove',
      method: 'post',
      data: params
    })
  }

}

export default new DatavComponentApi()