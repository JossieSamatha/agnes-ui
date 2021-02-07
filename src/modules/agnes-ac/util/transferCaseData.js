
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
                let stepActType = '';
                if(nowData[i].stepActType === '1'){
                    stepActType = 'action';
                }
                if(nowData[i].stepActType === '6' || nowData[i].stepActType === '7'){
                    stepActType = 'form';
                }
                currentData['@stepType'] = stepActType;
                Object.assign(currentData, nowData[i]);
                currentData.autoActive = true;
                // currentData.defName = currentData.stepName;
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
                    let sentryEx = {};
                    sentryOut.ifExpr = temporaryData.successRuleTableData.ruleBody
                    sentryInData.ifExpr = temporaryData.activeRuleTableData.ruleBody
                    sentryEx.ifExpr = temporaryData.failRuleTableData.ruleBody
                    currentData.defId = temporaryData.caseStepDef.stepCode;
                    currentData.defName = temporaryData.caseStepDef.stepName;
                    currentData.sentryIn = sentryInData
                    currentData.sentryOut = sentryOut
                    currentData.sentryEx = sentryEx
                    currentData.autoActive = !temporaryData.activeRuleTableData.ruleBody;
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
                    let sentryEx = {};
                    sentryOut.ifExpr = temporaryData.successRuleTableData.ruleBody
                    sentryEx.ifExpr = temporaryData.failRuleTableData.ruleBody
                    currentData.sentryIn = sentryInData
                    currentData.sentryOut = sentryOut
                    currentData.sentryEx = sentryEx
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