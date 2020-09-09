function staticCompPosition(){
    return {
        axis: 'both',
        draggable: true,
        resizable: true,
        aspectRatio: false,
        zIndex: 1,
    }
}

export default function () {
    return {
        compArr: [
            {
                category: 'datav-canvas',
                icon: 'setting',
                compName: 'datav-canvas',
                label: '页面容器'
            },
            {
                category: 'chart',
                icon: 'bar-chart',
                label: '图表',
                components: [
                    {
                        type: 'ct-line',
                        icon: 'ct-line',
                        compName: 'ct-line',
                        label: '折线（面积）图',
                    }, {
                        type: 'ct-bar',
                        icon: 'ct-bar',
                        compName: 'ct-bar',
                        label: '柱状（条形）图',
                    }, {
                        type: 'ct-scatter',
                        icon: 'ct-scatter',
                        compName: 'ct-scatter',
                        label: '散点（气泡图）',
                    }, {
                        type: 'ct-pie',
                        icon: 'ct-pie',
                        compName: 'ct-pie',
                        label: '饼（环形图）',
                    }, {
                        type: 'ct-radar',
                        icon: 'ct-radar',
                        compName: 'ct-radar',
                        label: '雷达（面积）图',
                    }, {
                        type: 'ct-gauge',
                        icon: 'ct-gauge',
                        compName: 'ct-gauge',
                        label: '仪表盘',
                    }, {
                        type: 'ct-funnel',
                        icon: 'ct-funnel',
                        compName: 'ct-funnel',
                        label: '漏斗图',
                    }]
            },
            {
                category: 'grid',
                icon: 'grid',
                label: '表格（列表）',
                components: [
                    {
                        type: 'static-grid',
                        icon: 'grid',
                        compName: 'static-grid',
                        label: '表格（普通）',
                        position: {
                            ...staticCompPosition(),
                            width: 500,
                            height: 220,
                        },
                        componentMeta: {}
                    }, {
                        type: 'scroll-board',
                        icon: 'scroll-board',
                        compName: 'scroll-board',
                        label: '轮播表',
                        position: {
                            ...staticCompPosition(),
                            width: 480,
                            height: 150,
                        },
                        componentMeta: {}
                    }, {
                        type: 'ct-capsule',
                        icon: 'ct-capsule',
                        compName: 'ct-capsule',
                        label: '胶囊柱图',
                        position: {
                            ...staticCompPosition(),
                            width: 480,
                            height: 150,
                        },
                        componentMeta: {}
                    }, {
                        type: 'ranking-board',
                        icon: 'rank-board',
                        compName: 'ranking-board',
                        label: '排名轮播表',
                    }
                ]
            },
            {
                category: 'text',
                icon: 'text',
                label: '文本',
                components: [
                    {
                        type: 'text',
                        icon: 'text',
                        compName: 'basic-text',
                        label: '文本',
                        position: {
                            ...staticCompPosition(),
                            width: 150,
                            height: 50,
                        },
                        componentMeta: {
                            'font-size': '16px',
                            'fontWeight': 'normal',
                            'color': '#fff',
                            'background': 'transparent',
                            'border': 'none',
                            'justify-content': 'center',
                            'align-items': 'center',
                            'contentText': '',
                        }
                    }, {
                        type: 'text',
                        icon: 'roll-text',
                        compName: 'roll-text',
                        label: '滚动文本',
                        position: {
                            ...staticCompPosition(),
                            width: 150,
                            height: 50,
                        },
                        componentMeta: {
                            'font-size': '16px',
                            'fontWeight': 'normal',
                            'color': '#fff',
                            'background': 'transparent',
                            'border': 'none',
                            'justify-content': 'center',
                            'align-items': 'center',
                            'contentText': '',
                        }
                    }, {
                        type: 'digital-flop',
                        icon: 'digital-flop',
                        compName: 'digital-flop',
                        label: '数字翻牌器',
                        position: {
                            ...staticCompPosition(),
                            width: 150,
                            height: 50,
                        },
                        componentMeta: {
                            title: '标题',
                            number: 20,
                            textAlign: 'left',
                            color: '#00c0ff',
                            fontWeight: 'normal',
                            unit: '个'
                        }

                    }, {
                        type: 'date-picker',
                        icon: 'date-picker',
                        compName: 'date-picker',
                        label: '日期',
                    }, {
                        type: 'date-time-picke',
                        icon: 'date-time-picke',
                        compName: 'date-time-picker',
                        label: '时间',
                    }
                ]
            }, {
                category: 'decorate',
                icon: 'decorate',
                label: '装饰',
                components: [
                    {
                        type: 'border',
                        icon: 'border',
                        compName: 'border-comp',
                        label: '边框',
                        componentMeta: {
                            borderType: 'dv-border-box-1',
                            reverse: false,
                            borderContent: '',
                            title: '',
                            titleWidthStr: '300',
                        }
                    }, {
                        type: 'dynamic-comp',
                        icon: 'dynamic-comp',
                        compName: 'dynamic-comp',
                        label: '动态装饰',
                        position: {
                            ...staticCompPosition(),
                            width: 200,
                            height: 80,
                        },
                        componentMeta: {
                            dynamicType: 'dv-decoration-3',
                            reverse: false,
                            title: '123123'
                        }
                    }
                ]
            }, {
                category: 'others',
                icon: 'others',
                label: '其他',
                components: [
                    {
                        type: 'water-pond',
                        icon: 'water-pond',
                        compName: 'water-pond',
                        label: '水位图',
                    }, {
                        type: 'percent-pond',
                        icon: 'percent-pond',
                        compName: 'percent-pond',
                        label: '进度池',
                    }
                ]
            }],
        dataVList: [
            {
                "id": "de867b7e8d0c44fbba76bf581070eb3e",
                "title": "托管业务模板",
                "label": "测试",
                "type": "single",
                "thumbnail": "090115e70",
                "createTime": "2020-08-18T20:39:04.000+00:00",
                "updateTime": "2020-08-18T07:39:01.000+00:00"
            }, {
                "id": "0f9471a72de74519886ef51d854abfe0",
                "title": "文本-编辑器测试",
                "label": "",
                "type": "single",
                "thumbnail": "090114c60",
                "createTime": "2020-08-11T10:40:02.000+00:00",
                "updateTime": "2020-08-11T10:40:02.000+00:00"
            }, {
                "id": "dKYZB8iYyYC7fhyB6TdspKbbWbdQQEQ3",
                "title": "5555555555",
                "label": "99999999",
                "type": "ppt",
                "thumbnail": "090114d00",
                "createTime": "2020-08-11T10:03:52.000+00:00",
                "updateTime": "2020-08-11T10:03:52.000+00:00"
            }, {
                "id": "YyE8XpawEJ2jckzz4mBd5YTxstKecrYS",
                "title": "滚动文本测试222",
                "label": "",
                "type": "single",
                "thumbnail": "090114ce0",
                "createTime": "2020-08-11T09:49:31.000+00:00",
                "updateTime": "2020-08-11T09:49:31.000+00:00"
            }, {
                "id": "1e84c47030ba4d2dbce8acd95a72b2e9",
                "title": "测试2",
                "label": "标签1；标签2",
                "type": "single",
                "thumbnail": "090114ca0",
                "createTime": "2020-08-11T09:42:14.000+00:00",
                "updateTime": "2020-08-11T09:42:14.000+00:00"
            }, {
                "id": "zFpeh6JhHafJ6RpZZydpPt5JD7aRjwGA",
                "title": "文本-编辑器测试",
                "label": "",
                "type": "single",
                "thumbnail": "090114c60",
                "createTime": "2020-08-11T09:12:22.000+00:00",
                "updateTime": "2020-08-11T09:12:22.000+00:00"
            }, {
                "id": "63ZddcMthNDyx7AJttkMZp2QPWm3EHxY",
                "title": "测试5",
                "label": "8",
                "type": "single",
                "thumbnail": "090114c40",
                "createTime": "2020-08-11T09:08:42.000+00:00",
                "updateTime": "2020-08-11T09:08:42.000+00:00"
            }],

        dataVTemplate: [
            {
                id: "de867b7e8d0c44fbba76bf581070eb3e",
                title: "托管业务模板",
                label: "测试",
                type: "single",
                category: "month",
                thumbnail: "bg0",
                description: "科技部每日报告",
                content: JSON.stringify({
                    pageWidth: 800,
                    bgImage: 'bg0',
                    datavComps: [
                        {
                            compId: 'c765c6259d0e49acb56b769819d72a76',
                            compName: 'ct-line',
                            isActive: false,
                            position: {
                                width: 200,
                                height: 150,
                                left: 10,
                                top: 10,
                                axis: 'both',
                                draggable: true,
                                resizable: true,
                                aspectRatio: false,
                                zIndex: 1,
                            },
                            optional: {
                                "type": "chart",
                                "icon": "ct-line",
                                "compName": "ct-line",
                                "label": "折线（面积）图",
                                "componentMeta": {
                                    xAxis: {
                                        name: '年份',
                                        nameTextStyle: {
                                            fill: '#fff',
                                            fontSize: 12
                                        },
                                        data: ['2014', '2015', '2016', '2017', '2018', '2019'],
                                        boundaryGap: false,
                                        axisLine: {
                                            style: {
                                                stroke: '#fff'
                                            }
                                        },
                                        axisLabel: {
                                            style: {
                                                fill: '#fff'
                                            }
                                        },
                                        axisTick: {
                                            show: false
                                        }
                                    },
                                    yAxis: {
                                        name: '规模',
                                        nameTextStyle: {
                                            fill: '#fff',
                                            fontSize: 12
                                        },
                                        data: 'value',
                                        splitLine: {
                                            show: false
                                        },
                                        axisLine: {
                                            style: {
                                                stroke: '#fff'
                                            }
                                        },
                                        axisLabel: {
                                            style: {
                                                fill: '#fff'
                                            },
                                            formatter ({ value }) {
                                                return value.toFixed(2)
                                            }
                                        },
                                        axisTick: {
                                            show: false
                                        },
                                        // interval: 0.5
                                    },
                                    series: [
                                        {
                                            data: [100, 230, 100, 200, 300, 400],
                                            type: 'line',
                                            name: '规模',
                                            smooth: true,
                                            lineArea: {
                                                show: true,
                                                gradient: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)']
                                            },
                                            linePoint: {
                                                radius: 4,
                                                style: {
                                                    fill: '#00db95'
                                                }
                                            }
                                        },
                                        {
                                            data: [200, 230, 900, 100, 500, 200],
                                            type: 'line',
                                            name: '产品',
                                            smooth: true,
                                            lineArea: {
                                                show: true,
                                                gradient: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)']
                                            },
                                            linePoint: {
                                                radius: 4,
                                                style: {
                                                    fill: '#00db95'
                                                }
                                            }
                                        },
                                        {
                                            data: [120, 223, 190, 210, 350, 420],
                                            type: 'line',
                                            name: '客户数',
                                            smooth: true,
                                            lineArea: {
                                                show: true,
                                                gradient: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)']
                                            },
                                            linePoint: {
                                                radius: 4,
                                                style: {
                                                    fill: '#00db95'
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                        }
                    ]
                })
            },
            {
                "id": "0f9471a72de74519886ef51d854abfe0",
                "title": "文本-编辑器测试",
                "label": "",
                "type": "single",
                category: "month",
                thumbnail: "bg1",
                description: "科技部周报告",
                content: JSON.stringify({
                    pageWidth: 800,
                    bgImage: 'bg0',
                    datavComps: [
                        {
                            compId: 'c765c6259d0e49acb56b769819d72a76',
                            compName: 'ct-line',
                            isActive: false,
                            position: {
                                width: 400,
                                height: 250,
                                left: 10,
                                top: 10,
                                axis: 'both',
                                draggable: true,
                                resizable: true,
                                aspectRatio: false,
                                zIndex: 1,
                            },
                            optional: {
                                "type": "chart",
                                "icon": "ct-line",
                                "compName": "ct-line",
                                "label": "折线（面积）图",
                                "componentMeta": {
                                    "xAxis": {
                                        "name": "月份",
                                        "data": ["2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                                        "boundaryGap": false
                                    },
                                    "yAxis": {
                                        "data": "value",
                                        "splitLine": {"show": false},
                                        "axisTick": {"show": false}
                                    },
                                    "series": [{
                                        "name": "研发加班时长",
                                        "data": [20, 15, 10, 25, 25, 30, 20, 10, 8, 35, 30],
                                        "type": "line"
                                    }, {
                                        "name": "人均加班时长",
                                        "data": [8, 10, 12, 10, 10, 10, 8, 8, 12, 14, 12],
                                        "type": "line"
                                    }, {
                                        "name": "总计加班时长",
                                        "data": [28, 25, 22, 35, 35, 40, 28, 18, 20, 49, 42],
                                        "type": "line"
                                    }]
                                }
                            },
                        }
                    ]
                })
            }
        ],
    }
}