import request from '@hex/gf-ui/src/util/request';


export default {
    saveFactor(form) {
        return request.post('/agnes-app/v1/dop/words/save-factor', form);
    },
    saveTranslDetail(form) {
        return request.post('/agnes-app/v1/dop/words/save-transl-detail', form);
    },
    saveTranslRule(form) {
        return request.post('/agnes-app/v1/dop/words/save-transl-rule', form);
    },
    queryFactorList() {
        return request.post('/agnes-app/v1/dop/words/query-factor');
    },
    queryFactorById(form) {
        return request.post('/agnes-app/v1/dop/words/query-factor-by-id',form);
    },
    getFieldOptions(form) {
        return request.post('/agnes-app/v1/dop/words/get-field-option',form);
    },
    queryTranslDetailListByCode(form) {
        return request.post('/agnes-app/v1/dop/words/query-detail-by-code',form);
    },
}
