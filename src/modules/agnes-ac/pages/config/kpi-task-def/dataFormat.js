export default {
    // 任务对象初始字段
    kpiTaskDef: {
        taskId: '',
        taskName: '',            // 任务名称
        taskType: '',            // 任务类型 -- 1：流程任务；2：MOT任务；3：监控指标任务
        taskStatus: '',          // 任务状态 -- 0：新建；1：待复核；2：已复核；3：存在更新需再次复核；
        caseKey: '',             // 关联case -- 对应case caseDefKey
        bizType: '',             // 业务场景
        bizTag: '',              // 业务标签 -- str
        stepScene: '',          // 业务场景
        startTime: null,
        endTime: null,
        standardDate: '',       // 基准日期(新增字段)
        execMode: '1',          // 任务创建频率 -- 0：一次；1：重复执行；2：事件
        execScheduler: '* * * * * ? *',      // 任务创建频率 -- 重复执行
        eventId: '',            // 事件Id -- 执行频率--事件
        needApprove: '',       // 是否需要复核
    },

    // case任务对象初始字段
    caseDef: {
        actions: [],
        optionalStages: [],
        stages: [{
            defId: '',
            defName: '',
            defType: 'stage',
            optional: false,
            edit: false,
            children:[{
                stepId: '',
                stepName: '',
                defType: "step",
                optional: false,
                stepActType: '1',
                stepFormInfo: {
                    caseStepDef: {
                        stepName: '',   // 任务名称
                        caseDefKey: '',  // 关联case -- 对应case caseDefKey
                        stepActType: '1',
                        stepLevel: 0,   // 任务等级
                        stepCode: '',   // 任务编号
                        stepTag: '',    // 业务标签
                        stepRemark: '', // 任务说明
                        startDay: '',        // 执行时间 -- 开始XX日
                        startTime: '',       // 执行时间 -- 开始时间
                        endDay: '',          // 执行时间 -- 结束XX日
                        endTime: '',         // 执行时间 -- 结束时间
                        dayendDefId: '',     // 日期类型 -- 1：工作日；2：自然日；（是否保存）
                        execMode: '2',       // 指标执行频率 --默认重复执行
                        execScheduler: '* * * * * ? *',   // 指标执行频率 -- 串串
                        stepActKey: '',      // 指标
                        stepActOwner: '',    // 通知人id
                        stepActOwnerName: '',    // 通知人姓名
                        isTodo: '',          // 是否进入待办
                        forcePass: '',       // 是否允许人工强制通过
                        isRecordError: '',          // 异常通知 -- 是否记入异常
                        errorType: '',              // 异常通知 -- 异常类型
                        errorContent: '',           // 异常通知 -- 异常内容
                        isRecordTimeoutError: '',   // 超时通知 -- 是否记入异常
                        timeoutErrorType: '',       // 超时通知 -- 异常类型
                        timeoutErrorContent: '',    // 超时通知 -- 异常内容
                        warningMintues: '',         // 预警通知 -- 预警时间
                        warningTimeType: '1',       // 预警通知 -- 预警时间类型
                    },
                    exceptionRemind: [],        // 异常通知 -- 通知方式配置
                    finishRemind: [],          // 完成通知 -- 通知方式配置
                    timeoutRemind: [],          // 超时通知 -- 通知方式配置
                    warningRemind: [],          // 预警通知 -- 通知方式配置
                    failRuleTableData: {},      // 异常规则
                    successRuleTableData: {},   // 完成规则
                    activeRuleTableData: {},    // 激活规则
                },
            }]
        }]
    },

}