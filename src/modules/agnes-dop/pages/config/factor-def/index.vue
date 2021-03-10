<template>
    <div>
    <gf-grid grid-no="agnes-factor" ref="grid" quick-text-max-width="300px" height="100%">
        <template slot="left" >
            <gf-button class="action-btn" v-if="$hasPermission('agnes.chzh.yzwh.add')" @click="addFactor" size="mini">添加</gf-button>
        </template>
    </gf-grid>
    </div>
</template>

<script>
    import FactorConfigDlg from "./factor-config";

    export default {
        data(){
            return {
                factorConfDialog:false,
                dataSourceOption:[],
                factorObj:{
                    factorName:'',
                    factorType:'',
                    dataSource:'',
                    factorContent:''
                },
                factorRules: {
                    factorName: [
                        {required: true, message: '名称必填！', trigger: 'blur'},
                    ],
                    factorType: [
                        {required: true, message: '请选择类型！', trigger: 'blur'},
                    ],
                }
            }
        },
        mounted() {
            this.getOptions();
            this.reloadData();
        },
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            async rollBack() {
                this.reloadData();
            },
            async addFactor(){
                this.showDlg('add', {}, this.rollBack.bind(this));
            },
            async editFactor(params){
                this.showDlg('edit', params.data, this.rollBack.bind(this));
            },
            async deleteFactor(params){
                const ok = await this.$msg.ask(`确认删除所选择的机构吗, 是否继续?`);
                if (!ok) {
                    return
                }
                const row = params.data;
                row.isDel = '1';
                try {
                    const p = this.$api.wordsTranslApi.saveFactor(row);
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
                let title = this.$dialog.formatTitle('因子配置', mode);
                this.$nav.showDialog(
                    FactorConfigDlg,
                    {
                        args: {row, mode, actionOk},
                        width: '50%',
                        title: title,
                    }
                );
            },
        },
    }

</script>
