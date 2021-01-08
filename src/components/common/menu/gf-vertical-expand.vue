<template>
    <div class="left-side-container" :class="ifSideMenuFlod?'fold':''" v-clickoutside="closeSideMenu">
        <div id="gfVerticalExpand" class="gf-vertical-expand" :class="ifSideMenuFlod?'fold':''">
            <div class="gf-app-logo"><svg-icon name="HuaAn-logo" height="33px"/></div>
            <div class="gf-menu normal">
                <div class="content" v-clickoutside="clearCancelPopover">
                    <span class="gf-menu-item noneMenu">
                        <em class="menuicon fa fa-star"></em>
                        <span class="menuname">常用功能</span>
                    </span>
                    <div class="gf-menu-item" v-for="menu in markMenu" :key="menu.menuid"
                         :class="{'active': menu.menucode === activeFirstMenu}"
                    >
                        <span class="menuname"
                              :title="menu.menuname"
                              @click="markMenuChoose(menu)"
                              @contextmenu.prevent="showCancelPopover(menu)"
                              style="position: relative"
                        >{{menu.menuname.substr(0, 4)}}
                            <div v-show="menu.cancelMarkPopover" class="cancel-mark-item" @click.stop="cancelMark(menu)">取消收藏</div>
                        </span>
                        <div class="arc top"></div>
                        <div class="arc bottom"></div>
                    </div>
                </div>
            </div>
            <div class="split-line"></div>
            <div ref="dragColumn" class="gf-menu mark-menu" :style="{height: fastMenuHeight}">
                <el-tooltip v-for="menu in allMenu.children" :key="menu.menuid" :disabled="!ifSideMenuFlod" effect="dark" :content="menu.menuname" placement="right">
                    <div class="gf-menu-item"
                         :class="{'is-hover': curSideMenu.menuid === menu.menuid, 'active': menu.menusCodesStore.includes(activeFirstMenu)}"
                         @mouseover="menuChoose(menu)"
                    >
                        <svg-icon class="menuicon" v-if="getMenuIcon(menu.menuicon).ifSvg" :name="getMenuIcon(menu.menuicon).icon" width="46px" height="16px"/>
                        <em class="menuicon" v-else :class="getMenuIcon(menu.menuicon).icon"></em>
                        <span class="menuname">{{menu.menuname}}</span>
                        <div class="arc top"></div>
                        <div class="arc bottom"></div>
                    </div>
                </el-tooltip>
                <div class="gf-menu-item noneMenu">
                    <svg-icon class="menuicon" name="application-model" width="46px" height="16px"/>
                    <span class="menuname">{{appStudio ? '应用模式' : '管理模式'}}</span>
                    <em class="menuicon fa fa-exchange" style="left: auto; right: 10px" @click="changeStudio"></em>
                </div>
            </div>
            <div class="gf-menu footer">
                <div class="header">
                    <div class="gf-app-logo"><svg-icon name="FOMS" height="18px"/></div>
                    <span class="gf-menu-item noneMenu flodBtn" @click="foldSideMenu">
                        <em class="menuicon" v-html="ifSideMenuFlod?svgImg.refoldIcon:svgImg.foldIcon"></em>
                    </span>
                </div>
            </div>
        </div>
        <gf-side-menu id="gf-side-menu" v-if="showSideMenu" :sideMenu="curSideMenu" :markMenu="markMenu" :style="sideMenuStyle"
                      @markMenuChange="getMarkMenu"
                      @closeSideMenu="closeSideMenu">
            <p class="arrow" slot="arrow" :style="{top: arrowTop+'px'}"></p>
        </gf-side-menu>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                curSideMenu: {},
                activeFirstMenu: '',
                markMenu: [],
                activeMarkIndex: null,
                ifcollapse: false,
                ifSideMenuFlod: false,
                foldFastMenu: true,
                showSideMenu: false,
                svgImg: this.$svgImg,
                appStudio: true,
                arrowTop: '',
                sideMenuStyle: {top: 0, bottom: 'auto'},
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
                return this.foldFastMenu ? '62%' : '100%';
            }
        },
        watch:{
            allMenu: {
                handler(){
                    this.showSideMenu = false;
                    this.foldFastMenu = true;
                },
                deep: true
            },

            $route(to) {
                const activeMenu = to.path.replace('/', '');
                this.activeFirstMenu = activeMenu;
            }
        },
        methods: {
            showView: function (menu) {
                const viewId = menu.menucode;
                let tabObj = {};
                if(menu.actionUrl && menu.actionUrl.includes('link:')){
                    const hrefUrl = menu.actionUrl.replace('link:', '');
                    window.open(hrefUrl, '_blank');
                    return;
                }else if(menu.actionUrl && menu.actionUrl.indexOf('goframe/p') !== -1){
                    tabObj = menu;
                    tabObj.title = menu.menuname;
                    tabObj.ifIframe = true;
                }else{
                    tabObj = this.$app.views.getView(viewId);
                }
                if(!tabObj){
                    return false;
                }
                const tabView = Object.assign({args: {data: menu}}, tabObj, {id: viewId || ''});
                this.$nav.showView(tabView);
            },

            menuChoose(menu) {
                this.curSideMenu = menu;
                this.showSideMenu = true;
                this.$nextTick(()=>{
                    const containerHeight = document.getElementById('gfVerticalExpand').clientHeight;
                    const sideMenuHeight = document.getElementById('gf-side-menu').clientHeight;
                    const activeDomHeight = document.getElementsByClassName('gf-menu-item is-hover')[0].getBoundingClientRect().top;
                    if(containerHeight && activeDomHeight && activeDomHeight){
                        if(containerHeight > sideMenuHeight + activeDomHeight){
                            this.sideMenuStyle = {top: activeDomHeight + 'px', bottom: 'auto'} ;
                        }else{
                            this.sideMenuStyle = {top: 'auto', bottom: '20px'}
                        }
                        this.arrowTop = activeDomHeight + 15;
                    }
                });
            },

            markMenuChoose(menu){
                this.showSideMenu = false;
                this.foldFastMenu = true;
                this.showView(menu);
            },

            showFastMenu(){
                this.foldFastMenu = !this.foldFastMenu;
                this.showSideMenu = false;
            },

            foldSideMenu(){
                this.ifSideMenuFlod = !this.ifSideMenuFlod;
                this.foldFastMenu = !this.ifSideMenuFlod;
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

            showCancelPopover(menu){
                this.markMenu.forEach((menu)=>{
                    this.$set(menu, 'cancelMarkPopover', false);
                });
                this.$set(menu, 'cancelMarkPopover', true);
            },

            clearCancelPopover(){
                this.markMenu.forEach((menu)=>{
                    this.$set(menu, 'cancelMarkPopover', false);
                });
            },

            async cancelMark(menu){
                await this.$api.menuUserRefApi.deleteMenuUserRefList(menu);
                menu.cancelMarkPopover = false;
                await this.getMarkMenu();
            },

            getMenuIcon(icon){
                if(!icon){
                    return { ifSvg: true, icon: 'defaultMenuIcon'};
                }else if(icon.includes('fa fa') || icon.includes('el-icon')){
                    return { ifSvg: false, icon };
                }else{
                    return { ifSvg: true, icon };
                }
            },

            changeStudio(){
                this.appStudio = !this.appStudio;
                const type = this.appStudio ? 'appMenus' : 'adminMenus';
                this.$emit('studioTypeChange', type);
            }
        }
    }
</script>
<style scoped>
    .slide-fade-enter-active, .slide-fade-leave-active {
        transition: all 1s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(-10px);
        opacity: 0;
    }

    .cancel-mark-item {
        position: absolute;
        top: 26px;
        right: 5px;
        padding: 0 2px;
        font-size: 12px;
        text-align: center;
        border: 1px solid #E4E7ED;
        border-radius: 2px;
        background: #fff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        z-index: 100;
        color: #333;
        height: 22px;
        line-height: 20px;
    }
</style>