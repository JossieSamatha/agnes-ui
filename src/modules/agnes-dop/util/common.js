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
    if (this.stepStatus.size === 0) {
        const stepStatus = window.$gfui.$app.dict.getDictItems("AGNES_TASK_STEP_STATUS");
        const colorSet = {
            '01': '#DFE1E5',    // 未开始
            '02': '#4A8EF0',    // 执行中
            '03': '#F5222E',    // 已异常
            '04': '#F5222E',    // 已超时
            '05': '#52C41C',    // 已作废
            '06': '#52C41C',    // 已完成
            '07': '#FAAE14',    // 干预通过
        }
        const statusIcon = {
            '02': 'executing', '03': 'abnormal', '04': 'outTime',
            '06': 'finish', '07': 'abnormal'
        }
        stepStatus.forEach((statusItem) => {
            this.stepStatus.set(statusItem.dictId, {
                dictId: statusItem.dictId,
                dictName: statusItem.dictName,
                color: colorSet[statusItem.dictId],
                icon: statusIcon[statusItem.dictId] || false
            });
        });
    }
    return this.stepStatus;
}

export default {
    randomString,
    stepStatus: new Map(),
    getStepStatusMap
}
