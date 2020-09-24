<template>
    <div>
        <div class="dialog-footer-bar footer" slot="content">
            <gf-button @click="cancel">取消</gf-button>
            <gf-button type="primary"  @click="onSave">保存</gf-button>
        </div>
        <el-row>
            <el-input v-model="filterText" size="mini" placeholder="检索应用..."
                      suffix-icon="fa fa-search"></el-input>
        </el-row>
        <el-tree ref="tree"
                 :data="treeData"
                 node-key="id"
                 :current-node-key="currentKey"
                 default-expand-all
                 :expand-on-click-node="false"
                 :filter-node-method="filterNode">
        </el-tree>
    </div>
</template>

<script>
    export default {
        props: {
            mode: {
                type: String
            },
            row:Object,
            actionOk: Function
        },
        data(){
            return{
                treeData:[],
                currentKey:'',
                filterText:''
            }
        },
        beforeMount() {
            this.getOrgTreeNodes();
            this.currentKey=this.row.id;
        },
        methods: {
            async getOrgTreeNodes(){
                try {
                    this.treeData = [];
                    const resp = await this.$api.orgDefineApi.getOrgTreeNodes();
                  this.treeData.push(resp.data);
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            filterNode(value, data) {
                return data.label.indexOf(value) >= 0;
            },
            onSave() {
                let nodeInfo = this.$refs.tree.getCurrentNode(true);
                if(!nodeInfo || nodeInfo.id==='root'){
                    nodeInfo={id:"root",label:"机构树",extOrgName:'机构树',extOrgId:'root'};
                }
                this.actionOk(nodeInfo);
                this.cancel();
            },
            cancel(){
                this.$dialog.close(this.$parent);
            }
        },
        watch:{
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        }
    }
</script>
