export default function () {
    return '<p class="title">一、Cron表达式使用格式：从左到右（用空格隔开）</p>' +
        '<p class="content">#号前三位分别代表【基准日期】【日期类型】【节假日顺延】</p>' +
        '<table>' +
        '<th>Seconds</th>' +
        '<th>Minutes</th>' +
        '<th>Hours</th>' +
        '<th>DayofMonth</th>' +
        '<th>Month</th>' +
        '<th>DayofWeek</th>' +
        '<th>[Year]</th>' +
        '<tbody>' +
        '<tr><td>秒</td><td>分</td><td>小时</td><td>日期</td><td>月份</td><td>星期</td><td>[年]</td></tr>' +
        '</tbody>' +
        '</table>' +
        '<p class="title">二、Cron的字段使用说明:</p>'+
        '<table>' +
        '<th>字段</th>' +
        '<th>允许值</th>' +
        '<th>允许通配符</th>' +
        '<tbody>' +
        '<tr><td>基准日期</td><td>00-业务日期；01-工作日期</td><td>默认00-业务日期</td></tr>' +
        '<tr><td>日期类型</td><td>00-自然日；01-工作日</td><td>默认00-自然日</td></tr>' +
        '<tr><td>节假日顺延</td><td>00-前一工作日；01-下一工作日；02-不顺延</td><td>默认02-不顺延</td></tr>' +
        '<tr><td>秒（Seconds）</td><td>0~59的整数</td><td> , - * / 四个字符</td></tr>' +
        '<tr><td>分（Minutes）</td><td>0-59的整数</td><td> , - * / 四个字符</td></tr>' +
        '<tr><td>小时（Hours）</td><td>0-23的整数</td><td> , - * / 四个字符</td></tr>' +
        '<tr><td>日期（DayofMonth）</td><td>1-31的整数</td><td>,- * ? / L W C 八个字符</td></tr>' +
        '<tr><td>月份（Month）</td><td>1~12的整数或者 JAN-DEC</td><td> , - * / 四个字符</td></tr>' +
        '<tr><td>星期（DayofWeek）</td><td>1~7的整数或者 SUN-SAT （1=SUN</td><td>, - * ? / L C # 八个字符</td></tr>' +
        '<tr><td>年(可选，留空)（Year）</td><td>1970~2099</td><td> , - * / 四个字符</td></tr>' +
        '</tbody>' +
        '</table>' +
        '<strong style="color: #f00;line-height: 30px">注意事项</strong>' +
        '<p class="content">每一个域都使用数字，但还可以出现如下特殊字符，它们的含义是：</p>' +
        '<p class="content"><span class="mark">（1）*：表示匹配该域的任意值。</span>假如在Minutes域使用*, 即表示每分钟都会触发事件。</p>' +
        '<p class="content"><span class="mark">（2）?：只能用在DayofMonth和DayofWeek两个域。它也匹配域的任意值，但实际不会。</span>因为DayofMonth和DayofWeek会相互影响。例如想在每月的20日触发调度，不管20日到底是星期几，则只能使用如下写法： 13 13 15 20 * ?, 其中最后一位只能用？，而不能使用*，如果使用*表示不管星期几都会触发，实际上并不是这样。</p>' +
        '<p class="content"><span class="mark">（3）-：表示范围。</span>例如在Minutes域使用5-20，表示从5分到20分钟每分钟触发一次。</p>' +
        '<p class="content"><span class="mark">（4）/：表示起始时间开始触发，然后每隔固定时间触发一次。</span>例如在Minutes域使用5/20,则意味着5分钟触发一次，而25，45等分别触发一次。</p>' +
        '<p class="content"><span class="mark">（5）,：表示列出枚举值。</span>例如：在Minutes域使用5,20，则意味着在5和20分每分钟触发一次。 </p>' +
        '<p class="content"><span class="mark">（6）L：表示最后，只能出现在DayofWeek和DayofMonth域。</span>如果在DayofWeek域使用5L,意味着在最后的一个星期四触发。 </p>' +
        '<p class="content"><span class="mark">（7）W:表示有效工作日(周一到周五),只能出现在DayofMonth域，系统将在离指定日期的最近的有效工作日触发事件。</span>例如：在 DayofMonth使用5W，如果5日是星期六，则将在最近的工作日：星期五，即4日触发。如果5日是星期天，则在6日(周一)触发；如果5日在星期一到星期五中的一天，则就在5日触发。另外一点，W的最近寻找不会跨过月份 。</p>'+
        '<p class="content"><span class="mark">（8）LW:这两个字符可以连用，表示在某个月最后一个工作日，即最后一个星期五。</span></p>'+
        '<p class="content"><span class="mark">（9）#:用于确定每个月第几个星期几，只能出现在DayofMonth域。</span>例如在4#2，表示某月的第二个星期三。</p>'+
        '<p class="title">二、Cron的字段使用说明:</p>'+
        '<table>' +
        '<th>表达式</th>' +
        '<th>含义</th>' +
        '<tbody>' +
        '<tr><td>0 0 2 1 * ? *</td><td>表示在每月的1日的凌晨2点调整任务</td></tr>' +
        '<tr><td>0 15 10 ? * MON-FRI</td><td>表示周一到周五每天上午10:15执行作业</td></tr>' +
        '<tr><td>0 15 10 ? 6L 2002-2006</td><td>表示2002-2006年的每个月的最后一个星期五上午10:15执行作</td></tr>' +
        '<tr><td>0 0 10,14,16 * * ?</td><td>每天上午10点，下午2点，4点</td></tr>' +
        '<tr><td>0 0/30 9-17 * * ?</td><td>朝九晚五工作时间内每半小时 </td></tr>' +
        '<tr><td>0 0 12 ? * WED</td><td>表示每个星期三中午12点</td></tr>' +
        '<tr><td>0 0 12 * * ?</td><td>每天中午12点触发</td></tr>' +
        '<tr><td>0 15 10 ? * *</td><td>每天上午10:15触发</td></tr>' +
        '<tr><td>0 15 10 * * ?</td><td>每天上午10:15触发</td></tr>' +
        '<tr><td>0 15 10 * * ? *</td><td>0 15 10 * * ? *</td></tr>' +
        '<tr><td>0 15 10 * * ? 2005</td><td>2005年的每天上午10:15触发</td></tr>' +
        '<tr><td>0 * 14 * * ?</td><td>在每天下午2点到下午2:59期间的每1分钟触发</td></tr>' +
        '<tr><td>0 0/5 14 * * ?</td><td>在每天下午2点到下午2:55期间的每5分钟触发</td></tr>' +
        '<tr><td>0 0/5 14,18 * * ?</td><td>在每天下午2点到2:55期间和下午6点到6:55期间的每5分钟触发</td></tr>' +
        '<tr><td>0 0-5 14 * * ?</td><td>在每天下午2点到下午2:05期间的每1分钟触发</td></tr>' +
        '<tr><td>0 10,44 14 ? 3 WED</td><td>每年三月的星期三的下午2:10和2:44触发</td></tr>' +
        '<tr><td>0 15 10 ? * MON-FRI</td><td>周一至周五的上午10:15触发</td></tr>' +
        '<tr><td>0 15 10 15 * ?</td><td>每月15日上午10:15触发</td></tr>' +
        '<tr><td>0 15 10 L * ?</td><td>每月最后一日的上午10:15触发</td></tr>' +
        '<tr><td>0 15 10 ? * 6L</td><td>每月的最后一个星期五上午10:15触发</td></tr>' +
        '<tr><td>0 15 10 ? * 6L 2002-2005</td><td>2002年至2005年的每月的最后一个星期五上午10:15触发</td></tr>' +
        '<tr><td>0 15 10 ? * 6#3</td><td>每月的第三个星期五上午10:15触发</td></tr>' +
        '</tbody>' +
        '</table>'
}
