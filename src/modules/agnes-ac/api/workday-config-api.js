import request from '@hex/gf-ui/src/util/request';


export default {
    getWorkdayList(form) {
        return request.post(`/agnes-ac/v1/config/workday/list`,form);
    },
    saveWorkday(form) {
        return request.post("/agnes-ac/v1/config/workday/save", form);
    },
    updateWorkday(form) {
        return request.post("/agnes-ac/v1/config/workday/update", form);
    },
    deleteWorkday(workdayId) {
        return request.post("/agnes-ac/v1/config/workday/delete", null, {params: {workdayId}});
    }
};
