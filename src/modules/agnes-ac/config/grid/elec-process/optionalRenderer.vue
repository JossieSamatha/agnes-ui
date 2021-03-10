<template>
    <div class="optional-cell" v-if="params.data">
        <el-popover ref="popover"
                    placement="top-start"
                    title="手工确认"
                    width="600"
                    trigger="manual"
                    v-model="popoverVisible"
        >
            <el-form ref="form" :model="form"
                     label-width="80px">
                <el-form-item label="回填参数" v-show="form.paramList.length>0">
                    <div class="rule-table">
                        <el-table header-row-class-name="rule-header-row"
                                  header-cell-class-name="rule-header-cell"
                                  row-class-name="rule-row"
                                  cell-class-name="rule-cell"
                                  :data="form.paramList"
                                  border stripe
                                  style="width: 100%">
                            <el-table-column prop="stepCode" label="参数名">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.paramName" disabled/>
                                </template>
                            </el-table-column>
                            <el-table-column prop="stepCode" label="参数值">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.paramString" v-if="scope.row.paramType=='string'"/>
                                    <el-input v-model="scope.row.paramNumber" oninput="value=value.replace(/[^\d]/g,'')"
                                              maxLength='9' placeholder="请输入数字" v-if="scope.row.paramType=='number'"/>
                                    <el-input v-model.number="scope.row.paramAmount" placeholder="请输入金额" v-if="scope.row.paramType=='amount'"/>
                                    <el-date-picker
                                        v-model="scope.row.paramDate"
                                        type="date"
                                        placeholder="选择日期" v-if="scope.row.paramType=='date'">
                                </el-date-picker>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" :rows="1" placeholder="请输入备注内容"
                              v-model="form.remark">
                    </el-input>
                </el-form-item>
            </el-form>

            <div style="text-align: right; margin-top: 10px">
                <el-button class="op-btn" size="mini" type="text" @click="popoverVisible = false">取消</el-button>
                <el-button class="op-btn primary" size="mini" @click="confirmRemark">保存</el-button>
            </div>
        </el-popover>
        <el-button size="mini" type="text"
                   v-popover:popover v-if="actionShow"
                   @click="popoverClick('actionConfirm')"
                   title="手工确认"
                   :disabled="isDisabled"
        >
            <span class="svgSpan" v-html="svgImg.actionConfirm"></span>
        </el-button>
        <el-button size="mini" type="text"
                   v-popover:popover
                   v-if="autoSetShow"
                   @click="popoverClick('forcePass')"
                   title="干预通过"
                   :disabled="isDisabled"
        >
            <span class="svgSpan" v-html="svgImg.forcePass"></span>
        </el-button>
        <el-button size="mini" type="text"
                   v-popover:popover
                   v-if="indexSetShow"
                   @click="popoverClick('forcePass')"
                   title="干预通过"
                   :disabled="isDisabled"
        >
            <span class="svgSpan" v-html="svgImg.forcePass"></span>
        </el-button>
        <el-button size="mini" type="text"
                   v-if="indexSetShow"
                   @click="reExecute('reExecute')"
                   title="重新执行"
                   :disabled="isDisabled"
        >
            <span class="svgSpan" v-html="svgImg.reExecute"></span>
        </el-button>
        <el-button v-if="indexSetShow" class="detail-btn" size="mini" type="text" icon="fa fa-eye"
                   @click="indexDetail('showIndexDetail')"
                   title="查看明细"
                   :disabled="isKpiDisabled"
        >
        </el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form:{
                    paramList:[],
                    remark:'',
                },
                remark: '',
                popoverVisible: false,
                actionType: '',
                svgImg: this.$lcImg,
            }
        },
        beforeMount() {
            if (this.params.data) {
                this.remark = this.params.data.remark;
            }
        },
        computed: {
            actionShow() {
                return this.params.data.stepActType === '6';
            },
            indexSetShow() {
                return this.params.data.stepActType === '1';
            },
            autoSetShow() {
                return this.params.data.stepActType === '7';
            },
            isDisabled() {
                return !this.params.data.buttonStatus;
            },
            isKpiDisabled() {
                return this.params.data.stepStatus === '01';
            }
        },
        methods: {
            async popoverClick(actionType) {
                this.form.paramList=[];
                const p = this.$api.taskTodoApi.selectRollBackTaskParams({stepExecId:this.params.data.stepExecId})
                const resp = await this.$app.blockingApp(p);
                this.form.paramList=resp.data;
                this.form.remark = this.params.data.remark;
                this.popoverVisible = true;
                this.actionType = actionType;
            },

            async reExecute(actionType) {
                this.actionType = actionType;
                const ok = await this.$msg.ask(`是否确认重新执行`);
                if (ok) {
                    this.handleCmd(this.actionType);
                }
            },

            indexDetail(actionType){
                this.handleCmd(actionType);
            },

            // 备注确定 -- 保存
            confirmRemark() {
                this.popoverVisible = false;
                this.params.data.remark = this.form.remark;
                this.params.data.paramList = this.form.paramList;
                this.params.api.refreshCells(this.params.node)
                this.handleCmd(this.actionType);
            },

            handleCmd(actionType) {
                this.params.api.execCmd(actionType, this.params);
            }
        }
    }
</script>


<style scoped>
    .optional-cell {
        line-height: 1;
    }

    .optional-cell .svgSpan {
        display: inline-block;
        width: 16px;
        height: 16px;
        cursor: pointer;
    }

    .optional-cell .svgSpan >>> svg {
        width: 100%;
        height: 100%;
    }

    .optional-cell > span + span {
        margin-left: 10px;
    }

    .optional-cell .svgSpan > svg {
        width: 100%;
        height: 100%;
    }

    .op-btn {
        height: 25px;
        padding: 5px 19px;
        border-color: #E1E4E8;
        color: #333;
        background: transparent;
        font-size: 14px;
    }

    .op-btn.primary {
        color: #fff;
        background: #0f5eff;
        border-color: #0f5eff;
    }

    .detail-btn {
        padding: 0;
    }

    .detail-btn>>>.fa.fa-eye{
        font-size: 15px;
        vertical-align: text-bottom;
        color: #0f5eff;
        line-height: 17px;
    }

    .detail-btn.is-disabled>>>.fa.fa-eye {
        color: #ccc;
    }
</style>
