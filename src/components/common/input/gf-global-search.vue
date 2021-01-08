<template>
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