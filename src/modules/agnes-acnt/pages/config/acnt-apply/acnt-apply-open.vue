<template>
    <el-form ref="taskDefForm" class="task-def-form" :model="detailForm" :disabled="isDisabled"
             :rules="detailFormRules" label-width="160px">
        <div class="line" >
            <el-form-item  label="账户类型" prop="typeCode">
                <el-select :disabled="isSubDis" class="multiple-select" v-model="detailForm.typeCode"
                        filterable clearable
                        placeholder="请选择">
                    <gf-filter-option
                            v-for="item in bizTagOption"
                            :key="item.dictId"
                            :label="item.dictName"
                            :value="item.dictId">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item  label="业务类型" prop="bizType">
                <gf-dict :disabled="true" filterable clearable v-model="detailForm.bizType" dict-type="AGNES_ACNT_BIZ_TYPE" />
            </el-form-item>
        </div>
        <div class="line">
            <el-form-item label="业务发起部门" prop="baseStartDept">
                <gf-dict :disabled="isSubDis" filterable clearable v-model="detailForm.baseStartDept" dict-type="AGNES_ROSTER_DEPT" />
            </el-form-item>
            <el-form-item label="业务发起部门联系人" prop="baseStartDeptLinkman">
                <gf-input :disabled="isSubDis" v-model.trim="detailForm.baseStartDeptLinkman" placeholder="业务发起部门联系人"/>
            </el-form-item>
        </div>
        <div class="line">
            <el-form-item label="业务描述" prop="baseDesc">
                <gf-input :disabled="isSubDis" v-model.trim="detailForm.baseDesc" type='textarea' placeholder="业务描述" :max-len="200"/>
            </el-form-item>
            <el-form-item label="业务受理部门" prop="baseAcceptDept">
                <gf-dict :disabled="isSubDis" filterable clearable v-model="detailForm.baseAcceptDept" dict-type="AGNES_ROSTER_DEPT" />
            </el-form-item>
        </div>
        <div class="line">
            <el-form-item label="业务受理组" prop="baseAcceptGroup">
                <el-select :disabled="isSubDis" class="multiple-select" v-model="detailForm.baseAcceptGroup"
                        filterable clearable
                        placeholder="请选择">
                    <gf-filter-option
                            v-for="item in groupOption"
                            :key="item.userGroupId"
                            :label="item.userGroupName"
                            :value="item.userGroupId">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item label="归属机构" prop="baseOrgId">
                <el-select :disabled="isSubDis" class="multiple-select" v-model="detailForm.baseOrgId"
                        filterable clearable
                        placeholder="请选择">
                    <gf-filter-option
                            v-for="item in OrgList"
                            :key="item.extOrgId"
                            :label="item.extOrgName"
                            :value="item.extOrgId">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
        </div>
        <div class="line">
            <el-form-item label="经办人" prop="baseOperator">
                <gf-input :disabled="isSubDis" v-model.trim="detailForm.baseOperator" placeholder="经办人"/>
            </el-form-item>
            <el-form-item label="基金代码" prop="productCode">
                <el-select :disabled="isSubDis" class="multiple-select" v-model="detailForm.productCode"
                        filterable clearable
                        placeholder="请选择">
                    <gf-filter-option
                            v-for="item in productList"
                            :key="item.productCode"
                            :label="item.productCode"
                            :value="item.productCode">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
        </div>
        <div class="line">
            <el-form-item label="基金名称" prop="productName">
                <gf-input disabled v-model.trim="detailForm.productName" placeholder="基金名称"/>
            </el-form-item>
            <el-form-item label="提交财务流程" prop="isSendFinance">
                <el-radio-group :disabled="isSubDis" v-model="detailForm.isSendFinance">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
        </div>
        <div class="line">
            <el-form-item label="提交OA流程" prop="isSendOa">
                <el-radio-group v-model="detailForm.isSendOa">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
        </div>
        <div v-if="detailForm.isSendOa==='1'" class="line">
            <el-form-item label="标题" prop="OATitle">
                <gf-input v-model.trim="detailForm.OATitle" placeholder="标题"/>
            </el-form-item>
            <el-form-item label="申请部门" prop="OADept">
                <gf-input v-model.trim="detailForm.OADept" placeholder="申请部门"/>    
            </el-form-item>
        </div>
        <div v-if="detailForm.isSendOa==='1'" class="line">
            <el-form-item label="申请人" prop="OAOperator">
                <gf-input disabled v-model.trim="detailForm.OAOperator" placeholder="申请人"/>
            </el-form-item>
            <el-form-item label="申请事由" prop="OARemark">
                <gf-input v-model.trim="detailForm.OARemark" placeholder="申请事由"/>    
            </el-form-item>
        </div>
        <div v-if="detailForm.isSendOa==='1'" class="line">
            <el-form-item label="公司领导" prop="OALeader">
                <gf-input v-model.trim="detailForm.OALeader" placeholder="公司领导"/>
            </el-form-item>
            <el-form-item label="是否需要合规法务审核" prop="OAIsNeedAudit">
                <el-radio-group v-model="detailForm.OAIsNeedAudit">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
        </div>
        <div v-if="detailForm.isSendOa==='1'" class="line">
            <el-form-item label="是否需要加盖法人章" prop="OAIsNeedStamp">
                <el-radio-group v-model="detailForm.OAIsNeedStamp">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="用印日期" prop="OAPrintDT">
                <el-date-picker
                        v-model="detailForm.OAPrintDT"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="用印日期">
                </el-date-picker>
            </el-form-item>
        </div>


        <el-form-item v-if="detailForm.isSendOa==='1'" label="用印文件" prop="fileTable">
            <div class="rule-table">
                <el-table header-row-class-name="rule-header-row"
                        header-cell-class-name="rule-header-cell"
                        row-class-name="rule-row"
                        cell-class-name="rule-cell"
                        :data="detailForm.fields"
                        border stripe
                        style="width: 100%">
                    <el-table-column prop="OAurl" label="用印文件名">
                        <template slot-scope="scope">
                            <!-- <span v-if="this.mode === 'view'">{{scope.row.OAurl}}</span> -->
                            <el-input :style="!scope.row.OAurl ? 'border:1px solid #f00':''" v-model="scope.row.OAurl"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="OAnumber" label="份数">
                        <template slot-scope="scope">
                            <!-- <span v-if="this.mode === 'view'">{{scope.row.OAnumber}}</span> -->
                            <el-input type="number" :style="!scope.row.OAnumber ? 'border:1px solid #f00':''" v-model="scope.row.OAnumber"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="OAremark" label="备注">
                        <template slot-scope="scope">
                            <!-- <span v-if="this.mode === 'view'">{{scope.row.OAremark}}</span> -->
                            <el-input v-model="scope.row.OAremark"></el-input>
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
</template>

