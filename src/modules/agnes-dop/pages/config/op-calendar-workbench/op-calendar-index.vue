<template>
    <div class="monitor-pages">
        <div class="monitor-container">
            <div class="monitor-container-left">
                <complex-widget ref="complexWidget"
                                :tree-data="mockTreeData"
                                :manage-tree-data="mockTreeData"
                                :comp-type="['calendar', 'tree']"
                                :showCheckbox="true"
                                compTitle="产品员工信息"
                                @dateChange="dateChange"
                                :default-actions="defaultTreeActions"
                                @manageCheckNodes="manageCheckNodes"
                                :treeOptions="treeOptions"
                >
                </complex-widget>
            </div>
            <div class="monitor-container-right">
                <el-form class="search-panel" label-width="70px">
                    <div class="line">
                        <el-form-item label="业务日期">
                          <div class="line">
                            <el-date-picker
                                v-model="dateTime"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd"
                                @change="changeDateTime">
                            </el-date-picker>
                          </div>
                        </el-form-item>
                      <div>
                        <el-popover popper-class="rule-table-popover"
                                    placement="right"
                                    title="新增"
                                    width="340"
                                    trigger="click">
                          <div v-for="type in addTypeArr" :key="type.value">
                            <el-button size="small"
                                       :key="type.value"
                                       @click="addTask(type.value)"
                            >{{ type.name }}
                            </el-button>
                          </div>
                          <el-button slot="reference" class="add-pro-btn" type="primary" size="small"
                                     icon="el-icon-plus">新增
                          </el-button>
                        </el-popover>
                      </div>
                    </div>
                </el-form>
                <gf-grid class="calendar-table" ref="grid"
                         grid-no="agnes-op-calendar-list"
                         toolbar="find,refresh,more"
                         height="calc(100% - 48px)"
                         :query-args="queryArgs"
                >
                </gf-grid>
            </div>
        </div>
    </div>
</template>

