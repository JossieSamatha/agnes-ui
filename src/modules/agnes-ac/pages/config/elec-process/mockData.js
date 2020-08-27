export default function () {
    return {
        processList: [
            {boardId: '01', boardName: '早上', completionPer: 1, status: 'success'},
            {boardId: '02', boardName: '中午', completionPer: 0.8, status: 'exception'},
            {boardId: '03', boardName: '收市', completionPer: 0.3, status: ''},
            {boardId: '04', boardName: '晚上批处理', completionPer: 1, status: 'warning'},
            {boardId: '05', boardName: 'D+1零点后', completionPer: 0.8, status: ''}
        ],
        taskStage: [
            {defId: '01', defName: '早上', percentage: 100, status: 'success'},
            {defId: '02', defName: '中午', percentage: 80, status: 'exception'},
            {defId: '03', defName: '收市', percentage: 30, status: ''},
            {defId: '04', defName: '晚上批处理', percentage: 100, status: 'warning'},
            {defId: '05', defName: 'D+1零点后', percentage: 80, status: ''}
        ],
        proTask: [
            {taskId: '001', taskName: 'FA清算流程监控(含头寸管控)',icon: 'fa fa-sun-o'},
            {taskId: '102', taskName: 'FA清算流程监控',icon: 'fa fa-object-ungroup'},
            {taskId: '1003', taskName: 'FA晚班数据员流程监控',icon: 'fa fa-calendar-check-o'}
        ],
        execLog: [
            {id:'0', status: 'finish', content:'【分TA】中登确认文件收到', produceTime:'2020-04-10 08:00:00'},
            {id:'1', status: 'executing', content:'★【数据收发】初始化 -> [手工批量发送2] -> [发送]', produceTime:'2020-04-10 09:30:00'},
            {id:'2', status: 'outTime', content:'【数据收发】启动自动发送', produceTime:'2020-04-10 11:04:00'},
            {id:'3', status: 'abnormal', content:'【主TA】点主TA向导的“停止自动任务”“停止分布式', produceTime:'2020-04-11 08:12:35'},
            {id:'4', status: 'executing', content:'【邮件】查看昨晚UnitMovement文件是否发送，有误手工补发', produceTime:'2020-04-11 09:32:55'},
            {id:'5', status: 'finish', content:'基金账户一致性检查', produceTime:'2020-04-11 11:03:29'},
            {id:'6', status: 'outTime', content:'公共数据同步', produceTime:'2020-04-11 14:20:35'},
            {id:'7', status: 'finish', content:'【分TA】中登确认文件收到', produceTime:'2020-04-10 08:00:00'},
            {id:'8', status: 'abnormal', content:'公共数据同步', produceTime:'2020-04-10 09:30:00'},
            {id:'9', status: 'outTime', content:'★【数据收发】初始化 -> [手工批量发送2] -> [发送]', produceTime:'2020-04-10 11:04:00'},
            {id:'10', status: 'outTime', content:'基金账户一致性检查', produceTime:'2020-04-11 08:12:35'},
            {id:'11', status: 'executing', content:'公共数据同步', produceTime:'2020-04-11 09:32:55'},
            {id:'12', status: 'abnormal', content:'【分TA】中登确认文件收到', produceTime:'2020-04-11 11:03:29'},
            {id:'13', status: 'outTime', content:'公共数据同步', produceTime:'2020-04-11 14:20:35'},
            {id:'14', status: 'finish', content:'★【数据收发】初始化 -> [手工批量发送2] -> [发送]', produceTime:'2020-04-10 08:00:00'},
            {id:'15', status: 'executing', content:'公共数据同步', produceTime:'2020-04-10 09:30:00'},
            {id:'16', status: 'outTime', content:'【分TA】中登确认文件收到', produceTime:'2020-04-10 11:04:00'},
            {id:'17', status: 'outTime', content:'★【数据收发】初始化 -> [手工批量发送2] -> [发送]', produceTime:'2020-04-11 08:12:35'},
            {id:'18', status: 'abnormal', content:'公共数据同步', produceTime:'2020-04-11 09:32:55'},
            {id:'19', status: 'finish', content:'【分TA】中登确认文件收到', produceTime:'2020-04-11 11:03:29'},
            {id:'20', status: 'outTime', content:'公共数据同步', produceTime:'2020-04-11 14:20:35'},
        ],

        elecTaskStage: {
            "defId":"6704289656315314230",
            "defType":"case",
            "caseDefKey":"20000000",
            "stages":[
                {
                    "defId":"N4wGe8",
                    "defType":"stage",
                    "percentage":"0.00",
                    "ruCaseStepList":[
                        {
                            "allowManualConfirm":"0",
                            "caseId":"20200826-27360-000-1m",
                            "crtTs":"2020-08-26 07:36:00",
                            "crtUser":"guest",
                            "endTime":"23:29",
                            "execBizDate":1598371200000,
                            "execMode":"1",
                            "execScheduler":"00#01#01#* * * * * ?",
                            "execStartTime":1598427375000,
                            "finishedRate":"0",
                            "isDel":"0",
                            "isTodo":"1",
                            "startTime":"00:29",
                            "stepActOwner":"[{refType: '1','memberId':'agnes','memberDesc':'AGNES'}]",
                            "stepActType":"6",
                            "stepCode":"20000001",
                            "stepExecId":"1exp4k00rwc3a",
                            "stepId":"1exp4c5dbivqu",
                            "stepLevel":1,
                            "stepName":"阶段1-人工任务1",
                            "stepRemark":"阶段1-人工任务1",
                            "stepStatus":"02",
                            "stepTag":"['00','01','02']",
                            "updateTs":"2020-08-26 07:36:15",
                            "updateUser":"guest"
                        },
                        {
                            "allowManualConfirm":"0",
                            "caseId":"20200826-27360-000-1m",
                            "crtTs":"2020-08-26 07:36:00",
                            "crtUser":"guest",
                            "endTime":"23:31",
                            "execBizDate":1598371200000,
                            "execMode":"1",
                            "execScheduler":"00#01#01#* * * * * ?",
                            "execStartTime":1598427390000,
                            "finishedRate":"0",
                            "isDel":"0",
                            "isTodo":"1",
                            "startTime":"10:31",
                            "stepActOwner":"[{'refType':'1','memberId':'agnes','memberDesc':'AGNES'}]",
                            "stepActType":"6",
                            "stepCode":"20000003",
                            "stepExecId":"1exp4k00rwcvq",
                            "stepId":"1exp4c5dbiwja",
                            "stepLevel":1,
                            "stepName":"阶段1-人工任务2",
                            "stepRemark":"阶段1-人工任务2",
                            "stepStatus":"02",
                            "stepTag":"['00','01','02']",
                            "updateTs":"2020-08-26 07:36:30",
                            "updateUser":"guest"
                        }
                    ],
                    "defName":"阶段1",
                    "optional":true,
                    "steps":[
                        {
                            "defId":"20000001",
                            "defType":"step",
                            "@stepType":"form",
                            "multiStep":false,
                            "optional":false,
                            "sentryIn":{
                                "defType":"sentry",
                                "ifExpr":"{}"
                            },
                            "sentryOut":{
                                "defType":"sentry",
                                "ifExpr":"{}"
                            },
                            "autoActive":true
                        },
                        {
                            "defId":"20000003",
                            "defType":"step",
                            "@stepType":"form",
                            "multiStep":false,
                            "optional":false,
                            "sentryIn":{
                                "defType":"sentry",
                                "ifExpr":"{}"
                            },
                            "sentryOut":{
                                "defType":"sentry",
                                "ifExpr":"{}"
                            },
                            "autoActive":true
                        }
                    ],
                    "autoActive":true
                },
                {
                    "defId":"nKcXeE",
                    "defType":"stage",
                    "percentage":"0.00",
                    "ruCaseStepList":[
                        {
                            "allowManualConfirm":"1",
                            "caseId":"20200826-27360-000-1m",
                            "crtTs":"2020-08-26 07:36:00",
                            "crtUser":"guest",
                            "detailSort":"阶段2",
                            "endTime":"23:30",
                            "execBizDate":1598371200000,
                            "execMode":"1",
                            "execScheduler":"00#01#01#0 * * * * ?",
                            "execStartTime":1598428140000,
                            "finishedRate":"0",
                            "isDel":"0",
                            "isTodo":"1",
                            "jobId":"6380",
                            "startTime":"08:30",
                            "stepActKey":"10000017",
                            "stepActOwner":"[{'refType':'1','memberId':'agnes','memberDesc':'AGNES'}]",
                            "stepActType":"1",
                            "stepCode":"20000002",
                            "stepExecId":"1exp4k00rwdo6",
                            "stepId":"1exp4c5dbixbq",
                            "stepLevel":0,
                            "stepName":"阶段2-监控指标任务1",
                            "stepRemark":"阶段2-监控指标任务1",
                            "stepStatus":"03",
                            "stepTag":"['00','01','02']",
                            "updateTs":"2020-08-26 07:49:00",
                            "updateUser":"guest"
                        },
                        {
                            "allowManualConfirm":"0",
                            "caseId":"20200826-27360-000-1m",
                            "crtTs":"2020-08-26 07:36:00",
                            "crtUser":"guest",
                            "endTime":"23:32",
                            "execBizDate":1598371200000,
                            "execMode":"1",
                            "execScheduler":"00#01#01#* * * * * ?",
                            "execStartTime":1598427420000,
                            "finishedRate":"0",
                            "isDel":"0",
                            "isTodo":"1",
                            "startTime":"06:32",
                            "stepActOwner":"[{'refType':'1','memberId':'agnes','memberDesc':'AGNES'}]",
                            "stepActType":"6",
                            "stepCode":"20000004",
                            "stepExecId":"1exp4k00ue8fq",
                            "stepId":"1exp4c5dbiy46",
                            "stepLevel":1,
                            "stepName":"阶段2-人工任务2",
                            "stepRemark":"阶段-人工任务2",
                            "stepStatus":"02",
                            "stepTag":"['00','02']",
                            "updateTs":"2020-08-26 07:37:00",
                            "updateUser":"guest"
                        }
                    ],
                    "defName":"阶段2",
                    "optional":true,
                    "steps":[
                        {
                            "defId":"20000002",
                            "defType":"step",
                            "@stepType":"action",
                            "multiStep":false,
                            "optional":false,
                            "sentryIn":{
                                "defType":"sentry",
                                "ifExpr":"{}"
                            },
                            "sentryOut":{
                                "defType":"sentry",
                                "ifExpr":"{}"
                            },
                            "actionDef":{
                                "defType":"action",
                                "automation":true
                            },
                            "autoActive":true
                        },
                        {
                            "defId":"20000004",
                            "defType":"step",
                            "@stepType":"form",
                            "multiStep":false,
                            "optional":false,
                            "sentryIn":{
                                "defType":"sentry",
                                "ifExpr":"{}"
                            },
                            "sentryOut":{
                                "defType":"sentry",
                                "ifExpr":"{}"
                            },
                            "autoActive":true
                        }
                    ],
                    "autoActive":true
                },
                {
                    "defId":"YMBy78",
                    "defType":"stage",
                    "percentage":"0.00",
                    "ruCaseStepList":[
                        {
                            "allowManualConfirm":"0",
                            "caseId":"20200826-27360-000-1m",
                            "crtTs":"2020-08-26 07:36:00",
                            "crtUser":"guest",
                            "endTime":"22:33",
                            "execBizDate":1598371200000,
                            "execMode":"1",
                            "execScheduler":"00#01#01#* * * * * ?",
                            "execStartTime":1598427435000,
                            "finishedRate":"0",
                            "isDel":"0",
                            "isTodo":"1",
                            "startTime":"03:33",
                            "stepActOwner":"[{'refType':'1','memberId':'agnes','memberDesc':'AGNES'}]",
                            "stepActType":"6",
                            "stepCode":"20000005",
                            "stepExecId":"1exp4k00ue986",
                            "stepId":"1exp4c5dbiywm",
                            "stepLevel":1,
                            "stepName":"阶段3-人工任务1",
                            "stepRemark":"阶段3-人工任务1",
                            "stepStatus":"02",
                            "stepTag":"['00','01','02']",
                            "updateTs":"2020-08-26 07:37:15",
                            "updateUser":"guest"
                        }
                    ],
                    "defName":"阶段3",
                    "optional":true,
                    "steps":[
                        {
                            "defId":"20000005",
                            "defType":"step",
                            "@stepType":"form",
                            "multiStep":false,
                            "optional":false,
                            "sentryIn":{
                                "defType":"sentry",
                                "ifExpr":"{}"
                            },
                            "sentryOut":{
                                "defType":"sentry",
                                "ifExpr":"{}"
                            },
                            "autoActive":true
                        }
                    ],
                    "autoActive":true
                }
            ],
            "defName":"TA电子流程测试",
            "optionalStages":[

            ],
            "actions":[

            ],
            "version":1
        }
    }
}