<template>
    <div class="move-model-body">
        <el-form ref="form" class="task-def-form" :model="form" :disabled="mode==='view'"
                :rules="detailFormRules" label-width="0px">
            <el-form-item label="" prop="fileTable">
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
        </el-form>
        <dialog-footer :ok-button="mode !== 'view'" :on-save="onSave" ok-button-title="确定"></dialog-footer>
    </div>
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
                detailFormRules:{},
            }
        },
        beforeMount() {
            Object.assign(this.form.copyConf, this.row);
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
            async getSlaveServerList() {
                try {
                    const resp = await this.$api.fileMove.getSlaveServerList(this.form.copyConf.copyId);
                    this.form.fields = resp.data;
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async onSave() {
                // const ok = await this.$refs['form'].validate();
                // if (!ok) {
                //     return;
                // }
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
                    let form = {
                        copyConf:{copyId:this.form.copyConf.copyId},
                        fields:this.form.fields
                    }
                    const p = this.$api.fileMove.slaveServer(form);
                    await this.$app.blockingApp(p);

                    if (this.actionOk) {
                        await this.actionOk(this.form, this.row);
                    }
                    this.$msg.success('保存成功');
                    this.$dialog.close(this, 'ok'); 
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
    /* .move-model-body{
        width: 800px;
        overflow: scroll;
    } */
</style>>