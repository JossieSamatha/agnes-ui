<template>
    <div>
        <el-form ref="fileDealForm" class="task-def-form" :model="form"
                 :rules="formRules" label-width="110px">
            <el-form-item label="规则编号" prop="dealCode">
                <gf-input v-model.trim="form.dealCode" placeholder="规则编号" :max-byte-len="8"/>
            </el-form-item>
            <el-form-item label="规则名称" prop="dealName">
                <gf-input v-model.trim="form.dealName" placeholder="规则名称" :max-byte-len="120"/>
            </el-form-item>
            <el-form-item label="处理方式" prop="dealType">
                <gf-dict v-model="form.dealType" dict-type="AGNES_DC_FILE_DEAL_TYPE"/>
            </el-form-item>
            <el-form-item label="业务类型" prop="bizType">
                <gf-dict v-model="form.bizType" dict-type="AGNES_DC_BIZ_TYPE"/>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <gf-input v-model="form.remark" type="textarea"
                          :rows="4" placeholder="备注"/>
            </el-form-item>

            <el-form-item label="规则配置" prop="fileTable" v-show="form.dealType=='0'">
                <div class="rule-table">
                    <el-table header-row-class-name="rule-header-row"
                              header-cell-class-name="rule-header-cell"
                              row-class-name="rule-row"
                              cell-class-name="rule-cell"
                              :data="form.execParams"
                              border stripe
                              style="width: 100%">
                        <el-table-column prop="stepCode" label="标签">
                            <template slot-scope="scope">
                                <span style="'border:1px solid #f00'">{{scope.$index+1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="serverAddress" label="源服务器">
                            <template slot-scope="scope">
                                <em class="edit-btn fa fa-edit" @click="editServerParam(scope.$index, scope.row,'sour')"></em>
                            </template>
                        </el-table-column>
                        <el-table-column prop="serverPort" label="编码格式">
                            <template slot-scope="scope">
                                <gf-dict filterable clearable v-model="scope.row.sourCodeType" dict-type="AGNES_SCAN_CODE_TYPE"/>
                            </template>
                        </el-table-column>
                        <el-table-column prop="filePath" label="源文件信息">
                            <template slot-scope="scope">
                                <em class="edit-btn fa fa-edit" @click="editFileParam(scope.$index, scope.row,'sour')"></em>
                            </template>
                        </el-table-column>
                        <el-table-column prop="fileName" label="下载处理规则">
                            <template slot-scope="scope">
                                <em class="edit-btn fa fa-edit" @click="editLoadDealParam(scope.$index, scope.row,'sour')"></em>
                            </template>
                        </el-table-column>
                        <el-table-column  prop="option" label="操作" width="52" align="center">
                            <template slot-scope="scope">
                                <span class="option-span" @click="deleteMainRuleRow(scope.$index)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button  @click="addMainRule()" class="rule-add-btn" size="small">新增</el-button>
                </div>
            </el-form-item>
            <el-form-item label="规则配置" prop="fileTable" v-show="form.dealType=='1'">
                <div class="rule-table">
                    <el-table header-row-class-name="rule-header-row"
                              header-cell-class-name="rule-header-cell"
                              row-class-name="rule-row"
                              cell-class-name="rule-cell"
                              :data="form.execParams"
                              border stripe
                              style="width: 100%">
                        <el-table-column prop="stepCode" label="标签">
                            <template slot-scope="scope">
                                <span style="'border:1px solid #f00'">{{scope.$index+1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="serverAddress" label="源服务器">
                            <template slot-scope="scope">
                                <em class="edit-btn fa fa-edit" @click="editServerParam(scope.$index, scope.row,'sour')"></em>
                            </template>
                        </el-table-column>
                        <el-table-column prop="serverPort" label="编码格式">
                            <template slot-scope="scope">
                                <gf-dict filterable clearable v-model="scope.row.sourCodeType" dict-type="AGNES_SCAN_CODE_TYPE"/>
                            </template>
                        </el-table-column>
                        <el-table-column prop="filePath" label="源文件信息">
                            <template slot-scope="scope">
                                <em class="edit-btn fa fa-edit" @click="editFileParam(scope.$index, scope.row,'sour')"></em>
                            </template>
                        </el-table-column>
                        <el-table-column prop="fileName" label="下载处理规则">
                            <template slot-scope="scope">
                                <em class="edit-btn fa fa-edit" @click="editLoadDealParam(scope.$index, scope.row,'sour')"></em>
                            </template>
                        </el-table-column>
                        <el-table-column prop="userName" label="目标服务器">
                            <template slot-scope="scope">
                                <em class="edit-btn fa fa-edit" @click="editServerParam(scope.$index, scope.row,'targ')"></em>
                            </template>
                        </el-table-column>
                        <el-table-column prop="password" label="编码格式">
                            <template slot-scope="scope">
                                <gf-dict filterable clearable v-model="scope.row.targCodeType" dict-type="AGNES_SCAN_CODE_TYPE"/>
                            </template>
                        </el-table-column>
                        <el-table-column prop="password" label="目标文件信息">
                            <template slot-scope="scope">
                                <em class="edit-btn fa fa-edit" @click="editFileParam(scope.$index, scope.row,'targ')"></em>
                            </template>
                        </el-table-column>
                        <el-table-column prop="password" label="上传处理规则">
                            <template slot-scope="scope">
                                <em class="edit-btn fa fa-edit" @click="editLoadDealParam(scope.$index, scope.row,'targ')"></em>
                            </template>
                        </el-table-column>

                        <el-table-column  prop="option" label="操作" width="52" align="center">
                            <template slot-scope="scope">
                                <span class="option-span" @click="deleteMainRuleRow(scope.$index)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button  @click="addMainRule()" class="rule-add-btn" size="small">新增</el-button>
                </div>
            </el-form-item>

        </el-form>
        <el-dialog title="服务器信息配置" :visible.sync="serverConfDialog" :modal-append-to-body="false" width="700px">
            <div>
                <el-form class="task-def-form" :model="serverInfoObj"
                         label-width="80px">
                    <el-form-item label="传输方式" prop="transMode">
                        <gf-dict filterable clearable v-model="serverInfoObj.transMode" dict-type="AGNES_DC_TRANS_MODE" style="width:70%"/>
                    </el-form-item>
                    <el-form-item label="服务器地址" prop="serverAddress">
                        <gf-input v-model.trim="serverInfoObj.serverAddress" placeholder="服务器地址" style="width:70%"/>
                    </el-form-item>
                    <el-form-item label="服务器端口" prop="serverPort">
                        <gf-input v-model.trim="serverInfoObj.serverPort" placeholder="服务器端口" style="width:70%"/>
                    </el-form-item>
                    <el-form-item v-if="serverInfoObj.transMode==='0' || serverInfoObj.transMode==='2'" label="用户" prop="userName">
                        <gf-input v-model.trim="serverInfoObj.userName" placeholder="用户" style="width:70%"/>
                    </el-form-item>
                    <el-form-item v-if="serverInfoObj.transMode==='0' || serverInfoObj.transMode==='2'" label="密码" prop="password">
                        <el-input placeholder="请输入密码" v-model="serverInfoObj.password" show-password style="width:70%"></el-input>
                    </el-form-item>
                </el-form>
                <dialog-footer :on-cancel="()=>{serverConfDialog=false}" :on-save="saveServerConf" ></dialog-footer>
            </div>
        </el-dialog>
        <el-dialog title="文件信息配置" :visible.sync="fileConfDialog" :modal-append-to-body="false">
            <div>
                <el-form class="task-def-form" :model="fileInfoObj"
                         label-width="80px">
                    <el-form-item label="文件路径" prop="filePath">
                        <gf-input v-model.trim="fileInfoObj.filePath" placeholder="文件路径" style="width:70%"/>
                    </el-form-item>
                    <el-form-item label="文件名称" prop="fileName">
                        <gf-input v-model.trim="fileInfoObj.fileName" placeholder="文件名称" style="width:70%"/>
                    </el-form-item>
                </el-form>
                <dialog-footer :on-cancel="()=>{fileConfDialog=false}" :on-save="saveFileConf" ></dialog-footer>
            </div>
        </el-dialog>
        <el-dialog title="下载处理规则配置" :visible.sync="loadDealConfDialog" :modal-append-to-body="false">
            <div>
                <el-form class="task-def-form" :model="loadRuleInfoObj"
                         label-width="80px">
                    <el-form-item label="信号规则" prop="transMode">
                        <gf-dict filterable clearable v-model="loadRuleInfoObj.signalRule" dict-type="AGNES_DC_SINGAL_TYPE" style="width:70%"/>
                    </el-form-item>
                    <el-form-item label="压缩类型" prop="transMode">
                        <gf-dict filterable clearable v-model="loadRuleInfoObj.yasType" dict-type="AGNES_DC_COND_TYPE" style="width:70%"/>
                    </el-form-item>
                    <el-form-item label="解压密码" prop="transMode">
                        <gf-input v-model.trim="loadRuleInfoObj.yasPassWord" placeholder="解压密码" style="width:70%"/>
                    </el-form-item>
                    <el-form-item label="解析规则" prop="analyId">
                        <el-select class="multiple-select" v-model="loadRuleInfoObj.analyId"
                                   filterable clearable
                                   placeholder="请选择"  style="width:70%">
                            <gf-filter-option
                                    v-for="item in analyRulesOption"
                                    :key="item.pkId"
                                    :label="item.ifName"
                                    :value="item.pkId">
                            </gf-filter-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <dialog-footer :on-cancel="()=>{loadDealConfDialog=false}" :on-save="saveLoadDealConf" ></dialog-footer>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        name: "baseInfo",
        props: {
            baseInfo: Object
        },
        data() {
            return {
                analyRulesOption:[],
                editRowIndex:0,
                serverInfoObj:{},
                serverConfDialog:false,
                serverConfDialogType:'',
                fileInfoObj:{},
                fileConfDialog:false,
                fileConfDialogType:'',
                loadRuleInfoObj:{},
                loadDealConfDialog:false,
                loadDealConfDialogType:'',
                form:{
                    dealCode:'',
                    dealName:'',
                    dealType:'0',
                    bizType:'',
                    remark:'',
                    execParams:[{
                        sourServerInfo:'',
                        sourCodeType:'UTF-8',
                        sourFileInfo:'',
                        sourLoadRule:'',
                        targServerInfo:'',
                        targCodeType:'UTF-8',
                        targFileInfo:'',
                        targLoadRule:'',}],
                },
                formRules: {
                    dealCode: [
                        {required: true, message: '规则编号必填！', trigger: 'blur'},
                    ],
                    dealType: [
                        {required: true, message: '请选择处理方式！', trigger: 'blur'},
                    ],
                }
            }
        },
        mounted() {
            // this.form = this.baseInfo;
            this.getAnalyRulesOption();
        },
        methods:{
            async getAnalyRulesOption(){
                const p = this.$api.fileScan.queryRuleConfigList();
                let res =  await this.$app.blockingApp(p);
                res.data.forEach(item=>{
                    let analy = {"pkId":item.pkId,"ifName":item.ifName}
                    this.analyRulesOption.push(analy);
                });
            },
            editServerParam(rowIndex, rowInfo,type){
                this.serverInfoObj={};
                if('sour'===type){
                    this.serverConfDialogType = 'sour';
                    if(rowInfo.sourServerInfo) {
                        this.serverInfoObj = JSON.parse(rowInfo.sourServerInfo);
                    }
                }else {
                    this.serverConfDialogType = 'targ';
                    if(rowInfo.targServerInfo) {
                        this.serverInfoObj = JSON.parse(rowInfo.targServerInfo);
                    }
                }
                this.serverConfDialog=true;
                this.editRowIndex = rowIndex;
            },
            saveServerConf(){
                let objStr = JSON.stringify(this.serverInfoObj);
                if('sour'===this.serverConfDialogType){
                    this.form.execParams[this.editRowIndex].sourServerInfo = objStr;
                }else {
                    this.form.execParams[this.editRowIndex].targServerInfo  = objStr;
                }
                this.serverConfDialog=false;
            },
            editFileParam(rowIndex, rowInfo,type){
                this.fileInfoObj={};
                if('sour'===type){
                    this.fileConfDialogType = 'sour';
                    if(rowInfo.sourFileInfo) {
                        this.fileInfoObj = JSON.parse(rowInfo.sourFileInfo);
                    }
                }else {
                    this.fileConfDialogType = 'targ';
                    if(rowInfo.targFileInfo) {
                        this.fileInfoObj = JSON.parse(rowInfo.targFileInfo);
                    }
                }
                this.fileConfDialog=true;
                this.editRowIndex = rowIndex;
            },
            saveFileConf(){
                let objStr = JSON.stringify(this.fileInfoObj);
                if('sour'===this.fileConfDialogType){
                    this.form.execParams[this.editRowIndex].sourFileInfo = objStr;
                }else {
                    this.form.execParams[this.editRowIndex].targFileInfo = objStr;
                }
                this.fileConfDialog=false;
            },
            editLoadDealParam(rowIndex, rowInfo,type){
                this.loadRuleInfoObj={};
                if('sour'===type){
                    this.loadDealConfDialogType = 'sour';
                    if(rowInfo.sourLoadRule) {
                        this.loadRuleInfoObj = JSON.parse(rowInfo.sourLoadRule);
                    }
                }else {
                    this.loadDealConfDialogType = 'targ';
                    if(rowInfo.targLoadRule) {
                        this.loadRuleInfoObj = JSON.parse(rowInfo.targLoadRule);
                    }
                }
                this.loadDealConfDialog=true;
                this.editRowIndex = rowIndex;
            },
            saveLoadDealConf(){
                let objStr = JSON.stringify(this.loadRuleInfoObj);
                if('sour'===this.loadDealConfDialogType){
                    this.form.execParams[this.editRowIndex].sourLoadRule = objStr;
                }else {
                    this.form.execParams[this.editRowIndex].targLoadRule = objStr;
                }
                this.loadDealConfDialog=false;
            },

            // 删除行
            deleteMainRuleRow(rowIndex){
                this.form.execParams.splice(rowIndex, 1);
            },
            // 新增服务行
            addMainRule(){
                const newFileTableObj = {
                    sourCodeType: 'UTF-8',
                    targetCodeType: 'UTF-8',
                };
                this.form.execParams.push(newFileTableObj);
            },
        }
    }
</script>