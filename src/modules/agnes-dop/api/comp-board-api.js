import request from '@hex/gf-ui/src/util/request';


export default {
    getDashboards(form){
        return request.post(`/agnes-app//v1/dop/board/query-board`,form);
    },
    /**
     * 编辑、保存
     * @param form
     * @returns {Promise<AxiosResponse<any>>}
     */
    saveDashboards(form) {
        return request.post(`/agnes-app//v1/dop/board/save-board`, form);
    },
    /**
     * 管理面板
     * @return
     */
    manageDashboards(form) {
        return request.post(`/agnes-app//v1/dop/board/manage-board`, form);
    },
    /**
     * 第一次加载面板
     * @return
     */
    getSignDashboards() {
        return request.post(`/agnes-app//v1/dop/board/query-sign-board`);
    },
    /**
     * 切换面板，更换当前选中面板
     * @return
     */
    signLastDashboard(form) {
        return request.post(`/agnes-app//v1/dop/board/sign-board`, form);
    },
    getCompList() {
        return request.post("/agnes-app//v1/dop/board/query-comp");
    },
    saveComponents(form){
        return request.post("/agnes-app//v1/dop/board/save-comp",form);
    },
    deleteComponents(form){
        return request.post("/agnes-app//v1/dop/board/delete-comp",form);
    },
};
