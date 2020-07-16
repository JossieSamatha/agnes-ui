<template>
    <div>
        <!-- <el-scrollbar style="height:500px"> -->
        <el-form :model="form" :disabled="mode==='view'" ref="form" :rules="rules" label-width="85px"
                 style="padding: 10px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="执行方式" prop="exeType" ref="exeType" v-show="this.mode==='add'">
                        <gf-dict-radio-group dict-type="AC_EXE_TYPE" name="exeType" v-model="form.exeType"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="执行时间" prop="exeTime" ref="exeTime"
                                  v-show="form.exeType==='02'||this.mode==='edit'">
                        <el-date-picker
                                v-model="form.exeTime"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="任务名称" prop="taskId">
                        <el-select v-model="form.taskId"
                        @change="taskChange($event)"
                        style="width:100%;"
                        allow-create
                        filterable
                        placeholder="请选择">
                        <el-option
                                v-for="item in taskOptions"
                                :key="item.taskId"
                                :label="item.taskName"
                                :value="item.taskId+''">
                        </el-option>
                    </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="业务场景" prop="bizType">
                        <gf-dict-select dict-type="AC_BIZ_TYPE" v-model="form.bizType"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="业务标签" prop="bizTag">
                        <!-- <gf-dict dict-type="AC_BIZ_TAG" multiple v-model="form.bizTag"/> -->
                        <el-select v-model="form.bizTag"
                                multiple
                                placeholder="请选择">
                            <el-option
                                    v-for="item in bizTagOptions"
                                    :key="item.dictId"
                                    :label="item.dictName"
                                    :value="item.dictId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item>
                        <el-checkbox v-model="checked">根据业务参数批量生成任务</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="关联产品" prop="bizParam" ref="bizParam" v-show="checked">
                        <el-select v-model="form.bizParam"
                                allow-create
                                filterable
                                placeholder="请选择">
                            <el-option
                                    v-for="item in bizParamOptions"
                                    :key="item.fnId"
                                    :label="item.fnName"
                                    :value="item.fnId+''">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        <el-row>
            <el-col :span="24">
                <el-form-item label="任务模板" prop="caseId">
                    <el-row>
                        <el-col :span="20">
                            <el-select v-model="form.caseId"
                                style="width:100%"
                                allow-create
                                filterable
                                placeholder="请选择">
                                <el-option
                                    v-for="item in caseOptions"
                                    :key="item.taskId"
                                    :label="item.taskName"
                                    :value="item.taskId+''">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="2">
                            <div><el-button type="text" @click="showCase">查看</el-button></div>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="text" @click="addCase">新增</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-col>
        </el-row>
        <div v-show="form.caseId==='0'">
        <el-row>
            <el-col :span="12">
                <el-form-item label="待办日期" prop="todoDate">
                    <el-date-picker
                            v-model="form.todoDate"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="代办人" prop="todoUser">
                    <el-select v-model="form.todoUser"
                            style="width:100%"
                            allow-create
                            filterable
                            placeholder="请选择">
                        <el-option
                                v-for="item in userOptions"
                                :key="item.userId"
                                :label="item.userName"
                                :value="item.userId+''">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-form-item label="待办事项" prop="todoName">
                    <gf-input type="text" v-model="form.todoName"/>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-form-item label="任务说明" prop="taskDesc">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="form.taskDesc">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        </div>
        </el-form>
        <!-- </el-scrollbar> -->
        <dialog-footer :on-save="save"></dialog-footer>
    </div>
</template>

<script>
import CaseDlg from "../model-def/index";

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

        return {
            form: {
                exeType: "",
                exeTime: "",
                taskId: "",
                taskName: "",
                bizType: "",
                bizTag: "",
                bizParam: "",
                caseId: "",
                todoDate: "",
                todoName: "",
                todoUser: "",
                taskDesc: ""
            },
            checked: false,
            taskOptions: [],
            caseOptions: [],
            bizParamOptions: [],
            userOptions: [],
            bizTagOptions: [],
            rules: {
                taskId: [{required: true, message: "请输入任务名称！"}],
            },
        }
    },
    beforeMount() {
        const p = this.listOptions();
        this.$app.blockingApp(p);
    },
    mounted() {
        let dictTypeId = "AC_BIZ_TAG";
        this.bizTagOptions = this.$app.dict.getDictItems(dictTypeId);
        if (this.mode === "edit" && typeof (this.row.bizTag) === 'string') {
            var arr = JSON.parse(this.row.bizTag);
            this.row.bizTag = arr;
        }
        Object.assign(this.form, this.row);
    },
    methods: {
        //获取下拉框所需要的数据
        async listOptions(){
            try {
                const resp = await this.$api.taskConfigApi.listOptions();
                const options = resp.data;
                this.taskOptions = options.task;
                this.caseOptions = options.case;
                // let map = {"taskName":"临时任务","taskId":"0"}
                // this.caseOptions.push(map);
                this.bizParamOptions = options.param;
                this.userOptions = options.user;
            } catch (reason) {
                this.$msg.error(reason);
            }
        },
        async save() {
            const ok = await this.$refs['form'].validate();
            if (!ok) {
                return;
            }
            try {
                const p = this.$api.taskConfigApi.saveTask(this.form);
                await this.$app.blockingApp(p);
                this.$msg.success('保存成功');
                this.$dialog.close(this);
            } catch (reason) {
                this.$msg.error(reason);
            }
        },
        showDlg(mode, row, actionOk) {
            if (mode !== 'add' && !row) {
                this.$msg.warning("请选中一条记录!");
                return;
            }
            this.$nav.showDialog(
                CaseDlg,
                {
                    args: {row, mode, actionOk},
                    width: '50%',
                    title: this.$dialog.formatTitle('Case', mode),
                });
        },
        showCase() {
            this.showDlg('view', {}, this.onAddCase.bind(this));
        },
        addCase() {
            this.showDlg('add', {}, this.onAddCase.bind(this));
        },
        async onAddCase() {
            this.reloadData();
        },
        async onShowCase() {
            this.reloadData();
        },
        taskChange(e) {
            let obj = this.taskOptions.find((item) => {
                return item.taskId === e;
            })
            if (obj === undefined) {
                this.form.taskName = e;

            } else {
                this.form.taskName = obj.taskName;
            }


        }
    }

}
</script>

<style scoped>

</style>
