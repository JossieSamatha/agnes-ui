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
            {taskId: '001', taskName: 'TA批处理监控(周一~四)'},{taskId: '102', taskName: 'TA资金电子化流程'},{taskId: '1003', taskName: 'FA晚班工作监控'},
            {taskId: '101', taskName: 'TA批处理监控(周一~四)'},{taskId: '202', taskName: 'TA资金电子化流程'},{taskId: '2003', taskName: 'FA晚班工作监控'},
            {taskId: '201', taskName: 'TA批处理监控(周一~四)'},{taskId: '302', taskName: 'TA资金电子化流程'},{taskId: '3003', taskName: 'FA晚班工作监控'},
            {taskId: '301', taskName: 'TA批处理监控(周一~四)'},{taskId: '402', taskName: 'TA资金电子化流程'},{taskId: '4003', taskName: 'FA晚班工作监控'},
            {taskId: '401', taskName: 'TA批处理监控(周一~四)'},{taskId: '502', taskName: 'TA资金电子化流程'},{taskId: '5003', taskName: 'FA晚班工作监控'},
            {taskId: '501', taskName: 'TA批处理监控(周一~四)'},{taskId: '602', taskName: 'TA资金电子化流程'},{taskId: '6003', taskName: 'FA晚班工作监控'},
            {taskId: '601', taskName: 'TA批处理监控(周一~四)'},{taskId: '702', taskName: 'TA资金电子化流程'},{taskId: '7003', taskName: 'FA晚班工作监控'},
            {taskId: '701', taskName: 'TA批处理监控(周一~四)'},{taskId: '802', taskName: 'TA资金电子化流程'},{taskId: '8003', taskName: 'FA晚班工作监控'},
            {taskId: '801', taskName: 'TA批处理监控(周一~四)'},{taskId: '902', taskName: 'TA资金电子化流程'},{taskId: '9003', taskName: 'FA晚班工作监控'},
            {taskId: '901', taskName: 'TA批处理监控(周一~四)'},{taskId: '002', taskName: 'TA资金电子化流程'},{taskId: '0003', taskName: 'FA晚班工作监控'},
            {taskId: '1001', taskName: 'TA批处理监控(周一~四)'},{taskId: '1002', taskName: 'TA资金电子化流程'},{taskId: '10003', taskName: 'FA晚班工作监控'}
        ],
        execLog: [
            {id:'0', status: 'success', content:'【分TA】中登确认文件收到', produceTime:'2020-04-10 08:00:00'},
            {id:'1', status: 'start', content:'★【数据收发】初始化 -> [手工批量发送2] -> [发送]', produceTime:'2020-04-10 09:30:00'},
            {id:'2', status: 'fail', content:'【数据收发】启动自动发送', produceTime:'2020-04-10 11:04:00'},
            {id:'3', status: 'fail', content:'【主TA】点主TA向导的“停止自动任务”“停止分布式', produceTime:'2020-04-11 08:12:35'},
            {id:'4', status: 'start', content:'【邮件】查看昨晚UnitMovement文件是否发送，有误手工补发', produceTime:'2020-04-11 09:32:55'},
            {id:'5', status: 'success', content:'基金账户一致性检查', produceTime:'2020-04-11 11:03:29'},
            {id:'6', status: 'fail', content:'公共数据同步', produceTime:'2020-04-11 14:20:35'},
            {id:'7', status: 'success', content:'【分TA】中登确认文件收到', produceTime:'2020-04-10 08:00:00'},
            {id:'8', status: 'start', content:'公共数据同步', produceTime:'2020-04-10 09:30:00'},
            {id:'9', status: 'fail', content:'★【数据收发】初始化 -> [手工批量发送2] -> [发送]', produceTime:'2020-04-10 11:04:00'},
            {id:'10', status: 'fail', content:'基金账户一致性检查', produceTime:'2020-04-11 08:12:35'},
            {id:'11', status: 'start', content:'公共数据同步', produceTime:'2020-04-11 09:32:55'},
            {id:'12', status: 'success', content:'【分TA】中登确认文件收到', produceTime:'2020-04-11 11:03:29'},
            {id:'13', status: 'fail', content:'公共数据同步', produceTime:'2020-04-11 14:20:35'},
            {id:'14', status: 'success', content:'★【数据收发】初始化 -> [手工批量发送2] -> [发送]', produceTime:'2020-04-10 08:00:00'},
            {id:'15', status: 'start', content:'公共数据同步', produceTime:'2020-04-10 09:30:00'},
            {id:'16', status: 'fail', content:'【分TA】中登确认文件收到', produceTime:'2020-04-10 11:04:00'},
            {id:'17', status: 'fail', content:'★【数据收发】初始化 -> [手工批量发送2] -> [发送]', produceTime:'2020-04-11 08:12:35'},
            {id:'18', status: 'start', content:'公共数据同步', produceTime:'2020-04-11 09:32:55'},
            {id:'19', status: 'success', content:'【分TA】中登确认文件收到', produceTime:'2020-04-11 11:03:29'},
            {id:'20', status: 'fail', content:'公共数据同步', produceTime:'2020-04-11 14:20:35'},
        ],
    }
}