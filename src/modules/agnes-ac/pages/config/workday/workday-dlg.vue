<template>
    <div>
        <el-form class="fit-box" :disabled="mode==='view'" :model="form" ref="form" :rules="rules" label-width="85px"
                 style="padding: 10px;">
            <el-form-item label="区域" prop="workdayAreaCode" 
             >
                <!-- <gf-dict v-model="form.workdayAreaCode" multiple dict-type="AC_AREA"/> -->
                <el-select v-model="form.workdayAreaCode" 
                multiple
                v-bind:disabled="this.mode==='edit'"
                placeholder="请选择">
                    <el-option
                    v-for="item in areaList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-show="this.mode==='add'" label="日期" prop="bizDates">
                <el-date-picker
                v-model="form.bizDates"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item  v-show="this.mode==='edit'" label="日期" prop="bizDate">
                <el-date-picker
                    v-model="form.bizDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
        </el-form>
        <dialog-footer :ok-button="mode !== 'view'" :on-save="onSave" ok-button-title="确定"></dialog-footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    workdayAreaCode: [],
                    bizDates: '',
                    bizDate:'',
                },
                areaList:[],
                rules: {
                    workdayArea: [{required: true, message: "请输入区域"}],
                    // bizDate: [{required: true, message: "请输入日期"}]
                },
            };
        },
        props: {
            mode: {
                type: String,
                default: 'add'
            },
            row: Object,
            actionOk: Function
        },
        mounted() {
            if(this.mode==='edit'){
                const arr=new Array();
                arr[0]=this.row.workdayAreaCode;
                this.row.workdayAreaCode=arr;
                Object.assign(this.form, this.row);
            }
            let dictTypeId="AC_AREA";
            this.areaList=this.$app.dict.getDictItems(dictTypeId);
        },
        methods: {
            async onSave() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                 try {
                    const p = this.$api.workdayConfigApi.saveWorkday(this.form);
                    await this.$app.blockingApp(p);

                    if (this.actionOk) {
                        await this.actionOk(this.form, this.row);
                    }
                    this.$msg.success('保存成功');
                    this.$dialog.close(this);
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
        
        }
    }
</script>
