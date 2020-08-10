<template>
    <el-container>
        <el-aside width="200px" class="el-border">
            <el-row>
                <el-input v-model="filterText" size="mini" placeholder="检索机构..."
                          suffix-icon="fa fa-search"></el-input>
            </el-row>
            <el-tree ref="tree"
                     :data="treeData"
                     node-key="id"
                     default-expand-all
                     @node-click="handleNodeClick"
                     :filter-node-method="filterNode"
                     style="border: 1px solid #eee;border-radius: 0;overflow-y: auto;height: 97%;margin-top:4px">
            </el-tree>
        </el-aside>
        <el-container style="height: 100%">
            <el-main height="100%" style="padding-top: 0px;padding-bottom: 0px" class="el-border">
                <ProductList :reqData="reqData"></ProductList>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import ProductList from "./product-list"
    // import LinkManGroup from "./product-group-dlg"

    export default {
        name: "index",
        components: {
            ProductList
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

</style>