<script>
    import loadsh from 'lodash';
    import AcntApplyInsert from "./acnt-apply-insert";
    export default {
        name: "apply-define",
        props: {
            mode: {
                type: String,
                default: 'add'
            },
            row: Object,
            isDisabled:Boolean,
            actionOk: Function
        },
        data() {
            return {
                rosterDate:'',
                memberRefList:[],
                serviceRes:[],
                staticData: {},
                isSubDis:false,
                detailForm: {
                    typeCode:'1', 
                    bizType:'01',
                    baseStartDept:'', 
                    baseStartDeptLinkman:'', 
                    baseAcceptDept:'',
                    baseAcceptGroup:'', 
                    baseOrgId:'', 
                    productCode:'', 
                    baseOperator:this.$app.session.data.user.userName,
                    productName:'',
                    isSendFinance:'0', 
                    isSendOa:'0', 
                    OATitle:'用印申请流程', 
                    OADept:'基金运营部', 
                    OAOperator:this.$app.session.data.user.userName,
                    OARemark:'业务描述', 
                    OALeader:'', 
                    OAIsNeedAudit:'0', 
                    OAIsNeedStamp:'0',
                    OAPrintDT:'',
                    fields:[],
                },
                mustFillField: ['OAurl','OAnumber'],
                bizTagOption: [],        // 业务类型下拉
                groupOption: [],        // 群组下拉
                productList:[],     //产品代码群组
                OrgList:[],         //机构列表
                detailFormRules: {
                
                },
            }
        },
        beforeMount() {
            Object.assign(this.detailForm, this.row);
            this.getOptionData()
            this.checkIsSub()
        },
        methods: {
            async getOptionData(){
                try {
                    let groupOption = await this.$api.userGroupApi.getAllUserGroup();
                    this.groupOption = groupOption.data
                    let productList = await this.$api.acntApplyApi.getProductCodeList();
                    this.productList = productList.data
                    let OrgList = await this.$api.orgDefineApi.getOrgList();
                    this.OrgList = OrgList.data
             
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            checkIsSub(){
                if(!loadsh.isEmpty(this.row.applySubId)||this.mode==='addInfo'){
                    this.isSubDis = true;
                }
            },
            // 新增服务行
            addRule(){
                const newFileTableObj = {
                    OAurl: '',
                    OAnumber: '',
                    OAremark: '',
                };
                this.detailForm.fields.push(newFileTableObj);
            },
            // 删除行
            deleteRuleRow(rowIndex){
                this.detailForm.fields.splice(rowIndex, 1);
            },
            // 保存onSave事件，保存操作完成后触发抽屉关闭事件this.$emit("onClose");
            async onSave() {
                // this.insertApply()
                const ok = await this.$refs['taskDefForm'].validate();
                if (!ok) {
                    return;
                }
                let validate = true;
                if(this.detailForm.fields&&this.detailForm.isSendOa==='1'){
                    for(let i =0;i<this.detailForm.fields.length;i++){
                        for (let key in this.detailForm.fields[i]) {
                            if(this.mustFillField.indexOf(key) !== -1 && loadsh.isEmpty(this.form.detailForm.fields[i][key])){
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
                    let form =  JSON.parse(JSON.stringify(this.detailForm)) 
                    let openSub = false;
                    let isdel = false;
                    if(!loadsh.isEmpty(this.detailForm.applySubId)){
                        openSub = true;
                    }
                    form.processStatus = '02';
                    if(!loadsh.isEmpty(this.detailForm.processStatus)){
                        //状态机控制
                        if(this.detailForm.processStatus=='01'){
                            form.processStatus = '02';
                            if(this.mode=='detele'){
                                isdel = true;
                            }
                        }else if(this.detailForm.processStatus=='02'){
                            if(this.detailForm.isSendOa=='1'){
                                form.processStatus = '03'; 
                            }else {
                                if(this.detailForm.children){
                                    form.processStatus = '04';
                                }else{
                                    form.processStatus = '08';
                                }
                                
                            }
                        }else if(this.detailForm.processStatus=='03'){
                            form.processStatus = '04';
                        }else if(this.detailForm.processStatus=='04'){
                            openSub = true;
                            form.processStatus = '02';
                            // if(this.detailForm.isSendFinance=='1'){
                            //     form.processStatus = '05'; 
                            // }else {
                            //     form.processStatus = '06';
                            // }
                        }else if(this.detailForm.processStatus=='05'){
                            form.processStatus = '06';
                        }
                    }
                    if(isdel){
                        form.processStatus = '09';
                        const p = this.$api.acntApplyApi.cancelApply(form);
                        await this.$app.blockingApp(p);
                        this.$msg.success('作废成功');
                    }else{
                        if(openSub){
                            const p = this.$api.acntApplyApi.saveSubApply(form);
                            await this.$app.blockingApp(p);
                            this.$msg.success('提交成功');
                        }else{
                            const p = this.$api.acntApplyApi.saveApply(form);
                            await this.$app.blockingApp(p);
                            this.$msg.success('提交成功');
                        }
                    }



                    if (this.actionOk) {
                        await this.actionOk();
                    }
                    this.$emit("onClose");
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

            // 保存onCancel事件，保存操作完成后触发抽屉关闭事件this.$emit("onClose");
            async onCancel() {
                try {
               
                    if(this.detailForm.processStatus=='02'){
                        let openSub = false;
                        if(!loadsh.isEmpty(this.detailForm.applySubId)){
                            openSub = true;
                        }
                        let form =  JSON.parse(JSON.stringify(this.detailForm)) 
                        form.processStatus = '01';
                        if(openSub){
                            const p = this.$api.acntApplyApi.cancelSubApply(form);
                            await this.$app.blockingApp(p);
                            this.$msg.success('提交成功');
                        }else{
                            const p = this.$api.acntApplyApi.cancelApply(form);
                            await this.$app.blockingApp(p);
                            this.$msg.success('提交成功');
                        }
  
                    }
                    if (this.actionOk) {
                        await this.actionOk();
                    }
                    this.$emit("onClose");
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            showInsertDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: ['账户录入'],
                    component: AcntApplyInsert,
                    args: {row, mode, actionOk},
                    okButtonVisible:mode!=='view'
                })
            },
            onInsertApply(){
                this.reloadData();
            },
            insertApply() {
                this.showInsertDlg('add', {}, this.onInsertApply.bind(this));
            },

        },

        watch: {
            'detailForm.productCode'(val){
                if(loadsh.isEmpty(val)){
                    this.detailForm.productName=''
                }else{
                    for(let i=0;i<this.productList.length;i++){
                        if(this.productList[i].productCode==val){
                            this.detailForm.productName=this.productList[i].productName
                        }
                    }
                }
            },
        }
    }
</script>
