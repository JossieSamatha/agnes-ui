import request from '@hex/gf-ui/src/util/request';

export default {
    /**
     * 查询今日工作完成情况
     */
    selectCaseStepOfToday(exeTime) {
        return request.post("/agnes-ac/v1/ac/home/task/completion?exeTime="+exeTime);
    },
    /**
     * 查询今日主要流程完成情况
     */
    selectExecProcessDetailOfToday(exeTime) {
        return request.post("/agnes-ac/v1/ac/home/execProcess/detail?exeTime=" + exeTime);
    },
    /**
     * 查询当前业务日期后一周内排班信息
     */
    selectRosterDetailOfWeek(form) {
        return request.post("/agnes-app/v1/dop/home/roster", null, {params: form});
    },

    selectRosterDetailOfWeekOld(form) {
        return request.post("/agnes-app/v1/dop/home/roster/old", null, {params: form});
    },
    /**
     *  查询当前用户的待办任务
     */
    selectTodoTaskOfUser(form) {
        return request.post("/agnes-app/v1/dop/home/task/todo", null, {params: form});
    },
    /**
     * 查询本月运营日历详情
     */
    selectMemoDetailOfMonth(form) {
        return request.post("/agnes-app/v1/dop/home/memo", null, {params: form});
    },

    selectMemoDetailOfMonthOld(form) {
        return request.post("/agnes-app/v1/dop/home/memo/old", null, {params: form});
    },
    /**
     * 根据日期查询运营日历详情
     */
    selectMemoByMemoDate(form) {
        return request.post("/agnes-app/v1/dop/home/memo/today", null, {params: form});
    },
    selectMemoByMemoDateOld(form) {
        return request.post("/agnes-app/v1/dop/home/memo/today/old", null, {params: form});
    },
    /**
     * 查询异常信息
     */
    selectErrInfoByUser() {
        return request.post("/agnes-app/v1/dop/home/err");
    },
    /**
     * 查询用户消息
     */
    getMsgListByUser() {
        return request.post("/agnes-remind/v1/remind/home/box");
    },
    /**
     * 查询部门首页消息
     */
    getMsgListByType() {
        return request.post("/agnes-remind/v1/remind/home/msg");
    },
    /**
     * 保存用户背景信息
     */
    saveBackImgOfUser(image) {
        return request.post("/agnes-app/v1/dop/home/save/back", null,{params: image});
    },
    /**
     * 获取用户背景图片信息
     */
    DopRuUserSkin() {
        return request.post("/agnes-app/v1/dop/home/get/back");
    },
    /**
     * 干预通过
     */
    confirmTask(form) {
        return request.post("/agnes-app/v1/task/todo/confirm", form);
    },

};
