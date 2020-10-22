import request from '@hex/gf-ui/src/util/request';

export default {
    getMonitorkpiList(bizDate) {
        return request.get("/agnes-ac/v1/monitor/kpi/get/list", {params: {bizDate}});
    },

};