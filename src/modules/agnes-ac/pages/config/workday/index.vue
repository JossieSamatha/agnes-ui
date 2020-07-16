<template>
    <div>
        <el-row>
            <el-col  :span="4" style="height:100%">
                <div  style="height:100%;border:1px solid #000">
                    <el-button size="small">同步</el-button>

                    <div v-for="(item,index) in areaList" :key="index"
                        :v-model="queryParam.workdayAreaCode"
                    @click="choseOptions(index,item)"
                    v-bind:class="{'act-button':flag==index}">
                        <gf-button type="text" >{{item.dictName}}</gf-button>
                    </div>
                </div>
            </el-col>
            <el-col :span="20">
                <div>
                    <gf-grid  @row-double-click="editWorkday"
                    :query-args="queryParam"
                    @grid-ready="onReady"
                    grid-no="agnes-workday" ref="grid">
                    <template slot="right-before">
                        <gf-button  @click="addWorkday" size="mini">添加</gf-button>
                    </template>
                    </gf-grid>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import WorkdayDlg from "./workday-dlg.vue";

export default {

    data(){
        return{
            flag: 0,
            areaList:[],
            queryParam:{
                workdayAreaCode :"01"
            }
        }
    },

    mounted() {
        let dictTypeId="AC_AREA";
        this.areaList=this.$app.dict.getDictItems(dictTypeId);
    },
    methods:{
        onReady() {
            this.grid = this.$refs.grid;
            this.refreshRows();
        },
        choseOptions(id,item){
            this.flag=id;
            this.queryParam.workdayAreaCode=item.dictId;
            this.list(this.queryParam);
        },
        async list(params){
            const resp = await this.$api.workdayConfigApi.getWorkdayList(params);
            this.grid.setRowData(resp.data);

        },
        refreshRows() {
            this.grid.setRowData(this.rowData);
        },
        reloadData() {
            this.$refs.grid.reloadData();
        },
        showDlg(mode, row, actionOk) {
            if (mode !== 'add' && !row) {
                this.$msg.warning("请选中一条记录!");
                return;
            }
            this.$nav.showDialog(
                WorkdayDlg,
                {
                    args: {row, mode, actionOk},
                    width: '50%',
                    title: this.$dialog.formatTitle('工作日', mode),
                }
            );
        },
        async onAddWorkday() {
            this.reloadData();
        },
        addWorkday() {
            this.showDlg('add', {}, this.onAddWorkday.bind(this));
        },
        editWorkday(params) {
            this.showDlg('edit', params.data, this.onEditWorkday.bind(this));
        },
        async onEditWorkday(workday, row) {
            Object.assign(row, workday);
            // this.refreshRows();
        },
        async deleteWorkday(params) {
            const row = params.data;
            const ok = await this.$msg.ask(`确认删除字段:[${row.bizDate}]吗, 是否继续?`);
            if (!ok) {
                return
            }
            try {
                const p = this.$api.workdayConfigApi.deleteWorkday(row.workdayId);
                await this.$app.blockingApp(p);
                this.refreshRows();
            } catch (reason) {
                this.$msg.error(reason);
            }
        }


    }
}
</script>

<style >

.act-button{
    background-color:#F6F8FA;
}


</style>