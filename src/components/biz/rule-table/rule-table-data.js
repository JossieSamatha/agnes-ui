export default function () {
    return {
        // 新增条件类型数组
        confTypeArr: [
            {key: 'object', type: 'object', name: '业务对象'},
            {key: 'fn', type: 'fn', name: '函数对象'},
            {key: 'step', type: 'step', name: 'case step节点'},
            {key: 'kpi', type: 'kpi', name: '指标任务'},
            {key: 'action', type: 'action', name: '人工任务'},
            {key: 'service', type: 'service', name: '服务调用任务'},
            {key: 'RPA', type: 'RPA', name: 'RPA任务'},
            {key: 'process', type: 'process', name: '流程任务'}
        ],

        // 对象字段
        funDef: {
            fnId: '1euthjs1jtdna',   // id
            fnCode: '0000000000001', // 定义编号
            fnName: '测试1', // 函数名
            fnDesc: '', // 函数描述
            fnType: 'api', // 函数类型
            fnTarget: '', // 目标地址
            fnArgs: '', // 函数参数
            fnReturn: '1etjeqj54dhjj', //
            bizParamDb: '', // 数据源
            bizParamSql: '', // SQL语句
        },

        funArr: [{
                fnId: '1euthjs1jtdna',   // id
                fnCode: '00000001', // 定义编号
                fnName: '测试1', // 函数名
                fnType: 'api', // 函数类型
                fnTarget: '', // 目标地址
                fnArgs: [{
                    modelFieldId: '1etjeqj6pt5hr',
                    modelTypeId: '1etjemk4co367',
                    fieldKey: 'dataStatus',
                    fieldName: '数据状态',
                    fieldType: '01',
                    mustFill: '1'
                }], // 函数参数
                fnReturn: [{
                    modelFieldId: '1etjeqj6pt5hr',
                    modelTypeId: '1etjemk4co367',
                    fieldKey: 'dataStatus',
                    fieldName: '数据状态',
                    fieldType: '01',
                    mustFill: '1'
                }],
            }, {
                fnId: '1euxfn7skoavq',
                fnCode: '0000000000001',
                fnName: '获取TA监控业务节点状态',
                fnType: "sql",
                fnArgs: '',
                fnArgsModelFields: [{
                    modelFieldId: '1etjeqj6pt5hr',
                    modelTypeId: '1etjemk4co367',
                    fieldKey: 'dataStatus',
                    fieldName: '数据状态',
                    fieldType: '01',
                    mustFill: '1'
                }],
                fnReturn: '',
                fnReturnModelFields: [{
                    modelFieldId: '1etjeqj6pt5hr',
                    modelTypeId: '1etjemk4co367',
                    fieldKey: 'dataStatus',
                    fieldName: '数据状态',
                    fieldType: '01',
                    mustFill: '1'
                }],
                fnDesc: "根据传入参数，获取返回参数进行",
                bizParamDb: "758e98faff8e492093c148d4e8efc23b",
                bizParamSql: "select  status from ta_status where channel=#params1",
            },{
                fnId: "1euthmt398l06",
                fnCode: "233",
                fnName: "测试2",
                fnType: "script",
                fnArgs: [],
                fnReturn: [{
                    fieldKey: "CHANNEL",
                    fieldName: "渠道代码",
                    fieldType: "01",
                    modelFieldId: "1etmxqpqf9mly",
                    modelTypeId: "1etmxqpmqx0ae",
                    mustFill: "1"
                }],
                fnDesc: "这是一个很好吃你去过的这是一个很好吃你去过的这是一个很好吃你去过的这是一个很好吃你去44",
            }, {
                fnId: "1euthngwjw192",
                fnName: "测试3",
                fnType: "inner",
            }, {
                fnId: "1euthodetth7a",
                fnName: "测试4",
                fnType: "svc",
            }
        ],

        // 筛选条件字段
        modelField: {
            fieldId: '',        // 业务对象属性主键
            modelFieldId: '', // 消息对象主键
            fieldKey: '',      // 业务对象属性KEY（英文）
            fieldName: '',     // 业务对象属性名称（中文）
            fieldType: '',     // 业务对象属性类型
            mustFill: '',       // 是否必填
            fieldValue: '',     // 设置值
        },

        filterConfArr: [
            {
                fieldId: 'ruleObj1',
                modelFieldArr: [
                    {
                        fieldId: 'ruleObj1',        // 业务对象属性主键
                        modelFieldId: 'a1', // 消息对象主键
                        fieldKey: 'A1',      // 业务对象属性KEY（英文）
                        fieldName: '服务地址端口（IP）',     // 业务对象属性名称（中文）
                        mustFill: '1',     // 是否必填
                        fieldValue: '',     // 设置值
                    },{
                        fieldId: 'ruleObj1',        // 业务对象属性主键
                        modelFieldId: 'a2', // 消息对象主键
                        fieldKey: 'A2',      // 业务对象属性KEY（英文）
                        fieldName: '扫描路径（PATH）',     // 业务对象属性名称（中文）
                        mustFill: '1',     // 是否必填
                        fieldValue: '',     // 设置值
                    },{
                        fieldId: 'ruleObj1',        // 业务对象属性主键
                        modelFieldId: 'a3', // 消息对象主键
                        fieldKey: 'A3',      // 业务对象属性KEY（英文）
                        fieldName: '扫描文件名（NAME）',     // 业务对象属性名称（中文）
                        mustFill: '1',     // 是否必填
                        fieldValue: '',     // 设置值
                    }
                ],
            },{
                fieldId: 'ruleObj2',
                modelFieldArr: [
                    {
                        fieldId: 'ruleObj2',        // 业务对象属性主键
                        modelFieldId: 'b1', // 消息对象主键
                        fieldKey: 'B1',      // 业务对象属性KEY（英文）
                        fieldName: '测试匹配字段1',     // 业务对象属性名称（中文）
                        mustFill: '1',     // 业务对象属性类型
                        fieldValue: '',     // 设置值
                    },{
                        fieldId: 'ruleObj2',        // 业务对象属性主键
                        modelFieldId: 'b2', // 消息对象主键
                        fieldKey: 'B2',      // 业务对象属性KEY（英文）
                        fieldName: '测试匹配字段2',     // 业务对象属性名称（中文）
                        mustFill: '1',     // 业务对象属性类型
                        fieldValue: '',     // 设置值
                    }
                ],
            }
        ],

        // 运算符下拉
        ruleSignOp: [
            { id: '1', label: '包含'},
            { id: '2', label: '不包含'},
            { id: '3', label: '等于'},
            { id: '4', label: '不等于'},
            { id: '5', label: '大于'},
            { id: '6', label: '小于'},
            { id: '7', label: '大于等于'},
            { id: '8', label: '小于等于'},
        ],
    }
}