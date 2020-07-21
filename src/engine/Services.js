import Service from "../../node_modules/@hex/gf-ui/src/engine/service";
import Vue from "vue";

export default class HttlTabService extends Service {
    constructor(app) {
        super(app);
    }



    mount(component, options) {
        return Vue.prototype.$dialog.createByType(component, options);
    }

    showDialog(dlgForm, options) {
        let opts = {...options};
        opts['component'] = dlgForm;
        return Vue.prototype.$dialog.create(opts);
    }
}

export default class HttlTabService extends Service {
    constructor(app) {
        super(app);
        this.configs = {};
        this.gridApi = app.options.grid.gridApi || new GridApi(app.options.grid.apiBaseUrl);
    }


}