
/* 发布或复核之前加工数据层级 */

export function transferCaseDefData(dataOrigin, caseDefKey, caseDefName,type='list') {
    let caseDefData =JSON.parse(JSON.stringify(dataOrigin))
    let newCaseModelData = caseDefData.stages;
    for (let i = 0; i < newCaseModelData.length; i++) {
        let steps = [];
        if (newCaseModelData[i].children && newCaseModelData[i].children.length > 0) {
            recursionData(newCaseModelData[i].children, steps,caseDefKey,type);
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
function recursionData(nowData,steps,caseDefKey,type){
    for(let i=0;i<nowData.length;i++){
        if(nowData[i].defType==='step'){
            if(type==='list'){
                let currentData = {};
                if(nowData[i].stepActType === '1'){
                    nowData[i].stepActType = 'action';
                }
                if(nowData[i].stepActType === '6'){
                    nowData[i].stepActType = 'form';
                }
                currentData['@stepType'] = nowData[i].stepActType;
                Object.assign(currentData, nowData[i]);
                currentData.autoActive = true;
                currentData.defName = currentData.stepName;
                currentData.defId = caseDefKey;
                let actionDef = {
                    "automation":true,
                };
                currentData.actionDef = actionDef;
                delete currentData.stepName;
                delete currentData.stepCode;
                if(currentData.stepFormInfo){
                    let temporaryData = JSON.parse(JSON.stringify(currentData.stepFormInfo));
                    delete currentData.stepFormInfo
                    let sentryInData = {};
                    let sentryOut = {};
                    sentryOut.ifExpr = temporaryData.successRuleTableData.ruleBody
                    currentData.sentryIn = sentryInData
                    currentData.sentryOut = sentryOut
                }
                steps.push(currentData)
            }else {
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
            }
        }else if(nowData[i].defType==='group'){
            this.recursionData(nowData[i].steps,steps,caseDefKey,type)
        }
    }
}

export default {
    transferCaseDefData,
}