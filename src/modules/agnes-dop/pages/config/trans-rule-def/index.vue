<template>
    <gf-grid grid-no="agnes-trans-rule" ref="grid" quick-text-max-width="300px" height="100%" >
        <template slot="left" >
            <gf-button class="action-btn"  @click="addRule" size="mini">添加</gf-button>
        </template>
    </gf-grid>
</template>

<script>
    import RuleConfigDlg from "./rule-config";
    import RuleDetailConfig from "./rule-detail-config";

    export default {
        data(){
            return {
            }
        },
        mounted() {
        },
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            async rollBack() {
                this.reloadData();
            },
            async addRule(){
                this.showDlg('add', {}, this.rollBack.bind(this));
            },
            async editRule(params){
                this.showDlg('edit', params.data, this.rollBack.bind(this));
            },
            async deleteRule(params){
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除所选记录吗, 是否继续?`);
                if (!ok) {
                    return
                }
                row.isDel = '1';
                row.isCheckd = false;
                try {
                    const p = this.$api.wordsTranslApi.saveTranslRule(row);
                    await this.$app.blockingApp(p);
                    this.$msg.success('删除成功！');
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            showDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                let title = this.$dialog.formatTitle('规则配置', mode);
                this.$nav.showDialog(
                    RuleConfigDlg,
                    {
                        args: {row, mode, actionOk},
                        width: '50%',
                        title: title,
                    }
                );
            },
            async addRuleDetail(params){
                this.showDetailConfig(params.data,"add",this.reloadData.bind(this));
            },
            showDetailConfig(row, mode, actionOk){
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                // 抽屉创建
                this.$drawerPage.create({
                    width: 'calc(100% - 250px)',
                    title: ['规则明细配置'],
                    args: {row, mode, actionOk},
                    component:RuleDetailConfig,
                    pageEl: this.$el
                })
            },

        },
    }

</script>
