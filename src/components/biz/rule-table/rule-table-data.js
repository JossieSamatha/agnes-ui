export default {
    // 对象字段
    funDef: {
        fnId: '',   // id
        fnCode: '', // 定义编号
        fnName: '', // 函数名
        fnDesc: '', // 函数描述
        fnType: '', // 函数类型
        fnTarget: '', // 目标地址
        fnArgs: '', // 函数参数
        bizParamDb: '', // 数据源
        bizParamSql: '', // SQL语句
    },

    funArr: [
        {
            fnCode: 'ruleObj1', // 定义编号
            fnName: '函数1(单独配置配置sql，函数)', // 函数名
        },
        {
            fnCode: 'ruleObj2', // 定义编号
            fnName: '对象2(业务对象,预置对象)', // 函数名
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
    ]
}