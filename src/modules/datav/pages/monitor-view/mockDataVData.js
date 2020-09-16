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
                label: '插入图表',
                components: [
                    {
                        type: 'chart',
                        icon: 'ct-line',
                        compName: 'ct-line',
                        label: '折线（面积）图',
                        position: {
                            ...staticCompPosition(),
                            width: 500,
                            height: 220,
                        },
                        componentMeta: {
                            chartSettings: {
                                stack: {'用户': ['访问用户', '下单用户']},
                                axisSite: {right: ['下单率']},
                                yAxisType: ['KMB', 'percent'],
                                yAxisName: ['数值', '比率'],
                                area: false,
                            },
                            extend: {
                                series: {
                                    label: {
                                        normal: {
                                            show: true
                                        }
                                    }
                                }
                            },
                            chartData: {
                                columns: ['日期', '访问用户', '下单用户', '下单率'],
                                rows: [
                                    {'日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32},
                                    {'日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26},
                                    {'日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76},
                                    {'日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49},
                                    {'日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323},
                                    {'日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78}
                                ]
                            }
                        }
                    },
                    {
                        type: 'chart',
                        icon: 'ct-bar',
                        compName: 'ct-bar',
                        label: '柱状（条形）图',
                        position: {
                            ...staticCompPosition(),
                            width: 500,
                            height: 220,
                        },
                        componentMeta: {
                            chartSettings: {
                                showLine: ['下单用户'],
                                axisSite: {right: ['下单率']},
                                yAxisType: ['KMB', 'percent'],
                                yAxisName: ['数值', '比率'],
                                stack: {'用户': ['访问用户', '下单用户']}
                            },
                            extend: {
                                series: {
                                    label: {show: true, position: "top"}
                                },
                            },
                            ifShowLegend: true,
                            legendPosition: 'bottom',
                            chartData: {
                                columns: ['日期', '访问用户', '下单用户', '下单率'],
                                rows: [
                                    {'日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32},
                                    {'日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26},
                                    {'日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76},
                                    {'日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49},
                                    {'日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323},
                                    {'日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78}
                                ]
                            }
                        }
                    },
                    {
                        type: 'chart',
                        icon: 'ct-scatter',
                        compName: 'ct-scatter',
                        label: '散点（气泡）图',
                        position: {
                            ...staticCompPosition(),
                            width: 500,
                            height: 220,
                        },
                        componentMeta: {
                            chartSettings: {
                                tooltipTrigger: 'axis'
                            },
                            chartData: {
                                columns: ['日期', '访问用户', '下单用户', '年龄'],
                                rows: {
                                    '上海': [
                                        {'日期': '1/1', '访问用户': 1230, '年龄': 3, '下单用户': 1244},
                                        {'日期': '1/2', '访问用户': 1223, '年龄': 6, '下单用户': 2344},
                                        {'日期': '1/3', '访问用户': 7123, '年龄': 9, '下单用户': 3245},
                                        {'日期': '1/4', '访问用户': 4123, '年龄': 12, '下单用户': 4355},
                                        {'日期': '1/5', '访问用户': 3123, '年龄': 15, '下单用户': 4564},
                                        {'日期': '1/6', '访问用户': 2323, '年龄': 20, '下单用户': 6537}
                                    ],
                                    '北京': [
                                        {'日期': '1/1', '访问用户': 1230, '年龄': 3, '下单用户': 1244},
                                        {'日期': '1/2', '访问用户': 1273, '年龄': 6, '下单用户': 2344},
                                        {'日期': '1/3', '访问用户': 3123, '年龄': 15, '下单用户': 4564},
                                        {'日期': '1/4', '访问用户': 2123, '年龄': 9, '下单用户': 3245},
                                        {'日期': '1/5', '访问用户': 4103, '年龄': 12, '下单用户': 4355},
                                        {'日期': '1/6', '访问用户': 7123, '年龄': 10, '下单用户': 3567}
                                    ]
                                }
                            }
                        }
                    },
                    {
                        type: 'chart',
                        icon: 'ct-pie',
                        compName: 'ct-pie',
                        label: '饼（环形）图',
                        position: {
                            ...staticCompPosition(),
                            width: 500,
                            height: 220,
                        },
                        componentMeta: {
                            chartSettings: {
                                limitShowNum: 5
                            },
                            chartData: {
                                columns: ['日期', '访问用户'],
                                rows: [
                                    { '日期': '1/1', '访问用户': 1393 },
                                    { '日期': '1/2', '访问用户': 3530 },
                                    { '日期': '1/3', '访问用户': 2923 },
                                    { '日期': '1/4', '访问用户': 1723 },
                                    { '日期': '1/5', '访问用户': 3792 },
                                    { '日期': '1/6', '访问用户': 4593 }]
                            }
                        }
                    },
                    {
                        type: 'chart',
                        icon: 'ct-radar',
                        compName: 'ct-radar',
                        label: '雷达（面积）图',
                        position: {
                            ...staticCompPosition(),
                            width: 500,
                            height: 220,
                        },
                        componentMeta: {
                            chartSettings: {
                                dataType: { '下单率': 'percent' }
                            },
                            chartData: {
                                columns: ['日期', '访问用户', '下单用户', '下单率'],
                                rows: [
                                    { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
                                    { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
                                    { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
                                    { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
                                    { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
                                    { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }]
                            }
                        }
                    },
                    {
                        type: 'chart',
                        icon: 'ct-gauge',
                        compName: 'ct-gauge',
                        label: '仪表盘',
                        position: {
                            ...staticCompPosition(),
                            width: 500,
                            height: 220,
                        },
                        componentMeta: {
                            chartSettings: {
                                dataType: {
                                    '占比': 'percent'
                                },
                                seriesMap: {
                                    '占比': {
                                        min: 0,
                                        max: 1
                                    }
                                }
                            },
                            chartData: {
                                columns: ['type', 'value'],
                                rows: [
                                    { type: '占比', value: 0.8 }
                                ]
                            }
                        }
                    },
                    {
                        type: 'chart',
                        icon: 'ct-funnel',
                        compName: 'ct-funnel',
                        label: '漏斗图',
                        position: {
                            ...staticCompPosition(),
                            width: 500,
                            height: 220,
                        },
                        componentMeta: {
                            chartSettings: {
                                useDefaultOrder: true,
                                filterZero: true
                            },
                            chartData: {
                                columns: ['状态', '数值'],
                                rows: [
                                    { '状态': '展示', '数值': 900 },
                                    { '状态': '访问', '数值': 100 },
                                    { '状态': '零', '数值': 0 },
                                    { '状态': '点击', '数值': 300 },
                                    { '状态': '订单', '数值': 200 }
                                ]
                            }
                        }
                    },
                    {
                        type: 'chart',
                        icon: 'ct-map',
                        compName: 'ct-map',
                        label: '地图',
                        position: {
                            ...staticCompPosition(),
                            width: 500,
                            height: 220,
                        },
                        componentMeta: {
                            chartSettings: {
                                position: "china",
                                dataType: {
                                    "面积": "KMB"
                                }
                            },
                            chartData: {
                                columns: ['位置', '税收', '人口', '面积'],
                                rows: [
                                    { '位置': '吉林', '税收': 123, '人口': 123, '面积': 92134 },
                                    { '位置': '北京', '税收': 1223, '人口': 2123, '面积': 29234 },
                                    { '位置': '上海', '税收': 2123, '人口': 1243, '面积': 94234 },
                                    { '位置': '浙江', '税收': 4123, '人口': 5123, '面积': 29234 }
                                ]
                            }
                        }
                    }
                ]
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
                    pageWidth: 1920,
                    pageHeight: 1048,
                    pageScale: 100,
                    bgImage: 'bg0',
                    datavComps: [
                        {
                            compId: 'c765c6259d0e49acb56b769819d72a76',
                            compName: 'ct-line',
                            isActive: false,
                            position: {
                                width: 420,
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
                                    chartSettings: {
                                        stack: {'用户': ['访问用户', '下单用户']},
                                        axisSite: {right: ['下单率']},
                                        yAxisType: ['KMB', 'percent'],
                                        yAxisName: ['数值', '比率'],
                                        area: false,
                                    },
                                    extend: {
                                        series: {
                                            label: {
                                                normal: {
                                                    show: true
                                                }
                                            }
                                        }
                                    },
                                    chartData: {
                                        columns: ['日期', '访问用户', '下单用户', '下单率'],
                                        rows: [
                                            {'日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32},
                                            {'日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26},
                                            {'日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76},
                                            {'日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49},
                                            {'日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323},
                                            {'日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78}
                                        ]
                                    }
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
                    pageWidth: 1920,
                    pageHeight: 1048,
                    pageScale: 100,
                    bgImage: 'bg0',
                    datavComps: [
                        {
                            compId: 'c765c6259d0e49acb56b769819d72a76',
                            compName: 'ct-line',
                            isActive: false,
                            position: {
                                width: 420,
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
                                    chartSettings: {
                                        stack: {'用户': ['访问用户', '下单用户']},
                                        axisSite: {right: ['下单率']},
                                        yAxisType: ['KMB', 'percent'],
                                        yAxisName: ['数值', '比率'],
                                        area: false,
                                    },
                                    extend: {
                                        series: {
                                            label: {
                                                normal: {
                                                    show: true
                                                }
                                            }
                                        }
                                    },
                                    chartData: {
                                        columns: ['日期', '访问用户', '下单用户', '下单率'],
                                        rows: [
                                            {'日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32},
                                            {'日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26},
                                            {'日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76},
                                            {'日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49},
                                            {'日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323},
                                            {'日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78}
                                        ]
                                    }
                                }
                            },
                        }
                    ]
                })
            }
        ],
    }
}