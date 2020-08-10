<template>
    <div>
        <el-form class="list-body" ref="form">
            <div>
                <el-row class="list-row" type="flex" justify="end" :gutter="3">
                    <el-col :span="3"><el-button @click="openChangeList" class="el-button">查看日切记录</el-button></el-col>
                    <el-col :span="3"><el-button @click="addChangeData" type="primary" class="el-button">日切</el-button></el-col>
                    <el-col :span="3"><el-button @click="addChangeRule" type="primary" class="el-button">日切规则</el-button></el-col>
                </el-row>
                <el-row class="list-row" type="flex" justify="space-between" >
                    <el-col :span="5">
                        <span class="data-font">上一业务日期：{{lastTaskData}}</span>
                    </el-col>
                    <el-col :span="5">
                        <span class="data-font">下一业务日期：{{nextTaskData}}</span>
                    </el-col>
                </el-row>
            </div>

            <el-row class="list-row" type="flex" justify="center" >
                <el-col :span="8" class="list-col">
                    <span class="data-font">当前业务日期：</span>
                    <el-date-picker
                            v-model="nowTaskData"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="">
                    </el-date-picker>
                </el-col>
            </el-row>
            <el-row class="list-row" type="flex" justify="center" >
                <el-col :span="10" class="list-col">
                    <span class="data-font">操作人员:{{person}}</span>
                    <span style="margin-left: 12px" class="data-font">日切时间:{{changeData}}</span>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    import ChangeDataDlg from "./change-data-dlg"
    import ChangeRuleDlg from "./change-rule-dlg"
    import ChangeDataList from "./change-data-list"

    export default {
        name: "index",
        components: {

        },
        data() {
            return {
                lastTaskData:'2019-09-09',
                nextTaskData:'2019-09-29',
                nowTaskData:'2019-09-19',
                person:'张三',
                changeData:'2019-09-19 22:22:22',
            }
        },
        mounted() {

        },
        watch: {

        },
        methods: {
            reloadData() {

            },
            showDlg(actionOk,type) {
                if(type==='data'){
                    this.$nav.showDialog(
                        ChangeDataDlg,
                        {
                            args: {actionOk},
                            width: '576px',
                            title: this.$dialog.formatTitle('日切'),
                        }
                    );
                }else if(type==='rule'){
                    this.$nav.showDialog(
                        ChangeRuleDlg,
                        {
                            args: {actionOk},
                            width: '600px',
                            title: this.$dialog.formatTitle('日切规则'),
                        }
                    );
                }

            },
            async onAddChangeData() {
                await this.reloadData();
            },
            addChangeData() {
                this.showDlg(this.onAddChangeData.bind(this),'data');
            },
            addChangeRule(){
                this.showDlg(this.onAddChangeData.bind(this),'rule');
            },
            openChangeList(){
                this.$drawerPage.create({
                    width: 'calc(92% - 215px)',
                    title: ['日切记录表'],
                    component: ChangeDataList,
                    args: {},
                    okButtonVisible:false,
                    cancelButtonTitle:'关闭',
                });
            },
        },
    }
</script>

<style scoped>
    .list-body{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }
    .el-button{
        width: 126px;
    }
    .list-row{
        margin-bottom: 12px;
    }
    .data-font{
        font-size: 16px;
    }
    .list-col{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    /*.el-border {*/
    /*    border: 1px solid rgb(238, 238, 238);*/
    /*}*/

</style>