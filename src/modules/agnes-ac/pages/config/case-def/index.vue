<template>
    <div>
        <gf-grid ref="grid"
                 grid-no="agnes-case-field"
                 toolbar="find,refresh,more"
                 @row-double-click="showCaseStep"
         >
            <template slot="left">
                <gf-button class="action-btn" @click="addCaseDef" size="mini">添加</gf-button>
                <gf-button class="action-btn" @click="publishCaseDef" size="mini">发布</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import CaseDefDlg from "./case-field-dlg";
    export default {
        methods: {
            reloadData() {
                this.$refs.grid.reloadData(true);
            },
            showDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$nav.showDialog(
                    CaseDefDlg,
                    {
                        args: {row, mode, actionOk},
                        width: '576px',
                        title: this.$dialog.formatTitle('case定义', mode),
                    }
                );
            },
            async onAddCaseDef() {
                await this.reloadData();
            },
            async onEditCaseDef() {
                await this.reloadData();
            },
            addCaseDef() {
                this.showDlg('add', {}, this.onAddCaseDef.bind(this));
            },
            showCaseDef(params) {
                this.showDlg('view', params.data);
            },
            editCaseDef(params) {
                this.showDlg('edit', params.data, this.onEditCaseDef.bind(this));
            },
            showCaseStep(params){
                // 抽屉创建
                this.$drawerPage.create({
                    width: 'calc(92% - 215px)',
                    title: '',
                    component: 'case-config-index',
                    wrapperClosable: true,
                    args: {caseDefInfo:params.data}
                })
            },
            async deleteCaseDef(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除case:[${row.caseDefName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.caseConfigApi.deleteCaseDef(row.caseDefId);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async publishCaseDef(){
                let row;
                const rows = this.$refs.grid.getSelectedRows();
                if(rows.length>0){
                    row = rows[0];
                    if(row.caseStatus === '1'){
                        this.$msg.warning("该CASE已发布")
                        return;
                    }else{
                        row.caseStatus = '1';
                    }
                    if(!row.caseDefBody){
                        this.$msg.warning("请先配置CASE步骤再发布")
                        return;
                    }
                }else{
                    this.$msg.warning("请选择一条数据")
                    return;
                }
                try {
                    const p = this.$api.caseConfigApi.publishCaseDef(row);
                    await this.$app.blockingApp(p);
                    this.$msg.success('发布成功');
                    this.reloadData();
                } catch (e) {
                    this.$msg.error(e);
                }
            }
        }
    }
</script>
