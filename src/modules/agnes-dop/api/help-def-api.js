import request from '@hex/gf-ui/src/util/request';


export default {
    getHelpInfo() {
        return request.post("/agnes-app/v1/dop/help/get");
    },

    saveHelpInfo(form) {
        return request.post("/agnes-app/v1/dop/help/save", form);
    },
};
