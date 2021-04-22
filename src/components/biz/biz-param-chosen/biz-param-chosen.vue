<template>
    <div class="person-chosen">
        <el-button :disabled="disabled" type="text" @click="chooseUser">选择取值参数</el-button>
        <chosen-list-view v-if="paramList.length>0"
                          :prdtList="prdtList"
                          :prdtTypeList="prdtTypeList"
                          :acntList="acntList"
                          :disabled="disabled"
        ></chosen-list-view>
    </div>
</template>

<script>
    import chosenListView from './chosen-list-view'
    export default {
        name: 'biz-param-chosen-input',
        props: {
          paramRefList: {
            type: Array,
            required: true
          },
          chosenType: {
            type: String,
            default: 'prdt, prdtType, acnt,acntType'
          },
          disabled: {
            type: Boolean,
            default: false
          }
        },
        data() {
            return {
                prdtList: [],
                prdtTypeList: [],
                acntList: [],
                acntTypeList: []
            }
        },
        beforeMount(){
            if(this.paramRefList){
                this.initChosenData(this.paramRefList);
            }
        },
        components: {
            'chosen-list-view': chosenListView
        },
        watch: {
            paramList(val){
                this.$emit('getParamList', val);
            }
        },
        computed: {
            paramList(){
                const paramList =  this.prdtList.concat(this.prdtTypeList).concat(this.acntList).concat(this.acntTypeList);
                return paramList;
            }
        },
        methods: {
            // 初始化赋值
            initChosenData(data){
                this.prdtList = [];
                this.prdtTypeList = [];
                this.acntList = [];
                this.acntTypeList=[];
                const typeArr = ['', 'prdtList', 'prdtTypeList', 'acntList', 'acntTypeList'];
                data.forEach((memberItem)=>{
                    if(this[typeArr[memberItem.refType]]){
                        this[typeArr[memberItem.refType]].push(memberItem);
                    }
                });
            },

            // 打开人员选择弹窗
            chooseUser(){
                this.$nav.showDialog(
                    'biz-param-chosen-dialog',
                    {
                        width: '850px',
                        args: {
                            prdtList: JSON.parse(JSON.stringify(this.prdtList)),
                            prdtTypeList: JSON.parse(JSON.stringify(this.prdtTypeList)),
                            acntList: JSON.parse(JSON.stringify(this.acntList)),
                            acntTypeList: JSON.parse(JSON.stringify(this.acntTypeList)),
                            chosenType: this.chosenType,
                            actionOk: this.getChosenList.bind(this)
                        },
                        title: this.$dialog.formatTitle('选择取值参数','edit'),
                    }
                );
            },

            getChosenList(prdtList, prdtTypeList, acntList,acntTypeList){
                this.prdtList = prdtList;
                this.prdtTypeList = prdtTypeList;
                this.acntList = acntList;
                this.acntTypeList = acntTypeList;
            }
        }
    }
</script>
