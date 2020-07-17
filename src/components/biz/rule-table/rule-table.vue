<template>
    <div class="rule-table">
        <el-table header-row-class-name="rule-header-row"
                  header-cell-class-name="rule-header-cell"
                  row-class-name="rule-row"
                  cell-class-name="rule-cell"
                  :class="ruleTableCheck?'validate':''"
                  :data="ruleTableData.tableData"
                  :max-height="tableMaxHeight"
                  border stripe
                  style="width: 100%"
                  :style="{'min-height': tableHeight+'px'}">
            <el-table-column prop="ruleTag" label="标签" width="52" align="center"></el-table-column>
            <el-table-column prop="ruletarget" label="对象">
                <template slot-scope="scope">
                    <el-select :class="mustFill('ruleTarget') && !scope.row.ruleTarget ? 'error':''"
                                v-model="scope.row.ruleTarget"
                                placeholder="请选择"
                                @change="ruleTargetChange(scope.$index, scope.row)">
                        <el-option v-for="funItem in funArr" :key="funItem.fnCode" :label="funItem.fnName" :value="funItem.fnCode">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="ruleParam" label="筛选条件">
                <template slot-scope="scope">
                    <div class="filter-conf" :class="mustFill('ruleParam') && !jsonNull(scope.row.ruleParam) ? 'error':''">
                        <span class="nowrap-span" :title="scope.row.ruleParam">{{jsonNull(scope.row.ruleParam)}}</span>
                        <i class="edit-btn fa fa-edit" @click="editRuleParam(scope.$index, scope.row)"></i>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="ruleKey" label="匹配字段">
                <template slot-scope="scope">
                    <el-select :class="mustFill('ruleKey') && !scope.row.ruleKey ? 'error':''"
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
                    <el-select :class="mustFill('ruleSign') && !scope.row.ruleSign ? 'error':''"
                               v-model="scope.row.ruleSign">
                        <el-option v-for="ruleSignItem in ruleSignOp" :key="ruleSignItem.id"
                                :label="ruleSignItem.label" :value="ruleSignItem.id">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="ruleValue" label="匹配值">
                <template slot-scope="scope">
                    <el-input  :class="mustFill('ruleValue') && !scope.row.ruleValue ? 'error':''"
                               v-model="scope.row.ruleValue"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="option" label="操作" width="52" align="center">
                <template slot-scope="scope">
                    <span class="option-span" @click="deleteRuleRow(scope.$index)">删除</span>
                </template>
            </el-table-column>
        </el-table>
        <el-button class="rule-add-btn" size="small" @click="addRule">新增条件</el-button>
        <div class="rule-edit-area">
            <p>规则编辑：默认组合匹配条件，如：</p>
            <el-input
                    type="textarea"
                    :rows="1"
                    placeholder="A AND B AND C"
                    v-model="ruleTableData.judgeScript">
            </el-input>
            <p>规则配置：支持逻辑的自定义编辑，可以使用的组合表达式为：AND/OR 无大小写区分，可以整体取逻辑非的操作。</p>
        </div>
        <el-dialog title="筛选条件配置" :visible.sync="filterConfDialog">
            <el-table header-row-class-name="rule-header-row"
                      header-cell-class-name="rule-header-cell"
                      row-class-name="rule-row"
                      cell-class-name="rule-cell"
                      border stripe
                      :class="filterConfCheck?'validate':''"
                      style="width: calc(100% - 40px); margin: 20px auto"
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
    import fakeData from './rule-table-data'
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
            ruleTableData: {
                type: Object,
                require: true,
                default: function () {
                    return {
                        tableData: [],
                        judgeScript: ''
                    }
                }
            },
        },
        data() {
            return {
                funArr: fakeData.funArr,   // 对象数组
                labelOrder: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                mustFillField: [],
                ruleTableCheck: false,
                filterConfDialog: false,
                editRowIndex: -1,
                filterConfFormData: [],
                filterConfCheck: false,
                ruleSignOp: [
                    { id: '1', label: '包含'},
                    { id: '2', label: '不包含'},
                    { id: '3', label: '等于'},
                    { id: '4', label: '不等于'},
                    { id: '5', label: '大于'},
                    { id: '6', label: '小于'},
                    { id: '7', label: '大于等于'},
                    { id: '8', label: '小于等于'},
                ],
                // 筛选条件字段
                filterConfArr: fakeData.filterConfArr,
            }
        },
        methods: {
            // ruleTag计数规则
            getRuleTag(){
                if(!this.ruleTableData.tableData || this.ruleTableData.tableData.length == 0){
                    this.$set(this.ruleTableData, 'tableData', []);
                    return 'A';
                }
                let tableData = this.ruleTableData.tableData;
                let lastLabel = tableData[tableData.length-1].ruleTag;
                let lastLetter = lastLabel.substr(lastLabel.length-1,1);
                let labelIndex = this.labelOrder.indexOf(lastLetter)+1;
                if(labelIndex>=26){
                    lastLabel = lastLabel.substring(0,lastLabel.length-1) + 'AA';
                }else{
                    lastLabel = lastLabel.substring(0,lastLabel.length-1) + this.labelOrder[labelIndex];
                }
                return lastLabel;
            },

            // json非空判断
            jsonNull(jsonStr){
                return !JSON.parse(jsonStr)? '': jsonStr
            },

            // json非空判断
            mustFill(fieldStr){
                return this.mustFillField.indexOf(fieldStr) !== -1;
            },

            // 新增规则行
            addRule(){
                const newRuleObj = {
                    ruleTag: this.getRuleTag(),
                    ruleTarget: '',
                    ruleParam: JSON.stringify(""),
                    ruleKey: '',
                    ruleSign: '',
                    ruleValue: '',
                };
                this.ruleTableData.tableData.push(newRuleObj);
            },

            // 编辑筛选条件
            editRuleParam(rowIndex, rowInfo){
                if(!rowInfo.ruleTarget){
                    this.$msg.warning("请先选择对象");
                    return false;
                }
                this.filterConfDialog = true;
                this.editRowIndex = rowIndex;
                let filterConfObj = JSON.parse(rowInfo.ruleParam);
                this.filterConfFormData = this.getFilterObj(rowInfo.ruleTarget);
                this.filterConfFormData.forEach(function (filterItem, index) {
                    if(filterItem.fieldValue){
                        filterItem.fieldValue = filterConfObj[index]&&filterConfObj[index].fieldValue ? filterConfObj[index].fieldValue : '';
                    }
                });
            },

            // 切换对象拉下选择
            ruleTargetChange(rowIndex, rowInfo) {
                rowInfo.ruleKey = '';
                this.filterConfArr.forEach((filterItem) => {
                    if(filterItem.fieldId === rowInfo.ruleTarget){
                        rowInfo.ruleKeyOp = this.$utils.deepExtend(filterItem.modelFieldArr);
                    }
                });
            },

            // 获取过滤对象
            getFilterObj(fnCode) {
                let getFilterObj = {};
                this.filterConfArr.forEach((filterItem) => {
                     if(filterItem.fieldId === fnCode){
                         getFilterObj = this.$utils.deepExtend(filterItem.modelFieldArr);
                     }
                });
                return getFilterObj;
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
                    this.ruleTableData.tableData[this.editRowIndex].ruleParam = JSON.stringify(this.filterConfFormData);
                    this.filterConfDialog = false;
                }else{
                    this.filterConfCheck = true;
                    this.$msg.warning("请补充完整必填项!");
                }
            },

            // 删除行
            deleteRuleRow(rowIndex){
                this.ruleTableData.tableData.splice(rowIndex, 1);
            },

            // 表格必填校验
            validator(filedArr){
                let validate = true;
                let tableData = this.ruleTableData.tableData;
                this.mustFillField = filedArr;
                for(let i=0; i<tableData.length; i++){
                    if(!validate) break;
                    for(let j=0; j<filedArr.length; j++){
                        if(!tableData[i][filedArr[j]]){
                            validate = false;
                            break;
                        }
                    }
                }
                this.ruleTableCheck = !validate;
                return validate;
            }

        },
    }
</script>