<script>
    import detailPage from "./detailPage";
    import addTempTask from './add-temp-task'

    export default {
      watch: {
        queryArgs: {
          handler() {
            this.$refs.grid.reloadData(true);
          },
          deep: true
        },
      },
      data() {
        return {
          bizDateStart: '',
          bizDateEnd: '',
          queryArgs: {
            'startBizDate': window.bizDate,
            'endBizDate': window.bizDate,
            'productCodes': "",
          },
          dateTime: [window.bizDate, window.bizDate],
          mockTreeData: [],
          oneTreePrdtCode: [],
          twoTreePrdtCode: [],
          defaultTreeActions: {
            'check-change': this.checkedChange
          },
          addTypeArr: [{name: "临时任务", value: "1"}],
          treeOptions: [{
            treeData: [],
            defaultProps: {
              showCheckbox: true
            },
            defaultActions: {
              'check': this.oneTreeNodeClickTwo
            }
          }, {
            treeData: [],
            defaultProps: {
              showCheckbox: true
            },
            defaultActions: {
              'check': this.twoTreeNodeClickTwo
            }
          }]
        }
      },
      mounted() {
        this.initTreeData();
      },
      methods: {
        reloadData() {
          this.$refs.grid.reloadData(true);
        },
        reloadProductCode() {
          let prdtCodes = '';
          if (this.oneTreePrdtCode.length > 0) {
            this.oneTreePrdtCode.forEach((code) => {
              if (prdtCodes === '') {
                prdtCodes = code;
              } else {
                prdtCodes = prdtCodes + ',' + code;
              }
            })
          }
          if (this.twoTreePrdtCode.length > 0) {
            this.twoTreePrdtCode.forEach((code) => {
              if (prdtCodes === '') {
                prdtCodes = code;
              } else {
                prdtCodes = prdtCodes + ',' + code;
              }

            })
          }
          this.queryArgs.productCodes = prdtCodes;
        },
        async initTreeData() {
          const p2 = this.$api.bizMonitorApi.getTreeData("prdt");
          const resp2 = await this.$app.blockingApp(p2);
          if (resp2.data) {
            this.mockTreeData = resp2.data;
              const treeOptions = this.$lodash.cloneDeep(this.treeOptions);
              treeOptions[0].treeData = [this.mockTreeData[0]];
              treeOptions[1].treeData = [this.mockTreeData[1]];
              this.treeOptions = treeOptions;
          }
        },
        showProDetail(params) {
          // 抽屉创建
          this.$drawerPage.create({
            width: 'calc(100% - 250px)',
            title: [params.data.taskName],
            okButtonVisible: false,
            cancelButtonTitle: '返回',
            component: detailPage,
            args: {row: params.data, mode: 'view'},
            pageEl: this.$el
          })
        },

        // 日历组件日期切换
        dateChange(date) {
          this.dateTime = [];
          this.dateTime.push(date);
          this.dateTime.push(date);
          this.changeDateTime(this.dateTime);
        },
        changeDateTime(param) {
          this.queryArgs.startBizDate = ''
          this.queryArgs.endBizDate = ''
          if (param !== null) {
            this.queryArgs.startBizDate = param[0];
            this.queryArgs.endBizDate = param[1];
          }
        },
        checkedChange(curNode, ifChecked, hasCheckedChild) {
          curNode
          ifChecked
          hasCheckedChild
        },
        addTask(type) {
          if (type == "1") {
            // 抽屉创建
            this.$drawerPage.create({
              width: 'calc(100% - 250px)',
                title: ['新增临时任务'],
                component: addTempTask,
                pageEl: this.$el
              })
            }
          },
          // 干预通过
          async forcePass(params) {
            let taskCommit = {};
            taskCommit.remark = params.data.remark;
            taskCommit.caseId = params.data.caseId;
            taskCommit.stageDefId = params.data.pkId;
            taskCommit.bizDate = window.bizDate;
            const p1 = this.$api.OpCalendarApi.checkStepStatus(params.data.caseId, params.data.pkId);
            const resp1 = await this.$app.blockingApp(p1);
            if (resp1 && resp1.data === true) {
              const ok = await this.$msg.ask(`该阶段下存在异常步骤,是否继续提交?`);
              if (!ok) {
                return
              }
            }
            try {
              const p2 = this.$api.OpCalendarApi.commitBatch(taskCommit)
              const resp2 = await this.$app.blockingApp(p2);
              if (resp2.data) {
                this.$msg.success('提交成功');
                this.reloadData()// 刷新页面数据
              } else {
                this.$msg.warning('提交失败');
              }
            } catch (e) {
              this.$msg.error(e);
            }
          },
        // 弹框选择数据以后，赋值给组件树
        manageCheckNodes(val) {
          const treeOptions = this.$lodash.cloneDeep(this.treeOptions);
          treeOptions[0].treeData = [val[0]];
          treeOptions[1].treeData = [val[1]];
          this.treeOptions = treeOptions;
        },

        // 首棵树点击事件
        oneTreeNodeClickTwo(nodeObj, nodeData) {
          this.oneTreePrdtCode = [];
          if (nodeData && nodeData.checkedNodes && nodeData.checkedKeys.length > 0) {
            nodeData.checkedNodes.forEach((item) => {
              console.log()
              if (item.type && item.type === 'prdt') {
                this.oneTreePrdtCode.push(item.code);
              }
            })
          }
          this.reloadProductCode();
        },

        // 第二颗树勾选事件
        twoTreeNodeClickTwo(nodeObj, nodeData) {
          this.twoTreePrdtCode = [];
          if (nodeData && nodeData.checkedNodes && nodeData.checkedKeys.length > 0) {
            nodeData.checkedNodes.forEach((item) => {
              if (item.type && item.type === 'prdt') {
                this.twoTreePrdtCode.push(item.code);
              }
            })
          }
          this.reloadProductCode();
        },
      },
    }
</script>

<style scoped>
    .add-pro-btn {
        background: #0f5eff;
        border-color: #0f5eff;
        padding: 7px 10px;
    }

    .ul-container {
        margin: 15px 0;
    }

    .option-panel .title,
    .ul-container .title {
        color: #333;
        font-size: 14px;
        font-family: SourceHanSansCN-Medium;
        margin: 16px 0 6px 0px;
    }

    .calendar-table {
        width: 100%;
        height: 100%;
    }

    .calendar-table.ag-grid-box >>> .gf-grid-status-bar {
        border-radius: 0 0 14px 14px;
    }

    .calendar-table >>> .grid-action-panel {
        display: none;
    }

    .calendar-table >>> .gf-ag-grid.ag-theme-balham .ag-root-wrapper {
        border-radius: 14px 14px 0 0 ;
    }

</style>
