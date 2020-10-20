import request from '@hex/gf-ui/src/util/request';


export default {
    removeFile() {
        return request.get("");
    },

    getOisFileList(docId) {
        return request.get("http://192.168.8.113:7002/api/ecm/ecm/doc/get/" + docId);
    },


};
