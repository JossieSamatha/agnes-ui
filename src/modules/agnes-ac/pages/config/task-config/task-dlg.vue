<template>
    <div>
        <el-scrollbar style="height:400px">
        <el-form :model="form" :disabled="mode==='view'" ref="form" :rules="rules" label-width="85px"
                 style="padding: 10px">
            <el-form-item label="执行方式" prop="exeType" ref="exeType">
                <gf-dict-radio-group @change="exeTypeChange"  dict-type="AC_EXE_TYPE" name="exeType" v-model="form.exeType"/>
            </el-form-item>
            <el-form-item label="执行时间" prop="exeTime" ref="exeTime" style="display:none;">
                <!-- <gf-date-picker type="date" v-model="form.startTime"/> -->
                <el-date-picker
                v-model="form.exeTime"
                type="datetime"
                placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="任务名称" prop="taskName">
                <gf-input type="text" v-model="form.taskName"/>
            </el-form-item>
            <el-form-item label="业务场景" prop="bizType">
                <gf-dict-select dict-type="AC_BIZ_TYPE" v-model="form.bizType"/>
            </el-form-item>
            <el-form-item label="业务标签" prop="bizTag">
                <gf-dict dict-type="AC_BIZ_TAG" v-model="form.bizTag"/>
            </el-form-item>
            <el-form-item >
                <el-checkbox @change="checkboxChange" v-model="checked">根据业务参数批量生成任务</el-checkbox>
            </el-form-item>
            <el-form-item label="关联产品" prop="bizParam" ref="bizParam" style="display:none;">
                <!-- <gf-combobox v-model="form.bizParam"/> -->
            </el-form-item>
            <el-form-item label="任务模板" prop="caseId">
                <el-row>
                    <!-- <el-col :span="20"><gf-combobox v-model="form.caseId"/></el-col> -->
                    <el-col :span="2"><el-button type="text"  @click="showCase">查看 </el-button></el-col>
                    <el-col :span="2"><el-button type="text"  @click="addCase">新增 </el-button></el-col>
                </el-row>
            </el-form-item>
            <div ref="caseParam" style="display:none;">
            <el-form-item label="待办日期" prop="todoDate">
                <!-- <gf-date-picker type="date" v-model="form.todoDate"/> -->
            </el-form-item>
            <el-form-item label="待办事项" prop="todoName">
                <gf-input type="text" v-model="form.todoName"/>
            </el-form-item>
            <el-form-item label="代办人" prop="todoUser">
                <!-- <gf-combobox v-model="form.todoUser"/> -->
            </el-form-item>
            <el-form-item label="任务说明" prop="taskDesc">
                <!-- <gf-textarea  v-model="form.taskDesc"/> -->
                <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="form.taskDesc">
                </el-input>
            </el-form-item>
            </div>
        </el-form>
        </el-scrollbar>
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
                exeType:"",
                exeTime:"",
                taskId:"",
                taskName:"",
                bizType:"",
                bizTag:"",
                bizParam:"",
                caseId:"",
                todoDate:"",
                todoName:"",
                todoUser:"",
                taskDesc:""
            },
            checked:false,
            rules: {
                'taskName': [{required: true, message: "请输入任务名称！"}],
            },
        }
    },
    beforeMount() {
        Object.assign(this.form, this.row);
        
    },
    mounted(){
        if(this.mode==="edit"){
            this.$refs.exeType.$el.style.cssText='display:none';
            this.$refs.exeTime.$el.style.cssText='display:display';
        }
    },
    methods:{
        
        async save() {
            const ok = await this.$refs['form'].validate();
            if (!ok) {
                return;
            }

            try {
                const p = this.$api.taskConfigApi.saveTask(this.form);
                await this.$app.blockingApp(p);

                // if (this.actionOk) {
                //     await this.actionOk(this.form, this.row);
                // }
                this.$msg.success('保存成功');
                this.$dialog.close(this);
            } catch (reason) {
                this.$msg.error(reason);
            }
        },
        exeTypeChange(value){
            if(value==="01"){
                this.$refs.exeTime.$el.style.cssText='display:none';
            }else{
               this.$refs.exeTime.$el.style.cssText='display:display';
            }
        },
        checkboxChange(value){
            if(value){
                this.$refs.bizParam.$el.style.cssText='display:display';
            }else{
                this.$refs.bizParam.$el.style.cssText='display:none';
            }
        },
        caseChange(value){
            if(value==null){
                this.$refs.caseParam.$el.style.cssText='display:display';
            }else{
                 this.$refs.caseParam.$el.style.cssText='display:none';
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
        showCase(){
            this.showDlg('view', {}, this.onAddCase.bind(this));
        },
        addCase(){
            this.showDlg('add', {}, this.onAddCase.bind(this));
        },
        async onAddCase() {
            this.reloadData();
        },
        async onShowCase() {
            this.reloadData();
        },
    }

}




</script>

<style scoped>

</style>
