<template>
    <transition name="expand-x">
        <el-cascader ref="globalSearch" class="global-search"
                     popper-class="global-search-popper"
                     :options="menuArr"
                     :props="cascaderProps"
                     :emitPath="false"
                     clearable
                     filterable
                     @change="menuJump"
        >
        </el-cascader>
    </transition>
</template>

<script>
    export default {
        model: {
            prop: 'inputValue',
            event: 'menuJump'
        },
        props: {
            appMenus: Object,
            adminMenus: Object,
        },

        mounted() {
        },

        data() {
            return {
                cascaderProps: {value: 'menucode', label: 'menuname', expandTrigger: 'hover'},
                inputValue: '',
            }
        },
        computed: {
            menuArr() {
                let menusAll = [];
                if(this.appMenus.allMenu && this.appMenus.allMenu.children){
                    menusAll = this.$lodash.concat(menusAll, this.appMenus.allMenu.children);
                }

                if(this.adminMenus.allMenu && this.adminMenus.allMenu.children){
                    menusAll = this.$lodash.concat(menusAll, this.adminMenus.allMenu.children);
                }

                return menusAll;
            }
        },
        methods: {
            menuJump(val) {
                if(val) {
                    let nodeData = null;
                    const checkedNode = this.$refs.globalSearch.getCheckedNodes(true);
                    if(checkedNode && checkedNode.length>0){
                        nodeData = checkedNode[0].data;
                    }else{
                        let record = this.menuArr;
                        for(let i=0,l=val.length; i<l; i++){
                            if(record.length>0){
                                if(i === l-1){
                                    record = this.$lodash.find(record, {menucode: val[i]});
                                }else{
                                    record = this.$lodash.find(record, {menucode: val[i]}).children;
                                }
                            }
                        }
                        if(record && record.menucode){
                            nodeData = record;
                        }
                    }
                    if(nodeData){
                        const viewId = nodeData.menucode;
                        let tabObj = {};
                        if(nodeData.actionUrl && nodeData.actionUrl.indexOf('goframe/p') !== -1){
                            tabObj = nodeData;
                            tabObj.title = nodeData.menuname;
                            tabObj.ifIframe = true;
                        }else{
                            tabObj = this.$app.views.getView(viewId);
                        }
                        if(!tabObj){
                            return false;
                        }
                        this.inputValue = '';
                        const tabView = Object.assign({args: {data: nodeData}}, tabObj, {id: viewId || ''});
                        this.$nav.showView(tabView);
                    }
                }
            }
        },
    }
</script>

<style>
    .global-search {
        transition: 1s all ease;
    }

    .global-search .el-input__suffix .el-icon-arrow-down{
        display: none;
    }

    .global-search-popper .el-cascader-panel .el-cascader-menu__wrap{
        height: 250px;
    }

    .expand-x-enter-active {
        transition: all 1s ease;
    }
    .expand-x-leave-active {
        width: 380px!important;
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .expand-x-enter, .expand-x-leave-to {
        width: 0!important;
        opacity: 0;
    }
</style>