<template>
    <div class="cron-modal">
        <em class="question el-icon-question" title="操作文档" @click="openHelpFile"></em>
        <gf-cron class="gf-cron-tab"
                 ref="innerVueCron"
                 :cornObj="cron"
                 :showType="showType"
                 :extLabel="extLabel"
                 @change="onSave"
                 @close="onCancel">
            <el-tab-pane slot="extSetting" v-if="showType.includes('extSetting')">
                <span slot="label">
                    <em class="el-icon-setting"></em>
                    <span class="requireStar" style="position: relative">
                        <span style="position: absolute;color: #f5222e;left: 0;top: -13px">*</span>
                        其他配置
                    </span>
                </span>
                <div class="tabBody extSetting">
                    <el-row>
                        <span>基准日期</span>
                        <el-radio-group v-model="baseDate">
                            <el-radio label="00">系统当前业务日期</el-radio>
                            <el-radio label="01">系统当前工作日期</el-radio>
                        </el-radio-group>
                    </el-row>
                    <el-row>
                        <span>日期类型</span>
                        <el-radio-group v-model="dateType" @change="dateTypeChange">
                            <el-radio label="00">自然日</el-radio>
                            <el-radio label="01">工作日</el-radio>
                        </el-radio-group>
                    </el-row>
                    <el-row v-show="dateType == '01'">
                        <span>节假日顺延</span>
                        <el-radio-group v-model="holidayDelay">
                            <el-radio label="00">前一工作日</el-radio>
                            <el-radio label="01">下一工作日</el-radio>
                            <el-radio label="02">不顺延</el-radio>
                        </el-radio-group>
                    </el-row>
                </div>
            </el-tab-pane>
        </gf-cron>
    </div>
</template>

<script>
    import readMeStr from "./readMeStr";
    export default {
        name: "GfCronModal",
        props: {
            showType: {
                type: String,
                default: 'second,minute,hour,day,month,extSetting'
            },
            cornObj: {type: String},
            action: Function
        },
        data() {
            return {
                helpNotify: null,
                cron: this.cornObj,
                baseDate: '00',
                dateType: '00',
                holidayDelay: '02'
            }
        },
        created(){
            const result = this.cornObj.split("#");
            if(result.length === 1){
                this.cron = result[0];
            }else{
                this.baseDate = result[0];
                this.dateType = result[1];
                this.holidayDelay = result[2];
                this.cron = result[3];
            }
        },
        computed: {
            extLabel(){
                return `${this.baseDate}#${this.dateType}#${this.holidayDelay}#`
            }
        },
        methods: {
            async onSave (cronValue) {
                const result = `${this.baseDate}#${this.dateType}#${this.holidayDelay}#${cronValue}`;
                this.action(result);
                this.$dialog.close(this, 'ok');
            },
            onCancel () {
                this.$dialog.close(this, 'cancel');
            },
            // 时间类型切换
            dateTypeChange(val){
                if(val === '00'){
                    this.holidayDelay = '02';
                }
            },
            // 打开帮助文档
            openHelpFile(){
                if(this.helpNotify && this.helpNotify.close){
                    this.helpNotify.close();
                }
                this.helpNotify = this.$notify({
                    width: 400,
                    title: 'Cron时间频率组件操作文档',
                    customClass: 'cronHelpNotify',
                    dangerouslyUseHTMLString: true,
                    duration: 0,
                    message: readMeStr(),
                });
            }
        },
    }
</script>