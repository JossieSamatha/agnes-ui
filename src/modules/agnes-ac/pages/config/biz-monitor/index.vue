<template>
    <div class="datavPage" style="position: relative; height: 100%;padding: 0;">
        <el-checkbox-group class="bizTypeCheck" v-model="checkedBizType" size="small">
            <el-checkbox v-for="item in bizTypeArr" :key="item.id" :label="item.id" border>{{item.label}}</el-checkbox>
        </el-checkbox-group>
        <el-tabs class="content-tab-left" value="all" tab-position="left">
            <el-tab-pane name="all" label="全部">
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
            </el-tab-pane>
            <el-tab-pane name="appraisement" label="估值核算">

            </el-tab-pane>
            <el-tab-pane name="TA" label="TA">

            </el-tab-pane>
            <el-tab-pane name="transSupport" label="交易支持">

            </el-tab-pane>
            <el-tab-pane name="operate" label="运营服务">

            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
    import data from './data'
    export default {
        data() {
            return {
                productTaskGrid: data().productTaskGrid,
                riskEventGrid: data().riskEventGrid,
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

</style>