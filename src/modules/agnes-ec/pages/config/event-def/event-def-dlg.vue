<template>
    <div>
        <el-scrollbar style="height:100%;overflow-x: hidden;" wrap-class="el-scrollbar__wrap">

            <el-form :model="form" :disabled="mode==='view'" ref="form" :rules="rules" label-width="110px">
                <el-form-item label="事件名称" prop="eventDef.eventName">
                    <gf-input type="text" v-model="form.eventDef.eventName"/>
                </el-form-item>

                <el-form-item label="事件编号" prop="eventDef.eventCode">
                    <gf-input v-model.trim="form.eventDef.eventCode" placeholder="事件编号" :max-byte-len="8"
                              clear-regex="[^a-zA-Z\d\x00-\xff]"
                              :disabled="mode==='edit'"/>
                </el-form-item>
                <el-form-item label="运行周期配置" prop="eventDef.dateRange">
                    <div class="line none-shrink">
                        <el-form-item prop="eventDef.startTime">
                            <el-date-picker
                                    v-model="form.eventDef.startTime"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    :picker-options="pickerOptionsStart"
                                    placeholder="开始日期">
                            </el-date-picker>
                        </el-form-item>
                        <span style="margin: 0 10px">~</span>
                        <el-form-item prop="eventDef.endTime">
                            <el-date-picker
                                    v-model="form.eventDef.endTime"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    :picker-options="pickerOptionsEnd"
                                    placeholder="结束日期" :disabled="form.startAllTime">
                            </el-date-picker>
                        </el-form-item>
                        <el-checkbox v-model="form.startAllTime" style="margin-left: 10px">永久有效</el-checkbox>
                    </div>
                </el-form-item>

                <el-form-item label="监听方式选择" prop="eventDef.execMode">
                    <el-radio-group v-model="form.eventDef.execMode" @change="onExecModeChange">
                        <el-radio :label="'1'">主动按自定义频率扫描</el-radio>
                        <el-radio :label="'2'">被动接收消息队列消息</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="执行频率配置" prop="eventDef.execScheduler" v-if="form.eventDef.execMode === '1'">
                    <el-button type="text" ref="innerVueCron"
                               @click="editExecTime('execScheduler', form.eventDef.execScheduler)">
                        {{form.eventDef.execScheduler}}点击配置
                    </el-button>
                </el-form-item>

                <el-form-item label="消息对象选择" prop="eventDef.msgId" v-if="form.eventDef.execMode === '2'">
                    <el-select v-model="form.eventDef.msgId" clearable filterable placeholder="请选择" style="width: 32%;"
                               @change="onMsgDefChange"
                               @clear="onMsgDefClear"
                    >
                        <el-option
                                v-for="item in msgDefList"
                                :key="item.msgId"
                                :label="item.msgName"
                                :value="item.msgId">
                        </el-option>
                    </el-select>
                </el-form-item>

              <el-form-item label="匹配规则" prop="ruleTableData">
                <rule-table ref="ruleTable" confType="fn, object" :ruleTableData="form.ruleTableData"
                            :ruleTargetOp="ruleTargetOp"
                            tableHeight="200" tableMaxHeight="300"></rule-table>
              </el-form-item>

              <el-form-item label="取值函数" prop="funcId">
                <el-select v-model="form.eventMsg.funcId" placeholder="选择业务对象" style="width: 86%" filterable
                           @change="changeFunDef">
                  <el-option
                      v-for="item in funDefList"
                      :key="item.fnId"
                      :label="item.fnName"
                      :value="item.fnId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="参数设置" prop="funModelData">
                <el-table
                    :data="this.funModelData"
                    stripe
                    style="width: 100%">
                  <el-table-column
                      prop="fieldKey"
                      label="属性编码"
                      width="150">
                  </el-table-column>
                  <el-table-column
                      prop="fieldName"
                      label="属性名称"
                      width="150">
                  </el-table-column>
                  <el-table-column
                      prop="fieldType"
                      label="属性类型"
                      width="150">
                    <template slot-scope="scope">
                      <gf-dict v-model="scope.row.fieldType" dict-type="AGNES_FIELD_TYPE" :disabled="true"></gf-dict>
                    </template>
                  </el-table-column>
                  <el-table-column
                      prop="mustFill"
                      label="是否必填"
                      width="150">
                    <template slot-scope="scope">
                      <gf-dict v-model="scope.row.mustFill" dict-type="GF_BOOL_TYPE" :disabled="true"></gf-dict>
                    </template>
                  </el-table-column>
                  <el-table-column
                      prop="fieldValue"
                      label="属性值"
                      width="150">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.fieldValue" :disabled="scope.row.fieldType==='02'"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
              <el-form-item label="消息对象类型" prop="modelTypeId">
                <el-select v-model="form.eventMsg.modelTypeId" placeholder="选择业务对象" style="width: 86%" filterable
                           @change="changeMsgType">
                  <el-option
                      v-for="item in msgDefList"
                      :key="item.msgId"
                      :label="item.msgName"
                      :value="item.msgId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="消息对象" prop="msgModelData">
                <el-table
                    :data="this.msgModelData"
                    style="width: 100%">
                  <el-table-column
                      prop="fieldKey"
                      label="属性编码"
                      width="150">
                  </el-table-column>
                  <el-table-column
                      prop="fieldName"
                      label="属性名称"
                      width="150">
                  </el-table-column>
                  <el-table-column
                      prop="fieldType"
                      label="属性类型"
                      width="150">
                    <template slot-scope="scope">
                      <gf-dict v-model="scope.row.fieldType" dict-type="AGNES_FIELD_TYPE" :disabled="true"></gf-dict>
                    </template>
                  </el-table-column>
                  <el-table-column
                      prop="mustFill"
                      label="是否必填"
                      width="150">
                    <template slot-scope="scope">
                      <gf-dict v-model="scope.row.mustFill" dict-type="GF_BOOL_TYPE" :disabled="true"></gf-dict>
                    </template>
                  </el-table-column>
                  <el-table-column
                      prop="fieldValue"
                      label="属性值"
                      width="150">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.fieldValue" :disabled="scope.row.fieldType==='02'"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-form>
        </el-scrollbar>

    </div>
