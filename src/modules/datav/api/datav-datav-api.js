import request from '@hex/gf-ui/src/util/request'

class DatavDatavApi {
    add(params) {
        return request({
            url: '/agnes-datav/datav/agnes-datav/datav/add',
            method: 'post',
            data: params
        })
    }

    displayDataV(params) {
        return request({
            url: '/agnes-datav/datav/agnes-datav/datav/displayDataV',
            method: 'post',
            data: params
        })
    }

    edit(params) {
        return request({
            url: '/agnes-datav/datav/agnes-datav/datav/edit',
            method: 'post',
            data: params
        })
    }

    queryList(params) {
        return request({
            url: '/agnes-datav/datav/agnes-datav/datav/queryList',
            method: 'get',
            params
        })
    }

    remove(params) {
        return request({
            url: '/agnes-datav/datav/agnes-datav/datav/remove',
            method: 'post',
            data: params
        })
    }

    uploadImage(params) {
        return request({
            url: '/agnes-datav/datav/agnes-datav/datav/uploadImage',
            method: 'post',
            data: params
        })
    }

    viewDataV(params) {
        return request({
            url: '/agnes-datav/datav/agnes-datav/datav/viewDataV',
            method: 'post',
            data: params
        })
    }

    //我的文档
    getDocList(params) {
        return request({
            url: "/agnes-datav/datav/report/templates?pageIndex=" + params.pageIndex +"&pageSize=" + params.pageSize,
            method: 'get',
            data: params
        })
    }


    listAllReportTemplate(params) {
        return request({
            url: '/agnes-datav/datav/report/templates?pageIndex=0&pageSize=1000',
            method: 'get',
            data: params
        })
    }

//查询标签
    getDocLabel() {
        return request({
            url: '/agnes-datav/datav/report/templates/labels',
            method: 'get'
        })
    }

    //创建文档查询
    createDocQuery(params) {
        return request({
            url: '/agnes-datav/datav/document/templates',
            method: 'get',
            data: params
        })
    }

    //使用模板
    applyTemplate(params) {
        return request({
            url: '/agnes-datav/datav/document/template/get',
            method: 'get',
            data: params
        })
    }

    //我的文档保存
    saveMyDoc(params) {
        return request({
            url: '/agnes-datav/datav/report/template/save',
            method: 'post',
            data: params
        })
    }

    updateDocThumbnail(params) {
        return request({
            url: '/agnes-datav/datav/report/template/thumbnail/save',
            method: 'post',
            data: params
        })
    }

    //我的文档编辑／预览
    optMyDoc(params) {
        return request({
            url: '/agnes-datav/datav/report/template/get?id=' + params,
            method: 'get',
            data: params
        })
    }

    //删除我的文档
    removeMyDoc(params) {
        return request({
            url: '/agnes-datav/datav/report/template/remove?id=' + params,
            method: 'get',
            data: params
        })
    }

    //复制我的文档
    copyMyDoc(params) {
        return request({
            url: '/agnes-datav/datav/report/template/copy?id=' + params,
            method: 'get',
            data: params
        })
    }


    //数据集列表
    dataSourceList(params) {
        return request({
            url: '/agnes-datav/datav/data-set/option/list',
            method: 'get',
            data: params
        })
    }


    //数据集字段
    dataSourceColumns(params) {
        return request({
            url: '/agnes-datav/datav/data-set/column/list?id=' + params,
            method: 'get',
            data: params
        })
    }

    //图表生成
    createChart(params) {
        return request({
            url: '/agnes-datav/datav/recept/queryReceptObjectList',
            method: 'post',
            data: params
        })
    }

    getTableList(params) {
        return request({
            url: '/agnes-datav/datav/recept/queryTableList',
            method: 'post',
            data: params
        })
    }

    filterGrid(params) {
        return request({
            url: '/agnes-datav/datav/recept/queryFieldList',
            method: 'post',
            data: params
        })
    }


    //过滤条件下拉
    filterDownData(params) {
        return request({
            url: '/agnes-datav/datav/recept/queryFieldList',
            method: 'post',
            data: params
        })
    }

    saveDocInstance(params) {
        return request({
            url: '/agnes-datav/datav/report/instance/save',
            method: 'post',
            data: params
        })
    }

    listDocInstance(params) {
        return request({
            url: '/agnes-datav/datav/report/instances',
            method: 'get',
            data: params
        })
    }

    getDocInstance(params) {
        return request({
            url: '/agnes-datav/datav/report/instance/get?id=' + params,
            method: 'get',
            data: params
        })
    }

    removeDocInstance(params) {
        return request({
            url: '/agnes-datav/datav/report/instance/remove?id=' + params,
            method: 'get',
            data: params
        })
    }

    //文档中单个组件的数据保存和获取
    saveEveComp(params) {
        return request({
            url: "/agnes-datav/datav/operation/table/save",
            method: 'post',
            data: params
        })
    }
    getCurComp(params) {
        return request({
            url: "/agnes-datav/datav/operation/table/select?id=" + params,
            method: 'get',
            data: params
        })
    }
}

export default new DatavDatavApi()
