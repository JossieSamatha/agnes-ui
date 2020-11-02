import request from '@hex/gf-ui/src/util/request';


export default {
    removeFile(fileId) {
        return request.post("/ecm-server/ecm/file/remove/" + fileId);
    },

    getOisFileList(docId) {
        return request.get("/ecm-server/ecm/doc/get/" + docId);
    },


};
