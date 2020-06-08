export default {
    allMenu: {
        menuid: "root",
        children: [
            {
                menuid: "1201",
                menucode: "datav.view.datavIndex",
                menuname: "监控大屏",
                collect: 'true',
                children: [
                    {
                        menuid: "103011",
                        menucode: "datav.clientview",
                        menuname: "客户服务360视图"
                    },
                    {
                        menuid: "103021",
                        menucode: "datav.view.outterGov",
                        menuname: "外部机构360视图"
                    },
                    {
                        menuid: "103031",
                        menucode: "datav.view.productview",
                        menuname: "产品运作360视图",
                        collect: 'true',
                    },
                    {
                        menuid: "105021",
                        menucode: "dashboard.index",
                        menuname: "指标监控大屏"
                    }
                ]
            },
            {
                menuid: "104011",
                menucode: "cjop.tasks",
                menuname: "工作管理",
                children: [
                    {
                        menuid: "105001",
                        menucode: "MENU_MY_TASKS",
                        menuname: "产品日历工作台"
                    },
                    {
                        menuid: "101021",
                        menucode: "FLOW_BOARD_VIEW",
                        menuname: "每日工作监控台"
                    },
                    {
                        menuid: "105031",
                        menucode: "bizMonitor",
                        menuname: "业务维度监控台",
                        collect: 'true'
                    },
                    {
                        menuid: "105011",
                        menucode: "MENU_MY_HASDO",
                        menuname: "我的已办工作项"
                    }
                ]
            },
            {
                menuid: "144061",
                menucode: "KPI_DETAIL",
                menuname: "监控明细",
                children: [
                    {
                        menuid: "163011",
                        menucode: "MENU_ACCOUNT_INDEX_PAGE",
                        menuname: "清算监控"
                    },
                    {
                        menuid: "208010",
                        menucode: "check_htgl_list",
                        menuname: "估值监控"
                    },
                    {
                        menuid: "144071",
                        menucode: "O32_NOTICE",
                        menuname: "O32监控"
                    },
                    {
                        menuid: "208005",
                        menucode: "TA_YWJK_list",
                        menuname: "TA监控"
                    }
                ]
            },
            {
                menuid: "135021",
                menucode: "MENU_ACC_MANAGE",
                menuname: "账户管理",
                children: [
                    {
                        menuid: "167001",
                        menucode: "account_apply",
                        menuname: "账户信息"
                    },
                    {
                        menuid: "135051",
                        menucode: "MENU_ACC_APPLY",
                        menuname: "账户主流程"
                    },
                    {
                        menuid: "161001",
                        menucode: "account_task_list",
                        menuname: "账户子流程"
                    },
                    {
                        menuid: "162001",
                        menucode: "MENU_ACC_TYPE",
                        menuname: "账户类型"
                    },
                    {
                        menuid: "163001",
                        menucode: "account_info",
                        menuname: "开户信息"
                    },
                    {
                        menuid: "166001",
                        menucode: "fund_info_list",
                        menuname: "基金公司编号维护"
                    }
                ]
            },
            {
                menuid: "143031",
                menucode: "OPT_DATA",
                menuname: "运营数据",
                children: [
                    {
                        menuid: "104021",
                        menucode: "optdata.view.AllView",
                        menuname: "产品全景图",
                        children: [
                            {
                                menuid: "104041",
                                menucode: "MENU_PRODUCT_MANAGE",
                                menuname: "产品基本信息"
                            },
                            {
                                menuid: "104051",
                                menucode: "performance.compare",
                                menuname: "业绩比较基准"
                            },
                            {
                                menuid: "104061",
                                menucode: "fund.transition.info",
                                menuname: "基金转型信息"
                            }
                        ]
                    },
                    {
                        menuid: "104031",
                        menucode: "optdata.preform.made",
                        menuname: "业绩表现制作"
                    },
                    {
                        menuid: "135281",
                        menucode: "MENU_PARAS_MANAGE",
                        menuname: "公共参数配置",
                        children: [
                            {
                                menuid: "111011",
                                menucode: "dop.profile.reCalendar",
                                menuname: "节假日"
                            }, {
                                menuid: "142001",
                                menucode: "MENU_HOLIDAY_MNG",
                                menuname: "节假日同步"
                            }, {
                                menuid: "165001",
                                menucode: "MENU_WORKDAY_MNG",
                                menuname: "工作日同步"
                            }, {
                                menuid: "189001",
                                menucode: "abnormal_list",
                                menuname: "凭证异常原因"
                            }, {
                                menuid: "144031",
                                menucode: "MENU_EXPORTFILETEMPLATE_CONFIG",
                                menuname: "文件生成模板配置"
                            }
                        ]
                    }
                ]
            },
            {
                menuid: "143041",
                menucode: "OPT_TOOL",
                menuname: "运营工具",
                children: [
                    {
                        menuid: "144001",
                        menucode: "MENU_MAIL_MANAGE",
                        menuname: "邮件管理"
                    },
                    {
                        menuid: "135151",
                        menucode: "MENU_PULIC_FILESCAN",
                        menuname: "公共数据接收"
                    },
                    {
                        menuid: "181001",
                        menucode: "EXPRESS_PRINT",
                        menuname: "快递单打印"
                    },
                    {
                        menuid: "111001",
                        menucode: "dop.base.addrBook",
                        menuname: "通讯录"
                    },
                    {
                        menuid: "1520110",
                        menucode: "menu_programme",
                        menuname: "报表方案"
                    },
                    {
                        menuid: "172001",
                        menucode: "MENU_MA",
                        menuname: "材料管理"
                    },
                    {
                        menuid: "208007",
                        menucode: "clear_YWGL_list",
                        menuname: "清算辅助工具"
                    },
                    {
                        menuid: "208011",
                        menucode: "check_ywgl_list",
                        menuname: "核算辅助工具"
                    },
                    {
                        menuid: "208006",
                        menucode: "TA_YWGL_list",
                        menuname: "TA辅助工具"
                    },
                    {
                        menuid: "146011",
                        menucode: "MENU_NEW_AIM",
                        menuname: "另类分红辅助工具"
                    },
                    {
                        menuid: "173031",
                        menucode: "MENU_NEW_KZZ_CODE",
                        menuname: "可转债辅助工具"
                    },
                    {
                        menuid: "112001",
                        menucode: "OPT.OIS.TOOLS",
                        menuname: "场外交易辅助工具"
                    }
                ]
            },
            {
                menuid: "116001",
                menucode: "dop.base.module",
                menuname: "配置管理",
                children: [
                    {
                        menuid: "102021",
                        menucode: "dop.set.event",
                        menuname: "事件定义"
                    },
                    {
                        menuid: "100021",
                        menucode: "FLOW_BOARD_SETTING",
                        menuname: "每日工作监控台配置"
                    },
                    {
                        menuid: "903001",
                        menucode: "goframe.datav.module",
                        menuname: "数据可视化"
                    },
                    {
                        menuid: "107001",
                        menucode: "FILE.SCAN.CONFIG",
                        menuname: "文件扫描配置"
                    },
                    {
                        menuid: "100001",
                        menucode: "dop.config.module",
                        menuname: "指标管理"
                    },
                    {
                        menuid: "111021",
                        menucode: "dop.board.manage",
                        menuname: "默认面板管理"
                    },
                    {
                        menuid: "908001",
                        menucode: "dop.etl.module",
                        menuname: "ETL管理"
                    },
                    {
                        menuid: "109001",
                        menucode: "sql.client",
                        menuname: "SQL查询",
                        collect: 'true'
                    }
                ]
            },
            {
                menuid: "1101",
                menucode: "goframe.core",
                menuname: "后台管理",
                children: [
                    {
                        menuid: "1121",
                        menucode: "excel.import.module",
                        menuname: "Excel导入"
                    },
                    {
                        menuid: "1102",
                        menucode: "goframe.user.list",
                        menuname: "用户管理"
                    },
                    {
                        menuid: "101001",
                        menucode: "goframe.schedule.list",
                        menuname: "任务调度"
                    },
                    {
                        menuid: "179001",
                        menucode: "goframe.function",
                        menuname: "按钮管理"
                    },
                    {
                        menuid: "1103",
                        menucode: "goframe.role.index",
                        menuname: "角色管理"
                    },
                    {
                        menuid: "1104",
                        menucode: "goframe.org.index",
                        menuname: "组织机构管理"
                    },
                    {
                        menuid: "1105",
                        menucode: "goframe.menu.manage",
                        menuname: "菜单管理"
                    },
                    {
                        menuid: "1106",
                        menucode: "goframe.auth",
                        menuname: "权限管理"
                    },
                    {
                        menuid: "1107",
                        menucode: "goframe.dict.index",
                        menuname: "数据字典"
                    },
                    {
                        menuid: "110001",
                        menucode: "goframe.workflow.index",
                        menuname: "流程管理"
                    },
                    {
                        menuid: "101002",
                        menucode: "goframe.function.index",
                        menuname: "功能管理"
                    },
                    {
                        menuid: "143001",
                        menucode: "employeeList",
                        menuname: "员工管理"
                    }
                ]
            }
        ]
    },
    markMenu: [
        {
            menuid: "103031",
            menucode: "datav.view.productview",
            menuname: "产品运作360视图",
        },{
            menuid: "105031",
            menucode: "bizMonitor",
            menuname: "业务维度监控台",
        },{
            menuid: "109001",
            menucode: "sql.client",
            menuname: "SQL查询"
        }
    ]
}