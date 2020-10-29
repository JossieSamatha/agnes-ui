<template>
    <div>
        <el-form class="search-panel" label-width="75px">
            <div class="line">
                <el-form-item label="消息名称">
                    <el-input v-model="queryArgs.msgName"></el-input>
                </el-form-item>
                <el-form-item label="通知时间">
                    <el-date-picker
                            v-model="queryArgs.remindTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="">
                    </el-date-picker>
                </el-form-item>
                <el-button @click="reloadData" class="option-btn" type="primary">查询</el-button>
                <el-button @click="reSetSearch" class="option-btn">重置</el-button>
            </div>
        </el-form>
        <gf-grid  :query-args="queryArgs" @row-double-click="showMsg" grid-no="agnes-msg-type" ref="grid" toolbar="find,refresh,more">
            <template slot="left">
                <gf-button class="action-btn" @click="batchRead" size="mini" v-if="$hasPermission('agnes.app.message.mgr.batch.read')">批量读取</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import loadsh from'lodash';
    export default {
        data() {
            return {
                queryArgs:{
                    'msgName':'',
                    'remindTime':''
                }
            }
        },
        methods: {
            async batchRead() {
              let data = this.$refs.grid.getSelectedRows();
              if (loadsh.isEmpty(data)) {
                this.$msg.success('请选择一条记录');
                return;
              }
              // let t =0;
              // for (let i=0;i<data.length;i++){
              //     if (data[i].hasRead=="1"){
              //         t+=1;
              //     }
              // }
              // if (t!=0){
              //     this.$msg.success('选中有'+t+'条已读数据');
              //     return;
              // }
              await this.$api.MsgApi.batchRead(data);
              await this.$refs.grid.reloadData();
            },
            reloadData() {
                this.$refs.grid.reloadData();
            },
            reSetSearch() {
                this.queryArgs = {
                    'msgName':'',
                    'remindTime':''
                };
                this.$refs.grid.reloadData();
            },
        },
    }
</script>

<style scoped>

</style>
