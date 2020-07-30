
/* 发布或复核之前加工数据层级 */
export function transferCaseDefData(dataOrigin, caseDefKey, caseDefName) {
    let caseDefData =JSON.parse(JSON.stringify(dataOrigin))
    let newCaseModelData = caseDefData.stages;
    for (let i = 0; i < newCaseModelData.length; i++) {
        let steps = [];
        if (newCaseModelData[i].children && newCaseModelData[i].children.length > 0) {
            recursionData(newCaseModelData[i].children, steps);
        }
        newCaseModelData[i].steps = steps;
        delete newCaseModelData[i].children
    }
    caseDefData.stages=newCaseModelData;
    caseDefData.defType='case';
    caseDefData.defId='';
    caseDefData.caseDefKey=caseDefKey;
    caseDefData.defName=caseDefName;
    return caseDefData
}
//递归用函数
function recursionData(nowData,steps){
    for(let i=0;i<nowData.length;i++){
        if(nowData[i].defType==='step'){
            let currentData = nowData[i]
            currentData.stepType = currentData.stepActType;
            currentData.defName = currentData.stepName;
            delete currentData.stepName;
            delete currentData.stepCode;
            if(currentData.stepFormInfo){
                let temporaryData = JSON.parse(JSON.stringify(currentData.stepFormInfo));
                delete currentData.stepFormInfo
                let sentryInData = {};
                let sentryOut = {};
                sentryInData.ifExpr = temporaryData.activeRuleTableData
                sentryOut.ifExpr = temporaryData.successRuleTableData
                currentData.sentryIn = sentryInData
                currentData.sentryOut = sentryOut
            }
            steps.push(currentData)
            //如需改变数据，在此处修改
        }else if(nowData[i].defType==='group'){
            this.recursionData(nowData[i].steps,steps)
        }
    }
}

export default {
    transferCaseDefData,
}