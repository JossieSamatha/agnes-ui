<template>
    <el-form ref="fileScanForm" class="task-def-form" :model="detailFormData" :disabled="mode==='view'"
             :rules="detailFormRules" label-width="110px">
        <el-form-item label="规则编号" prop="scanCode">
            <gf-input v-model.trim="detailFormData.scanCode" placeholder="规则编号" :max-byte-len="8"/>
        </el-form-item>
        <el-form-item label="业务编号" prop="varId">
            <gf-input v-model.trim="detailFormData.varId" placeholder="规则编号" :max-byte-len="8"/>
        </el-form-item>
        <el-form-item label="规则名称" prop="scanName">
            <gf-input v-model.trim="detailFormData.scanName" placeholder="规则名称" :max-byte-len="120"/>
        </el-form-item>
        <el-form-item label="传输方式" prop="transMode">
            <gf-dict filterable clearable v-model="detailFormData.transMode" dict-type="AGNES_DC_TRANS_MODE"/>
        </el-form-item>
        <el-form-item label="编码类型" prop="codeType">
            <gf-dict filterable clearable v-model="detailFormData.codeType" dict-type="AGNES_SCAN_CODE_TYPE"/>
        </el-form-item>
        <el-form-item label="服务器地址" prop="serverAddress">
            <gf-input v-model.trim="detailFormData.serverAddress" placeholder="服务器地址"/>
        </el-form-item>
        <el-form-item label="服务器端口" prop="serverPort">
            <gf-input v-model.trim="detailFormData.serverPort" placeholder="服务器端口"/>
        </el-form-item>
        <el-form-item v-if="detailFormData.transMode==='0' || detailFormData.transMode==='2'" label="用户" prop="userName">
            <gf-input v-model.trim="detailFormData.userName" placeholder="用户"/>
        </el-form-item>
        <el-form-item v-if="detailFormData.transMode==='0' || detailFormData.transMode==='2'" label="密码" prop="password">
            <el-input placeholder="请输入密码" v-model="detailFormData.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="文件路径" prop="filePath">
            <gf-input v-model.trim="detailFormData.filePath" placeholder="文件路径" style="width: calc(100% - 30px); margin-right: 10px"/>
            <em class="question el-icon-question" title="操作文档" @click="openHelpFile"></em>
        </el-form-item>
        <el-form-item label="文件名称" prop="fileName">
            <gf-input v-model.trim="detailFormData.fileName" placeholder="文件名称" style="width: calc(100% - 30px); margin-right: 10px"/>
        </el-form-item>
        <template >
            <el-form-item label="执行频率" prop="execScheduler">
                <el-button type="text" @click="editExecTime('execScheduler', detailFormData.execScheduler)">
                    {{detailFormData.execScheduler}}点击配置
                </el-button>
            </el-form-item>
        </template>
        <el-form-item label="">
            <gf-strbool-checkbox v-model="detailFormData.isNeedParse">是否需要解析</gf-strbool-checkbox>
        </el-form-item>
        <el-form-item v-if="detailFormData.isNeedParse==true" label="解析规则" prop="filePipeId">
            <el-select class="multiple-select" v-model="detailFormData.filePipeId"
                       filterable clearable
                       placeholder="请选择">
                <gf-filter-option
                        v-for="item in analyRulesOption"
                        :key="item.pkId"
                        :label="item.ifName"
                        :value="item.pkId">
                </gf-filter-option>
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script>
    import readMeStr from "./configHelpStr";

    export default {
        name: "file-scan-detail",
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
                helpNotify: null,
                detailFormData:{
                    scanCode:'',
                    scanName:'',
                    codeType:'',
                    transMode:'0',
                    serverAddress:'',
                    serverPort:"",
                    userName:'',
                    password:'',
                    status:'0',
                    varId:'',
                    filePath:'',
                    fileName:'',
                    isNeedParse:'0',
                    analyRules:'',
                    baseDate:'',
                    execScheduler:'',
                    filePipeId:'',
                },
                variableOption:[],
                analyRulesOption:[],
                curExecScheduler: '',    // 当前频率对象字段
                detailFormRules: {
                    scanCode: [
                        {required: true, message: '规则编号必填', trigger: 'blur'},
                    ],
                    scanName: [
                        {required: true, message: '规则名称必填', trigger: 'blur'},
                    ],
                    transMode: [
                        {required: true, message: '传输方式必填', trigger: 'blur'},
                    ],
                    serverAddress: [
                        {required: true, message: '服务器地址必填', trigger: 'blur'},
                    ],
                    serverPort: [
                        {required: true, message: '服务器端口必填', trigger: 'blur'},
                    ],
                    execScheduler: [
                        {required: true, message: '执行频率必填', trigger: 'blur'},
                    ],
                    codeType: [
                      {required: true, message: '编码类型必填', trigger: 'blur'},
                    ],
                  varId: [
                    {required: true, message: '业务编号必填', trigger: 'blur'},
                  ],
                  userName: [
                    {required: true, message: '用户名必填', trigger: 'blur'},
                  ],
                  password: [
                    {required: true, message: '密码必填', trigger: 'blur'},
                  ],
                },
            }
        },
        beforeMount() {
            if(this.mode!=='add'){
                Object.assign(this.detailFormData, this.row);
                this.addExecScheduler();
            }
            this.getAnalyRulesOption();
        },
        methods: {
            // 取消onCancel事件，触发抽屉关闭事件this.$emit("onClose");
            async onCancel() {
                this.$emit("onClose");
            },
            addExecScheduler(){
                if(this.detailFormData.execScheduler){
                    this.detailFormData.execScheduler = '00#00#02#'+this.detailFormData.execScheduler
                }
            },
            async getAnalyRulesOption(){
                const p = this.$api.fileScan.queryRuleConfigList();
                let res =  await this.$app.blockingApp(p);
                 res.data.forEach(item=>{
                     let analy = {"pkId":item.pkId,"ifName":item.ifName}
                     this.analyRulesOption.push(analy);
                 });
            },
            // 保存onSave事件，保存操作完成后触发抽屉关闭事件this.$emit("onClose");
            async onSave() {
                const ok = await this.$refs['fileScanForm'].validate();
                if (!ok) {
                    return;
                }
                try {
                    // let paramData = this.detailFormData;
                    let moveForm = JSON.parse(JSON.stringify(this.detailFormData));
                    if(moveForm.execScheduler){
                        let spiltExecScheduler = moveForm.execScheduler.split('#');
                        moveForm.execScheduler = spiltExecScheduler[3]
                    }
                    moveForm.isNeedCheck = true;
                    moveForm.status='01';
                    if(this.mode==='add'){
                        const p = this.$api.fileScan.saveFileScan(moveForm);
                        const resp = await this.$app.blockingApp(p);
                        if(resp.data == 'success'){
                            this.$msg.success('保存成功');
                            this.$emit("onClose");
                            if (this.actionOk) {
                                await this.actionOk();
                            }
                        }else {
                            this.$msg.error("该编码已存在");
                        }
                    }else if(this.mode==='edit') {
                        if(this.detailFormData.scanCode === this.row.scanCode && this.detailFormData.varId === this.row.varId){
                            moveForm.isNeedCheck = false;
                        }
                        const p = this.$api.fileScan.saveFileScan(moveForm);
                        const resp = await this.$app.blockingApp(p);
                        if(resp.data == 'success'){
                            this.$msg.success('修改成功');
                            this.$emit("onClose");
                            if (this.actionOk) {
                                await this.actionOk();
                            }
                        }else if(resp.data == 'bmycz'){
                            this.$msg.error("该编码已存在");
                        }else {
                            this.$msg.error("请配置正确的文件路径或者文件名称！");
                        }
                    }else if(this.mode==='check'){
                        // let updateParam = {
                        //     productParamId:paramData.productParamId,
                        //     paramStatus:'1'
                        // }
                        // const p = this.$api.fileScan.updateStatus(updateParam);
                        // await this.$app.blockingApp(p);
                        // this.$msg.success('复核成功');
                    }
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            editExecTime(curObj, execScheduler) {
                this.curExecScheduler = curObj;
                this.showDlg(execScheduler, this.setExecScheduler.bind(this));
            },
            // 打开帮助文档
            openHelpFile(){
                if(this.helpNotify && this.helpNotify.close){
                    this.helpNotify.close();
                }
                this.helpNotify = this.$notify({
                    width: 400,
                    title: '日期通配符配置操作文档',
                    customClass: 'cronHelpNotify',
                    dangerouslyUseHTMLString: true,
                    duration: 0,
                    message: readMeStr()
                });
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
                this.detailFormData[this.curExecScheduler] = cron;
            },
        },


    }
</script>


<style scoped>
    .question {
        top: 15px;
        right: 165px;
        font-size: 20px;
        color: #0f5eff;
        cursor: pointer;
    }
</style>
