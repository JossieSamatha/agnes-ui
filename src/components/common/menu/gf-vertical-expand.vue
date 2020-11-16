<template>
    <div class="left-side-container" :class="ifSideMenuFlod?'fold':''" v-clickoutside="closeSideMenu">
        <div id="gfVerticalExpand" class="gf-vertical-expand" :class="ifSideMenuFlod?'fold':''">
            <div class="gf-menu footer">
                <div class="header">
                    <span class="gf-menu-item flodBtn" @click="foldSideMenu">
                        <em class="menuicon" v-html="ifSideMenuFlod?svgImg.refoldIcon:svgImg.foldIcon"></em>
                    </span>
                    <span class="setting">
                        <em class="fa fa-star"></em>
                        <span>常用功能</span>
                    </span>
                </div>
            </div>
            <div class="gf-menu normal">
                <div class="content">
                    <div class="gf-menu-item" v-for="menu in markMenu" :key="menu.menuid"
                         :class="menu.menuid == activeMarkMenu ? 'active' : ''">
                        <span class="menuname" @click="markMenuChoose(menu)">{{menu.menuname}}</span>
                        <em class="el-icon-close" @click="cancelMark(menu)"></em>
                    </div>
                </div>
            </div>
            <div class="gf-menu footer">
                <div class="header">
                    <span class="gf-menu-item flodBtn">
                        <em class="menuicon" v-html="svgImg.overviewMenuIcon"></em>
                    </span>
                    <span class="setting" @click="showFastMenu">
                        <span>功能菜单</span>
                        <em class="el-icon-arrow-down" v-if="foldFastMenu"></em>
                        <em class="el-icon-arrow-up" v-else></em>
                    </span>
                </div>
            </div>
            <div v-if="false" class="gf-menu entrance-menu" @click="menuChoose(allMenu)">
                <el-tooltip :disabled="!ifSideMenuFlod" effect="dark" :content="platFormTitle" placement="right">
                    <div class="gf-menu-item" :class="curSideMenu.menuid == 'root' ? 'active' : ''">
                        <em class="menuicon" v-html="svgImg.overviewMenuIcon"></em>
                        <span class="menuname">{{platFormTitle}}</span>
                        <em class="el-icon-arrow-right"></em>
                    </div>
                </el-tooltip>
            </div>
            <div ref="dragColumn" class="gf-menu mark-menu" :style="{height: fastMenuHeight}">
                <el-tooltip v-for="menu in allMenu.children" :key="menu.menuid" :disabled="!ifSideMenuFlod" effect="dark" :content="menu.menuname" placement="right">
                    <div class="gf-menu-item" :class="curSideMenu.menuid == menu.menuid ? 'active' : ''" @click="menuChoose(menu)">
                        <em class="menuicon" v-if="menu.menuicon" :class="menu.menuicon"></em>
                        <em class="menuicon" v-else v-html="svgImg.defaultMenuIcon"></em>
                        <span class="menuname">{{menu.menuname}}</span>
                        <em class="el-icon-arrow-right"></em>
                    </div>
                </el-tooltip>
            </div>
        </div>
        <gf-side-menu v-if="showSideMenu" :sideMenu="curSideMenu" :markMenu="markMenu"
                      @markMenuChange="getMarkMenu"
                      @closeSideMenu="closeSideMenu"></gf-side-menu>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                curSideMenu: {},
                markMenu: [],
                activeMarkMenu: "",
                ifcollapse: false,
                ifSideMenuFlod: false,
                foldFastMenu: true,
                showSideMenu: false,
                svgImg: this.$svgImg
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
            }
        },
        beforeMount() {
            const p = this.getMarkMenu();
            this.$app.blockingApp(p);
        },
        computed: {
            fastMenuHeight(){
                return this.foldFastMenu ? '50%' : '100%';
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
                this.foldFastMenu = false;
            },

            markMenuChoose(menu){
                this.showSideMenu = false;
                this.foldFastMenu = true;
                this.activeMarkMenu = menu.menuid;
                this.showView(menu);
            },

            showFastMenu(){
                this.foldFastMenu = !this.foldFastMenu;
                this.showSideMenu = false;
            },

            foldSideMenu(){
                this.ifSideMenuFlod = !this.ifSideMenuFlod;
                this.foldFastMenu = false;
            },

            closeSideMenu(){
                if (this.showSideMenu) {
                    this.showSideMenu = false;
                }
            },

            async getMarkMenu(){
                let menuList = await this.$api.menuUserRefApi.getMenuUserRefList();
                this.markMenu = menuList.data;
            },

            async cancelMark(menu){
                await this.$api.menuUserRefApi.deleteMenuUserRefList(menu);
                await this.getMarkMenu();
            },
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