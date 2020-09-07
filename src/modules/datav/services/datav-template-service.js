import lodash from 'lodash';
import Util from '@hex/gf-ui/src/util/common'
import Service from "@hex/gf-ui/src/engine/service";

export default class datavTemplateService extends Service {
    constructor(app) {
        super(app);
        this.dataVData = {};
        this.compsArr = [];
        this.curComp = {};
    }

    getCompItem(compId) {
        return lodash.find(this.compsArr, {compId: compId});
    }

    setCurComp(comp) {
        this.curComp = comp;
    }

    addComp(comp){
        const length = this.compsArr.length - 1;
        this.compsArr.splice(length, 0, comp);
        this.curComp = comp;
    }

    removeComp(compIndex){
        this.compsArr.splice(compIndex, 1, 0);
    }

    getActiveIndex() {
        for (let i = 0, l = this.compsArr.length; i < l; i++) {
            let rect = this.compsArr[i];
            if (rect.isActive) {
                return i;
            }
        }
        return null;
    }

    setActive(compId){
        const disActiveIndex = lodash.findIndex(this.compsArr, {isActive: true});
        if(disActiveIndex > -1){
            this.compsArr[disActiveIndex].isActive = false;
        }
        const activeIndex = lodash.findIndex(this.compsArr, {compId: compId});
        if(activeIndex > -1){
            this.compsArr[activeIndex].isActive = true;
        }
    }

    setDisActive(compId){
        const activeIndex = lodash.findIndex(this.compsArr, {compId: compId});
        if(activeIndex > -1){
            this.compsArr[activeIndex].isActive = false;
        }
    }

    setDataVAttr(attr, val){
        this.dataVData[attr] = val;
    }

    setCompAttr(findTypeObj, setAttrs){
        let compIndex = -1;
        const findType = Object.keys(findTypeObj)[0];
        if(findType === 'compIndex'){
            compIndex = findTypeObj.compIndex;
        }
        if(findType === 'compId'){
            compIndex = lodash.findIndex(this.compsArr, {compId: findTypeObj.compId});
        }
        if(compIndex !== -1){
            for(let key in setAttrs){
               if(key === 'primary'){
                   const copyAttr = this.compsArr[compIndex];
                   this.compsArr[compIndex] = {...copyAttr, ...setAttrs[key]};
               }else{
                   const copyAttr = Util.deepClone(this.compsArr[compIndex][key]);
                   this.compsArr[compIndex][key] ={...copyAttr, ...setAttrs[key]}
               }
            }
        }
    }

    init(dataVObj) {
        this.curComp = {
            compId: '',
            compIndex: '',
            compName: '',
            isActive: false,
            position: {},
            optional: {}
        };
        this.dataVData = dataVObj;
        const pageData = Util.fromJson(dataVObj.content);
        let compArr = [];
        if( Object.prototype.hasOwnProperty.call(pageData, 'datavComps')){
            compArr = pageData.datavComps;
            delete pageData.datavComps;
        }
        if(compArr && compArr.length>0){
            this.compsArr = compArr;
        }
    }
}
