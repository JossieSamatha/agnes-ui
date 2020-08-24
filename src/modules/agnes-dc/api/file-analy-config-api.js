import request from '@hex/gf-ui/src/util/request';


export default {

    saveFileAnaly(form) {
        return request.post("/agnes-app/v1/dop/file/analy/save", form);
    },
    delete(id) {
        return request.post("/agnes-app/v1/dop/file/analy/delete", null, {params: {id}});
    },
};
