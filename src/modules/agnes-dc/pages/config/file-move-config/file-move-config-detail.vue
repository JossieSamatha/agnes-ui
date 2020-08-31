<template>
    <el-form ref="form" class="task-def-form" :model="form" :disabled="mode==='view'"
             :rules="detailFormRules" label-width="110px">
        <el-form-item label="处理方式" prop="copyConf.processMode">
            <gf-dict filterable clearable v-model="form.copyConf.processMode" dict-type="AGNES_DC_PROCESS_MODE"/>
        </el-form-item>
        <el-form-item label="规则编号" prop="copyConf.copyCode">
            <gf-input v-model.trim="form.copyConf.copyCode" placeholder="规则编号" :max-byte-len="8"/>
        </el-form-item>
        <el-form-item label="规则名称" prop="copyConf.copyName">
            <gf-input v-model.trim="form.copyConf.copyName" placeholder="规则名称" :max-byte-len="120"/>
        </el-form-item>
        <el-form-item label="获取方式" prop="copyConf.transMode">
            <gf-dict filterable clearable v-model="form.copyConf.transMode" dict-type="AGNES_DC_TRANS_MODE"/>
        </el-form-item>
        <el-form-item label="主服务器地址" prop="copyConf.serverAddress">
            <gf-input v-model.trim="form.copyConf.serverAddress" placeholder="服务器地址"/>
        </el-form-item>
        <el-form-item label="主服务器端口" prop="copyConf.serverPort">
            <gf-input v-model.trim="form.copyConf.serverPort" placeholder="服务器端口"/>
        </el-form-item>
        <el-form-item label="用户" prop="copyConf.userName">
            <gf-input v-model.trim="form.copyConf.userName" placeholder="用户"/>
        </el-form-item>
        <el-form-item label="密码" prop="copyConf.password">
            <gf-input v-model.trim="form.copyConf.password" placeholder="密码"/>
        </el-form-item>
        <el-form-item label="变量选择" prop="copyConf.varId">
            <el-select class="multiple-select" v-model="form.copyConf.varId"
                       filterable clearable multiple
                       placeholder="请选择">
                <gf-filter-option
                        v-for="item in variableOption"
                        :key="item.pkId"
                        :label="item.varName"
                        :value="item.pkId">
                </gf-filter-option>
            </el-select>
        </el-form-item>
        <el-form-item label="文件路径" prop="copyConf.filePath">
            <gf-input v-model.trim="form.copyConf.filePath" placeholder="文件路径"/>
        </el-form-item>
        <el-form-item label="文件名称" prop="copyConf.fileName">
            <gf-input v-model.trim="form.copyConf.fileName" placeholder="文件名称"/>
        </el-form-item>

        <el-form-item label="从服务器" prop="fileTable">
            <div class="rule-table">
                <el-table header-row-class-name="rule-header-row"
                        header-cell-class-name="rule-header-cell"
                        row-class-name="rule-row"
                        cell-class-name="rule-cell"
                        :data="form.fields"
                        border stripe
                        style="width: 100%">
                    <el-table-column prop="serverAddress" label="从服务器地址">
                        <template slot-scope="scope">
                            <!-- <span v-if="this.mode === 'view'">{{scope.row.serverAddress}}</span> -->
                            <el-input :style="!scope.row.serverAddress ? 'border:1px solid #f00':''" v-model="scope.row.serverAddress"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="serverPort" label="从服务器端口">
                        <template slot-scope="scope">
                            <!-- <span v-if="this.mode === 'view'">{{scope.row.serverPort}}</span> -->
                            <el-input :style="!scope.row.serverPort ? 'border:1px solid #f00':''" v-model="scope.row.serverPort"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="filePath" label="文件路径">
                        <template slot-scope="scope">
                            <!-- <span v-if="this.mode === 'view'">{{scope.row.filePath}}</span> -->
                            <el-input v-model="scope.row.filePath"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="fileName" label="文件名称">
                        <template slot-scope="scope">
                            <!-- <span v-if="this.mode === 'view'">{{scope.row.fileName}}</span> -->
                            <el-input v-model="scope.row.fileName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userName" label="用户名">
                        <template slot-scope="scope">
                            <!-- <span v-if="this.mode === 'view'">{{scope.row.userName}}</span> -->
                            <el-input :style="!scope.row.userName ? 'border:1px solid #f00':''" v-model="scope.row.userName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="password" label="密码">
                        <template slot-scope="scope">
                            <!-- <span v-if="this.mode === 'view'">{{scope.row.password}}</span> -->
                            <el-input :style="!scope.row.password ? 'border:1px solid #f00':''" v-model="scope.row.password"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="varId" label="变量选择">
                        <template slot-scope="scope">
                            <el-select :style="!scope.row.varId||scope.row.varId.length===0? 'border:1px solid #f00':''" multiple v-model="scope.row.varId" placeholder="请选择">
                                <el-option 
                                    v-for="item in variableOption"
                                    :key="item.pkId"
                                    :label="item.varName"
                                    :value="item.pkId"
                                >
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column  prop="option" label="操作" width="52" align="center">
                        <template slot-scope="scope">
                            <span class="option-span" @click="deleteRuleRow(scope.$index)">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button  @click="addRule()" class="rule-add-btn" size="small">新增</el-button>
            </div>
        </el-form-item>

        <el-form-item label="基准日期" prop="baseDate">
            <gf-dict filterable clearable v-model="form.copyConf.baseDate" dict-type="AGNES_BASE_DATE" style="width: 30%;"/>
        </el-form-item>
        <template >
            <el-form-item label="执行频率" prop="copyConf.execScheduler">
                <el-button type="text" @click="editExecTime('execScheduler', form.copyConf.execScheduler)">
                    {{form.copyConf.execScheduler}}点击配置
                </el-button>
            </el-form-item>
        </template>
    </el-form>
