/* 产生随机数 */
function randomString(len) {
    len = len || 32;
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    const maxPos = $chars.length;
    let result = '';
    for (let i = 0; i < len; i++) {
        result += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}

// 获取流程状态字典及其对应颜色
function getStepStatusMap() {
    if(!this.stepStatus){
        const stepStatus = window.$gfui.$app.dict.getDictItems("AGNES_TASK_STEP_STATUS");
        const colorSet = {
            '01': '#DFE1E5',    // 未开始
            '02': '#4A8EF0',    // 执行中
            '03': '#FAAE14',    // 已异常
            '04': '#F5222E',    // 已超时
            '05': '#52C41C',    // 已作废
            '06': '#52C41C',    // 已完成
            '07': '#52C41C',    // 人工强制关闭
        }
        this.stepStatus = stepStatus.map((statusItem)=>{
            return {
                dictId: statusItem.dictId,
                dictName:  statusItem.dictName,
                color: colorSet[statusItem.dictId]
            }
        });
    }
    return this.stepStatus;
}

export default {
    randomString,
    stepStatus: null,
    getStepStatusMap
}