import lodash from 'lodash';
import Util from '@hex/gf-ui/src/util/common'
import Service from "@hex/gf-ui/src/engine/service";

export default class datavTemplateService extends Service {
    constructor(app) {
        super(app);
        this.data = {
            dataVData: {},
            compsArr: [],
            curComp: {}
        }
    }

    getCompItem(compId) {
        return lodash.find(this.data.compsArr, {compId: compId});
    }

    setCurComp(comp) {
        this.data.curComp = comp;
    }

    addComp(comp){
        this.data.compsArr.push(comp);
        this.data.curComp = comp;
    }

    removeComp(compIndex){
        this.data.compsArr.splice(compIndex, 1, 0);
    }

    getActiveIndex() {
        for (let i = 0, l = this.data.compsArr.length; i < l; i++) {
            let rect = this.data.compsArr[i];
            if (rect.isActive) {
                return i;
            }
        }
        return null;
    }

    setActive(compId){
        const disActiveIndex = lodash.findIndex(this.data.compsArr, {isActive: true});
        if(disActiveIndex > -1){
            this.data.compsArr[disActiveIndex].isActive = false;
        }
        const activeIndex = lodash.findIndex(this.data.compsArr, {compId: compId});
        if(activeIndex > -1){
            this.data.compsArr[activeIndex].isActive = true;
        }
    }

    setDisActive(compId){
        const activeIndex = lodash.findIndex(this.data.compsArr, {compId: compId});
        if(activeIndex > -1){
            this.data.compsArr[activeIndex].isActive = false;
        }
        // const activeNum = lodash.findIndex(this.data.compsArr, {isActive: true});
        // if(activeNum === -1){
        //     this.data.curComp = {};
        // }
    }

    updateCompData(metaData, label, type ){
        this.data.curComp.compName = type;
        this.data.curComp.optional.label = label;
        this.data.curComp.optional.compName = type;
        this.data.curComp.optional.componentMeta = metaData;

    }

    init(dataVObj) {
        this.data.curComp = {};
        this.data.dataVData = dataVObj;
        const pageData = Util.fromJson(dataVObj.content);
        let compArr = [];
        if( Object.prototype.hasOwnProperty.call(pageData, 'datavComps')){
            compArr = pageData.datavComps;
            delete pageData.datavComps;
        }
        this.data.dataVData.content = pageData;
        if(compArr && compArr.length>0){
            this.data.compsArr = compArr;
        }else{
            this.data.compsArr = [];
        }
    }
}
