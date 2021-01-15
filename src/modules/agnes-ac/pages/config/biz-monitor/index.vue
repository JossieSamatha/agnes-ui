<template>
    <div class="datavPage" style="position: relative; height: 100%;padding: 0;">
        <el-checkbox-group class="bizTypeCheck" v-model="checkedBizType" size="small">
            <el-checkbox v-for="item in bizBigArr" :key="item" :label="item" border></el-checkbox>
        </el-checkbox-group>
        <el-checkbox-group class="bizTypeCheck" v-model="checkedBizType" size="small">
            <el-checkbox v-for="item in bizTypeArr" :key="item.id" :label="item.id" border>{{item.label}}</el-checkbox>
        </el-checkbox-group>
        <div class="container">
            <module-card title="产品任务">
                <template slot="content">
                    <gf-grid :options="productTaskGrid" style="height: 210px;margin-top: -40px"></gf-grid>
                </template>
            </module-card>
            <module-card title="风险事件">
                <template slot="content">
                    <gf-grid :options="riskEventGrid" style="height: 210px;margin-top: -40px"></gf-grid>
                </template>
            </module-card>
            <module-card title="业务统计">
                <template slot="content">
                    <p style="text-align: center;margin: 10px auto;">
                        <img src="../../../assets/monitor/chart.png" width="auto" height="auto"/>
                    </p>
                </template>
            </module-card>
        </div>
    </div>
</template>

<script>
    import data from './data'
    export default {
        data() {
            return {
                productTaskGrid: data().productTaskGrid,
                riskEventGrid: data().riskEventGrid,
                bizBigArr: ['全部', '估值核算', 'TA', '交易支持', '运营服务'],
                bizTypeArr: [
                    {id:'0', label: '产品成立'},
                    {id:'1', label: '产品运作变更'},
                    {id:'2', label: '产品分红'},
                    {id:'3', label: '产品清算'},
                    {id:'4', label: '产品考核'},
                    {id:'5', label: '估值处理'},
                    {id:'6', label: '估值调整'},
                    {id:'7', label: '参数设置'},
                    {id:'8', label: '定期任务'},
                    {id:'9', label: '临时任务'},
                ],
                checkedBizType:['0','1']
            }
        },
    }
</script>

<style scoped>
    .container {
        flex: 1;
        height: calc(100% - 110px);
        overflow: auto;
    }
</style>