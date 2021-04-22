<template>
    <div class="person-chosen-dialog">
        <div class="left">
            <div class="tag-title">
                <el-tag size="small">产品</el-tag>
                <el-tag size="small" type="success">产品种类</el-tag>
            </div>
            <div class="tag-container">
                <chosen-list-view :prdtList="prdtList"
                                  :prdtTypeList="prdtTypeList"
                                  :acntList="acntList"
                                  :acntTypeList="acntTypeList"
                                  :checkedprdtType="checkedprdtType"
                                  @reloadData="reloadData"
                ></chosen-list-view>
            </div>
        </div>
        <div class="right">
            <el-tabs type="card" v-model="activeTab1"  style="height: 435px;">
                <el-tab-pane label="产品" name="prdt">
                    <el-tabs type="card" v-model="activeTab2" style="height: 435px;">
                        <el-tab-pane name="prdtList" v-if="chosenType.indexOf('prdt')>-1">
                    <span class="tab-label" slot="label">
                        <span>产品列表</span>
                    </span>
                            <gf-grid ref="prdtGrid"
                                     grid-no="biz-param-chosen-prdt-info"
                                     :options="rowClassOption()"
                                     @load-data="(params)=>{gridLoadData(prdtList, 'productId', params)}"
                                     height="100%"></gf-grid>
                        </el-tab-pane>
                        <el-tab-pane name="prtdType" v-if="chosenType.indexOf('prdtType')>-1">
                    <span class="tab-label" slot="label">
                        <span>产品种类</span>
                    </span>
                            <el-checkbox-group v-model="checkedprdtType">
                                <el-checkbox v-for="prdtType in prdtTypeData" :label="prdtType.dictId" :key="prdtType.dictId">{{prdtType.dictName}}</el-checkbox>
                            </el-checkbox-group>
                        </el-tab-pane>
                    </el-tabs>
                </el-tab-pane>
            </el-tabs>
        </div>
        <dialog-footer :onSave="saveChosen"></dialog-footer>
    </div>
</template>

<script>
    import chosenListView from './chosen-list-view'
    import lodash from 'lodash'
    export default {
        name: 'biz-param-chosen-dialog',
        props: {
            prdtList: {
                type: Array
            },
            prdtTypeList: {
                type: Array
            },
            acntList: {
                type: Array
            },
            acntTypeList: {
                type: Array
            },
            chosenType: {
                type: String
            },
            actionOk: Function
        },
        data() {
            return {
                activeTab1: 'prdt',
                activeTab2: 'prdtList',
                activeTab3: 'acnt',
                prdtTypeData:[],
                checkedprdtType:[],
                rowClassOption: function(){
                    return {
                        rowClassRules: {
                            'disabled-row': function (params) {
                                return params.data && params.data.checked;
                            }
                        },
                    }
                }
            }
        },
        components: {
            'chosen-list-view': chosenListView
        },
        beforeMount(){
            this.prdtTypeData = this.$app.dict.getDictItems("AGNES_PRODUCT_TYPE");
            if(this.prdtTypeList){
                this.prdtTypeList.forEach((item)=>{
                    this.checkedprdtType.push(item.paramId);
                })
            }
        },
        watch:{
            'checkedprdtType'(val){
                if(val){
                    let ids = [];
                    let index = -1;
                    if(this.prdtTypeList){
                        this.prdtTypeList.forEach((item,itemIndex)=>{
                            ids.push(item.paramId);
                            if(!lodash.includes(val,item.paramId)){
                                index = itemIndex;
                            }

                        })
                    }
                    if(index != -1){
                        this.prdtTypeList.splice(index, 1);
                    }
                    val.forEach((item)=>{
                        if(!lodash.includes(ids,item)){
                            this.prdtTypeList.push({'paramId':item,'paramDesc':window.$gfui.$app.dict.getDictItem('AGNES_PRODUCT_TYPE',item).dictName,'bizType':'1','refType':'2'});
                        }
                    });
                }
            }
        },
        methods: {
            // 表格数据初始加载 -- 已勾选项赋值
            gridLoadData(list, findId, params){
                params.rows.forEach((oneData)=>{
                    const hasChecked = this.$lodash.find(list, {paramId: oneData[findId]});
                    if(hasChecked){
                        oneData.checked = true;
                    }
                });
            },

            // 删除tag重新加载表格数据
            reloadData(type) {
                const gridType = type.replace('List', 'Grid');
                if(typeof this.$refs[gridType].reloadData === 'function'){
                    this.$refs[gridType].reloadData();
                }
            },

            // 添加产品
            chosePrdt(params){
                const param = {
                    bizType: '1',
                    refType: '1',
                    paramId: params.data.productId,
                    paramDesc: params.data.productName
                }
                this.prdtList.push(param);
                params.data.checked = true;
                this.$refs.prdtGrid.refreshRows([params.node]);
            },

            // 保存选择信息
            saveChosen(){
                this.actionOk(this.prdtList, this.prdtTypeList, this.acntList,this.acntTypeList);
                this.$dialog.close(this);
            }
        }
    }
</script>
