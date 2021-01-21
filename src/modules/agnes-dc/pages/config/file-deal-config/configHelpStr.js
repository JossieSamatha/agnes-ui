export default function () {
    return '<p class="title">一、匹配格式</p>' +
        '<table>' +
        '<th>格式</th>' +
        '<th>举例</th>' +
        '<tbody>' +
        '<tr><td>${yyyymmdd,-1,W,CN}</td><td>20200925->20200924</td></tr>' +
        '<tr><td>${yyyy-mm-dd,0,D,CN}</td><td>2020-09-25->2020-09-25</td></tr>' +
        '<tr><td>${yyyy年mm月dd日,0,D,CN}</td><td>2020年09月25日->2020年09月25日</td></tr>' +
        '<tr><td>${yymmdd,0,D,CN}</td><td>20200925->200925</td></tr>' +
        '<tr><td>${yyyy-@HM-@HD,0,D,CN}</td><td>2020-10-04->2020-a-4</td></tr>' +
        '<tr><td>${yyyy-@TM-@TD,0,D,CN}</td><td>2020-10-04->2020-10-4</td></tr>' +
        '</tbody>' +
        '</table>' +
        '<strong style="color: #f00;line-height: 30px">注意事项</strong>' +
        '<p class="content">${yyyymmdd/yyyy-mm-dd,-1/0/1,D/W,CN}</p>' +
        '<p class="content">-1/0/1：前一天/当天/后一天</p>' +
        '<p class="content">CN:中国大陆</p>' +
        '<p class="content">D:自然日、W:工作(注：选择当天，该参数应为D)</p>' +
        '<p class="content">@HM 月份转16进制（小于10月的 全部去0）</p>' +
        '<p class="content">@HD 日转16进制（小于10月的 全部去0）</p>' +
        '<p class="content">@TM 小于10月的 全部去0 如 01 -> 1</p>' +
        '<p class="content">@TD 小于10日的 全部去0 如 09 -> 9</p>' +
        '<table>'
}
