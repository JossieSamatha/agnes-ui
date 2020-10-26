import request from '@hex/gf-ui/src/util/request';

class DatavDatasetApi {
  add(params) {
    return request({
      url: '/datav/dataset/add',
      method: 'post',
      data: params
    })
  }

  edit(params) {
    return request({
      url: '/datav/dataset/edit',
      method: 'post',
      data: params
    })
  }

  getFieldList(params) {
    return request({
      url: '/datav/dataset/getFieldList',
      method: 'post',
      data: params
    })
  }

  queryFieldList(params) {
    return request({
      url: '/datav/dataset/queryFiledList',
      method: 'post',
      data: params
    })
  }

  queryList(params) {
    return request({
      url: '/datav/dataset/queryList',
      method: 'get',
      params
    })
  }

  remove(params) {
    return request({
      url: '/datav/dataset/remove',
      method: 'post',
      data: params
    })
  }

}

export default new DatavDatasetApi()