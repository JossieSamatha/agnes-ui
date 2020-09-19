import request from '@hex/gf-ui/src/util/request';


export default {
    getCaseDefList() {
        return request.post("/agnes-datav/config/dataset/listAll");
    },
};
