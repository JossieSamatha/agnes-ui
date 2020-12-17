export default function () {
    return {
        numberFilterOptions: [
            {value: "eq", label: "等于"},
            {value: "ne", label: "不等于"},
            {value: "gt", label: "大于"},
            {value: "gte", label: "大于等于"},
            {value: "lt", label: "小于"},
            {value: "lte", label: "小于等于"},
            {value: "range", label: "选择范围"},
            {value: "empty", label: "为空"},
            {value: "not_empty", label: "不为空"}
        ],
        dateFilterOptions: [
            {value: "eq", label: "等于"},
            {value: "ne", label: "不等于"},
            {value: "gte", label: "大于等于"},
            {value: "lte", label: "小于等于"},
            {value: "range", label: "选择范围"},
            {value: "filter", label: "动态筛选"},
            {value: "empty", label: "为空"},
            {value: "not_empty", label: "不为空"},
        ],
        textFilterOptions: [
            {value: "eq", label: "等于"},
            {value: "ne", label: "不等于"},
            {value: "eq_random", label: "等于任意一个"},
            {value: "ne_random", label: "不等于任意一个"},
            {value: "include", label: "包含"},
            {value: "not_include", label: "不包含"},
            {value: "empty", label: "为空"},
            {value: "not_empty", label: "不为空"},
        ],
        iconList: [
            {
                label: "指标图",
                rule: [{xAxis: '0', yAxis: '1'}, {xAxis: '1', yAxis: '1'}],
                detail: "０个维度，１个指标",
                detail2: "１个维度，１个指标",
                icon: "#icon-zhibiaozhongxin",
                type: "",
                disable: true,
            },
            {
                label: "柱状图",
                rule: [{xAxis: '1', yAxis: '1', yMultiple: true}, {xAxis: '2', yAxis: '1'}],
                detail: "１个维度，１个或多个指标",
                detail2: "２个维度，１个指标",
                icon: "#icon-chart3",
                type: "ct-bar",
                disable: false,
            },
            {
                label: "条形图",
                rule: [{xAxis: '1', yAxis: '1', yMultiple: true}, {xAxis: '2', yAxis: '1'}],
                detail: "１个维度，１个或多个指标",
                detail2: "２个维度，１个指标",
                icon: "#icon-tiaoxingtu",
                type: "ct-strip",
                disable: false,
            },
            {
                label: "折线图",
                rule: [{xAxis: '1', yAxis: '1', yMultiple: true}, {xAxis: '2', yAxis: '1'}],
                detail: "１个维度，１个或多个指标",
                detail2: "２个维度，１个指标",
                icon: "#icon-tubiaozhexiantu",
                type: "ct-line",
                disable: false,
            },
            {
                label: "面积图",
                rule: [{xAxis: '1', yAxis: '1', yMultiple: true}, {xAxis: '2', yAxis: '1'}],
                detail: "１个维度，１个或多个指标",
                detail2: "２个维度，１个指标",
                icon: "#icon-mianjitu",
                type: "ct-area",
                disable: false,
            },
            {
                label: "双轴图",
                rule: [{xAxis: '1', yAxis: '1', yMultiple: true}],
                detail: "１个维度，１个或多个指标",
                detail2: "",
                icon: "#icon-shuangzhoutu1",
                type: "ct-line-bar",
                disable: false,
            },
            {
                label: "饼图",
                rule: [{xAxis: '1', yAxis: '1'}],
                detail: "１个维度，１指标",
                detail2: "",
                icon: "#icon-bingtu",
                type: "ct-pie",
                disable: false,
            },
            {
                label: "雷达图",
                rule: [{xAxis: '1', yAxis: '1', yMultiple: true}, {xAxis: '2', yAxis: '1'}],
                detail: "１个维度，１个或多个指标",
                detail2: "２个维度，１个指标",
                icon: "#icon-leidatu",
                type: "ct-radar",
                disable: true,
            },
            {
                label: "地图",
                rule: [{xAxis: '1', yAxis: '1'}],
                detail: "１个地理维度，１个指标",
                detail2: "",
                icon: "#icon-chinamap-chart",
                type: "ct-map",
                disable: true,
            }
        ],
        dirArr: [
            {label: "横向", value: "transverse"},
            {label: "左倾斜", value: "lrotate"},
            {label: "右倾斜", value: "rrotate"},
            {label: "纵向", value: "longitudinal"}
        ],
        xAxisOptions: [
            {
                value: 'updateName',
                label: '修改显示名',
            },
            {
                value: 'order',
                label: '排序',
                children: [
                    {
                        value: 'normal',
                        label: '默认'
                    },
                    {
                        value: 'riseOrder',
                        label: '升序'
                    },
                    {
                        value: 'dropOrder',
                        label: '降序'
                    }
                ]
            },
            {
                value: 'deleteFiled',
                label: '删除字段',
            }
        ],
        xAxisDataOptions: [
            {
                value: 'updateName',
                label: '修改显示名',
            },
            {
                value: 'groupRule',
                label: '汇总方式',
                children: [
                    {
                        value: 'year',
                        label: '年'
                    },
                    {
                        value: 'year_quarter',
                        label: '年-季'
                    },
                    {
                        value: 'year_month',
                        label: '年-月'
                    },
                    {
                        value: 'year_week',
                        label: '年-周'
                    },
                    {
                        value: 'year_month_day',
                        label: '年-月-日'
                    }
                ]
            },
            {
                value: 'order',
                label: '排序',
                children: [
                    {
                        value: 'normal',
                        label: '默认'
                    },
                    {
                        value: 'riseOrder',
                        label: '升序'
                    },
                    {
                        value: 'dropOrder',
                        label: '降序'
                    }
                ]
            },
            {
                value: 'deleteFiled',
                label: '删除字段',
            }
        ],
        yAxisOptions: [
            {
                value: 'updateName',
                label: '修改显示名',
            },
            {
                value: 'computer',
                label: '高级计算',
                children: [
                    {
                        value: 'proportion',
                        label: '占比'
                    },
                    {
                        value: 'none',
                        label: '无'
                    }
                ]
            },
            {
                value: 'order',
                label: '排序',
                children: [
                    {
                        value: 'normal',
                        label: '默认'
                    },
                    {
                        value: 'riseOrder',
                        label: '升序'
                    },
                    {
                        value: 'dropOrder',
                        label: '降序'
                    }
                ]
            },
            {
                value: 'deleteFiled',
                label: '删除字段',
            }
        ],
        yAxisNumOptions: [
            {
                value: 'updateName',
                label: '修改显示名',
            },
            {
                value: 'op',
                label: '汇总方式',
                children: [
                    {
                        value: 'sum',
                        label: '求和'
                    },
                    {
                        value: 'avg',
                        label: '平均'
                    },
                    {
                        value: 'max',
                        label: '最大值'
                    },
                    {
                        value: 'min',
                        label: '最小值'
                    },
                    {
                        value: 'count',
                        label: '计数'
                    }
                ]
            },
            {
                value: 'computer',
                label: '高级计算',
                children: [
                    {
                        value: 'proportion',
                        label: '占比'
                    },
                    {
                        value: 'none',
                        label: '无'
                    }
                ]
            },
            {
                value: 'order',
                label: '排序',
                children: [
                    {
                        value: 'normal',
                        label: '默认'
                    },
                    {
                        value: 'riseOrder',
                        label: '升序'
                    },
                    {
                        value: 'dropOrder',
                        label: '降序'
                    }
                ]
            },
            {
                value: 'deleteFiled',
                label: '删除字段',
            }
        ],
        filterOptions: [
            {
                value: 'updateFiled',
                label: '修改筛选条件',
            },
            {
                value: 'deleteFiled',
                label: '删除筛选条件',

            }
        ],
        metricsIconList: [
            {
                label: "柱状图",
                icon: "#icon-chart3",
                type: "ct-bar",
            },
            {
                label: "折线图",
                icon: "#icon-tubiaozhexiantu",
                type: "ct-line",
            },
            {
                label: "堆积柱形图",
                icon: "#icon-duijizhuxingtu-copy",
                type: "ct-stack-bar",
            }
        ],
        axisList: [
            {
                label: '维度',
                axisData: [],
                color: {
                    backgroundColor: '#0f5eff',
                    borderColor: '#0f5eff',
                },
                options: [
                    {
                        type: 'text',
                        label: '',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名',
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除字段',
                            }
                        ]
                    },
                    {
                        type: 'date',
                        label: '年-月',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名',
                            },
                            {
                                value: 'groupRule',
                                label: '汇总方式',
                                children: [
                                    {
                                        value: 'year',
                                        label: '年'
                                    },
                                    {
                                        value: 'year_quarter',
                                        label: '年-季'
                                    },
                                    {
                                        value: 'year_month',
                                        label: '年-月'
                                    },
                                    {
                                        value: 'year_week',
                                        label: '年-周'
                                    },
                                    {
                                        value: 'year_month_day',
                                        label: '年-月-日'
                                    }
                                ]
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除字段',
                            }
                        ]
                    },
                    {
                        type: 'number',
                        label: '',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名',
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除字段',
                            }
                        ]
                    }
                ],
            },
            {
                label: '指标',
                axisData: [],
                color: {
                    backgroundColor: 'rgb(13, 179, 166)',
                    borderColor: 'rgb(13, 179, 166)',
                },
                options: [
                    {
                        type: 'text',
                        label: '计数',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名',
                            },
                            {
                                value: 'computer',
                                label: '高级计算',
                                children: [
                                    {
                                        value: 'proportion',
                                        label: '占比'
                                    },
                                    {
                                        value: 'none',
                                        label: '无'
                                    }
                                ]
                            },
                            {
                                value: "dataFormatter",
                                label: '数据格式'
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除字段',
                            }
                        ]
                    },
                    {
                        type: 'date',
                        label: '计数',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名',
                            },
                            {
                                value: 'computer',
                                label: '高级计算',
                                children: [
                                    {
                                        value: 'proportion',
                                        label: '占比'
                                    },
                                    {
                                        value: 'none',
                                        label: '无'
                                    }
                                ]
                            },
                            {
                                value: "dataFormatter",
                                label: '数据格式'
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除字段',
                            }
                        ]
                    },
                    {
                        type: 'number',
                        label: '求和',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名',
                            },
                            {
                                value: 'op',
                                label: '汇总方式',
                                children: [
                                    {
                                        value: 'sum',
                                        label: '求和'
                                    },
                                    {
                                        value: 'avg',
                                        label: '平均'
                                    },
                                    {
                                        value: 'max',
                                        label: '最大值'
                                    },
                                    {
                                        value: 'min',
                                        label: '最小值'
                                    },
                                    {
                                        value: 'count',
                                        label: '计数'
                                    }
                                ]
                            },
                            {
                                value: 'computer',
                                label: '高级计算',
                                children: [
                                    {
                                        value: 'proportion',
                                        label: '占比'
                                    },
                                    {
                                        value: 'none',
                                        label: '无'
                                    }
                                ]
                            },
                            {
                                value: "dataFormatter",
                                label: '数据格式'
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除字段',
                            }
                        ]
                    }
                ],
            },
            {
                label: '过滤条件',
                axisData: [],
                color: {
                    backgroundColor: 'rgb(234, 240, 252)',
                    borderColor: 'rgb(234, 240, 252)',
                    color: '#999',
                },
                options: [
                    {
                        type: 'text',
                        data: [
                            {
                                value: 'updateFiled',
                                label: '修改筛选条件',
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除筛选条件',

                            }
                        ]
                    },
                    {
                        type: 'date',
                        data: [
                            {
                                value: 'updateFiled',
                                label: '修改筛选条件',
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除筛选条件',

                            }
                        ]
                    },
                    {
                        type: 'number',
                        data: [
                            {
                                value: 'updateFiled',
                                label: '修改筛选条件',
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除筛选条件',

                            }
                        ]
                    }
                ],
            }
        ],
        doubleLineAxisList: [
            {
                label: '维度',
                axisData: [],
                color: {
                    backgroundColor: '#0f5eff',
                    borderColor: '#0f5eff',
                },
                options: [
                    {
                        type: 'text',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名',
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除字段',
                            }
                        ]
                    },
                    {
                        type: 'date',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名',
                            },
                            {
                                value: 'groupRule',
                                label: '汇总方式',
                                children: [
                                    {
                                        value: 'year',
                                        label: '年'
                                    },
                                    {
                                        value: 'year_quarter',
                                        label: '年-季'
                                    },
                                    {
                                        value: 'year_month',
                                        label: '年-月'
                                    },
                                    {
                                        value: 'year_week',
                                        label: '年-周'
                                    },
                                    {
                                        value: 'year_month_day',
                                        label: '年-月-日'
                                    }
                                ]
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除字段',
                            }
                        ]
                    },
                    {
                        type: 'number',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名',
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除字段',
                            }
                        ]
                    }
                ],
            },
            {
                label: '指标左',
                axisData: [],
                color: {
                    backgroundColor: 'rgb(13, 179, 166)',
                    borderColor: 'rgb(13, 179, 166)',
                },
                options: [
                    {
                        type: 'text',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名',
                            },
                            {
                                value: 'computer',
                                label: '高级计算',
                                children: [
                                    {
                                        value: 'proportion',
                                        label: '占比'
                                    },
                                    {
                                        value: 'none',
                                        label: '无'
                                    }
                                ]
                            },
                            {
                                value: "dataFormatter",
                                label: '数据格式'
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除字段',
                            }
                        ]
                    },
                    {
                        type: 'date',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名',
                            },
                            {
                                value: 'computer',
                                label: '高级计算',
                                children: [
                                    {
                                        value: 'proportion',
                                        label: '占比'
                                    },
                                    {
                                        value: 'none',
                                        label: '无'
                                    }
                                ]
                            },
                            {
                                value: "dataFormatter",
                                label: '数据格式'
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除字段',
                            }
                        ]
                    },
                    {
                        type: 'number',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名',
                            },
                            {
                                value: 'op',
                                label: '汇总方式',
                                children: [
                                    {
                                        value: 'sum',
                                        label: '求和'
                                    },
                                    {
                                        value: 'avg',
                                        label: '平均'
                                    },
                                    {
                                        value: 'max',
                                        label: '最大值'
                                    },
                                    {
                                        value: 'min',
                                        label: '最小值'
                                    },
                                    {
                                        value: 'count',
                                        label: '计数'
                                    }
                                ]
                            },
                            {
                                value: 'computer',
                                label: '高级计算',
                                children: [
                                    {
                                        value: 'proportion',
                                        label: '占比'
                                    },
                                    {
                                        value: 'none',
                                        label: '无'
                                    }
                                ]
                            },
                            {
                                value: "dataFormatter",
                                label: '数据格式'
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除字段',
                            }
                        ]
                    }
                ],
            },
            {
                label: '指标右',
                axisData: [],
                color: {
                    backgroundColor: 'rgb(13, 179, 166)',
                    borderColor: 'rgb(13, 179, 166)',
                },
                options: [
                    {
                        type: 'text',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名',
                            },
                            {
                                value: 'computer',
                                label: '高级计算',
                                children: [
                                    {
                                        value: 'proportion',
                                        label: '占比'
                                    },
                                    {
                                        value: 'none',
                                        label: '无'
                                    }
                                ]
                            },
                            {
                                value: "dataFormatter",
                                label: '数据格式'
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除字段',
                            }
                        ]
                    },
                    {
                        type: 'date',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名',
                            },
                            {
                                value: 'computer',
                                label: '高级计算',
                                children: [
                                    {
                                        value: 'proportion',
                                        label: '占比'
                                    },
                                    {
                                        value: 'none',
                                        label: '无'
                                    }
                                ]
                            },
                            {
                                value: "dataFormatter",
                                label: '数据格式'
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除字段',
                            }
                        ]
                    },
                    {
                        type: 'number',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名',
                            },
                            {
                                value: 'op',
                                label: '汇总方式',
                                children: [
                                    {
                                        value: 'sum',
                                        label: '求和'
                                    },
                                    {
                                        value: 'avg',
                                        label: '平均'
                                    },
                                    {
                                        value: 'max',
                                        label: '最大值'
                                    },
                                    {
                                        value: 'min',
                                        label: '最小值'
                                    },
                                    {
                                        value: 'count',
                                        label: '计数'
                                    }
                                ]
                            },
                            {
                                value: 'computer',
                                label: '高级计算',
                                children: [
                                    {
                                        value: 'proportion',
                                        label: '占比'
                                    },
                                    {
                                        value: 'none',
                                        label: '无'
                                    }
                                ]
                            },
                            {
                                value: "dataFormatter",
                                label: '数据格式'
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除字段',
                            }
                        ]
                    }
                ],
            },
            {
                label: '过滤条件',
                axisData: [],
                color: {
                    backgroundColor: 'rgb(234, 240, 252)',
                    borderColor: 'rgb(234, 240, 252)',
                    color: '#999',
                },
                options: [
                    {
                        type: 'text',
                        data: [
                            {
                                value: 'updateFiled',
                                label: '修改筛选条件',
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除筛选条件',

                            }
                        ]
                    },
                    {
                        type: 'date',
                        data: [
                            {
                                value: 'updateFiled',
                                label: '修改筛选条件',
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除筛选条件',

                            }
                        ]
                    },
                    {
                        type: 'number',
                        data: [
                            {
                                value: 'updateFiled',
                                label: '修改筛选条件',
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除筛选条件',

                            }
                        ]
                    }
                ],
            }
        ],
        axisNumOptions: {
            sum: '求和',
            avg: '平均',
            max: '最大值',
            min: '最小值',
            proportion: '占比',
            count: '计数',
        },
        axisDateOptions: {
            year_quarter: '年-季',
            year_month: '年-月',
            year_week: '年-周',
            year_month_day: '年-月-日',
            year: '年'
        },
        pivotList: [
            {
                label: "维度(行) :",
                axisData: [],
                color: {
                    backgroundColor: '#0f5eff',
                    borderColor: '#0f5eff',
                },
                options: [
                    {
                        type: "text",
                        label: '',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名'
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteField',
                                label: '删除字段'
                            }
                        ]
                    },
                    {
                        type: 'date',
                        label: '年-月',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名'
                            },
                            {
                                value: 'groupRule',
                                label: '汇总方式',
                                children: [
                                    {
                                        value: 'year',
                                        label: '年'
                                    },
                                    {
                                        value: 'year_quarter',
                                        label: '年-季'
                                    },
                                    {
                                        value: 'year_month',
                                        label: '年-月'
                                    },
                                    {
                                        value: 'year_week',
                                        label: '年-周'
                                    },
                                    {
                                        value: 'year_month_day',
                                        label: '年-月-日'
                                    }
                                ]
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除字段',
                            }
                        ]
                    },
                    {
                        type: 'number',
                        label: '',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名',
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除字段',
                            }
                        ]
                    }
                ]
            },
            {
                label: "维度(列) :",
                axisData: [],
                color: {
                    backgroundColor: '#0f5eff',
                    borderColor: '#0f5eff',
                },
                options: [
                    {
                        type: "text",
                        label: '',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名'
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteField',
                                label: '删除字段'
                            }
                        ]
                    },
                    {
                        type: 'date',
                        label: '年-月',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名'
                            },
                            {
                                value: 'groupRule',
                                label: '汇总方式',
                                children: [
                                    {
                                        value: 'year',
                                        label: '年'
                                    },
                                    {
                                        value: 'year_quarter',
                                        label: '年-季'
                                    },
                                    {
                                        value: 'year_month',
                                        label: '年-月'
                                    },
                                    {
                                        value: 'year_week',
                                        label: '年-周'
                                    },
                                    {
                                        value: 'year_month_day',
                                        label: '年-月-日'
                                    }
                                ]
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteField',
                                label: '删除字段'
                            }
                        ]
                    },
                    {
                        type: 'number',
                        label: '',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名',
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除字段',
                            }
                        ]
                    }
                ]
            },
            {
                label: "指标 :",
                axisData: [],
                color: {
                    backgroundColor: 'rgb(13, 179, 166)',
                    borderColor: 'rgb(13, 179, 166)'
                },
                options: [
                    {
                        type: 'text',
                        label: '计数',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名',
                            },
                            {
                                value: 'computer',
                                label: '高级计算',
                                children: [
                                    {
                                        value: 'onRatio',
                                        label: '同比/环比'
                                    },
                                    {
                                        value: 'proportion',
                                        label: '占比'
                                    },
                                    {
                                        value: 'none',
                                        label: '无'
                                    }
                                ]
                            },
                            {
                                value: "dataFormatter",
                                label: '数据格式'
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除字段',
                            }
                        ]
                    },
                    {
                        type: 'date',
                        label: '计数',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名',
                            },
                            {
                                value: 'computer',
                                label: '高级计算',
                                children: [
                                    {
                                        value: 'proportion',
                                        label: '占比'
                                    },
                                    {
                                        value: 'none',
                                        label: '无'
                                    }
                                ]
                            },
                            {
                                value: 'dataFormatter',
                                label: '数据格式'
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除字段',
                            }
                        ]
                    },
                    {
                        type: 'number',
                        label: '求和',
                        data: [
                            {
                                value: 'updateName',
                                label: '修改显示名',
                            },
                            {
                                value: 'op',
                                label: '汇总方式',
                                children: [
                                    {
                                        value: 'sum',
                                        label: '求和'
                                    },
                                    {
                                        value: 'avg',
                                        label: '平均'
                                    },
                                    {
                                        value: 'max',
                                        label: '最大值'
                                    },
                                    {
                                        value: 'min',
                                        label: '最小值'
                                    },
                                    {
                                        value: 'count',
                                        label: '计数'
                                    }
                                ]
                            },
                            {
                                value: 'computer',
                                label: '高级计算',
                                children: [
                                    {
                                        value: 'proportion',
                                        label: '占比'
                                    },
                                    {
                                        value: 'none',
                                        label: '无'
                                    }
                                ]
                            },
                            {
                                value: 'dataFormatter',
                                label: '数据格式'
                            },
                            {
                                value: 'order',
                                label: '排序',
                                children: [
                                    {
                                        value: 'normal',
                                        label: '默认'
                                    },
                                    {
                                        value: 'riseOrder',
                                        label: '升序'
                                    },
                                    {
                                        value: 'dropOrder',
                                        label: '降序'
                                    }
                                ]
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除字段',
                            }
                        ]
                    }
                ]
            },
            {
                label: "过滤条件 :",
                axisData: [],
                color: {
                    backgroundColor: 'rgb(234, 240, 252)',
                    borderColor: 'rgb(234, 240, 252)',
                    color: '#999',
                },
                options: [
                    {
                        type: 'text',
                        data: [
                            {
                                value: 'updateFiled',
                                label: '修改筛选条件',
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除筛选条件',

                            }
                        ]
                    },
                    {
                        type: 'date',
                        data: [
                            {
                                value: 'updateFiled',
                                label: '修改筛选条件',
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除筛选条件',

                            }
                        ]
                    },
                    {
                        type: 'number',
                        data: [
                            {
                                value: 'updateFiled',
                                label: '修改筛选条件',
                            },
                            {
                                value: 'deleteFiled',
                                label: '删除筛选条件',

                            }
                        ]
                    }
                ],
            }
        ],
        staticList: [
            {
                label: "显示字段",
                axisData: [],
                color: {
                    backgroundColor: '#0f5eff',
                    borderColor: '#0f5eff',
                },
            },
            {
                label: "过滤条件",
                axisData: [],
                color: {
                    backgroundColor: '#0f5eff',
                    borderColor: '#0f5eff'
                }
            }
        ]
    }
}