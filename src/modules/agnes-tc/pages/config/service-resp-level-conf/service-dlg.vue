<template>
    <div>
        <!-- <el-scrollbar style="height:500px"> -->
        <el-form :model="form" :disabled="mode==='view'" ref="form" :rules="rules" label-width="120px"
                 style="padding: 10px">
            <el-form-item label="服务响应等级" prop="serviceResponseName" >
                <gf-input v-model="form.serviceResponseName"/>
            </el-form-item>
            <el-form-item label="重复时间间隔" prop="repeatMinutes" >
                <el-input-number :min="1" :step="1" :precision="0" size="small" v-model="form.repeatMinutes"/>
                <gf-dict-select dict-type="AGNES_TIME_TYPE" v-model="timeType" style="width: 100px"/>
            </el-form-item>
            <el-form-item label="紧急度提升" prop="degreeScore" >
                <el-input-number :min="1" :step="1" :precision="0" size="small" v-model="form.degreeScore"/>
            </el-form-item>
            <el-form-item label="最大重复次数" prop="maxRepeatCount" >
                <el-input-number :min="1" :step="1" :precision="0" size="small"  v-model="form.maxRepeatCount"/>
            </el-form-item>
        </el-form>
        <!-- </el-scrollbar> -->
        <dialog-footer :on-save="save"></dialog-footer>
    </div>
</template>

<script>
import lodash from 'lodash';
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
        var checkName = async (rule, value, callback) => {
            const resp = await this.$api.ServiceConfApi.getService(this.form);
            if (resp.data != null) {
                callback(new Error('服务响应等级已存在！'));
            }
        };
        return {
            form:{
                serviceResponseName:'',
                repeatMinutes: 1,
                degreeScore: 1,
                maxRepeatCount: 1,
            },
            timeType: '1',
            rules: {
                serviceResponseName: [
                    { required: true, message: '请输入服务响应等级', trigger: 'blur' },
                    { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' },
                    { validator: checkName, trigger: 'blur' }
                ],
            },
        }
    },

    mounted() {
        if (this.mode === "edit" ) {
            let minutes=this.row.repeatMinutes;
            const temp=lodash.cloneDeep(this.row);
            if(minutes%60===0){
                temp.repeatMinutes=temp.repeatMinutes/60;
                this.timeType='2';
            }
            Object.assign(this.form, temp);
        }
    },
    methods: {
        async save() {
            const ok = await this.$refs['form'].validate();
            if (!ok) {
                return;
            }
            if(this.timeType==='2'){
                this.form.repeatMinutes=this.form.repeatMinutes*60;
            }

            try {
                const p = this.$api.ServiceConfApi.saveService(this.form);
                await this.$app.blockingApp(p);
                this.$msg.success('保存成功');
                this.$dialog.close(this);
                if (this.actionOk) {
                    await this.actionOk(this.form, this.row);
                }
            } catch (reason) {
                this.$msg.error(reason);
            }
        },
    }

}
</script>

<style scoped>

</style>
