<template>
    <el-container>
        <ProductList></ProductList>
    </el-container>
</template>

<script>
    import ProductList from "./product-list"

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