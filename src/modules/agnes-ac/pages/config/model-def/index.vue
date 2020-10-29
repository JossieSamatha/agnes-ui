<template>
    <div>
        <gf-grid @row-double-click="showModel" grid-no="agnes-model-type" ref="grid">
            <template slot="left">
                <gf-button class="action-btn" @click="addModel" v-if="$hasPermission('agnes.config.model.add')">添加</gf-button>
                <gf-button class="action-btn" @click="copyModel" v-if="$hasPermission('agnes.config.model.copy')">复制</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import ModelTypeDlg from "./model-type-dlg";

    export default {
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            showDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row ) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                let title = this.$dialog.formatTitle('业务对象定义', mode);
                if(mode == 'check'){
                    title = '业务对象定义 - 审核';
                }
                this.$nav.showDialog(
                    ModelTypeDlg,
                    {
                        args: {row, mode, actionOk},
                        width: '50%',
                        title: title,
                    }
                );
            },
            async onAddModel() {
                this.reloadData();
            },
            async onEditModel() {
                this.reloadData();
            },
            addModel() {
                this.showDlg('add', {}, this.onAddModel.bind(this));
            },
            showModel(params) {
                this.showDlg('view', params.data);
            },
            approveModelDef(params) {
                this.showDlg('check', params.data, this.onEditModel.bind(this));
            },
            editModel(params) {
                this.showDlg('edit', params.data, this.onEditModel.bind(this));
            },
            async publishModelDef(params){
                try {
                    const p = this.$api.modelConfigApi.changeStatus({modelType:{modelTypeId:params.data.modelTypeId,status:'03'}});
                    await this.$app.blockingApp(p);
                    this.reloadData();
                    this.$msg.success('发布成功');
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            copyModel(){
                let rows = this.$refs.grid.getSelectedRows();
                let row =[];
                if(rows.length>0){
                    row = rows[0];
                }else{
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                let copyRowData = this.$utils.deepClone(row);
                copyRowData.isCopy=true;
                copyRowData.status='01';
                copyRowData.typeCode='';
                copyRowData.typeName='';
                this.showDlg('edit', copyRowData, this.onEditModel.bind(this));
            },
            async deleteModel(params) {
                const row = params.data;
                let rows = this.$refs.grid.getSelectedRows();
                if(!rows){
                    this.$msg.warning("请选中一条记录!");
                    return
                }
                const ok = await this.$msg.ask(`确认删除模型类型:[${row.typeName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.modelConfigApi.deleteModel(row.modelTypeId);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            }
        }
    }
</script>