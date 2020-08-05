<template>
    <el-form ref="fileAnalyForm" :model="configInfo" :disabled="mode==='view'"
             :rules="configInfoRules" label-width="110px" style="max-width: 1100px">
        <el-row>
            <el-col :span="6">
                <el-form-item label="接口代码" prop="ifCode">
                    <gf-input v-model="configInfo.ifCode" placeholder="请输入接口代码..."></gf-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="接口名称" prop="ifName">
                    <gf-input v-model="configInfo.ifName" placeholder="请输入接口名称..."></gf-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="执行方式" prop="execType">
                    <el-select v-model="configInfo.execType" placeholder="请选择">
                        <el-option label="导入" value="01"></el-option>
                        <el-option label="导出" value="02"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="接口种类" prop="ifType">
                    <el-select v-model="configInfo.ifType" placeholder="请选择">
                        <el-option label="职业年金" value="A001"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <el-form-item label="文件名称" prop="fileName">
                    <gf-input v-model="configInfo.fileName" placeholder="请输入文件名称..."></gf-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="文件类型" prop="fileType">
                    <el-select v-model="configInfo.fileType" placeholder="请选择">
                        <el-option label="文本文件" value="text"></el-option>
                        <el-option label="EXCEL" value="excel"></el-option>
                        <el-option label="XML文件" value="xml"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="编码方式" prop="encodingType">
                    <el-select v-model="configInfo.encodingType" placeholder="请选择">
                        <el-option label="GBK" value="GBK"></el-option>
                        <el-option label="UTF-8" value="UTF-8"></el-option>
                        <el-option label="GB2312" value="GB2312"></el-option>
                        <el-option label="GB18030" value="GB18030"></el-option>
                        <el-option label="UNICODE" value="UNICODE"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="专用参数" prop="specialArgs">
                    <gf-input v-model="configInfo.specialArgs" placeholder="请输入专用参数..."></gf-input>
                </el-form-item>
            </el-col>
        </el-row>
        <div>
            <el-tabs v-model = "currentTab" type="border-card" editable @edit="handleTabsEdit">
                <el-tab-pane :key="item.name" v-for="(item,index) in configInfo.configDetails" :label="item.title" :name="item.name">
                    <el-form :model="item" v-if="currentTab === item.name">
                        <el-row  v-show="configInfo.fileType !== 'xml'" >
                            <el-col :span="6">
                                <el-form-item label="目标表名">
                                    <gf-input v-model="item.targetTable" size="small" placeholder=""
                                              :disabled="configInfo.execType==='02' && configInfo.fileType==='text'"></gf-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="历史表名">
                                    <gf-input v-model="item.targetHisTable" size="small" placeholder=""
                                              :disabled="configInfo.execType==='02' && configInfo.fileType==='text'"></gf-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="批次流水字段">
                                    <gf-input v-model="item.batchPkIdField" size="small" placeholder=""
                                              :disabled="configInfo.execType==='02' && configInfo.fileType==='text'"></gf-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row v-show="configInfo.fileType !== 'xml'">
                            <el-col :span="6">
                                <el-form-item label="分隔符类型">
                                    <el-select v-model="item.sepType" size="small" placeholder="" :disabled="configInfo.fileType!=='text'">
                                        <el-option label="固定长度" value="fixed"></el-option>
                                        <el-option label="单行字段" value="line"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="分隔符标记">
                                    <gf-input v-model="item.sepMark" size="small" placeholder="" :disabled="configInfo.fileType!=='text'"></gf-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="源表名称" v-show="configInfo.execType==='01' && configInfo.fileType !== 'text'">
                                    <gf-input v-model="item.sourceTable" size="small" placeholder=""></gf-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row v-show="configInfo.fileType !== 'xml'">
                            <el-col :span="6">
                                <el-form-item label="起始行">
                                    <gf-input v-model="item.startRow" size="small" placeholder="" :disabled="configInfo.fileType==='jdbc'"></gf-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="起始标记">
                                    <gf-input v-model="item.startMark" size="small" placeholder="" :disabled="configInfo.fileType==='jdbc'"></gf-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="结束标记">
                                    <gf-input v-model="item.endMark" size="small" placeholder="" :disabled="configInfo.fileType==='jdbc'"></gf-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="转换类型" v-if="false">
                                    <el-select v-model="item.convertType" size="small" clearable  placeholder="请选择">
                                        <el-option label="行转列" value="row2column"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row  v-show="configInfo.execType === '02' " >
                            <el-col :spam="24" >
                                <el-tabs>
                                    <el-tab-pane label="导出SQL">
                                        <gf-input type="textarea" :rows="8" placeholder="请输入导出SQL..." v-model="item.exportSql"></gf-input>
                                    </el-tab-pane>
                                    <el-tab-pane  label="导出XML"  v-if="configInfo.fileType === 'xml'">
                                        <gf-input type="textarea" :rows="8" placeholder="请输入导出XML..." v-model="item.xmlTemplate"></gf-input>
                                    </el-tab-pane>
                                </el-tabs>
                            </el-col>
                        </el-row>
                    </el-form>
                    <div  v-show="configInfo.fileType !== 'xml'"  style="width: 100%;margin-top: 17px;">
                        <div class="optionButtonGroup">
                            <span>
                                <gf-button @click="addRow(item.fieldMappings)" class="action-btn" size="mini">添加行</gf-button>
                            </span>
                            <span>
                                <gf-button @click="removeRow(item.fieldMappings,index)" class="action-btn" size="mini">删除行</gf-button>
                            </span>
                            <span>
                                <gf-button @click="upRow(item.fieldMappings)" class="action-btn" size="mini">上移</gf-button>
                            </span>
                            <span>
                                <gf-button @click="downRow(item.fieldMappings)" class="action-btn" size="mini">下移</gf-button>
                            </span>
                        </div>
                        <el-row>
                            <el-table ref="multipleTable" stripe border :data="item.fieldMappings" @selection-change="handleSelectionChange" tooltip-effect="dark" style="width:100%;height:280px;overflow-y:scroll;">
                                <el-table-column type="selection" width="55"></el-table-column>
                                <el-table-column type="index" width="50"></el-table-column>
                                <el-table-column label="目标字段">
                                    <template slot-scope="scope"><el-input v-model="scope.row.targetField" size="small" placeholder="请输入目标字段..."></el-input></template>
                                </el-table-column>
                                <el-table-column label="源字段">
                                    <template slot-scope="scope"><el-input v-model="scope.row.sourceField" size="small" placeholder="请输入源字段..."></el-input></template>
                                </el-table-column>
                                <el-table-column label="转换字典">
                                    <template slot-scope="scope"><el-input v-model="scope.row.dictConverter" size="small" placeholder="请输入转换字典..."></el-input></template>
                                </el-table-column>
                                <el-table-column label="空值转换">
                                    <template slot-scope="scope"><el-input v-model="scope.row.nullConverter" size="small" placeholder="请输入空值转换..."></el-input></template>
                                </el-table-column>
                                <el-table-column label="数值格式">
                                    <template slot-scope="scope"><el-input v-model="scope.row.numFormat" size="small" placeholder="请输入数值格式..."></el-input></template>
                                </el-table-column>
                                <el-table-column label="必填">
                                    <template slot-scope="scope">
                                        <el-checkbox v-model="scope.row.mustFill"></el-checkbox>
                                    </template>
                                </el-table-column>
                                <el-table-column label="业务标记">
                                    <template slot-scope="scope">
                                        <el-checkbox v-model="scope.row.deleteFlag"></el-checkbox>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-row>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div style="margin-top: 10px;">
            <el-tabs type="border-card">
                <el-tab-pane label="前置操作">
                    <gf-input type="textarea" :rows="5" placeholder="请输入前置操作..." v-model="configInfo.headSql"></gf-input>
                </el-tab-pane>
                <el-tab-pane label="后置操作">
                    <gf-input type="textarea" :rows="5" placeholder="请输入后置操作..." v-model="configInfo.tailSql"></gf-input>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-form>
