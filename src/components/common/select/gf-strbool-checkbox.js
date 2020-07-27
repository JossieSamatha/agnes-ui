import {Checkbox} from "element-ui";

export default {
    name: "GfStrBoolCheckBox",
    extends: Checkbox,
    props: {
        'true-label': {
            type: String,
            default: '1'
        },
        'false-label': {
            type: String,
            default: '0'
        }
    },

};
