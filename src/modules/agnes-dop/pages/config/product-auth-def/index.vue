
<template>
    <el-container>
        <el-container style="height: 100%;width:60%">
            <el-main height="100%" style="padding-top: 0px;padding-bottom: 0px" class="el-border">
                <gf-grid grid-no="agnes-product-auth-field" ref="grid" quick-text-max-width="300px"
                        height="100%">
                </gf-grid>
            </el-main>
        </el-container>
        <el-aside width="40%" class="el-border">
            <el-row class="button-body">
                <el-input v-model="filterText" size="mini" placeholder="检索..."
                          suffix-icon="fa fa-search"></el-input>
                <gf-button style="marginLeft:12px" @click="saveAuth" class="action-btn" type="primary" size="mini">保存</gf-button>
            </el-row>
            <el-tree ref="tree"
                    v-loading="loading"
                    :data="treeData"
                    node-key="id"
                    :default-checked-keys="treeCheckedData"
                    show-checkbox
                    default-expand-all
                    @node-click="handleNodeClick"
                    :filter-node-method="filterNode"
                    style="border: 1px solid #eee;border-radius: 0;overflow-y: auto;height: 97%;margin-top:4px">
            </el-tree>
        </el-aside>

    </el-container>
</template>

<script>
    import loadsh from 'lodash';
    // import LinkManGroup from "./product-group-dlg"

    export default {
        name: "index",
        components: {
           
        },
        data() {
            return {
                loading:false,
                treeCheckedData:[],//树状结构中选中项目
                checkPerson:{},//选中的用户信息
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
    
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            },
        },
        methods: {
            searchProduct(params){
                this.checkPerson = params
                //此处可将选择行的数据作为参数传回搜索产品数据接口
                this.loadTreeNodes(params.data.userId);
            },
            reloadData() {
                this.$refs.grid.reloadData();
            },
            async saveAuth(){
                let checkData = this.$refs.tree.getCheckedNodes();//获取到所有选中的树节点
                let checkDataTranster = [];
                for(let i=0;i<checkData.length;i++){
                    if(loadsh.isEmpty(checkData[i].children)){
                       checkDataTranster.push({'productId':checkData[i].productId,'productCode':checkData[i].productCode}); 
                    }
                }
                try {
                    await this.$api.productAuthApi.saveAuth(this.checkPerson.data.userId,checkDataTranster);
                    await this.reloadData();
                    this.treeData=[];
                } catch (reason) {
                    this.$msg.error(reason);
                }

            },
            filterNode(value, data) {
                return data.label.indexOf(value) >= 0;
            },

            async loadTreeNodes(userId) {
                try {
                    this.loading = true;
                    const resp = await this.$api.productAuthApi.searchProdutById(userId);
                    this.treeData = resp.data;
                    this.treeCheckedData = [];
                    for(let i =0;i<resp.data.length;i++){
                        if(!loadsh.isEmpty(resp.data[i].children)){
                            for(let j=0;j<resp.data[i].children.length;j++){
                                if(resp.data[i].children[j].isChecked==='1'){
                                    this.treeCheckedData.push(resp.data[i].children[j].id)
                                }
                            }
                        }
                    }
                    this.loading = false;
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
        padding-bottom: 6px;
    }

</style>