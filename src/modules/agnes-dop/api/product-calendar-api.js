import request from '@hex/gf-ui/src/util/request';

export default {

    selectPrdtInfo(bizDate) {
        return request.post("/agnes-app/v1/prdt/calendar/list", null, {params: {bizDate}});
    },
    selectRuTaskByBizDate(bizDate) {
        return request.post("/agnes-ac/v1/config/task/ru/list", null, {params: {bizDate}});
    }
};
