<template>
    <div>
        <el-form class="search-panel" label-width="100px">
            <div class="line">
                <el-form-item label="规则编号" >
                    <el-input v-model="queryArgs.scanCode"></el-input>
                </el-form-item>
                <el-form-item label="业务编号">
                    <el-input v-model="queryArgs.varId"></el-input>
                </el-form-item>
                <el-button @click="reloadData" class="option-btn" type="primary">查询</el-button>
            </div>
            <div class="line">
                <el-form-item label="执行日期" >
                    <el-date-picker
                            style="width:100%"
                            v-model="queryArgs.exeDate"
                            type="date"
                            value-format="yyyyMMdd"
                            placeholder="">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="是否解析">
                    <el-select v-model="queryArgs.isNeedParse" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                    </el-select>
                </el-form-item>
                <el-button @click="reSetSearch" class="option-btn">重置</el-button>
            </div>
        </el-form>
        <gf-grid ref="grid"
                 grid-no="file-scan-list-field"
                 toolbar="find,refresh,more"
                 quick-text-max-width="300px"
                 :query-args="queryArgs"
        >
        </gf-grid>
    </div>
</template>
<script>
   import dateUtils from "@hex/gf-ui/src/util/date-utils"
    export default {
        data() {
            return {
                options: [{value: '0', label: '否'}, {value: '1', label: '是'}],
                queryArgs:{
                    'scanCode':'',
                    'exeDate':'',
                    'varId':'',
                    'isNeedParse':'',
                }
            }
        },
        beforeMount() {
            this.getExeTime();
        },
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            reSetSearch() {
                this.queryArgs.scanCode = '';
                this.queryArgs.exeDate = '';
                this.queryArgs.varId = '';
                this.queryArgs.isNeedParse = '';
                this.reloadData();
            },
            async getExeTime() {
                this.queryArgs.exeDate = dateUtils.formatDate(window.bizDate,"yyyyMMdd");
                await this.reloadData();
            },
            showFileDetail(){
            }
        }
    }
</script>