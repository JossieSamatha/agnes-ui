<template>
    <div>
        <div class="option-panel">
            <span>
                <el-button @click="reflashMenu">加载菜单</el-button>
                <el-button @click="saveConfig">保存配置</el-button>
            </span>
            <div class="option-search">
                <p class="option-label"></p>
                <el-input placeholder="请输入菜单名称"
                          v-model="stageData.resName"
                          :clearable="true"/>
                <em class="icon el-icon-search" @click="onSearch"/>
            </div>


        </div>
        <el-table class="el-table-grid"
                  :data="this.tableData"
                  border
                  height="100%">
            <el-table-column
                    align="center"
                    header-align="center"
                    label="菜单名称" prop="resName">
            </el-table-column>
            <el-table-column
                    align="center"
                    header-align="center"
                    label="菜单路径" prop="actionUrl">
            </el-table-column>
            <el-table-column
                    align="center"
                    header-align="center"
                    label="是否需要回收"
                    width="200">
                <template slot-scope="scope">
                    <gf-strbool-checkbox v-model="scope.row.isNeedRecover"></gf-strbool-checkbox>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    header-align="center"
                    label="是否需要复核"
                    width="200">
                <template slot-scope="scope">
                    <gf-strbool-checkbox v-model="scope.row.isNeedCheck"></gf-strbool-checkbox>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    header-align="center"
                    label="导入"
                    width="200">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.inputParam" placeholder="请选择" filterable clearable style="width: 100%">
                        <gf-filter-option
                                v-for="item in analyRuleList"
                                :key="item.pkId"
                                :label="item.ifName"
                                :value="item.pkId">
                        </gf-filter-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    header-align="center"
                    label="导出"
                    width="200">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.outputParam" placeholder="请选择" filterable clearable style="width: 100%">
                        <gf-filter-option
                                v-for="item in analyRuleList"
                                :key="item.pkId"
                                :label="item.ifName"
                                :value="item.pkId">
                        </gf-filter-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    header-align="center"
                    label="帮助文档"
                    width="200">
                <template slot-scope="scope">
                    <em class="edit-btn fa fa-edit" @click="editHelpContent(scope.row)"></em>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="筛选条件配置" :visible.sync="filterConfDialog" :modal-append-to-body="false">
            <div style="height: 100%">
                <quill-editor class="gf-quill-editor"
                              ref="myTextEditor"
                              :options="editorOption"
                              v-model="editCurrentData.content"
                              :config="editorOption"
                              style="height: 400px"
                ></quill-editor>
                <dialog-footer :on-save="onSave" :on-cancel="onCancel"></dialog-footer>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                stageData: {
                    resName: '',
                    actionUrl: '',
                },
                filterConfDialog: false,
                editCurrentData:{},
                editCurrentContent:'',
                editorOption: {
                },
                analyRuleList:[],
                tableData:[],
            };
        },
        mounted() {
            this.initData();
        },
        methods:{
            async initData(){
                let resp = await this.$api.fileScan.queryRuleConfigList();
                this.analyRuleList = resp.data;
                this.onSearch();
            },
            async reflashMenu(){
                const ok = await this.$msg.ask(`是否重新加载菜单数据?`);
                if (!ok) {
                    return
                }
                try {
                    await this.$api.funcConfigApi.reloadMenuForConfig();
                    this.$msg.success('更新成功');
                    this.onSearch();
                }catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async saveConfig(){
                const ok = await this.$msg.ask(`是否保存当前页面修改的数据?`);
                if (!ok) {
                    return
                }
                try {
                    let data = this.tableData;
                    await this.$api.funcConfigApi.saveMenuConfig({'menuConfigs': data});
                    this.$msg.success('保存成功');
                    this.onSearch();
                }catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async onSearch() {
                //数据接口
                let resp = await this.$api.funcConfigApi.getMenuConfigList({"resName":this.stageData.resName});
                this.tableData = resp.data;
            },
            async onSave(){
                this.filterConfDialog = false;
            },
            async onCancel() {
                this.editCurrentData.content = this.editCurrentContent;
                this.filterConfDialog = false;
            },
            editHelpContent(row){
                this.editCurrentContent = '';
                this.editCurrentData = row;
                this.editCurrentContent = row.content;
                this.filterConfDialog = true;
            }
        }
    };
</script>
