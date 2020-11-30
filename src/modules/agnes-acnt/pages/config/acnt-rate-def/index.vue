<template>
    <div>
        <el-form class="search-panel" label-width="100px">
            <div class="line">
                <el-form-item label="账户名称">
                    <el-input v-model="queryArgs.acntName"></el-input>
                </el-form-item>
                <el-form-item label="方案名称" >
                    <el-input v-model="queryArgs.rateName"></el-input>
                </el-form-item>

                <el-button @click="reloadData" class="option-btn" type="primary">查询</el-button>
            </div>
            <div class="line">
                <el-form-item label="利率">
                    <el-input v-model="queryArgs.rateStr" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
                </el-form-item>

                <el-form-item label="状态">
<!--                    <gf-dict filterable clearable v-model="queryArgs.status" dict-type="AGNES_RELEASE_STATUS" />-->
                    <el-select style="width: 100%" class="multiple-select" v-model="queryArgs.status"
                               clearable filterable
                               placeholder="请选择">
                        <gf-filter-option
                                v-for="item in releaseStatusList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </gf-filter-option>
                    </el-select>
                </el-form-item>

                <el-button @click="reSetSearch" class="option-btn">重置</el-button>
            </div>
        </el-form>
        <gf-grid grid-no="agnes-rate-def" ref="grid"  toolbar="find,refresh,more" :query-args="queryArgs">
        </gf-grid>
    </div>
</template>

<script>
    import RateDefDlg from "./rate-def-dlg";

    export default {
        data(){
            return{
                queryArgs:{
                    'acntName':'',
                    'rateName':'',
                    'rateStr':'',
                    'status':''
                },
                releaseStatusList: [
                    {value: '01', label: '待复核'},
                    {value: '02', label: '待发布'},
                    {value: '03', label: '已发布'},
                    {value: '05', label: '已作废'}
                ]

            }
        },
        methods: {
            reSetSearch() {
                this.queryArgs = {
                    'acntName':'',
                    'rateName':'',
                    'rateStr':'',
                    'status':''
                };
                this.reloadData();
            },
            reloadData() {
                this.$refs.grid.reloadData();
            },
            showDlg(mode, row, ui, actionOk) {
                let title = this.$dialog.formatTitle("账户利率维护",mode);
                if(mode == 'check'){
                    title = '';
                }
                this.$nav.showDialog(
                    RateDefDlg,
                    {
                        args: {row, mode, ui, actionOk},
                        width: '50%',
                        title:title
                    }
                );
            },
            async onAdd() {
                this.reloadData();
            },

            editRateScheme(params) {
                this.showDlg('edit', params.data,"", this.onAdd.bind(this));
            },
            checkRateScheme(params) {
                this.showDlg('check', params.data,"1", this.onAdd.bind(this));
            },
            async stopRateScheme(params) {
                let msg = "确认停用吗, 是否继续?";
                const ok = await this.$msg.ask(msg);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.acntSchemeApi.stopRateScheme(params.data);
                    await this.$app.blockingApp(p);
                    this.$msg.success("停用成功!");
                    this.reloadData();
                } catch (e) {
                    this.$msg.error(e);
                }
            },
            async startRateScheme(params) {
                let msg = "确认启用吗, 是否继续?";
                const ok = await this.$msg.ask(msg);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.acntSchemeApi.startRateScheme(params.data);
                    await this.$app.blockingApp(p);
                    this.$msg.success("启用成功!");
                    this.reloadData();
                } catch (e) {
                    this.$msg.error(e);
                }
            },

            async deleteRateScheme(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除所选记录吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.acntSchemeApi.deleteRateScheme(row.pkId);
                    await this.$app.blockingApp(p);
                    this.$message.success("删除成功！")
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            }
        }
    }
</script>
