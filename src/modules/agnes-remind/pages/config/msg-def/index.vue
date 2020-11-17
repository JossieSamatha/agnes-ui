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
            <template slot="right-before">
                <el-switch class="inner-switch"
                        v-model="queryArgs.hasRead"
                        width = 50
                        active-text="全部"
                        inactive-text="未读"
                        active-value=""
                        inactive-value="0"
                        @change="switchChange">
                </el-switch>
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
                    'remindTime':'',
                    'hasRead':'1'
                },
            }
        },
        beforeMount() {
          this.getExeTime();
        },
        methods: {
            switchChange(){
                if(this.queryArgs.hasRead === true){
                    this.queryArgs.hasRead = ""
                }
                this.reloadData();
            },
            async batchRead() {
              let data = this.$refs.grid.getSelectedRows();
              if (loadsh.isEmpty(data)) {
                this.$msg.success('请选择一条记录');
                return;
              }
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
          async getExeTime() {
            this.queryArgs.remindTime = window.bizDate;
            await this.reloadData();
          },
        },
    }
</script>

<style>
    .inner-switch .el-switch__label {
        display: none;
        position: absolute;
        margin: 0;
        font-size: 12px;
        transform: scale(.8);
    }

    .inner-switch .el-switch__label.el-switch__label--right{
        left: 3px;
    }

    .inner-switch .el-switch__label.el-switch__label--left{
        right: 12px;
        z-index: 1;
    }

    .inner-switch .el-switch__label.is-active {
        display: block;
        color: #fff;
    }
    .inner-switch{
        padding-right: 10px;
    }

</style>