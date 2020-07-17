<template>
    <gf-grid grid-no="agnes-linkman-field" ref="grid" quick-text-max-width="300px"
              :query-args="queryArgs" height="100%" @row-double-click="showLinkman">
        <template slot="left">
            <gf-button @click="addLinkMan">新增</gf-button>
            <gf-button @click="editLinkMan">修改</gf-button>
            <gf-button @click="deleteLinkMan" size="mini">删除</gf-button>
        </template>
    </gf-grid>
</template>

<script>
    import linkManBaseDlg from "./linkman-base-dlg"
    export default {
        data() {
            return {
                form:{
                    linkManIdList:[]
                },
                queryArgs:{
                    'extOrgId':'',
                    'linkmanGroupId':''
                }
            }
        },
        props: {
            reqData:{
                type:Object,
                request:true
            }
        },
        watch: {
            reqData:{
                handler() {
                    if (this.reqData.extOrgId) {
                        this.queryArgs.extOrgId = this.reqData.extOrgId;
                        this.queryArgs.linkmanGroupId = this.reqData.linkmanGroupId;
                        this.reloadData();
                    }
                },
                deep:true
            }
        },
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            showDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$nav.showDialog(
                    linkManBaseDlg,
                    {
                        args: {row, mode, actionOk},
                        width: '55%',
                        title: this.$dialog.formatTitle('联系人信息', mode),
                    }
                );
            },
            async onAddLoad() {
                this.reloadData()
            },
            addLinkMan() {
                if(!this.reqData.extOrgId){
                    this.$msg.warning("请先选中机构!");
                    return
                }
                this.showDlg('add', {"extOrgId":this.reqData.extOrgId}, this.onAddLoad.bind(this));
            },
            showLinkman(params) {
                this.showDlg('view', params.data);
            },
            editLinkMan() {
                let rows= this.$refs.grid.getSelectedRows();
                if(rows.length !== 1){
                    this.$msg.warning("请选中一条记录!");
                    return
                }
                this.showDlg('edit', rows[0], this.onAddLoad.bind(this));
            },
            async deleteLinkMan() {
                let rows= this.$refs.grid.getSelectedRows();
                if(rows.length===0){
                    this.$msg.warning("请至少选中一条记录!");
                    return
                }
                rows.forEach(row=>{
                    this.form.linkManIdList.push(row.linkmanId)
                })
                const ok = await this.$msg.ask(`确认删除选中的联系人吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.linkmanApi.deleteLinkMan(this.form);
                    await this.$app.blockingApp(p);

                    this.$msg.success('删除成功');
                    await this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
        },
    }
</script>

<style scoped>

</style>