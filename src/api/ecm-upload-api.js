import request from '@hex/gf-ui/src/util/request';


export default {
    removeFile(fileId) {
        return request.post("/ecm/ecm/file/remove/" + fileId);
    },

    getOisFileList(docId) {
        return request.get("/ecm/ecm/doc/get/" + docId);
    },


};
