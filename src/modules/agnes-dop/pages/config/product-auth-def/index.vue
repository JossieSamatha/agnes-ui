<template>
    <el-container>
        <el-container style="height: 100%">
            <el-main height="100%" style="padding-top: 0px;padding-bottom: 0px" class="el-border">
                <gf-grid grid-no="agnes-product-auth-field" ref="grid" quick-text-max-width="300px"
                        height="100%">
                </gf-grid>
            </el-main>
        </el-container>
        <el-aside width="400px" class="el-border">
            <el-row class="button-body">
                <el-input v-model="filterText" size="mini" placeholder="检索机构..."
                          suffix-icon="fa fa-search"></el-input>
                <gf-button style="marginLeft:12px" class="action-btn" type="primary" size="mini">保存</gf-button>
            </el-row>
            <el-tree ref="tree"
                    :data="treeData"
                    node-key="id"
                    show-checkbox
                    @check-change="handleCheckChange"
                    default-expand-all
                    @node-click="handleNodeClick"
                    :filter-node-method="filterNode"
                    style="border: 1px solid #eee;border-radius: 0;overflow-y: auto;height: 97%;margin-top:4px">
            </el-tree>
        </el-aside>

    </el-container>
</template>

<script>
    
    // import LinkManGroup from "./product-group-dlg"

    export default {
        name: "index",
        components: {
           
        },
        data() {
            return {
                filterText: '',
                treeData: [],
                reqData: {
                    extOrgId: '',
                    linkmanGroupId: ''
                },
                defaultProps: {
                    children: 'children',
                    label: 'linkmanGroupName'
                },

            }
        },
        mounted() {
            this.loadTreeNodes();
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            },
        },
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            handleCheckChange(data, checked, indeterminate) {
                
            },
            filterNode(value, data) {
                return data.label.indexOf(value) >= 0;
            },

            async loadTreeNodes() {
                try {
                    const resp = await this.$api.orgDefineApi.getOrgTreeNodes();
                    this.treeData = resp.data;
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

            handleNodeClick(data) {
                this.reqData.extOrgId='';
                if (data.extOrgId) {
                    this.reqData.extOrgId = data.extOrgId
                }
            },
        },
    }
</script>

<style scoped>
    .el-border {
        border: 1px solid rgb(238, 238, 238);
    }
    .button-body{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        /* padding-top: 6px; */
        padding-bottom: 6px;
    }

</style>