</template>

<script>

    export default {
        name: "task-define",
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
                configInfo: {
                    ifCode: '',
                    ifName: '',
                    ifType: '',
                    fileName: '',
                    fileType: '',
                    execType: '',
                    specialArgs: '',
                    encodingType: '',
                    headSql: '',
                    tailSql: '',
                    configDetails: []
                },
                currentTab:'1',
                tabIndex: 1,
                multipleSelectedData:[],
                configInfoRules:{
                    ifCode: [
                        {required: true, message: '接口代码必填', trigger: 'blur'},
                    ],ifName: [
                        {required: true, message: '接口名称必填', trigger: 'blur'},
                    ],execType: [
                        {required: true, message: '执行方式必填', trigger: 'blur'},
                    ],ifType: [
                        {required: true, message: '接口种类必填', trigger: 'blur'},
                    ],fileName: [
                        {required: true, message: '文件名称必填', trigger: 'blur'},
                    ],fileType: [
                        {required: true, message: '文件类型必填', trigger: 'blur'},
                    ],encodingType: [
                        {required: true, message: '编码方式必填', trigger: 'blur'},
                    ],
                },
            }
        },
        created() {
            Object.assign(this.configInfo, this.row);
            if(this.mode==="edit" || this.mode==="view") {
                this.configInfo = this.row;
                this.currentTab =this.configInfo.configDetails.length+"";
                this.tabIndex = this.configInfo.configDetails.length;
            }else if(this.mode==="add"){
                this.configInfo.configDetails.push({
                    name:'1',title:'字段配置1',targetTable:'',targetHisTable:'',batchPkIdField:'',sepType:'fixed',sepMark:'',sourceTable:'',startRow:'',startMark:'',endMark:'',exportSql:'',xmlTemplate:'',convertType:'',
                    fieldMappings:[this.createRow()]
                });
            }
        },
        methods: {
            addRow(rows) {
                if(rows) {
                    rows.push(this.createRow());
                }
            },
            createRow(){
                let pkId = this.randomString();
                return {pkId:pkId,targetField:'',sourceField:'',dictConverter:'',nullConverter:'',numFormat:'',deleteFlag:false, mustFill: false};
            },
            randomString(){
                return Math.random().toString(36).substr(2);
            },
            copyRow(targetRow,sourceRow){
                targetRow.pkId = sourceRow.pkId;
                targetRow.targetField = sourceRow.targetField;
                targetRow.sourceField = sourceRow.sourceField;
                targetRow.dictConverter = sourceRow.dictConverter;
                targetRow.nullConverter = sourceRow.nullConverter;
                targetRow.numFormat = sourceRow.numFormat;
                targetRow.deleteFlag = sourceRow.deleteFlag;
                targetRow.mustFill = sourceRow.mustFill;
            },
            removeRow(rows,tabIndex) {
                for(let i= 0,flag=true,len=rows.length ;i<len;flag?i++:i){
                    let isExist = false;
                    for(let j=0;j<this.multipleSelectedData.length;j++){

                        if(rows[i]&&this.multipleSelectedData[j]&&(rows[i].pkId===this.multipleSelectedData[j].pkId)){
                            isExist=true;
                        }
                    }
                    if(isExist){
                        this.$refs.multipleTable[tabIndex].toggleRowSelection(rows[i]);
                        rows.splice(i,1);
                        flag = false;
                    } else {
                        flag = true;
                    }
                }
            },
            upRow(rows) {
                if(this.multipleSelectedData.length===1) {
                    let rowIndex = rows.indexOf(this.multipleSelectedData[0]);
                    if(rowIndex>0){
                        let aboveRow = rows[rowIndex-1];
                        let currentRow = rows[rowIndex];
                        let tempCurrentRow = this.createRow();
                        this.copyRow(tempCurrentRow,currentRow);
                        this.copyRow(currentRow,aboveRow);
                        this.copyRow(aboveRow,tempCurrentRow);
                    }
                }
            },

            downRow(rows) {
                if(this.multipleSelectedData.length===1) {
                    let rowIndex = rows.indexOf(this.multipleSelectedData[0]);
                    if(rowIndex<rows.length-1){
                        let belowRow = rows[rowIndex+1];
                        let currentRow = rows[rowIndex];
                        let tempCurrentRow = this.createRow();
                        this.copyRow(tempCurrentRow,currentRow);
                        this.copyRow(currentRow,belowRow);
                        this.copyRow(belowRow,tempCurrentRow);
                    }
                }
            },
            handleTabsEdit(targetName, action) {
                if (action === 'add') {
                    let newTabName = ++this.tabIndex + '';
                    this.configInfo.configDetails.push({
                        title: '字段配置'+newTabName,
                        name: newTabName,
                        targetTable:'',targetHisTable:'',batchPkIdField:'',sepType:'fixed',sepMark:'',sourceTable:'',startRow:1,startMark:'',endMark:'',exportSql:'',xmlTemplate:'',convertType:'',
                        fieldMappings:[]
                    });
                    this.currentTab = newTabName;
                }
                if (action === 'remove' ){
                    let tabs = this.configInfo.configDetails;
                    let activeName = this.currentTab;
                    if (activeName === targetName) {
                        tabs.forEach(function(tab, index){
                            if (tab.name === targetName) {
                                let nextTab = tabs[index + 1] || tabs[index - 1];
                                if (nextTab) {
                                    activeName = nextTab.name;
                                }
                            }
                        });
                        this.currentTab = activeName;
                        this.configInfo.configDetails = tabs.filter(tab => tab.name !== targetName);
                    }
                }

            },
            handleSelectionChange (val) {
                this.multipleSelectedData = val;
            },
            async onSave() {
                const ok = await this.$refs['fileAnalyForm'].validate();
                if (!ok) {
                    return;
                }
                try {
                    this.configInfo.confDetails=JSON.stringify(this.configInfo.configDetails);
                    const p = this.$api.fileAnaly.saveFileAnaly(this.configInfo);
                    await this.$app.blockingApp(p);
                    if (this.actionOk) {
                        await this.actionOk();
                    }
                    this.$msg.success('保存成功');
                    this.$emit("onClose");
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            // 取消onCancel事件，触发抽屉关闭事件this.$emit("onClose");
            async onCancel() {
                this.$emit("onClose");
            },
        }

    }
</script>

<style>
    .action-btn{
        color: #476DBE !important;
        border: 1px solid #476DBE !important;
    }
</style>