<template>
    <div style="height: 100%">
        <el-form label-width="90px" :rules="detailFormRules" :disabled="this.mode=='view'">
            <el-form-item label="菜单名称" prop="actionUrl" >
                <el-select v-model="config.actionUrl"
                           filterable clearable
                           placeholder="请选择" style="width: 40%">
                    <gf-filter-option
                            v-for="item in menuList"
                            :key="item.actionUrl"
                            :label="item.resName"
                            :value="item.actionUrl">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item label="菜单路径">
                <gf-input :disabled="true" v-model="config.actionUrl" style="width: 40%"/>
            </el-form-item>
            <el-form-item label="功能类型" prop="funcType">
                <gf-dict v-model="config.funcType" dict-type="AGNES_FUNC_CONFIG_TYPE" style="width: 40%"/>
            </el-form-item>
            <el-form-item label="解析规则" prop="analyRuleId" v-show="config.funcType!=='0'">
                <el-select v-model="config.analyRuleId"
                           filterable clearable
                           placeholder="请选择" style="width: 40%">
                    <gf-filter-option
                            v-for="item in analyRuleList"
                            :key="item.pkId"
                            :label="item.ifName"
                            :value="item.pkId">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item  label="备注" prop="remark">
                <gf-input v-model="config.remark" type="textarea"
                          :rows="2" placeholder="备注" style="width: 40%"/>
            </el-form-item>
        </el-form>
        <quill-editor class="gf-quill-editor"
                      ref="myTextEditor"
                      :options="editorOption"
                      v-model="config.content"
                      :config="editorOption"
                      style="margin-top: 5px"
                      v-show="config.funcType==='0'"
                      :disabled="this.mode==='view'"
        ></quill-editor>

    </div>
</template>
<script>
    import { quillEditor } from "vue-quill-editor"; // 导入quillEditor组件
    import 'quill/dist/quill.js';
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
                editorOption: {
                },
                menuList:[],
                analyRuleList:[],
                config:{pkId:'',menuId:'',isNeedCheck:false,menuName:'',analyRuleId:'',funcType:'0',content:'',remark:'',actionUrl:''},
                detailFormRules: {
                    actionUrl: [
                        {required: true, message: '必填', trigger: 'blur'},
                    ],
                    funcType: [
                        {required: true, message: '必填', trigger: 'blur'},
                    ]
                },
            };
        },
        components: {
            quillEditor
        },
        beforeMount() {
            if(this.mode!=='add'){
                Object.assign(this.config, this.row);
            }
            this.getAnalyRules();
        },
        methods:{
            async getAnalyRules(){
                let resp = await this.$api.fileScan.queryRuleConfigList();
                this.analyRuleList = resp.data;
                let resp2 = await this.$api.funcConfigApi.getMenuList();
                this.menuList = resp2.data
            },
            async onSave(){
                for(let i=0;i<this.menuList.length;i++){
                    if(this.menuList[i].actionUrl==this.config.actionUrl){
                        this.config.menuName=this.menuList[i].resName
                        break;
                    }
                }
                if(this.mode ==='add' || this.row.actionUrl !== this.config.actionUrl){
                    this.config.isNeedCheck = true;
                }
                try {
                    let p = this.$api.funcConfigApi.saveFuncConfig(this.config);
                    let res = await this.$app.blockingApp(p);
                    if(res.code==='repeat'){
                        this.$msg.error(res.message);
                        return ;
                    }
                    this.$msg.success('保存成功');
                    if (this.actionOk) {
                        this.actionOk();
                    }
                    this.$emit("onClose");
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async onCancel() {
                this.$emit("onClose");
            },
        }
    };
</script>
