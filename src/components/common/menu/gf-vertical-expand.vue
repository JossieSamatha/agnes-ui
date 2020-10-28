<template>
    <div class="left-side-container" :class="ifSideMenuFlod?'fold':''" v-clickoutside="closeSideMenu">
        <div class="gf-vertical-expand" :class="ifSideMenuFlod?'fold':''">
            <div v-if="false" class="gf-menu entrance-menu" @click="menuChoose(allMenu)">
                <el-tooltip :disabled="!ifSideMenuFlod" effect="dark" :content="platFormTitle" placement="right">
                    <div class="gf-menu-item" :class="curSideMenu.menuid == 'root' ? 'active' : ''">
                        <i class="menuicon" v-html="svgImg.overviewMenuIcon"></i>
                        <span class="menuname">{{platFormTitle}}</span>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </el-tooltip>
            </div>
            <div class="gf-menu mark-menu">
                <el-tooltip v-for="menu in allMenu.children" :key="menu.menuid" :disabled="!ifSideMenuFlod" effect="dark" :content="menu.menuname" placement="right">
                    <div class="gf-menu-item" :class="curSideMenu.menuid == menu.menuid ? 'active' : ''" @click="menuChoose(menu)">
                        <i class="menuicon" v-if="menu.menuicon" :class="menu.menuicon"></i>
                        <i class="menuicon" v-else v-html="svgImg.defaultMenuIcon"></i>
                        <span class="menuname">{{menu.menuname}}</span>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </el-tooltip>
            </div>
            <div class="gf-menu footer" :style="{height: fastMenuHeight}">
                <div class="header">
                    <span class="gf-menu-item flodBtn" @click="foldSideMenu">
                        <i class="menuicon" v-html="ifSideMenuFlod?svgImg.refoldIcon:svgImg.foldIcon"></i>
                    </span>
                    <span class="setting" @click="showFastMenu">
                        <i class="fa fa-star"></i>
                        <span>常用功能</span>
                        <i class="el-icon-arrow-up" v-if="foldFastMenu"></i>
                        <i class="el-icon-arrow-down" v-else></i>
                    </span>
                </div>
                <div class="content">
                    <div class="gf-menu-item" v-for="menu in markMenu" :key="menu.menuid"
                         :class="menu.menuid == activeMarkMenu ? 'active' : ''">
                        <span class="menuname" @click="markMenuChoose(menu)">{{menu.menuname}}</span>
                        <i class="el-icon-close" @click="cancelMark(menu)"></i>
                    </div>
                </div>
            </div>
        </div>
        <gf-side-menu v-if="showSideMenu" :sideMenu="curSideMenu"
                      @markMenuChange="markMenuChange" @closeSideMenu="closeSideMenu"></gf-side-menu>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                curSideMenu: {},
                activeMarkMenu: "",
                ifcollapse: false,
                ifSideMenuFlod: false,
                foldFastMenu: true,
                showSideMenu: false,
                svgImg: this.$svgImg,
            };
        },
        props: {
            platFormTitle: {
                type: String,
                default: '产品服务'
            },
            allMenu: {
                type: Object,
                default: function () {
                    return {
                        id: 'root',
                        children: []
                    }
                }
            },
            markMenu: {
                type: Array,
                default: function () {
                    return new Array()
                }
            }
        },
        computed: {
            fastMenuHeight(){
                return this.foldFastMenu ? '45px' : '70%';
            }
        },
        watch:{
            allMenu: {
                handler(){
                    this.showSideMenu = false;
                    this.foldFastMenu = true;
                },
                deep: true
            }
        },
        methods: {
            showView: function (menu) {
                const viewId = menu.menucode;
                const pageView = this.$app.views.getView(viewId);
                if (!pageView) {
                    return;
                }
                const tabView = Object.assign({args: {data: menu}}, pageView, {id: viewId || ''});
                this.$nav.showView(tabView);
            },
            menuChoose(menu) {
                this.curSideMenu = menu;
                this.showSideMenu = true;
                this.foldFastMenu = true;
            },

            markMenuChoose(menu){
                this.activeMarkMenu = menu.menuid;
                this.showView(menu);
                this.showSideMenu = false;
            },

            showFastMenu(){
                this.foldFastMenu = !this.foldFastMenu;
            },

            foldSideMenu(){
                this.ifSideMenuFlod = !this.ifSideMenuFlod
            },

            closeSideMenu(){
                if (this.showSideMenu) {
                    this.showSideMenu = false;
                }
            },

            markMenuChange(data){
                if(data.type == 'true'){
                    this.markMenu.push(data.menu);
                }else{
                    this.$utils.removeFromArray(this.markMenu, data.menu);
                }
            },

            cancelMark(menu){
                this.$utils.removeFromArray(this.markMenu, menu);
                this.editMenuCollect(menu, this.allMenu.children, 'false');
            },

            editMenuCollect(setMenu, menuArr, type){
                let _that = this;
                menuArr.forEach(function (menu) {
                    if(menu.menuid == setMenu.menuid){
                        _that.$set(menu, 'collect', type);
                    }
                    if(menu.children && menu.children.length > 0){
                        _that.editMenuCollect(setMenu, menu.children, type);
                    }
                });
            }
        }
    }
</script>
<style>
    .slide-fade-enter-active, .slide-fade-leave-active {
        transition: all 1s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(-10px);
        opacity: 0;
    }
</style>