import lodash from 'lodash';
import Util from '@hex/gf-ui/src/util/common'
import Service from "@hex/gf-ui/src/engine/service";

export default class datavTemplateService extends Service {
    constructor(app) {
        super(app);
        this.data = {
            dataVData: {},
            compsArr: {},
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
        const length = this.data.compsArr.length - 1;
        this.data.compsArr.splice(length, 0, comp);
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
        const activeNum = lodash.findIndex(this.data.compsArr, {isActive: true});
        if(activeNum === -1){
            this.data.curComp = {};
        }
    }

    setDataVAttr(attr, val){
        this.data.dataVData[attr] = val;
    }

    setCompAttr(findTypeObj, setAttrs){
        let compIndex = -1;
        const findType = Object.keys(findTypeObj)[0];
        if(findType === 'compIndex'){
            compIndex = findTypeObj.compIndex;
        }
        if(findType === 'compId'){
            compIndex = lodash.findIndex(this.data.compsArr, {compId: findTypeObj.compId});
        }
        if(compIndex !== -1){
            for(let key in setAttrs){
                if(key === 'primary'){
                    const copyAttr = this.data.compsArr[compIndex];
                    this.data.compsArr[compIndex] = {...copyAttr, ...setAttrs[key]};
                }else{
                    const copyAttr = Util.deepClone(this.data.compsArr[compIndex][key]);
                    this.data.compsArr[compIndex][key] ={...copyAttr, ...setAttrs[key]}
                }
            }
        }
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
        }
    }
}
