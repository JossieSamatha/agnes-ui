export default function () {
    return '<p class="title">可选参数</p>' +
        '<table>' +
        '<th>参数类型</th>' +
        '<th>参数含义</th>' +
        '<th>参数格式</th>' +
        '<tbody>' +
        '<tr><td rowspan="2" style="min-width: 100px">基本参数</td><td rowspan="2" style="min-width: 100px">业务日期</td><td style="min-width: 150px">${yyyy-MM-dd}</td></tr>' +
        '<tr><td style="min-width: 150px">${yyyyMMdd}</td></tr>' +
        '<tr><td rowspan="2" style="min-width: 100px">事件参数</td><td style="min-width: 100px">产品名称</td><td style="min-width: 150px">${projectName}</td></tr>' +
        '<tr><td style="min-width: 100px">产品代码</td><td style="min-width: 150px">${projectCode}</td></tr>' +
        '</tbody>' +
        '</table>'
}
