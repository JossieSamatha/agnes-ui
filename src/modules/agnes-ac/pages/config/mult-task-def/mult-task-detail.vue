<template>
  <el-form :disabled="mode==='view'" :model="detailForm" :rules="detailFormRules" class="task-def-form"
           label-width="110px" ref="taskDefForm">
    <el-form-item label="任务名称" prop="taskName">
      <gf-input :max-byte-len="120" placeholder="任务名称" v-model.trim="detailForm.taskName"/>
    </el-form-item>
    <el-form-item label="任务等级" prop="stepLevel" v-show="this.detailForm.configType!='2'">
      <el-rate :colors="detailForm.rateColor" :high-threshold="3"
               :low-threshold="1"
               :max="3"
               :texts="['一般', '重要', '紧急']"
               show-text
               v-model="detailForm.stepLevel">
      </el-rate>
      <em @click="detailForm.stepLevel = 0" class="el-icon-refresh-left"></em>
    </el-form-item>
    <el-form-item label="任务图标" prop="taskIcon" v-show="this.detailForm.configType=='2'">
      <gf-input placeholder="任务图标"
                style="width: calc(100% - 30px); margin-right: 10px"
                v-model.trim="detailForm.taskIcon"
      />
      <el-popover placement="bottom"
                  popper-class="question-popover"
                  title="图标库使用"
                  trigger="click"
                  width="220">
        <el-button icon="fa fa-question-circle-o"
                   slot="reference"
                   style="border: none;padding: 0;font-size: 20px;vertical-align: middle"
        ></el-button>
        <p>图标库中选择需要的图标对应名称，前面加上【fa fa-】前缀即可。</p>
        <p>如：<span><em class="fa fa-bus"></em> bus</span>填写为【fa fa-bus】</p>
        <p>图标库链接地址为：
          <a href="https://fontawesome.dashgame.com/" rel="noopener noreferrer" style="color: #4183C4;" target="_blank">点我跳转</a>
        </p>
      </el-popover>
    </el-form-item>
    <el-form-item label="任务编号" prop="caseKey">
      <gf-input :max-byte-len="8" clear-regex="[^0-9]" placeholder="任务编号" v-model.trim="detailForm.caseKey"/>
    </el-form-item>
    <el-form-item label="流程类型" prop="flowType" v-show="this.detailForm.configType=='2'">
      <gf-dict clearable dict-type="AGNES_CASE_FLOWTYPE" filterable v-model="detailForm.flowType"/>
    </el-form-item>
    <el-form-item label="业务场景" prop="bizType">
      <gf-dict clearable dict-type="AGNES_BIZ_CASE" filterable v-model="detailForm.bizType"/>
    </el-form-item>
    <el-form-item label="业务标签" prop="bizTag">
      <el-select class="multiple-select" clearable
                 filterable multiple placeholder="请选择"
                 v-model="detailForm.bizTagArr">
        <gf-filter-option
            :key="item.dictId"
            :label="item.dictName"
            :value="item.dictId"
            v-for="item in bizTagOption">
        </gf-filter-option>
      </el-select>
    </el-form-item>
    <el-form-item label="任务说明" prop="stepRemark" v-if="detailForm.taskType != '2'">
      <gf-input placeholder="任务说明" type="textarea" v-model.trim="detailForm.stepRemark"/>
    </el-form-item>
    <el-form-item label="运行周期配置" prop="task_startTime">
      <div class="line none-shrink">
        <el-form-item prop="task_startTime">
          <el-date-picker
              :picker-options="pickerOptionsStart"
              placeholder="开始日期"
              type="date"
              v-model="detailForm.task_startTime"
              value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <span style="margin: 0 10px">~</span>
        <el-form-item prop="task_endTime">
          <el-date-picker
              :disabled="startAllTime === '1'"
              :picker-options="pickerOptionsEnd"
              placeholder="结束日期"
              type="date"
              v-model="detailForm.task_endTime" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <gf-strbool-checkbox style="margin-left: 10px" v-model="startAllTime">永久有效</gf-strbool-checkbox>
      </div>
    </el-form-item>
    <el-form-item label="创建方式选择" prop="task_execMode">
      <el-radio-group v-model="detailForm.task_execMode">
        <el-radio label="1">按运行周期创建一次</el-radio>
        <el-radio label="2">按自定义频率创建</el-radio>
        <el-radio label="3">按外部事件触发时创建</el-radio>
        <el-radio label="4">手动触发</el-radio>
      </el-radio-group>
    </el-form-item>
    <template v-if="detailForm.task_execMode==2">
      <el-form-item label="创建频率配置" prop="step_execScheduler">
        <el-button @click="editExecTime('task_execScheduler', detailForm.task_execScheduler)" type="text">
          {{ detailForm.task_execScheduler }}点击配置
        </el-button>
      </el-form-item>
    </template>
    <el-form-item label="外部事件选择" v-if="detailForm.task_execMode==3">
      <el-select clearable filterable placeholder="请选择" style="width: 32%" v-model="detailForm.eventId">
        <gf-filter-option
            :key="item.value"
            :label="item.label"
            :value="item.value"
            v-for="item in detailForm.eventOptions">
        </gf-filter-option>
      </el-select>
    </el-form-item>
    <el-form-item label="取值参数列表" v-if="hasEventParam">
      <div class="rule-table">
        <el-table :data="eventParam"
                  :header-cell-style="{'text-align':'center'}"
                  border
                  cell-class-name="rule-cell"
                  header-cell-class-name="rule-header-cell"
                  header-row-class-name="rule-header-row" row-class-name="rule-row"
                  stripe>
          style="width: 100%">
          <el-table-column label="参数代码">
            <template slot-scope="scope">
              <el-input :disabled="true" v-model="scope.row.fieldKey"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="参数名称">
            <template slot-scope="scope">
              <el-input :disabled="true" v-model="scope.row.fieldName"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form-item>
    <el-form-item label="取值参数选择" v-if="!hasEventParam">
      <biz-param-chosen
          :paramRefList="this.paramRefList"
          @getParamList="getParamList"
          chosenType="prdt,prdtType"
          ref="bizParamRef">
      </biz-param-chosen>
    </el-form-item>
    <el-form-item label="任务名称展示">
      <el-radio-group v-model="nameCreateRule">
        <el-radio :key="ruleNameType.value"
                  :label="ruleNameType.value"
                  v-for="ruleNameType in ruleNameTypeOp">
          {{ ruleNameType.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="nameCreateRule == '1'" prop="taskNameExp">
      <el-row :gutter="20">
        <el-col :span="10">
          <gf-input v-model="detailForm.taskNameExp"/>
        </el-col>
        <el-col :span="14"><em @click="openHelpFile" class="question el-icon-question" title="可选参数"></em></el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="节点配置方式" prop="configType">
      <el-radio-group :disabled="this.mode!='add'" v-model="detailForm.configType">
        <el-radio label="1">单节点配置</el-radio>
        <el-radio label="2">多节点配置</el-radio>
      </el-radio-group>
      <strong style="color: #f00;line-height: 5px;margin-left: 20px" v-if="this.mode=='add'">(注意:保存后将无法修改!)</strong>
    </el-form-item>
    <template v-if="detailForm.configType==1">
      <el-form-item label="执行开始时间" prop="step_startTime" style="width: 90%">
        <div class="line none-shrink">
          <el-input style="width: 10%;margin-right: 10px" v-model.number="detailForm.startDay"
                    v-show="startDayChecked === '1'"></el-input>
          <span v-show="startDayChecked === '1'">天
                </span>
          <el-time-picker
              :picker-options=startTimeForDay
              @change="timeChange"
              placeholder="执行开始时间"
              style="margin-left: 10px" v-model="detailForm.step_startTime" value-format="HH:mm">
          </el-time-picker>
          <gf-strbool-checkbox style="margin-left: 10px" v-model="startDayChecked">跨日</gf-strbool-checkbox>
        </div>
        <gf-strbool-checkbox style="margin-left: 10px" v-model="startStepRuleChecked">自定义激活规则</gf-strbool-checkbox>
      </el-form-item>
      <el-form-item v-if="startStepRuleChecked == '1'">
        <rule-table :ruleTableData="detailForm.activeRuleTableData" confType="fn,object,event"
                    ref="activeRuleTable"></rule-table>
      </el-form-item>
      <el-form-item label="执行结束时间" prop="step_endTime" style="width: 90%">
        <div class="line none-shrink">
          <el-input style="width: 10%;margin-right: 10px" v-model.number="detailForm.endDay"
                    v-show="endDayChecked === '1'"></el-input>
          <span v-show="endDayChecked === '1'">天
                </span>
          <el-time-picker
              :picker-options=endTimeForDay
              @change="timeChange"
              placeholder="执行结束时间"
              style="margin-left: 10px" v-model="detailForm.step_endTime" value-format="HH:mm">
          </el-time-picker>
          <gf-strbool-checkbox style="margin-left: 10px" v-model="endDayChecked">跨日</gf-strbool-checkbox>
        </div>
        <gf-strbool-checkbox style="margin-left: 10px" v-model="timeoutRuleChecked">自定义超时规则</gf-strbool-checkbox>
      </el-form-item>
      <el-form-item v-if="timeoutRuleChecked == '1'">
        <rule-table :ruleTableData="detailForm.timeoutRuleTableData" confType="fn,object,event"
                    ref="timeoutRuleTable"></rule-table>
      </el-form-item>

      <el-form-item label="通知人员">
        <gf-person-chosen :memberRefList="this.memberRefList"
                          :rosterDate="this.rosterDate"
                          @getMemberList="getMemberList"
                          chosenType="user, group, roster"
                          ref="memberRef">
        </gf-person-chosen>
      </el-form-item>
      <el-form-item label="任务类型" prop="stepActType">
        <el-select :disabled="this.mode!='add'" @change="stepActTypeChange" placeholder="请选择"
                   v-model="detailForm.taskType">
          <el-option
              :disabled="item.dictId=='2'"
              :key="item.dictId"
              :label="item.dictName"
              :value="item.dictId"
              v-for="item in taskTypeOptions">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="执行逻辑选择" prop="stepActKey" v-if="detailForm.taskType === '1'">
        <el-select clearable filterable placeholder="请选择" style="width: 100%" v-model="detailForm.stepActKey">
          <gf-filter-option
              :key="item.value"
              :label="item.label"
              :value="item.value"
              v-for="item in kpiOptions">
          </gf-filter-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回填参数" v-if="detailForm.taskType === '6'">
        <div class="rule-table">
          <el-table :data="paramList"
                    :header-cell-style="{'text-align':'center'}"
                    border
                    cell-class-name="rule-cell"
                    header-cell-class-name="rule-header-cell"
                    header-row-class-name="rule-header-row" row-class-name="rule-row"
                    stripe>
            style="width: 100%">
            <el-table-column label="参数关键字" prop="accNo">
              <template slot-scope="scope">
                <el-input v-model="scope.row.paramKey"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="参数名称" prop="accNo">
              <template slot-scope="scope">
                <el-input v-model="scope.row.paramName"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="参数类型" prop="market">
              <template slot-scope="scope">
                <gf-dict clearable dict-type="TASK_DEF_DATATYPE" filterable v-model="scope.row.paramType"/>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" prop="option" width="52">
              <template slot-scope="scope">
                <span @click="deleteRuleRow(scope.$index)" class="option-span">删除</span>
              </template>
            </el-table-column>
          </el-table>
          <el-button @click="addRule()" class="rule-add-btn" size="small">新增</el-button>
        </div>
      </el-form-item>
      <el-form-item label="流程定义选择" prop="stepActKey" v-if="detailForm.taskType === '3'">
        <el-select placeholder="请选择" v-model="detailForm.stepActKey">
          <el-option
              :key="item.value"
              :label="item.label"
              :value="item.value"
              v-for="item in bpmnOptions">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="机器人选择" prop="stepActKey" v-if="detailForm.taskType === '4'">
        <el-select clearable filterable placeholder="请选择" style="width: 100%" v-model="detailForm.stepActKey">
          <gf-filter-option
              :key="item.value"
              :label="item.label"
              :value="item.value"
              v-for="item in rpaOptions">
          </gf-filter-option>
        </el-select>
      </el-form-item>
      <el-form-item label="执行频率配置" prop="execScheduler"
                    v-if="detailForm.taskType === '1' || detailForm.taskType === '4'">
        <el-button @click="editExecTime(detailForm.step_execScheduler,'执行频率配置')" type="text">
          {{ detailForm.step_execScheduler }}点击配置
        </el-button>
      </el-form-item>
      <el-form-item label="任务控制参数">
        <gf-strbool-checkbox v-model="detailForm.needApprove">是否需要复核</gf-strbool-checkbox>
        <gf-strbool-checkbox v-model="detailForm.isTodo" v-show="detailForm.taskType != '2'">是否进入待办
        </gf-strbool-checkbox>
        <gf-strbool-checkbox v-model="detailForm.allowManualConfirm" v-show="detailForm.taskType != '2'">是否允许人工干预通过
        </gf-strbool-checkbox>
        <gf-strbool-checkbox @change="stepInitTypeChange1" v-model="stepInitTypeBox1">任务共享</gf-strbool-checkbox>
        <gf-strbool-checkbox @change="stepInitTypeChange2" v-model="stepInitTypeBox2">任务分发</gf-strbool-checkbox>
      </el-form-item>
      <el-form-item label="消息通知参数">
        <span class="default-checked">系统内部消息</span>
        <el-checkbox-group v-model="msgInformParam">
          <el-checkbox :key="msgInform.value"
                       :label="msgInform.value"
                       v-for="msgInform in msgInformOp">
            {{ msgInform.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="msgInformParam.length>0">
        <el-tabs class="scroll-content-tab" style="height: 290px;" type="card">
          <el-tab-pane :key="msgInformIndex" :name="msgInformIndex+''"
                       v-for="(msgInformItem, msgInformIndex) in msgInformParam">
                    <span class="tab-label" slot="label">
                        <span>{{ msgInformOp[msgInformItem].label }}</span>
                    </span>
            <el-form label-width="100px" size="small" v-show="msgInformItem == '0'">
              <el-form-item label="提前通知配置">
                <el-button @click="openRemindDlg(detailForm.warningRemind,'warningRemind')" type="text">
                  点击配置通知方式
                </el-button>
              </el-form-item>
              <el-form-item label="预警时间">提前
                <gf-input style="width: 30%" v-model="detailForm.warningMintues"></gf-input>
                <el-select placeholder="请选择" v-model="detailForm.warningTimeType">
                  <el-option
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      v-for="item in detailForm.timeTypeData">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-form label-width="100px" size="small" v-show="msgInformItem == '1'">
              <el-form-item label="完成通知配置">
                <el-button @click="openRemindDlg(detailForm.finishRemind,'finishRemind')" type="text"> 点击配置通知方式
                </el-button>
              </el-form-item>
            </el-form>
            <el-form label-width="100px" size="small" v-show="msgInformItem == '2'">
              <el-form-item label="超时通知配置">
                <el-button @click="openRemindDlg(detailForm.timeoutRemind,'timeoutRemind')" type="text"> 点击配置通知方式
                </el-button>
              </el-form-item>
              <el-form-item label="服务水平承诺">
                <el-select @change="serviceResChange" placeholder="请选择" v-model="detailForm.serviceResponseId">
                  <el-option
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      v-for="item in serviceRes">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                按照每隔
                <gf-input :disabled="true" :value="repeatMinutes" style="width: 20%"></gf-input>
                分钟，执行
                <gf-input :disabled="true" :value="maxRepeatCount" style="width: 20%"></gf-input>
                次后退出
              </el-form-item>
              <el-form-item label="异常记录">
                <gf-strbool-checkbox v-model="detailForm.isRecordTimeoutError">记入异常
                </gf-strbool-checkbox>
              </el-form-item>
              <el-form-item v-if="detailForm.isRecordTimeoutError === '1'">
                <el-form-item label="异常类型">
                  <el-select placeholder="请选择" v-model="detailForm.timeoutErrorType">
                    <gf-filter-option
                        :key="item.dictId"
                        :label="item.dictName"
                        :value="item.dictId"
                        v-for="item in errorTypeData">
                    </gf-filter-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="异常内容">
                  <gf-input :rows="1" type="textarea" v-model="detailForm.timeoutErrorContent"></gf-input>
                </el-form-item>
              </el-form-item>
            </el-form>
            <el-form label-width="100px" size="small" v-show="msgInformItem == '3'">
              <el-form-item label="异常通知配置">
                <el-button @click="openRemindDlg(detailForm.exceptionRemind,'exceptionRemind')" type="text"> 点击配置通知方式
                </el-button>
              </el-form-item>
              <el-form-item label="异常记录">
                <gf-strbool-checkbox v-model="detailForm.isRecordError">记录异常</gf-strbool-checkbox>
              </el-form-item>
              <el-form-item v-if="detailForm.isRecordError === '1'">
                <el-form-item label="异常类型">
                  <el-select placeholder="请选择" v-model="detailForm.errorType">
                    <gf-filter-option
                        :key="item.dictId"
                        :label="item.dictName"
                        :value="item.dictId"
                        v-for="item in errorTypeData">
                    </gf-filter-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="异常内容">
                  <gf-input :rows="1" type="textarea" v-model="detailForm.errorContent"></gf-input>
                </el-form-item>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item label="完成规则">
        <el-radio-group v-model="succeedRule">
          <el-radio :key="ruleType.value"
                    :label="ruleType.value"
                    v-for="ruleType in ruleTypeOp">
            {{ ruleType.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="succeedRule == '1'">
        <rule-table :ruleTableData="detailForm.successRuleTableData" confType="fn" ref="successRuleTable"></rule-table>
      </el-form-item>
      <el-form-item label="异常规则">
        <el-radio-group v-model="abnormalRule">
          <el-radio :key="ruleType.value"
                    :label="ruleType.value"
                    v-for="ruleType in ruleErrorTypeOp">
            {{ ruleType.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="abnormalRule == '1'">
        <rule-table :ruleTableData="detailForm.failRuleTableData" confType="fn" ref="failRuleTable"></rule-table>
      </el-form-item>
    </template>
    <template v-if="detailForm.configType==2">
      <el-form-item label="配置任务节点">
        <el-button @click="confFlowNode" type="text">
          点击配置
        </el-button>
      </el-form-item>
      <el-form-item label="任务控制参数">
        <gf-strbool-checkbox @change="stepInitTypeChange1" v-model="stepInitTypeBox1">任务共享</gf-strbool-checkbox>
        <gf-strbool-checkbox @change="stepInitTypeChange2" v-model="stepInitTypeBox2">任务分发</gf-strbool-checkbox>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import loadsh from 'lodash';
import staticData from '../../../util/dataFormat'
import initData from '../../../util/initData'
import readMeStr from "./taskNameParams";

export default {
  name: "task-define",
  props: {
    mode: {
      type: String,
      default: 'add'
    },
    row: Object,
    actionOk: Function
  },
  data() {
    const checkFormat = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        const reg = /\$\{project.*?}/;
        const result = reg.test(value);
        if (result) {
          if (!(this.detailForm.eventId && this.hasEventRuleName)) {
            callback(new Error("非事件触发任务或事件取值参数为数组类型不可选择事件参数"));
          }
        } else {
          callback();
        }
      }
    };
    return {
      helpNotify: null,
      caseModelData: '',
      paramList: [],
      configType: '1',
      isCheckCode: false,
      configTypeDisable: false,
      eventParam: [],
      hasEventParam: false,
      hasEventRuleName: false,
      rosterDate: '',
      hisStepCode: '',
      memberRefList: [],
      paramRefList: [],
      versionId: '',
      serviceRes: [],
      taskTypeOptions: [],
      staticData: staticData(),
      detailForm: initData(),
      startDayChecked: '0',  // 执行开始时间跨日
      endDayChecked: '0',  // 执行结束时间跨日
      timeoutRuleChecked: '0',  // 超时规则确认框
      startStepRuleChecked: '0',  // 激活规则确认框
      endTimeForDay: null,
      startTimeForDay: null,
      stepInitTypeBox1: '1',
      stepInitTypeBox2: '0',
      succeedRule: '0',
      nameCreateRule: '0',
      abnormalRule: '0',
      repeatMinutes: '',
      maxRepeatCount: '',
      curExecScheduler: '',    // 当前频率对象字段
      msgInformParam: [],      // 消息通知参数类型数组
      startAllTime: '0',       // 是否永久有效
      bizTagOption: [],        // 业务类型下拉
      errorTypeData: [],
      kpiOptions: [],
      rpaOptions: [],
      bpmnOptions: [],
      // 消息配置类型类型选项
      msgInformOp: [{label: '提前通知', value: '0'}, {label: '完成通知', value: '1'}, {label: '超时通知', value: '2'},
        {label: '异常通知', value: '3'}],
      msgInfoStr: ['warningRemind', 'finishRemind', 'timeoutRemind', 'exceptionRemind'],
      // 规则选择类型选项
      ruleTypeOp: [{label: '默认完成规则', value: '0'}, {label: '自定义完成规则', value: '1'}],
      ruleNameTypeOp: [{label: '默认生成规则', value: '0'}, {label: '自定义生成规则', value: '1'}],
      ruleErrorTypeOp: [{label: '默认异常规则', value: '0'}, {label: '自定义异常规则', value: '1'}],
      detailFormRules: {
        taskName: [
          {required: true, message: '任务名称必填', trigger: 'blur'},
        ],
        caseKey: [
          {validator: this.hasRepetCode, required: true, trigger: 'change'},
        ],
        task_endTime: [
          {required: true, message: '运行周期结束时间必填', trigger: 'blur'},
        ],
        // dayendDefId: [
        //     {required: true, message: '基准日期必填', trigger: 'change'},
        // ],
        task_execMode: [
          {required: true, message: '启动方式必填', trigger: 'blur'},
        ],
        task_execScheduler: [
          {required: true, message: '任务创建频率必填', trigger: 'blur'},
        ],
        step_startTime: [
          {required: true, message: '执行开始时间必填', trigger: 'change'},
        ],
        task_startTime: [
          {required: true, message: '运行周期开始时间必填', trigger: 'blur'},
        ],
        step_endTime: [
          {required: true, message: '执行结束时间必填', trigger: 'change'},
        ],
        taskNameExp: [{validator: checkFormat, trigger: ['blur', 'change']}]
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.detailForm.task_startTime;
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
          let endDateVal = this.detailForm.task_endTime;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        }
      }
    }
  },
  beforeMount() {
    this.errorTypeData = this.$app.dict.getDictItems("AGNES_DOP_ERR_TYPE");
    this.startTimeForDay = {selectableRange: `00:00:00-${this.detailForm.step_endTime ? this.detailForm.step_endTime + ':00' : '23:59:59'}`};
    this.endTimeForDay = {selectableRange: `${this.detailForm.step_startTime ? this.detailForm.step_startTime + ':00' : '00:00:00'}-23:59:59`};
    this.reDataTransfer();
    this.getOptions();
    this.getBpmnData();
    this.getRpaData();
    this.getKpiData();
    this.getServiceResponse();
  },
  methods: {
    hasRepetCode(rule, value, callback) {
      if (!value) {
        callback(new Error('任务编号必填'));
      } else if (value.length !== 8) {
        callback(new Error('任务编号需为8位数字'));
      } else {
        callback();
      }
    },
    stepActTypeChange() {
      if (this.mode == 'add') {
        if (this.detailForm.taskType === '6') {
          this.detailForm.allowManualConfirm = '1'
        } else {
          this.detailForm.allowManualConfirm = '0'
        }
      }
    },
    async getOptions() {
      this.bizTagOption = this.$app.dict.getDictItems("AGNES_BIZ_TAG");
      this.taskTypeOptions = this.$app.dict.getDictItems("AGNES_CASE_STEPTYPE");
      const e = this.$api.eventlDefConfigApi.getEventDefList();
      const eventR = await this.$app.blockingApp(e);
      if (eventR.data) {
        const eventList = eventR.data
        eventList.forEach((item) => {
          this.detailForm.eventOptions.push({label: item.eventName, value: item.eventId});
        });
      }
    },
    async getEventParam() {
      this.hasEventParam = false;
      this.eventParam = [];
      if (this.detailForm.eventId) {
        const e = this.$api.modelConfigApi.getFieldByEventId(this.detailForm.eventId);
        const eventR = await this.$app.blockingApp(e);
        if (eventR.data && eventR.data.length>0) {
          this.paramRefList = [];
          this.detailForm.bizParam = '';
          this.hasEventParam = true;
          this.eventParam = eventR.data;
        }
      }
      this.getEventFun();
    },

    async getEventFun() {
      if (this.detailForm.eventId) {
        const f = this.$api.funDefineApi.selectFunByEventId(this.detailForm.eventId);
        const eventF = await this.$app.blockingApp(f);
        if (eventF && eventF.data && (eventF.data.isReturnArray === '0' || (eventF.data.isReturnArray === '1' && this.stepInitTypeBox2 === '1'))) {
          this.hasEventRuleName = true;
        } else {
          this.hasEventRuleName = false;
        }
      }
    },

    async getKpiData() {
      const kpi = this.$api.kpiTaskApi.getAllKpiList();
      const kpiData = await this.$app.blockingApp(kpi);
      if (kpiData.data) {
        const kpiList = kpiData.data
        kpiList.forEach((item) => {
          let kpiName = '(' + item.kpiCode + ')' + item.kpiName
          this.kpiOptions.push({label: kpiName, value: item.kpiCode});
        });
      }
    },
    async getRpaData() {
      const rpa = this.$api.flowTaskApi.queryAllRPAList();
      const rpaOptions = await this.$app.blockingApp(rpa);
      if (rpaOptions.data) {
        const rpaList = rpaOptions.data
        rpaList.forEach((item) => {
          let robotName = item.robotName;
          this.rpaOptions.push({label: robotName, value: item.robotId});
        });
      }
    },
    async getBpmnData() {
      const bpmn = this.$api.BpmnApi.queryBpmnAll();
      const bpmnOptions = await this.$app.blockingApp(bpmn);
      if (bpmnOptions) {
        bpmnOptions.forEach((item) => {
          let bpmnName = '(' + item.key + ')' + item.title
          this.bpmnOptions.push({label: bpmnName, value: item.key});
        });
      }
    },
    async serviceResChange(param) {
      this.serviceRes.forEach((item) => {
        if (item.value === param) {
          this.repeatMinutes = item.repeatMinutes
          this.maxRepeatCount = item.maxRepeatCount
          return
        }
      });
    },
    async getServiceResponse() {
      const serviceRes = this.$api.kpiTaskApi.getServiceResponse();
      const serviceResData = await this.$app.blockingApp(serviceRes);
      if (serviceResData.data) {
        const serviceResList = serviceResData.data;
        serviceResList.forEach((item) => {
          this.serviceRes.push({
            label: item.serviceResponseName, value: item.serviceResponseId,
            repeatMinutes: item.repeatMinutes, maxRepeatCount: item.maxRepeatCount
          });
        });
      }
    },

    stepInitTypeChange1(val) {
      if ('1' === val) {
        this.stepInitTypeBox2 = '0';
        this.detailForm.stepInitType = '0';
        this.detailForm.taskInitType = '0';
      } else {
        this.detailForm.stepInitType = '0';
        this.detailForm.taskInitType = '0';
      }
      this.getEventFun();
    },
    stepInitTypeChange2(val) {
      if ('1' === val) {
        this.stepInitTypeBox1 = '0';
        this.detailForm.stepInitType = '1';
        this.detailForm.taskInitType = '1';
      } else {
        this.detailForm.stepInitType = '0';
        this.detailForm.taskInitType = '0';
      }
      this.getEventFun();
    },
    getMemberList(val) {
      this.memberRefList = val;
      this.detailForm.stepActOwner = JSON.stringify(val);
    },
    getParamList(val) {
      this.paramRefList = val;
      this.detailForm.bizParam = JSON.stringify(val);
    },
    editExecTime(curObj, execScheduler) {
      this.curExecScheduler = curObj;
      this.showDlg(execScheduler, this.setExecScheduler.bind(this));
    },
    // 回填参数新增、删除服务行
    addRule() {
      const newTableObj = {
        paramKey: '',
        paramName: '',
        paramType: '',
      };
      this.paramList.push(newTableObj);
    },
    deleteRuleRow(rowIndex) {
      this.paramList.splice(rowIndex, 1);
    },
    showDlg(data, action) {
      if (this.mode === 'view') {
        return;
      }
      this.$nav.showDialog(
          'gf-cron-modal',
          {
            args: {cornObj: data, action},
            width: '530px',
            title: this.$dialog.formatTitle('创建频率配置', "edit"),
          }
      );
    },
    setExecScheduler(cron) {
      this.detailForm[this.curExecScheduler] = cron;
    },
    // 取消onCancel事件，触发抽屉关闭事件this.$emit("onClose");
    async onCancel() {
      if (this.row.isCheck) {
        let resData = this.dataTransfer();
        resData.isPass = '0';
        const p = this.$api.kpiTaskApi.checkTask(resData);
        await this.$app.blockingApp(p);
        if (this.actionOk) {
          await this.actionOk();
        }
      }
      this.$emit("onClose");
    },

    // 保存onSave事件，保存操作完成后触发抽屉关闭事件this.$emit("onClose");
    async onSave() {
      const ok = await this.$refs['taskDefForm'].validate();
      if (!ok) {
        return;
      }
      try {
        if (this.detailForm.stepActOwner == '[]' && this.detailForm.configType === '1') {
          this.$message.warning("请选择通知人员！");
          return;
        }
        if (this.detailForm.stepRemark == '' && this.detailForm.configType != '2') {
          this.$message.warning("任务说明必填！");
          return;
        }
        if (this.detailForm.configType == 1 && !this.detailForm.taskType) {
          this.$message.warning("请选择任务类型！");
          return;
        }
        if (this.detailForm.stepLevel == '' && this.detailForm.configType != '2') {
          this.$message.warning("任务等级必填！");
          return;
        }
        if (this.detailForm.flowType == '' && this.detailForm.configType === '2') {
          this.$message.warning("请选流程类型！");
          return;
        }
        if (this.detailForm.task_execMode == '3' && this.detailForm.eventId == '') {
          this.$message.warning("请选择触发事件！");
          return;
        }
        let resData = this.dataTransfer();
        if (this.detailForm.task_execMode == '4') {
          resData.reTaskDef.taskType = '8';
        }
        if (this.row.isCheck) {
          resData.isPass = '1';
          const p = this.$api.kpiTaskApi.checkTask(resData);
          await this.$app.blockingApp(p);
          this.$msg.success('审核成功');
          if (this.actionOk) {
            await this.actionOk();
          }
          this.$emit("onClose");
        } else {
          if (resData.reTaskDef.taskType == '6' && resData.paramList.length > 0) {
            resData.paramList.forEach((item) => {
              if (item.paramKey == '') {
                this.$message.warning("回填参数中，参数关键字必填！");
                return;
              }
            });
            resData.stepCode = resData.reTaskDef.caseKey;
            if (resData.stepCode != this.hisStepCode) {
              resData.hisStepCode = this.hisStepCode;
            }
            const c = this.$api.motConfigApi.checkAndSaveReCaseParams(resData);
            const resp1 = await this.$app.blockingApp(c);
            if (resp1 && resp1.code == 'existKey') {
              this.$msg.error(resp1.message);
              return;
            }
          }
          if(this.detailForm.configType != '2'){
            resData.isUpdateLastestVersion = '1';
          }
          const p = this.$api.motConfigApi.saveTask(resData);
          const resp = await this.$app.blockingApp(p);
          if (resp && resp.code == 'rwbhycz') {
            this.$msg.error(resp.message);
          } else {
            this.$msg.success('保存成功');
            if (this.actionOk) {
              await this.actionOk();
            }
            this.$emit("onClose");
          }
        }
      } catch (reason) {
        this.$msg.error(reason);
      }
    },


            async showRemind(remindProp,remindSort){
                this.detailForm[remindSort] = remindProp;
            },
            // 告警方式配置，打开弹框
            openRemindDlg(remindProp,remindSort) {
                this.showRemindDlg(remindProp,remindSort, this.showRemind.bind(this));
            },
            showRemindDlg(remindProp,remindSort, actionOk) {
                this.$nav.showDialog(
                    'remind-def',
                    {
                        args: {remindProp, remindSort, actionOk},
                        width: '530px',
                        title: this.$dialog.formatTitle('通知方式配置', "edit"),
                    }
                );
            },
            // 数据结构转换
            dataTransfer() {
                //完成规则判断是否勾选
                if(this.succeedRule==='0'){
                    this.detailForm.successRuleTableData={}
                }
                if (this.nameCreateRule === '0') {
                    this.detailForm.taskNameExp = ''
                }
                if(this.abnormalRule==='0'){
                    this.detailForm.failRuleTableData={}
                }
                if(this.startStepRuleChecked==='0'){
                    this.detailForm.activeRuleTableData={}
                }
                if(this.timeoutRuleChecked==='0'){
                    this.detailForm.timeoutRuleTableData={}
                }
                if(this.detailForm.successRuleTableData
                    && this.detailForm.successRuleTableData.ruleList){
                    const successRuleJson = this.$refs.successRuleTable.jsonFormatter();
                    this.detailForm.successRuleTableData.ruleBody = successRuleJson;
                }
                if(this.detailForm.failRuleTableData
                    && this.detailForm.failRuleTableData.ruleList){
                    const failRuleJson = this.$refs.failRuleTable.jsonFormatter();
                    this.detailForm.failRuleTableData.ruleBody = failRuleJson;
                }
                if(this.detailForm.timeoutRuleTableData
                    && this.detailForm.timeoutRuleTableData.ruleList){
                    const timeoutRuleJson = this.$refs.timeoutRuleTable.jsonFormatter();
                    this.detailForm.timeoutRuleTableData.ruleBody = timeoutRuleJson;
                }
                if(this.detailForm.activeRuleTableData
                    && this.detailForm.activeRuleTableData.ruleList){
                    const activeRuleJson = this.$refs.activeRuleTable.jsonFormatter();
                    this.detailForm.activeRuleTableData.ruleBody = activeRuleJson;
                }
                //消息通知参数判断是否勾选
                if(this.msgInformParam.indexOf('0') === -1){
                    this.detailForm.warningRemind=[];
                }
                if(this.msgInformParam.indexOf('1') === -1){
                    this.detailForm.finishRemind=[];
                }
                if(this.msgInformParam.indexOf('2') === -1){
                    this.detailForm.timeoutRemind=[];
                }
                if(this.msgInformParam.indexOf('3') === -1){
                    this.detailForm.exceptionRemind=[];
                }
                let taskDef = this.$utils.deepClone(this.staticData.kpiTaskDef);
                taskDef.taskInitType = this.detailForm.taskInitType;
                this.detailForm.bizTag = this.detailForm.bizTagArr.join(",");
                this.detailForm.stepActType = this.detailForm.taskType;
                this.detailForm.stepCode = this.detailForm.caseKey;
                this.detailForm.caseDefKey = this.detailForm.caseKey;
                this.keyToValue(taskDef, 'task_');
                let caseDef = this.$utils.deepClone(this.staticData.caseDef);
                let caseFlowInfos = '';
                if(this.detailForm.configType!='2') {
                    let defId = this.$agnesUtils.randomString(32);
                    let defName = this.detailForm.taskName;
                    this.detailForm.stepName = defName;
                    caseDef.stages[0].defId = defId;
                    caseDef.stages[0].children[0].stepId = defId;
                    caseDef.stages[0].children[0].stepActType = this.detailForm.taskType;
                    caseDef.stages[0].defName = defName;
                    caseDef.stages[0].children[0].stepName = defName;
                    let stepFormInfo = this.$utils.deepClone(this.staticData.caseDef.stages[0].children[0].stepFormInfo);
                    Object.keys(stepFormInfo).forEach((key) => {
                        if (key === 'caseStepDef') {
                            this.keyToValue(stepFormInfo.caseStepDef, 'step_');
                        } else {
                            stepFormInfo[key] = this.detailForm[key] || stepFormInfo[key];
                        }
                    })
                    stepFormInfo.stepInitType = this.detailForm.stepInitType;
                    caseDef.stages[0].children[0].stepFormInfo = stepFormInfo;
                    if (this.mode === 'add' || this.row.reTaskDef.caseKey != taskDef.caseKey) {
                        this.isCheckCode = true;
                    }
                    caseFlowInfos = JSON.stringify(caseDef);
                }else{
                    caseFlowInfos = this.caseModelData;
                }
                return {reTaskDef: taskDef, caseDefId: this.row.caseDefId, caseDefBody: caseFlowInfos,versionId:this.versionId,isCheckCode:this.isCheckCode,paramList:this.paramList};
            },
            reDataTransfer() {
                this.rosterDate = window.bizDate;
                if (this.mode && this.mode !== 'add') {
                    let taskDef = this.$utils.deepClone(this.row.reTaskDef);
                    this.hisStepCode = JSON.parse(JSON.stringify(taskDef.caseKey));
                    if(taskDef.taskType=='6' && this.row.paramList){
                        this.paramList = this.row.paramList;
                    }
                    if (taskDef.taskInitType == '1') {
                        this.stepInitTypeBox2 = '1';
                    }
                    this.reKeyToValue(taskDef, 'task_');
                    this.versionId = this.row.versionId;
                    if (taskDef.bizParam) {
                        this.paramRefList = JSON.parse(taskDef.bizParam);
                    }
                    if(taskDef.taskType == '2' || taskDef.taskType == '8'){
                        this.detailForm.configType='2';
                        this.caseModelData = this.row.caseDefBody;
                    }else {
                        let caseDefBody = JSON.parse(this.row.caseDefBody);
                        let stepFormInfo = this.$utils.deepClone(caseDefBody.stages[0].children[0].stepFormInfo);
                        Object.keys(stepFormInfo).forEach((key) => {
                            if (key === 'caseStepDef') {
                                this.reKeyToValue(stepFormInfo.caseStepDef, 'step_');
                            } else {
                                this.detailForm[key] = stepFormInfo[key] || this.detailForm[key];
                            }
                        })
                        if(this.detailForm.stepActOwner){
                            this.memberRefList = JSON.parse(this.detailForm.stepActOwner);
                        }
                        if (this.detailForm.task_endTime === '9999-12-31') {
                            this.startAllTime = true;
                        }
                        if(!loadsh.isEmpty(this.detailForm.successRuleTableData)){
                            this.succeedRule ='1'
                        }
                        if (this.detailForm.taskNameExp !== null) {
                            this.nameCreateRule = '1'
                        }
                        if(!loadsh.isEmpty(this.detailForm.failRuleTableData)){
                            this.abnormalRule ='1'
                        }
                        if(!loadsh.isEmpty(this.detailForm.timeoutRuleTableData)){
                            this.timeoutRuleChecked ='1'
                        }
                        if(!loadsh.isEmpty(this.detailForm.activeRuleTableData)){
                            this.startStepRuleChecked ='1'
                        }
                        if (this.detailForm.endDay != null && this.detailForm.endDay != '') {
                            this.endDayChecked = '1';
                        }
                        if (this.detailForm.startDay != null && this.detailForm.startDay != '') {
                            this.startDayChecked = '1';
                        }
                        //消息通知参数回显
                        this.msgInfoStr.forEach((strItem, index)=>{
                            if(this.detailForm[strItem] && this.detailForm[strItem].length>0){
                                this.msgInformParam.push(index+'');
                            }
                        });
                    }
                    if (this.detailForm.bizTag) {
                        this.detailForm.bizTagArr = this.detailForm.bizTag.split(",");
                    }
                }
            },

    keyToValue(obj, type) {
      Object.keys(obj).forEach((key) => {
        const extraKeyArr = ['startTime', 'endTime', 'execMode', 'execScheduler'];
        if (extraKeyArr.indexOf(key) === -1) {
          obj[key] = this.detailForm[key] || obj[key];
        } else {
          obj[key] = this.detailForm[type + key] || obj[key];
        }
      });
    },

    reKeyToValue(obj, type) {
      Object.keys(obj).forEach((key) => {
        const extraKeyArr = ['startTime', 'endTime', 'execMode', 'execScheduler'];
        if (extraKeyArr.indexOf(key) === -1) {
          this.detailForm[key] = obj[key] || this.detailForm[key];
        } else {
          this.detailForm[type + key] = obj[key] || this.detailForm[key];
        }
      });
    },
    timeChange() {
      if (this.endDayChecked == '1' || this.startDayChecked == '1') {
        this.startTimeForDay = {selectableRange: '00:00:00-23:59:59'};
        this.endTimeForDay = {selectableRange: '00:00:00-23:59:59'};
      } else {
        this.startTimeForDay = {selectableRange: `00:00:00-${this.detailForm.step_endTime ? this.detailForm.step_endTime + ':00' : '23:59:59'}`};
        this.endTimeForDay = {selectableRange: `${this.detailForm.step_startTime ? this.detailForm.step_startTime + ':00' : '00:00:00'}-23:59:59`};
      }
    },

    //多节点相关操作
    async onEditFlowInfo(item) {
      this.caseModelData = item;
    },
    confFlowNode() {
      let caseDefInfo = {};
      if (this.mode == 'add') {
        caseDefInfo = {
          reTaskDef: {
            bizType: '',
          }
        };
      } else {
        caseDefInfo = this.row;
      }
      if (this.caseModelData) {
        caseDefInfo.caseDefBody = this.caseModelData;
      }
      caseDefInfo.reTaskDef.bizType = this.detailForm.bizType;
      this.showFlowNode({caseDefInfo: caseDefInfo}, 'addMult', this.onEditFlowInfo.bind(this))
    },
    showFlowNode(row, mode, actionOk) {
      // 抽屉创建
      this.$drawerPage.create({
        width: 'calc(100% - 250px)',
        title: ['任务节点配置'],
        component: 'case-config-index',
        args: {row, mode, actionOk},
      })
    },
    // 打开帮助文档
    openHelpFile() {
      if (this.helpNotify && this.helpNotify.close) {
        this.helpNotify.close();
      }
      this.helpNotify = this.$notify({
        width: 400,
        title: '任务名称可选参数',
        customClass: 'cronHelpNotify',
        dangerouslyUseHTMLString: true,
        duration: 0,
        message: readMeStr()
      });
    },
  },

        watch: {
            'startAllTime'(val) {
                if (val) {
                    this.detailForm.task_endTime = '9999-12-31'
                } else {
                    this.detailForm.task_endTime = ''
                }
            },
            'detailForm.configType'(val){
                if(val === '1'){
                    this.detailForm.flowType = '';
                    this.caseModelData = {};
                    this.detailForm.taskType = '';
                }else if(val === '2'){
                    this.detailForm.taskType = '2';
                }
            },
            'detailForm.task_execMode'(val){
                if(val === '2'){
                    this.detailForm.eventId = '';
                }else if(val === '3'){
                    this.detailForm.task_execScheduler= ''
                }else {
                    this.detailForm.eventId = '';
                    this.detailForm.task_execScheduler= ''
                }
                if(val === '4'){
                    this.detailForm.configType = '2';
                }
            },
            'detailForm.eventId'() {
                this.getEventParam();
            },
            'detailForm.taskType'(val){
                if(!val.match(/1|4|8/)){
                    this.detailForm.stepActKey = "";
                    this.detailForm.step_execScheduler = "";
                }
            },
            'endDayChecked'(val){
                if (val==='0') {
                    this.detailForm.endDay = '';
                }
                this.timeChange();
            },
            'startDayChecked'(val){
                if (val==='0'){
                    this.detailForm.startDay = '';
                }
                this.timeChange();

    }
  }
}
</script>

<style scoped>
.el-icon-refresh-left {
  color: #0f5eff;
  margin-left: 10px;
  vertical-align: text-top;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.el-form .el-form-item .el-form-item__content .el-date-editor .el-input__inner {
  height: auto !important;
}

.question {
  top: 15px;
  right: 165px;
  font-size: 20px;
  color: #0f5eff;
  cursor: pointer;
}
</style>
