import request from '@hex/gf-ui/src/util/request';

class DatasourceApi {
  add(params) {
    return request({
      url: '/config/datasource/add',
      method: 'post',
      data: params
    })
  }

  get(params) {
    return request({
      url: '/config/datasource/get',
      method: 'get',
      params
    })
  }

  getColumnAndType(params) {
    return request({
      url: '/config/datasource/getColumnAndType',
      method: 'post',
      data: params
    })
  }

  getDataSourceInfo(params) {
    return request({
      url: '/config/datasource/getDataSourceInfo',
      method: 'post',
      data: params
    })
  }

  getTable(params) {
    return request({
      url: '/config/datasource/getTable',
      method: 'post',
      data: params
    })
  }

  getView(params) {
    return request({
      url: '/config/datasource/getView',
      method: 'post',
      data: params
    })
  }

  jdbcTestConnect(params) {
    return request({
      url: '/config/datasource/jdbcTestConnect',
      method: 'post',
      data: params
    })
  }

  listAll() {
    return request({
      url: '/config/datasource/listAll',
      method: 'get'
    })
  }

  list(params) {
    return request({
      url: '/config/datasource/pageList',
      method: 'post',
      params
    })
  }

  remove(params) {
    return request({
      url: '/config/datasource/remove',
      method: 'post',
      data: params
    })
  }

  removeData(params) {
    return request({
      url: '/config/datasource/removeData',
      method: 'post',
      data: params
    })
  }

  update(params) {
    return request({
      url: '/config/datasource/update',
      method: 'post',
      data: params
    })
  }

}

export default new DatasourceApi()