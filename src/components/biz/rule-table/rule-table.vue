<template>
    <div class="rule-table">
        <el-table header-row-class-name="rule-header-row"
                  header-cell-class-name="rule-header-cell"
                  row-class-name="rule-row"
                  cell-class-name="rule-cell"
                  :class="ruleTableCheck?'validate':''"
                  :data="ruleTableData.ruleList"
                  :max-height="tableMaxHeight"
                  border stripe
                  style="width: 100%"
                  :style="{'min-height': tableHeight+'px'}">
            <el-table-column prop="ruleTag" label="标签" width="52" align="center"></el-table-column>
            <el-table-column prop="ruleType" label="类型" width="65" align="center"></el-table-column>
            <el-table-column prop="ruleParamKey" label="对象">
              <template slot-scope="scope">
                <el-select v-if="scope.row.ruleType === 'fn'"
                           :class="mustFill('ruleTarget') && !scope.row.ruleTarget ? 'error':''"
                           v-model="scope.row.ruleParamKey"
                           placeholder="请选择"
                           filterable clearable
                           @change="ruleTargetChange(scope.$index, scope.row)">
                  <gf-filter-option v-for="funItem in funArr" :key="funItem.fnKey" :label="funItem.fnName"
                                    :value="funItem.fnKey">
                  </gf-filter-option>
                </el-select>
                <el-select v-else-if="scope.row.ruleType === 'event'"
                           :class="mustFill('ruleTarget') && !scope.row.ruleTarget ? 'error':''"
                           v-model="scope.row.ruleParamKey"
                           placeholder="请选择"
                           filterable clearable
                           @change="ruleTargetChange(scope.$index, scope.row)">
                  <gf-filter-option v-for="event in eventArr" :key="event.eventKey" :label="event.eventName"
                                    :value="event.eventKey">
                  </gf-filter-option>
                </el-select>
                <el-select v-else-if="scope.row.ruleType === 'object'"
                           :class="mustFill('ruleTarget') && !scope.row.ruleTarget ? 'error':''"
                           v-model="scope.row.ruleParamKey"
                           placeholder="请选择"
                           filterable clearable
                           @change="ruleTargetChange(scope.$index, scope.row)">
                  <gf-filter-option v-for="funItem in ruleTargetOp[scope.row.ruleType]" :key="funItem.modelTypeKey"
                                    :label="funItem.typeName" :value="funItem.modelTypeKey">
                  </gf-filter-option>
                </el-select>
                <el-select v-else-if="scope.row.ruleType === 'step'"
                           :class="mustFill('ruleTarget') && !scope.row.ruleTarget ? 'error':''"
                           v-model="scope.row.ruleTarget"
                           filterable clearable
                               placeholder="请选择">
                        <gf-filter-option v-for="(stepName, stepCode) in ruleTargetOp[scope.row.ruleType]" :key="stepCode" :label="stepCode" :value="stepCode">
                            <span>({{stepCode}}){{stepName}} </span>
                        </gf-filter-option>
                    </el-select>
                    <el-select v-else :class="mustFill('ruleTarget') && !scope.row.ruleTarget ? 'error':''"
                               v-model="scope.row.ruleTarget"
                               filterable clearable
                               placeholder="请选择">
                        <gf-filter-option v-for="funItem in ruleTargetOp[scope.row.ruleType]" :key="funItem.stepCode" :label="funItem.defName" :value="funItem.stepCode">
                        </gf-filter-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="ruleParam" label="筛选条件">
                <template slot-scope="scope">
                    <div v-if="scope.row.ruleType === 'fn'" class="filter-conf" :class="mustFill('ruleParam') && !jsonNull(scope.row.ruleParam) ? 'error':''">
                        <span class="nowrap-span" :title="scope.row.ruleParam">{{jsonNull(scope.row.ruleParam)}}</span>
                        <em class="edit-btn fa fa-edit" v-show="scope.row.ruleParam !== '无筛选条件'" @click="editRuleParam(scope.$index, scope.row)"></em>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="ruleKey" label="匹配字段">
                <template slot-scope="scope">
                    <span v-if="typeof(scope.row.ruleKeyOp) === 'string'">{{scope.row.ruleKey}}</span>
                    <el-select v-else :class="mustFill('ruleKey') && !scope.row.ruleKey ? 'error':''"
                               v-model="scope.row.ruleKey"
                               placeholder="请选择">
                        <el-option v-for="fieldItem in scope.row.ruleKeyOp" :key="fieldItem.fieldKey"
                                   :label="fieldItem.fieldName" :value="fieldItem.fieldKey">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="ruleSign" label="运算符" width="115">
                <template slot-scope="scope">
                    <span v-if="scope.row.ruleType === 'step'">等于</span>
                    <span v-else-if="scope.row.ruleType === 'event'">{{scope.row.ruleSignLabel}}</span>
                    <el-select v-else :class="mustFill('ruleSign') && !scope.row.ruleSign ? 'error':''"
                               v-model="scope.row.ruleSign">
                        <el-option v-for="ruleSignItem in ruleSignOp" :key="ruleSignItem.dictId"
                                   :label="ruleSignItem.dictName" :value="ruleSignItem.dictId">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="ruleValue" label="匹配值">
                <template slot-scope="scope">
                    <span v-if="scope.row.ruleType === 'step' || scope.row.ruleType === 'event'">{{scope.row.ruleValueOp}}</span>
                    <el-input v-else-if="typeof(scope.row.ruleValueOp) === 'string'" :class="mustFill('ruleValue') && !scope.row.ruleValue ? 'error':''"
                              v-model="scope.row.ruleValue"></el-input>
                    <el-select v-else :class="mustFill('ruleValue') && !scope.row.ruleValue ? 'error':''"
                               v-model="scope.row.ruleValue"
                               placeholder="请选择">
                        <el-option v-for="fieldItem in scope.row.ruleValueOp" :key="fieldItem.value"
                                   :label="fieldItem.label" :value="fieldItem.value">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="option" label="操作" width="60" align="center">
                <template slot-scope="scope">
                    <span class="option-span" @click="deleteRuleRow(scope.$index)">删除</span>
                </template>
            </el-table-column>
        </el-table>
        <el-popover popper-class="rule-table-popover"
                    placement="right"
                    title="新增条件类型"
                    width="340"
                    trigger="click">
            <div class="conf-type">
                <template v-for="confItem in confTypeArr">
                    <el-button size="small"
                               :key="confItem.dictId"
                               v-if="confType.includes(confItem.dictId)"
                               @click="addRule(confItem.dictId)">{{confItem.dictName}}</el-button>
                </template>
            </div>
            <el-button slot="reference" class="rule-add-btn" size="small">新增条件</el-button>
        </el-popover>
        <div class="rule-edit-area">
            <p>规则编辑：默认组合匹配条件，如：</p>
            <el-input
                    type="textarea"
                    :rows="1"
                    placeholder="A && B && C"
                    v-model="ruleTableData.judgeScript">
            </el-input>
            <p>规则配置：支持逻辑的自定义编辑，可以使用的组合表达式为：&& 或 ||，可以整体取逻辑非的操作。</p>
        </div>
        <el-dialog title="筛选条件配置" :visible.sync="filterConfDialog" :modal-append-to-body="false">
            <el-table header-row-class-name="rule-header-row"
                      header-cell-class-name="rule-header-cell"
                      row-class-name="rule-row"
                      cell-class-name="rule-cell"
                      border stripe
                      :class="filterConfCheck?'validate':''"
                      style="min-height: 250px; margin: 0 auto"
                      :data="filterConfFormData">
                <el-table-column prop="fieldKey" label="标签"></el-table-column>
                <el-table-column prop="fieldName" label="入参"></el-table-column>
                <el-table-column prop="mustFill" label="是否必填">
                    <template slot-scope="scope">
                        {{scope.row.mustFill === '1' ? '是' : '否'}}
                    </template>
                </el-table-column>
                <el-table-column prop="fieldValue" label="设置">
                    <template slot-scope="scope">
                        <el-input :class="scope.row.mustFill === '1' && !scope.row.fieldValue ? 'error': ''" v-model="scope.row.fieldValue"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="filterConfDialog = false">取 消</el-button>
                <el-button type="primary" @click="savefilterConf">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: {
            tableHeight: {
                type: String,
                default: '250'
            },
            tableMaxHeight: {
                type: String,
                default: '500'
            },
            confType: {
                type: String,
                default: 'fn, object, step, event'
            },
            ruleTableData: {
                type: Object,
                require: true,
                default: function () {
                    return {
                        ruleList: [],
                        judgeScript: ''
                    }
                }
            },
            ruleTargetOp: {
                type: Object,
                default: function () {
                    return {
                        func: [],
                        object: [],
                        step: [],
                        kpi: [],
                        action: [],
                        service: [],
                        RPA: [],
                        process: [],
                    }
                }
            }
        },
        data() {
            return {
                funArr: [],   // 对象数组
                eventArr: [], // 事件数组
                confTypeArr: this.$app.dict.getDictItems('AGNES_RULE_TYPE'), // 业务对象数组
                labelOrder: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                mustFillField: [],
                ruleTableCheck: false,
                filterConfDialog: false,
                editRowIndex: -1,
                filterConfFormData: [],
                filterConfCheck: false,
                ruleSignOp: this.$app.dict.getDictItems('AGNES_RULE_SIGN'),

                //匹配字段类型映射
                ruleKeyMap: {
                    fn: [],
                    object: [],
                    step: '节点状态',
                    event: '',
                    kpi: [
                        {fieldName: '正常数', fieldKey: '01'},
                        {fieldName: '异常数', fieldKey: '02'},
                        {fieldName: '人工一致数', fieldKey: '03'}
                    ],
                    action: '确认结果',
                    service: '服务返回参数',
                    RPA: 'RPA执行状态',
                    process: '流程状态',
                },

                //匹配值类型映射
                ruleValueMap: {
                    fn: '',
                    object: '',
                    event: '',
                    step: '完成',
                    kpi: '',
                    action: [{label: '已确认', value: '01'}, {label: '未确认', value: '02'}],
                  service: '',
                  RPA: [{label: '正常', value: '01'}, {label: '异常', value: '02'}],
                  process: [{label: '审批通过', value: '01'}, {label: '审批拒绝', value: '02'},
                    {label: '审批作废', value: '03'}, {label: '进行中', value: '04'}],
                }
            }
        },
      beforeMount() {
        this.initData();
      },
      methods: {
        setRuleTargetOp(optionData) {
          this.initRuleList(optionData);
        },
        reloadInitDate() {
          this.initRuleList();
        },
        async initData() {
          let funArrEvent = new Promise((resolve) => {
            this.$api.ruleTableApi.getFnAndModelfields().then(function (res) {
              resolve(res);
            })
          });
          let eventArrEvent = new Promise((resolve) => {
            this.$api.ruleTableApi.eventForRuleTable().then(function (res) {
              resolve(res);
            })
                });
                Promise.all([funArrEvent, eventArrEvent]).then((result) => {
                    if(result){
                        const funArr = result[0].data;
                        if(funArr && funArr.length>0){
                            funArr.sort();
                        }
                        this.funArr = funArr;
                        const eventArr = result[1].data;
                        if(eventArr && eventArr.length>0){
                            eventArr.forEach((item)=>{
                                if(item.eventCode){
                                    item.eventName = `(${item.eventCode})${item.eventName}`;
                                }
                            });
                        }
                        this.eventArr = eventArr;
                        this.initRuleList();
                    }
                })
            },
            // ruleTag计数规则
            getRuleTag(){
                if(!this.ruleTableData.ruleList || this.ruleTableData.ruleList.length == 0){
                    this.$set(this.ruleTableData, 'ruleList', []);
                    return 'A';
                }
                let ruleList = this.ruleTableData.ruleList;
                let lastLabel = ruleList[ruleList.length-1].ruleTag;
                let lastLetter = lastLabel.substr(lastLabel.length-1,1);
                let labelIndex = this.labelOrder.indexOf(lastLetter)+1;
                if(labelIndex>=26){
                    lastLabel = lastLabel.substring(0,lastLabel.length-1) + 'AA';
                }else{
                    lastLabel = lastLabel.substring(0,lastLabel.length-1) + this.labelOrder[labelIndex];
                }
                return lastLabel;
            },

            // 数组查找指定对象
            arrFind(list, obj){
                return this.$lodash.find(list, obj);
            },

            // json非空判断
            jsonNull(jsonStr){
                if(jsonStr === '无筛选条件'){
                    return jsonStr;
                }else if(!JSON.parse(jsonStr)){
                    return ''
                }else {
                    return jsonStr;
                }
            },

            // json非空判断
            mustFill(fieldStr){
                return this.mustFillField.indexOf(fieldStr) !== -1;
            },

            // 新增规则行
            addRule(type){
                const newRuleObj = {
                  ruleType: type,
                  ruleTag: this.getRuleTag(),
                  ruleTarget: '',
                  ruleDetailKey: '',
                  ruleParamKey: '',
                  ruleParam: JSON.stringify(""),
                  ruleKey: typeof (this.ruleKeyMap[type]) === 'string' ? this.ruleKeyMap[type] : '',
                  ruleKeyOp: this.ruleKeyMap[type],
                  ruleSign: '',
                  ruleValue: type === 'step' ? '已完成' : '',
                  ruleValueOp: this.ruleValueMap[type],
                };
              this.ruleTableData.ruleList.push(newRuleObj);
              const judgeScript = this.ruleTableData.judgeScript;
              if (judgeScript) {
                this.ruleTableData.judgeScript = judgeScript + ' && ' + newRuleObj.ruleTag;
              } else {
                this.$set(this.ruleTableData, 'judgeScript', newRuleObj.ruleTag);
              }

            },

        initRuleList(optionData) {
          // if(!optionData){
          //     return;
          // }
          this.ruleTableData.ruleList.forEach((ruleInfo, ruleIndex) => {
            this.ruleTargetChange(ruleIndex, ruleInfo, true, optionData);
          })
        },

        // 编辑筛选条件
        editRuleParam(rowIndex, rowInfo) {
          if (!rowInfo.ruleTarget) {
            this.$msg.warning("请先选择对象");
            return false;
          }
          this.filterConfDialog = true;
          this.editRowIndex = rowIndex;
              let filterConfObj = JSON.parse(rowInfo.ruleParam) || [];
              const targetObj = this.$lodash.find(this.funArr, {fnKey: rowInfo.ruleParamKey});
                this.filterConfFormData = targetObj.fnArgsModelFields;
                this.filterConfFormData.forEach((filterItem, index) => {
                    if(filterItem.fieldValue){
                        filterItem.fieldValue = filterConfObj[index]&&filterConfObj[index].fieldValue ? filterConfObj[index].fieldValue : '';
                    }else{
                        const fieldValue = filterConfObj[index] ? filterConfObj[index].fieldValue : '';
                        this.$set(filterItem, 'fieldValue', fieldValue);
                    }
                });
            },

            // 切换对象拉下选择
            ruleTargetChange(rowIndex, rowInfo, ifInit, optionData) {
                rowInfo.ruleKey = !ifInit ? '' : rowInfo.ruleKey;
                rowInfo.ruleValueOp = this.ruleValueMap[rowInfo.ruleType];
                let targetObj = {};
                if(rowInfo.ruleType === 'fn'){
                  targetObj = this.$lodash.find(this.funArr, {fnKey: rowInfo.ruleParamKey});
                  rowInfo.ruleTargetType = targetObj.fnType;
                  rowInfo.ruleTarget = targetObj.fnId;
                    if(!targetObj.fnReturnModelFields){
                        rowInfo.ruleKeyOp = [];
                    }else{
                        rowInfo.ruleKeyOp = targetObj.fnReturnModelFields;
                    }
                    if(!targetObj.fnArgsModelFields || targetObj.fnArgsModelFields.length === 0){
                        rowInfo.ruleParam = '无筛选条件';
                    }else{
                        rowInfo.ruleParam = !ifInit ? "\"\"" : rowInfo.ruleParam;
                    }

                    if(targetObj.fnType === 'sql'){
                        rowInfo.bizParamDb = targetObj.bizParamDb;
                        rowInfo.bizParamSql = targetObj.bizParamSql;
                    }
                }
                if(rowInfo.ruleType === 'event') {
                  targetObj = this.$lodash.find(this.eventArr, {eventKey: rowInfo.ruleParamKey});
                  rowInfo.targetObj = targetObj;
                  rowInfo.ruleTarget = targetObj.eventId;
                  rowInfo.ruleKey = targetObj.fnReturnModelField.fieldName;
                  rowInfo.fieldKey = targetObj.fnReturnModelField.fieldKey;
                  rowInfo.ruleSignLabel = '大于';
                  rowInfo.ruleValueOp = '0';
                }
                if(rowInfo.ruleType === 'object') {
                    if(optionData){
                      targetObj = this.$lodash.find(optionData.object, {modelTypeKey: rowInfo.ruleParamKey});
                    }else{
                      targetObj = this.$lodash.find(this.ruleTargetOp.object, {modelTypeKey: rowInfo.ruleParamKey});
                    }
                  rowInfo.ruleTarget = targetObj.modelTypeId;
                    if(targetObj.fnType){
                        rowInfo.ruleTargetType = targetObj.fnType;
                    }
                    if(!targetObj.reModelField){
                        rowInfo.ruleKeyOp = [];
                    }else{
                        rowInfo.ruleKeyOp = targetObj.reModelField;
                    }
                }

            },

            // 保存筛选条件
            savefilterConf(){
                let validate = true;
                this.filterConfFormData.forEach(function (rowInfo) {
                    if(rowInfo.mustFill === '1' && !rowInfo.fieldValue){
                        validate = false;
                    }
                });
                if(validate){
                    this.filterConfCheck = false;
                    this.ruleTableData.ruleList[this.editRowIndex].ruleParam = JSON.stringify(this.filterConfFormData);
                    this.filterConfDialog = false;
                }else{
                    this.filterConfCheck = true;
                    this.$msg.warning("请补充完整必填项!");
                }
            },

            // 删除行
            deleteRuleRow(rowIndex){
                this.ruleTableData.ruleList.splice(rowIndex, 1);
            },

            // 表格必填校验
            validator(filedArr){
                let validate = true;
                let ruleList = this.ruleTableData.ruleList;
                this.mustFillField = filedArr;
                for(let i=0; i<ruleList.length; i++){
                    if(!validate) break;
                    for(let j=0; j<filedArr.length; j++){
                        if(!ruleList[i][filedArr[j]]){
                            validate = false;
                            break;
                        }
                    }
                }
                this.ruleTableCheck = !validate;
                return validate;
            },

            // 数据格式整理
            jsonFormatter(){
                const ruleList = this.ruleTableData.ruleList;
                let rules = {};
                ruleList.forEach( ruleItem => {
                    const args = {};
                    if(ruleItem.ruleType === 'step'){
                        args.stepCode = ruleItem.ruleTarget;
                    }else if(ruleItem.ruleParam !== '无筛选条件' && JSON.parse(ruleItem.ruleParam)) {
                        JSON.parse(ruleItem.ruleParam).forEach(paramObj=>{
                            args[paramObj.fieldKey] = paramObj.fieldValue;
                        });
                    }

                    if(ruleItem.ruleType === 'event'){
                        const targetObj = ruleItem.targetObj;
                        args.dsId = targetObj.funDef.bizParamDb;
                        args.sql = targetObj.funDef.bizParamSql;
                        args.eventId = ruleItem.ruleTarget;
                    }

                    if(ruleItem.ruleType === 'fn'){
                        args.fnId = ruleItem.ruleTarget;
                        if(ruleItem.ruleTargetType === 'sql'){
                            args.dsId = ruleItem.bizParamDb;
                            args.sql = ruleItem.bizParamSql;
                        }
                    }

                    let ruleObj = {};
                    if(ruleItem.ruleType === 'step'){
                        ruleObj = {
                            context: {
                                args,
                                target: 'step',
                                type: 'fn'
                            },
                            expr: "eq(status, \"8\")"
                        }
                    }else if(ruleItem.ruleType === 'event'){
                        ruleObj = {
                            context: {
                                args,
                                target: 'sql',
                                type: 'fn'
                            },
                            expr: "gt("+ruleItem.fieldKey+", \"0\")"
                        }
                    }else{
                        ruleObj = {
                            context: {
                                args,
                                target: ruleItem.ruleTargetType,
                                type: ruleItem.ruleType
                            },
                            expr: `${ruleItem.ruleSign}(${ruleItem.ruleKey}, "${ruleItem.ruleValue}")`
                        }
                    }
                    rules[ruleItem.ruleTag] = ruleObj;
                });
                return {
                    expr: this.ruleTableData.judgeScript,
                    rules
                }
            }

        },
    }
</script>
