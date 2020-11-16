<template>
    <div>
        <gf-grid ref="grid"
                 grid-no="acnt-type-field"
                 toolbar="find,refresh,more"
                 quick-text-max-width="300px"
                 @row-double-click="showDetail"
        >
            <template slot="left">
                <gf-button class="action-btn" @click="addType" size="mini"
                           v-if="$hasPermission('agnes.acnt.type.add')">添加</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
import AcntTypeDetail from './acnt-type-detail'
    export default {
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            async onAdd() {
                await this.reloadData();
            },
            async onUpdate() {
                await this.reloadData();
            },
            addType() {
                this.showDlg({},'add', this.onAdd.bind(this));
            },
            editType(params){
                this.showDlg(params.data,'edit' , this.onUpdate.bind(this));
            },
            showDetail(params){
                this.showDlg(params.data,'view' , this.onUpdate.bind(this));
            },
            showDlg(row, mode, actionOk){
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                // 抽屉创建
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: ['账户类型配置',mode],
                    component: AcntTypeDetail,
                    args: {row, mode, actionOk},
                    okButtonVisible:mode!=='view'
                })
            },
            async deleteType(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除账户类型:[${row.typeName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.acntTypeApi.deleteAcntType(row.typeId);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
        }
    }
</script>