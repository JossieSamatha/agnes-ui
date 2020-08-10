export default function () {
    return '<p class="title">Cron 配置格式</p>' +
        '<p class="content">格式: [秒] [分] [小时] [日] [月] [周] [年]</p>' +
        '<table>' +
        '<th>字段</th>' +
        '<th>允许值</th>' +
        '<th>允许通配符</th>' +
        '<tbody>' +
        '<tr><td>秒</td><td>0-59</td><td> , - * /</td></tr>' +
        '<tr><td>分</td><td>0-59</td><td> , - * /</td></tr>' +
        '<tr><td>小时</td><td>0-23</td><td> , - * /</td></tr>' +
        '<tr><td>天</td><td>1-31</td><td>, - * ? / L W</td></tr>' +
        '<tr><td>月</td><td>1-12 or JAN-DEC</td><td> , - * /</td></tr>' +
        '<tr><td>周</td><td> 1-7 or SUN-SAT</td><td> , - * ? / L #</td></tr>' +
        '<tr><td>年</td><td>empty 或 1970-2099</td><td> , - * /</td></tr>' +
        '</tbody>' +
        '</table>' +
        '<p class="title">常用示例</p>' +
        '<p class="content">CronTrigger示例1 - 创建一个触发器的表达式，每5分钟就会触发一次</p>' +
        '<p class="content">【0 0/5 * * *？】</p>' +
        '<p class="content">CronTrigger示例2 - 创建触发器的表达式，每5分钟触发一次，分钟后10秒（即上午10时10分，上午10:05:10等）</p>' +
        '<p class="content">【10 0/5 * * *？】</p>' +
        '<p class="content">CronTrigger示例3 - 在每个星期三和星期五的10:30，11:30，12:30和13:30创建触发器的表达式。</p>' +
        '<p class="content">【0 30 10-13？* WED，FRI】</p>' +
        '<p class="content">CronTrigger示例4 - 创建触发器的表达式，每个月5日和20日上午8点至10点之间每半小时触发一次。请注意，触发器将不会在上午10点开始，仅在8:00，8:30，9:00和9:30</p>' +
        '<p class="content">【0 0/30 8-9 5,20 *？】</p>'
}
