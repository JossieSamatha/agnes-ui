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
    }
}