<template>
    <div class="datavPage" style="height: 100%;" :style="{background: isBoardEdit?'#f2f2f2':'#fff' }">
        <div class="optionPanel">
            <span class="boardeEdit" v-if="!isBoardEdit" @click="deployBoard">看板配置</span>
            <span class="boardeEdit" v-if="isBoardEdit" @click="finishDeploy">完成配置</span>
        </div>
        <div class="drawer-wrapper" v-show="isBoardEdit">
            <div class="drawer-container">
                <header class="drawer-title">
                    <span>看板配置</span>
                </header>
                <section class="drawer-body">
                    <ul class="contentUl">
                        <li class="contentLi" v-for="item in proInfoBoardArr" :key="item.id">
                            <i><img :src="getImgPath(item.icon)" width="24px" height="auto"/></i>
                            <span>{{item.label}}</span>
                        </li>
                    </ul>
                    <span class="note">拖动组件增加至页面相应位置</span>
                </section>
            </div>
        </div>
        <div class="pagescroll-vertical">
            <module-card title="产品搜索">
                <div slot="headOption" class="headOption" @click="productShow = !productShow">
                <span class="foldBtn" style="color: #0f5eff;border: 1px solid;padding: 5px 10px;border-radius: 3px;">
                    <span v-show="productShow">折叠</span>
                    <span v-show="!productShow">去搜索</span>
                </span>
                </div>
                <template slot="content">
                    <gf-grid :options="productDetailGrid" v-show="productShow" style="height: 210px; margin-top: -40px"></gf-grid>
                </template>
            </module-card>

            <module-card title="产品详情">
                <template slot="content">
                    <el-form label-width="50%" class="infoForm" size="mini">
                        <div class="line">
                            <el-form-item label="产品名称" prop="proName">
                                <span>{{choosedProduct.proName}}</span>
                            </el-form-item>
                            <el-form-item label="产品代码" prop="proNo">
                                <span>{{choosedProduct.proNo}}</span>
                            </el-form-item>
                        </div>
                        <div class="line">
                            <el-form-item label="项目名称" prop="projectName">
                                <span>{{choosedProduct.projectName}}</span>
                            </el-form-item>
                            <el-form-item label="托管行" prop="custodianBank">
                                <span>{{choosedProduct.custodianBank}}</span>
                            </el-form-item>
                        </div>
                        <div class="line">
                            <el-form-item label="产品类型" prop="proType">
                                <span>{{choosedProduct.proType}}</span>
                            </el-form-item>
                            <el-form-item label="产品属性" prop="proAttr">
                                <span>{{choosedProduct.proAttr}}</span>
                            </el-form-item>
                        </div>
                        <div class="line">
                            <el-form-item label="产品规模" prop="proScale">
                                <span>XXXXXXXXXX元</span>
                            </el-form-item>
                            <el-form-item label="产品规模" prop="proScale">
                                <span>XXXXXXXXXX元</span>
                            </el-form-item>
                        </div>
                        <template v-if="productDetailShow">
                            <div class="line">
                                <el-form-item label="成立日期" prop="foundDate">
                                    <span>{{choosedProduct.foundDate}}</span>
                                </el-form-item>
                                <el-form-item label="预计结束日期" prop="preEndDate">
                                    <span>{{choosedProduct.preEndDate}}</span>
                                </el-form-item>
                            </div>
                            <div class="line">
                                <el-form-item label="基金经理" prop="fundManage">
                                    <span>{{choosedProduct.fundManage}}</span>
                                </el-form-item>
                                <el-form-item label="所属部门" prop="department">
                                    <span>{{choosedProduct.department}}</span>
                                </el-form-item>
                            </div>
                            <div class="line">
                                <el-form-item label="托管行联系人" prop="custodianContacts">
                                    <span>{{choosedProduct.custodianContacts}}</span>
                                </el-form-item>
                                <el-form-item label="联系电话" prop="contactTel">
                                    <span>1XXXXXXXXXX</span>
                                </el-form-item>
                            </div>
                            <div class="line">
                                <el-form-item label="邮箱" label-width="25%" prop="Email">
                                    <span>XXX@XXXXXX.com</span>
                                </el-form-item>
                            </div>
                        </template>
                    </el-form>
                    <p @click="productDetailShow = !productDetailShow" style="text-align: center;cursor: pointer">
                        <i class="fa fa-chevron-down" v-if="!productDetailShow"></i>
                        <i class="fa fa-chevron-up" v-else></i>
                    </p>
                </template>
            </module-card>

            <module-card title="产品任务">
                <template slot="content">
                    <el-tabs class="content-tab" type="card" value="全部">
                        <el-tab-pane v-for="(item, index) in proTaskArr" :key="index" :name="item.label" lazy>
                            <span slot="label">
                                <el-badge :value="item.num" :hidden="!item.num">
                                    <span>{{item.label}}</span>
                                </el-badge>
                            </span>
                            <gf-grid grid-no="monitor-pro-task"
                                     :options="proTaskOption(showProDetail)"
                                     @row-double-click="showProDetail"
                                     style="height: 210px;"></gf-grid>
                        </el-tab-pane>
                    </el-tabs>
                </template>
            </module-card>

            <module-card title="客户需求">
                <template slot="content">
                    <gf-grid :options="guestRequireGrid" style="height: 210px;margin-top: -40px"></gf-grid>
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
    import proDetail from "./pro-detail";
    export default {
        data() {
            return {
                isBoardEdit: false,
                productDetailGrid: data().productDetailGrid,
                guestRequireGrid: data().guestRequireGrid,
                riskEventGrid: data().riskEventGrid,
                choosedProduct: data().productDetailData[0],
                productShow: false,
                productDetailShow: false,
                proInfoBoardArr: [
                    {id:'proInfo', label:'产品信息', icon:'proInfo'},
                    {id:'proTask', label:'产品任务', icon:'proTask'},
                    {id:'guestRequire', label:'客户需求', icon:'guestRequire'},
                    {id:'riskEvent', label:'风险事件', icon:'riskEvent'},
                    {id:'bizStatistics', label:'业务统计', icon:'bizStatistics'},
                    {id:'111', label:'业务统计', icon:'bizStatistics'},
                    {id:'222', label:'业务统计', icon:'bizStatistics'},
                    {id:'333', label:'业务统计', icon:'bizStatistics'},
                    {id:'444', label:'业务统计', icon:'bizStatistics'},
                    {id:'5555', label:'业务统计', icon:'bizStatistics'}
                ],
                proTaskArr: [
                    {label: '全部', num: '4'},{label: '成立'},{label: '开放',num: '1'},
                    {label: '分红'}, {label: '考核'}, {label: '清算', num: '3'}],
                proTaskOption: (fun) => {
                    return {
                        onCellClicked(params) {
                            if(params.colDef.field === 'proName'){
                                fun();
                            }
                        },
                    }
                }
            }
        },
        methods: {
            // 配置面板
            deployBoard(){
                this.isBoardEdit = true;
            },

            // 配置面板 -- 完成配置
            finishDeploy(){
                this.isBoardEdit = false;
            },

            getImgPath(img){
                return require('../../../assets/monitor/'+img+'.svg');
            },

            showProDetail(){
                // 抽屉创建
                this.$drawerPage.create({
                    width: 'calc(100% - 250px)',
                    title: ['东方航空企业年金计划二期'],
                    component: proDetail,
                    pageEl: this.$el
                })
            }
        }
    }
</script>

<style>
    .ag-cell.link-option-cell:hover .ag-cell-value{
        cursor: pointer;
        text-decoration: underline;
    }
</style>