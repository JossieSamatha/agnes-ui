export default {
    // 任务对象初始字段
    taskId: '',
    taskName: '',            // 任务名称
    taskType: '',            // 任务类型 -- 1：流程任务；2：MOT任务；3：监控指标任务
    taskStatus: '',          // 任务状态 -- 0：新建；1：待复核；2：已复核；3：存在更新需再次复核；
    caseKey: '',             // 关联case -- 对应case caseDefKey
    bizType: '',             // 业务场景
    bizTag: '',              // 业务标签 -- str
    bizTagArr: [],           // 业务标签 -- arr
    stepScene: '',          // 业务场景
    startTimeStr: '',       // 运行周期 -- 开始时间str
    task_startTime: null,        // startTime 重复名称
    endTimeStr: '',         // 运行周期 -- 开始时间str
    task_endTime: null,          // endTime 重复名称
    standardDate: '',       // 基准日期(新增字段)
    task_execMode: '1',          // 任务创建频率 -- 0：一次；1：重复执行；2：事件
    task_execScheduler: '* * * * * ? *',      // 任务创建频率 -- 重复执行
    eventId: '',            // 事件Id -- 执行频率--事件
    needApprove: '0',       // 是否需要复核


    // case任务对象初始字段
    // step stepFormInfo
    exceptionRemind: [],        // 异常通知 -- 通知方式配置
    finishRemind: [],          // 完成通知 -- 通知方式配置
    timeoutRemind: [],          // 超时通知 -- 通知方式配置
    warningRemind: [],          // 预警通知 -- 通知方式配置
    failRuleTableData: {},      // 异常规则
    successRuleTableData: {},   // 完成规则
    activeRuleTableData: {},    // 激活规则

    // caseStepDef
    stepName: '',   // 任务名称
    stepActType: '01',
    stepLevel: 0,   // 任务等级
    stepCode: '',   // 任务编号
    stepTag: '',    // 业务标签
    stepRemark: '', // 任务说明
    startDay: '',        // 执行时间 -- 开始XX日
    step_startTime: '',       // 执行时间 -- 开始时间
    endDay: '',          // 执行时间 -- 结束XX日
    step_endTime: '',         // 执行时间 -- 结束时间
    dayendDefId: '',     // 日期类型 -- 1：工作日；2：自然日；（是否保存）
    step_execMode: '2',       // 指标执行频率 --默认重复执行
    step_execScheduler: '* * * * * ? *',   // 指标执行频率 -- 串串
    stepActKey: '',      // 指标
    stepActOwner: '',    // 通知人id
    stepActOwnerName: '',    // 通知人姓名
    isTodo: '0',          // 是否进入待办
    forcePass: '0',       // 是否允许人工强制通过
    isRecordError: '',          // 异常通知 -- 是否记入异常
    errorType: '',              // 异常通知 -- 异常类型
    errorContent: '',           // 异常通知 -- 异常内容
    isRecordTimeoutError: '',   // 超时通知 -- 是否记入异常
    timeoutErrorType: '',       // 超时通知 -- 异常类型
    timeoutErrorContent: '',    // 超时通知 -- 异常内容
    warningMintues: '',         // 预警通知 -- 预警时间
    warningTimeType: '1',       // 预警通知 -- 预警时间类型


    // 下拉选项
    // rate等级颜色设置
    rateColor: {1: {value: '#409EFF'}, 2: {value: '#E6A23C'}, 3: {value: '#F00'}},
    // 事件选择下拉
    eventOptions: [{value: "xit", label: "系统数据源"}, {value: "waibu", label: "外部数据源"},
        {value: "ces", label: "测试数据源"}],
    //
    standardOptions: [{label: '工作日', value: '0'}, {label: '自然日', value: '1'}],
    // 指标选择下拉
    kpiOptions:[],
    // 人员列表
    personList:[],

    // 指标下拉
    kpiData: [{value: ' 3001', label: 'FA指标'}, {value: ' 3002', label: 'TA指标'}],
    // 异常类型下拉
    errorTypeData: [{value: ' 4001', label: '业务异常'}, {value: ' 4002', label: '系统异常'}],
    // 超时类型下拉
    timeTypeData: [{value: '1', label: '分钟'}, {value: '2', label: '小时'}, {value: '3', label: '天'}],

}