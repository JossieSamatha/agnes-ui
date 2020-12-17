<template>
    <div>
        <el-table
                :data="tableData"
                height="100%"
                style="width: 100%">
            <el-table-column
                    prop="resName"
                    label="菜单名称"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="actionUrl"
                    label="菜单路径"
                    width="300">
            </el-table-column>
            <el-table-column
                    label="是否需要回收"
                    width="200">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.isNeedReCover"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column
                    label="是否需要复核"
                    width="200">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.isNeedCheck"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column
                    label="导入"
                    width="200">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.isInput" placeholder="请选择" filterable clearable style="width: 100%">
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
                    label="导出"
                    width="200">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.isOutput" placeholder="请选择" filterable clearable style="width: 100%">
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
                    label="帮助文档"
                    width="200">
                <template slot-scope="scope">
                    <em class="edit-btn fa fa-edit" @click="editHelpContent(scope.$index, scope.row)"></em>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="筛选条件配置" :visible.sync="filterConfDialog" :modal-append-to-body="false">
            <div style="height: 100%">
                <quill-editor class="gf-quill-editor"
                              ref="myTextEditor"
                              :options="editorOption"
                              v-model="content"
                              :config="editorOption"
                              style="height: 400px"
                ></quill-editor>
                <dialog-footer :on-save="onSave" on-cancel="onCancel"></dialog-footer>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import AddHelpContentDlg from "./add-help-content";
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
                filterConfDialog: false,
                editorOption: {
                },
                content:'',
                editRowIndex: -1,
                analyRuleList:[{'pkId':"0",'ifName':'ces'}],
                tableData:[{'resName':'jjjjjj','isNeedReCover':'1','isNeedCheck':'1','actionUrl':'jjjjjj','isInput':'0','isOutput':'0','content':'0'}],
            };
        },
        beforeMount() {
            this.getAnalyRules();
        },
        methods:{
            async getAnalyRules(){
                // let resp = await this.$api.fileScan.queryRuleConfigList();
                // this.analyRuleList = resp.data;
            },
            async onSave(){
                this.filterConfDialog = true;
            },
            async onCancel() {
                this.filterConfDialog = false;
            },
            editHelpContent(index,row){
                console.log(row.content);
                this.$dialog.create({
                    title: '编辑阶段',
                    width: '800px',
                    height: '900px',
                    component: AddHelpContentDlg,
                    args: {data: row},
                    beforeClose: function (item) {
                        row.content = item.content;
                    }
                })
                // this.$drawerPage.create({
                //     width: 'calc(97% - 215px)',
                //     title: ['功能帮助信息填写'],
                //     component: AddHelpContentDlg,
                //     args: {row, actionOk}
                // });
            }
        }
    };
</script>
