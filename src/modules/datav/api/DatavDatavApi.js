import request from '@hex/gf-ui/src/util/request';

class DatavDatavApi {
  add(params) {
    return request({
      url: '/datav/datav/add',
      method: 'post',
      data: params
    })
  }

  displayDataV(params) {
    return request({
      url: '/datav/datav/displayDataV',
      method: 'post',
      data: params
    })
  }

  edit(params) {
    return request({
      url: '/datav/datav/edit',
      method: 'post',
      data: params
    })
  }

  queryList(params) {
    return request({
      url: '/datav/datav/queryList',
      method: 'get',
      params
    })
  }

  remove(params) {
    return request({
      url: '/datav/datav/remove',
      method: 'post',
      data: params
    })
  }

  uploadImage(params) {
    return request({
      url: '/datav/datav/uploadImage',
      method: 'post',
      data: params
    })
  }

  viewDataV(params) {
    return request({
      url: '/datav/datav/viewDataV',
      method: 'post',
      data: params
    })
  }

}

export default new DatavDatavApi()