</template>

<script>
import fecha from 'element-ui/src/utils/date';
import lodash from "lodash";

    export default {
        props: {
            mode: {
                type: String,
                default: 'add'
            },
            row: Object,
            actionOk: Function
        },
        data() {
            var checkExecScheduler = async (rule, value, callback) => {
                if (this.form.eventDef.execMode === "1" && !this.form.eventDef.execScheduler) {
                    callback(new Error('请配置执行频率！'));
                }
            };
            var checkMsgId = async (rule, value, callback) => {
                if (this.form.eventDef.execMode === "2" && !this.form.eventDef.msgId) {
                    callback(new Error('请配置消息类型！'));
                }
            };
            var checkExistsEventCode = async (rule, value, callback) => {
                const resp = await this.$api.eventlDefConfigApi.existsEventCode(this.form.eventDef.eventCode, this.form.eventDef.eventId);
                if (!this.form.eventDef.eventCode) {
                    callback(new Error('请填写事件编号！'));
                } else if (resp.data === true) {
                    callback(new Error('事件编号已存在！'));
                }
            };
            // var checkRuleTableData = async (rule, value, callback) => {
            //     if(!this.ruleTableData
            //         || !this.ruleTableData.ruleList
            //         || this.ruleTableData.ruleList.length === 0){
            //         callback(new Error('请配置匹配规则！'));
            //     }
            //     if(!this.ruleTableData.judgeScript){
            //         callback(new Error('请配置规则判断逻辑表达式！'));
            //     }
            // };

            return {
                form: {
                    startAllTime: false,       // 是否永久有效
                    eventDef: {
                        eventId: '',
                        eventCode: '',
                        eventName: '',
                        startTime: '',
                        endTime: '',
                        execMode: '1',
                        execScheduler: '',
                        msgId: '',
                        mqGroup: 'default',
                        eventRule: '',
                        eventStatus: '',
                        jobId: '',
                        dateRange: '',
                        noEnd: ''
                    },
                    eventMsg: {
                        eventId: '',
                      funcId: '',
                      getValueParam: '',
                      modelTypeId: '',
                      fieldMapping: ''
                    },
                  ruleTableData: {
                    ruleList: [],
                    judgeScript: '',
                    ruleBody: '',
                    ruleId: '',
                  },
                },
              funModelData: [],
              msgModelData: [],
              rules: {
                'eventDef.eventName': [{required: true, message: "事件名称必填"}],
                'eventDef.execMode': [{required: true, message: "执行方式必选"}],
                // 'eventDef.dateRange': [
                //   { required: true, message: '请填写执行区间', trigger: 'change' },
                //   { validator: checkDateRange, trigger: 'blur' }
                // ],
                'eventDef.startTime': [
                  {required: true, message: '运行周期开始时间必填', trigger: 'blur'},
                ],
                    'eventDef.endTime': [
                        {required: true, message: '运行周期结束时间必填', trigger: 'blur'},
                    ],
                    'eventDef.execScheduler': [{validator: checkExecScheduler, trigger: 'blur'}],
                    'eventDef.msgId': [{validator: checkMsgId, trigger: 'blur'}],
                    'eventDef.eventCode': [
                        {required: true, message: '事件编号必填', trigger: 'change'},
                        {validator: checkExistsEventCode, trigger: 'blur'}
                    ]
                    // 'ruleTableData': [{ validator: checkRuleTableData, trigger: 'blur' }]
                },
                pickerOptionsEnd: {
                    disabledDate: time => {
                        let beginDateVal = this.form.eventDef.startTime;
                        if (beginDateVal) {
                            return (
                                time.getTime() <
                                new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
                            );
                        }
                    }
                },
              pickerOptionsStart: {
                disabledDate: time => {
                  let endDateVal = this.form.eventDef.endTime;
                  if (endDateVal) {
                    return time.getTime() > new Date(endDateVal).getTime();
                  }
                }
              },
              // ruleTableData: {},
              msgDefList: {},
              funDefList: {},
              ruleTargetOp: {
                object: [{}]
              },

              modelTypeList: {},
              funcList: {},
            }
        },
        beforeMount() {
            Object.assign(this.form.eventDef, this.row);
          //Object.assign(this.form.eventMsg, this.row);
            this.initEventDlg();
            // this.onLoadForm();
        },
        watch: {
            'form.startAllTime'(val) {
                if (val) {
                    this.form.eventDef.endTime = '9999-12-31'
                } else {
                    this.form.eventDef.endTime = ''
                }
            },
        },

        methods: {
          async initEventDlg() {
            // this.$set( this.form.eventDef, 'dateRange', [this.form.eventDef.startTime,this.form.eventDef.endTime] );
            // if(this.form.eventDef.endTime && this.form.eventDef.endTime === "9999-12-31"){
            //   this.form.eventDef.noEnd = true;
            // }

            if (this.mode && this.mode !== 'add') {
              if (this.form.eventDef.endTime && this.form.eventDef.endTime.toString().startsWith('9999-12-31')) {
                this.form.startAllTime = true;
              }
            }

            if (this.form.eventDef.eventId) {
              const p = this.fetchEventMsg();
              this.$app.blockingApp(p);
            }

            this.fetchRuleDef();
            this.fetchRuleDetail();
            this.fetchMsgDefList();
            this.fetchFunDefList();

            if (this.mode && this.mode === 'copy') {
              this.form.eventDef.eventCode = "";
            }
            this.clearForCopy();

            // this.fetchRuleTargetOp();

            // this.fetchRuleTargetOp();
            // this.fetchModelType();
            // this.fetchFunc();
          },


          async fetchMsgDefList() {
            try {
              const resp = await this.$api.msgDefineApi.queryMsgList();
              this.msgDefList = resp.data;
              await this.fetchRuleTargetOp();

              // await this.fetchRuleDef();
              // await this.fetchRuleDetail();
            } catch (reason) {
              this.$msg.error(reason);
            }
          },
          async fetchFunDefList() {
            try {
              const resp = await this.$api.funDefineApi.queryFunList();
              this.funDefList = resp.data;
            } catch (reason) {
              this.$msg.error(reason);
            }
          },
          async fetchEventMsg() {
            try {
              if (this.form.eventDef.eventId) {
                const resp = await this.$api.eventlDefConfigApi.getEventMsg(this.form.eventDef.eventId);
                this.form.eventMsg = resp.data;
                //消息对象JSON转换
                if (this.form.eventMsg.fieldMapping) {
                  this.msgModelData = JSON.parse(this.form.eventMsg.fieldMapping);
                }

                if (this.form.eventMsg.getValueParam) {
                  this.funModelData = JSON.parse(this.form.eventMsg.getValueParam);
                }
                console.log(this.form.funModelData)
                console.log(this.form.msgModelData)
              }
            } catch (reason) {
              this.$msg.error(reason);
            }
          },

          async fetchRuleDef() {
            try {
              if (this.form.eventDef.eventRule) {
                const resp = await this.$api.ruleConfigApi.getRuleDef(this.form.eventDef.eventRule);
                this.form.ruleTableData.judgeScript = resp.data.judgeScript;
                this.form.ruleTableData.ruleBody = resp.data.ruleBody;
                this.form.ruleTableData.ruleId = resp.data.ruleId;

              }
            } catch (reason) {
              this.$msg.error(reason);
            }
          },
          async fetchRuleDetail() {
            try {
              if (this.form.eventDef.eventRule) {
                const resp = await this.$api.ruleConfigApi.getRuleDetailList(this.form.eventDef.eventRule);
                this.form.ruleTableData.ruleList = resp.data;
                // this.form.ruleTableData.ruleList.forEach(item=>{
                //     if(item.ruleParam){
                //         item.ruleParam= JSON.parse(item.ruleParam);
                //     }
                // });
              }
            } catch (reason) {
              this.$msg.error(reason);
            }
          },
          async fetchModelAndFieldById(modelTypeId) {
            try {
              const resp = await this.$api.modelConfigApi.getModelAndFieldById(modelTypeId, "02");
              this.ruleTargetOp.object = [];
              resp.data.fnType = "mail";
              this.ruleTargetOp.object.push(resp.data);
            } catch (reason) {
              this.$msg.error(reason);
            }
          },

          async onSave() {
            const ok = await this.$refs['form'].validate();
            if (!ok) {
              return;
            }

            try {
              let msg = '';
              if (this.row.isCheck) {
                const p = this.$api.eventlDefConfigApi.approveEventDef(this.form.eventDef.eventId, "02");
                await this.$app.blockingApp(p);
                msg = '审核成功';
              } else {

                // 定义需要校验的列数组，数组内容为列filed值
                const validatefieldArr = ['ruleTarget', 'ruleParam', 'ruleKey', 'ruleSign', 'ruleValue'];
                const validator = this.$refs.ruleTable.validator(validatefieldArr);
                if (!validator) {
                  // 验证失败
                  // this.$msg.error("请填写匹配规则");
                  return;
                }

                if (!this.form.ruleTableData
                    || !this.form.ruleTableData.ruleList
                    || this.form.ruleTableData.ruleList.length === 0) {
                  this.$msg.error("请填写匹配规则");
                  return;
                }
                if (!this.form.ruleTableData.judgeScript) {
                  this.$msg.error("请配置规则判断逻辑表达式");
                  return;
                }

                // 获取规则表格整理后的json对象串
                const outputJson = this.$refs.ruleTable.jsonFormatter();
                if (!outputJson) {
                  this.$msg.error("规则JSON不能为空");
                }
                this.form.ruleTableData.ruleBody = outputJson;

                this.form.eventMsg.getValueParam = JSON.stringify(this.funModelData);
                this.form.eventMsg.fieldMapping = JSON.stringify(this.msgModelData);
                this.clearForCopy();
                console.log(this.form)
                const p = this.$api.eventlDefConfigApi.saveEventDef(this.form);
                await this.$app.blockingApp(p);
                msg = '保存成功';
              }

              if (this.actionOk) {
                await this.actionOk(this.form, this.row);
              }
              this.$msg.success(msg);
              this.$emit("onClose");
              // this.$dialog.close(this);
              // this.$nav.closeCurrentTab();
            } catch (reason) {
              this.$msg.error(reason);
            }
          },

          async onCancel() {
            if (this.row.isCheck) {
              const p = this.$api.eventlDefConfigApi.approveEventDef(this.form.eventDef.eventId, "01");
              await this.$app.blockingApp(p);
              if (this.actionOk) {
                await this.actionOk();
              }
              this.$msg.success('反审核成功');
            }
            this.$emit("onClose");
          },
          showDlg(data, action) {
            this.$nav.showDialog(
                'gf-cron-modal',
                {
                  args: {cornObj: data, action},
                  width: '530px',
                  title: this.$dialog.formatTitle('编辑频率', "edit"),
                }
            );
          },
          setExecScheduler(cron) {
            this.form.eventDef.execScheduler = cron;
          },
          editExecTime(execScheduler) {
            this.showDlg(execScheduler, this.setExecScheduler.bind(this));
          },
          onNoEndChange() {

//                alert(this.$refs.innerVueCron.cron);
//                this.form.eventDef.execScheduler = this.$refs.innerVueCron.cron;

            var startDate = this.form.eventDef.dateRange[0];
            if (!startDate) {
              startDate = fecha.format(new Date(), 'yyyy-MM-dd');
            }
            if (this.form.eventDef.noEnd === true) {
              this.$set(this.form.eventDef, 'dateRange', [startDate, '9999-12-31']);
            } else {
              this.$set(this.form.eventDef, 'dateRange', [startDate, startDate]);
            }

            if (this.form.eventDef.dateRange[0]) {
              this.form.eventDef.startTime = this.form.eventDef.dateRange[0];
            }
            if (this.form.eventDef.dateRange[1]) {
              this.form.eventDef.endTime = this.form.eventDef.dateRange[1];
            }
          },
          onDateRangeChange() {
            if (this.form.eventDef.dateRange[0]) {
              this.form.eventDef.startTime = this.form.eventDef.dateRange[0];
            }
            if (this.form.eventDef.dateRange[1]) {
              this.form.eventDef.endTime = this.form.eventDef.dateRange[1];
            }
          },
          async fetchRuleTargetOp() {
            try {
              let msgIdParam = this.form.eventDef.msgId;
              let msgObjId;
              this.msgDefList.forEach((item) => {
                if (item.msgId === msgIdParam) {
                  msgObjId = item.msgObjId;
                }
              });
              // alert("msgObjId:"+msgObjId);
              if (msgObjId) {
                // const p = this.fetchModelAndFieldById(msgObjId);
                // this.$app.blockingApp(p);
                const resp = await this.$api.modelConfigApi.getModelAndFieldById(msgObjId, "02");
                this.ruleTargetOp.object = [];
                resp.data.fnType = "mail";
                this.ruleTargetOp.object.push(resp.data);
                this.$refs.ruleTable.setRuleTargetOp(this.ruleTargetOp);
              } else {
                this.ruleTargetOp.object = [];
              }
            } catch (reason) {
              this.$msg.error(reason);
            }
          },
          onMsgDefChange(param) {
            let msgObjId;
            this.msgDefList.forEach((item) => {
              if (item.msgId === param) {
                msgObjId = item.msgObjId;
              }
            });
            // alert("param:"+param+" msgObjId:"+msgObjId);
            if (msgObjId) {
              const p = this.fetchModelAndFieldById(msgObjId);
              this.$app.blockingApp(p);
            } else {
              this.ruleTargetOp.object = [];
            }

            this.clearRuleListObject();
          },
          clearRuleListObject() {
            //消息类型变化，清空规则表中已有的类型为对象的行
            let arr = this.form.ruleTableData.ruleList;
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].ruleType === "object") {
                arr.splice(i, 1);
                i--;
              }
            }
          },
          onMsgDefClear() {
            this.form.eventDef.msgId = "";
            this.clearRuleListObject();
          },
          onExecModeChange(param) {
            if (param === "1") {
              this.onMsgDefClear();
            } else if (param === "2") {
              this.form.eventDef.execScheduler = "";
            }
          },

          clearForCopy() {
            if (this.mode && this.mode === 'copy') {
              this.form.eventDef.eventId = "";
              this.form.eventDef.eventRule = "";
              this.form.eventDef.jobId = "";

              this.form.eventMsg.eventId = "";

              this.form.ruleTableData.ruleId = "";
              this.form.ruleTableData.ruleList.forEach((item) => {
                item.ruleDetailId = "";
              });

            }
          },
          async changeMsgType(msgId) {
            this.msgModelData = [];
            let msgObjId;
            this.msgDefList.forEach((item) => {
              if (item.msgId === msgId) {
                msgObjId = item.msgObjId;
              }
            });
            if (msgObjId) {
              if (msgObjId) {
                const resp = await this.$api.modelConfigApi.getModelFieldList(msgObjId);
                if (resp && resp.data) {
                  this.msgModelData = resp.data;
                }
              }
            }
          },
          async changeFunDef(fnId) {
            this.funModelData = [];
            let fnReturn;
            let fnArgs;
            this.funDefList.forEach((item) => {
              if (item.fnId === fnId) {
                fnReturn = item.fnReturn;
                fnArgs = item.fnArgs;
              }
            });
            if (fnReturn) {
              const resp1 = await this.$api.modelConfigApi.getModelFieldList(fnReturn);
              const resp2 = await this.$api.modelConfigApi.getModelFieldList(fnArgs);
              if ((resp1 && resp1.data) || (resp2 && resp2.data)) {
                this.funModelData = lodash.concat(resp1.data, resp2.data)
                console.log(this.funModelData)
              }
            }
          }
        }
    }
</script>