</template>

<script>
    import loadsh from 'lodash';
    export default {
        name: "file-move-detail",
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
                form:{
                    copyConf: {
                        copyId:'',
                        processMode:'1',
                        takeMethod:'1',
                        copyCode:'',
                        copyName:'',
                        transMode:'1',
                        serverAddress:'',
                        serverPort:"",
                        userName:'',
                        password:'',
                        varId:'',
                        filePath:'',
                        fileName:'',
                        needAnaly:true,
                        analyRules:'',
                        baseDate:'',
                        execScheduler:'',
                    },
                    fields:[],
                },
                mustFillField: ['serverAddress','serverPort','userName','password','varId'],
                variableOption:[],
                analyRulesOption:[],
                curExecScheduler: '',    // 当前频率对象字段
                detailFormRules:
                    {"copyConf.copyCode": [
                        {required: true, message: '规则编号必填', trigger: 'blur'},
                    ],
                    "copyConf.copyName": [
                        {required: true, message: '规则名称必填', trigger: 'change'},
                    ],
                    "copyConf.serverAddress": [
                        {required: true, message: '服务器地址必填', trigger: 'blur'},
                    ],
                    "copyConf.serverPort": [
                        {required: true, message: '服务器端口必填', trigger: 'change'},
                    ],
                    "copyConf.transMode": [
                        {required: true, message: '获取方式必填', trigger: 'blur'},
                    ],
                    "copyConf.baseDate": [
                        {required: true, message: '基准日期必填', trigger: 'change'},
                    ],
                },
            }
        },
        beforeMount() {
            if(this.mode!=='add'){
                Object.assign(this.form.copyConf, this.row);
                this.addExecScheduler();
            }
            if (this.form.copyConf.copyId) {
                const p = this.getSlaveServerList();
                this.$app.blockingApp(p);
            }
            this.getVarIdList();
        },
        methods: {
            // 取消onCancel事件，触发抽屉关闭事件this.$emit("onClose");
            async onCancel() {
                this.$emit("onClose");
            },
            // json非空判断
            mustFill(fieldStr){
                return this.mustFillField.indexOf(fieldStr) !== -1;
            },
            addExecScheduler(){
                if(this.form.copyConf.execScheduler){
                    this.form.copyConf.execScheduler = '00#00#02#'+this.form.copyConf.execScheduler
                }
                if(this.form.copyConf.varId){
                    let varIdArr = this.form.copyConf.varId.split(',');
                    this.form.copyConf.varId = varIdArr
                }
            },
            async getVarIdList(){
                const p = this.$api.fileScan.getVarIdList();
                let res =  await this.$app.blockingApp(p);
                this.variableOption = res.data;
            },
            // 新增服务行
            addRule(){
                const newFileTableObj = {
                    serverAddress: '',
                    serverPort: '',
                    filePath: '',
                    fileName: '',
                };
                this.form.fields.push(newFileTableObj);
            },
            // 删除行
            deleteRuleRow(rowIndex){
                this.form.fields.splice(rowIndex, 1);
            },
            editExecTime(curObj, execScheduler) {
                this.curExecScheduler = curObj;
                this.showDlg(execScheduler, this.setExecScheduler.bind(this));
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
                this.form.copyConf[this.curExecScheduler] = cron;
            },
            async getSlaveServerList() {
                try {
                    const resp = await this.$api.fileMove.getSlaveServerList(this.form.copyConf.copyId);
                    this.form.fields = resp.data;
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async onSave() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                let validate = true;
                if(this.form.fields){
                    for(let i =0;i<this.form.fields.length;i++){
                        for (let key in this.form.fields[i]) {
                            if(this.mustFillField.indexOf(key) !== -1 && loadsh.isEmpty(this.form.fields[i][key])){
                                validate = false;
                            }
                        }
                    }
                    if(!validate){
                        this.$msg.warning("请补充完整必填项!");
                        return;
                    }
                }

                try {
                    let moveForm = JSON.parse(JSON.stringify(this.form));
                    if(moveForm.copyConf.execScheduler){
                        let spiltExecScheduler = moveForm.copyConf.execScheduler.split('#');
                        moveForm.copyConf.execScheduler = spiltExecScheduler[3]
                    }
                    if(moveForm.copyConf.varId){
                        moveForm.copyConf.varId = moveForm.copyConf.varId.join();
                    }
                    const p = this.$api.fileMove.saveCopyConf(moveForm);
                    await this.$app.blockingApp(p);

                    if (this.actionOk) {
                        await this.actionOk(this.form, this.row);
                    }
                    this.$msg.success('保存成功');
                    this.$emit("onClose");
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
        },


    }
</script>
<style scoped>
    .not-block{
        border-color: #f00;
    }
</style>>