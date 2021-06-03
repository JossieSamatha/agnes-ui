<template>
    <el-dialog class="manage-tree-dialog" title="数据选择" :visible.sync="dialogVisible">
        <TreeComp class="manage-tree" ref="manageTree" :treeOptions="treeOptions"></TreeComp>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>  
        </span>
    </el-dialog>
</template>

<script>
    import TreeComp from './tree-comp.vue';

    export default {
        props: {
            data: {
                type: Array
            }
        },
        components: {
            TreeComp
        },
        data() {
            return {
                dialogVisible: false
            }
        },
        computed: {
            treeOptions(){
                return [{
                    treeData: this.data,
                    defaultProps: {
                        'show-checkbox': true
                    }
                }]
            }
        },
        methods: {
            // 弹框显示
            show() {
                this.dialogVisible = true;
            },

            // 弹框关闭
            hide() {
                this.dialogVisible = false;
            },

            // 弹框确认
            confirm() {
                const manageTree = this.$refs.manageTree;
                if (manageTree && manageTree.$refs.treeComp) {
                    const checkedKeys = manageTree.$refs.treeComp[0].getCheckedKeys();
                    const checkedHalfKeys = manageTree.$refs.treeComp[0].getHalfCheckedKeys();
                    const permissions = checkedKeys.concat(checkedHalfKeys);
                    const resultTree = this.childrenCategory(this.$lodash.cloneDeep(this.data), permissions);
                    this.$emit('checkNodes', resultTree);
                    this.hide();
                }
            },

            childrenCategory(children, checkedKeys) {
                return children.filter(child => {
                    if (child.children) {
                        child.children = this.childrenCategory(child.children, checkedKeys);
                    }
                    return checkedKeys.includes(child.id);
                });
            }
        }
    }
</script>
<style scoped>
    .manage-tree-dialog ::v-deep .el-dialog {
        height: auto;
        min-height: 400px;
        max-height: 75%;
    }

    .manage-tree ::v-deep .el-tree {
        height: 100%;
        flex: 1;
        overflow-y: auto;
    }
</style>
