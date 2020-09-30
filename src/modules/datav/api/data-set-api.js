import request from '@hex/gf-ui/src/util/request'

class DatasetApi {
    pageList(params) {
        return request({
            url: '/config/dataset/pageList',
            method: 'post',
            data: params
        })
    }

    get(params) {
        return request({
            url: '/config/dataset/get',
            method: 'get',
            params
        })
    }

    remove(params) {
        return request({
            url: '/config/dataset/remove',
            method: 'post',
            data: params
        })
    }

    listAll() {
        return request({
            url: '/config/dataset/listAll',
            method: 'post'
        })
    }

    addDataset(params) {
        return request({
            url: '/config/dataset/addDataset',
            method: 'post',
            data: params
        })
    }

    updateDataset(params) {
        return request({
            url: '/config/dataset/updateDataset',
            method: 'post',
            data: params
        })
    }

    getFileParsing(params) {
        return request({
            url: '/config/dataset/getFileParsing',
            method: 'post',
            params
        })
    }

    filterDataMap(params) {
        return request({
            url: '/config/dataset/filterDataMap',
            method: 'post',
            data: params
        });
    }

    addDatasetExt(params) {
        return request({
            url: '/config/dataset/addDatasetExt',
            method: 'post',
            data: params
        })
    }

    updateDatasetExt(params) {
        return request({
            url: '/config/dataset/updateDatasetExt',
            method: 'post',
            data: params
        })
    }

    listDatasetExt(params) {
        return request({
            url: '/config/dataset/listDatasetExt',
            method: 'get',
            params
        });
    }

    getDefAndData(params) {
        return request({
            url: '/config/dataset/getDefAndData',
            method: 'get',
            params
        });
    }
}

export default new DatasetApi()