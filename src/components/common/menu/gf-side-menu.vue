<template>
    <div class="gf-side-menu">
        <slot name="arrow"></slot>
        <div class="menu-container">
            <div class="header">
                <el-input class="search" placeholder="请输入关键词" suffix-icon="el-icon-search"
                          v-model="searchValue"></el-input>
                <em class="side-menu-close-icon el-icon-close" @click="closeSideMenu"></em>
            </div>
            <div class="scroll-container">
                <div class="content">
                    <section class="stairMenu" v-for="menu in secondMenuObj" :key="menu.menuid">
                        <p class="menu-label" :class="activeMenu == menu.menuid ? 'active' : ''">{{menu.menuname}}</p>
                        <ul class="second-menu">
                            <li class="menu-label" v-for="submenu in menu.children"  :key="submenu.menuid">
                                <span @click="showMenuTab(submenu)">{{submenu.menuname}}</span>
                                <em class="star fa fa-star" v-if="isMenuMarked(submenu.menucode)" @click="collectChange('false',submenu)"></em>
                                <em class="star fa fa-star-o" v-else
                                    @click="collectChange('true',submenu)"></em>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
        <div class="speedyMenu" v-if="false">
            <div class="gf-menu entrance-menu">
                <div class="gf-menu-item speedy" @click="closeSideMenu">
                    <em class="el-icon-close"></em>
                </div>
            </div>
            <div class="gf-menu fast-entrance">
                <div class="gf-menu-item" :class="activeMenu == menu.menuid ? 'active' : ''"
                     v-for="menu in secondMenuObj" :key="menu.menuid" @click="showFirstMenu(menu)">
                    <span>{{menu.menuname}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            sideMenu: {
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
        data() {
            return {
                searchValue: '',
                activeMenu: '',
                showMenu:{children:[]},
            };
        },
        mounted(){
            this.loadShowMenu();
        },
        computed: {
            secondMenuObj() {
                if(this.showMenu && this.showMenu.children && this.showMenu.children.length>0){
                    return this.showMenu.children.map(function (menu) {
                        if (!menu.children) {
                            menu.children = [];
                            menu.children.push(menu);
                        }
                        return menu;
                    });
                }else{
                    return false;
                }
            }
        },
        methods: {
            loadShowMenu(){
                this.showMenu = this.$utils.deepClone(this.sideMenu);
            },
            showView: function (menu) {
              const viewId = menu.menucode;
              this.$agnesUtils.closeTab(viewId);
              this.$nextTick(() => {
                let tabObj = {};
                if (menu.actionUrl && menu.actionUrl.includes('link:')) {
                  const hrefUrl = menu.actionUrl.replace('link:', '');
                  window.open(hrefUrl, '_blank');
                  return;
                } else if (menu.actionUrl && menu.actionUrl.includes('goframe/p')) {
                  tabObj = menu;
                  tabObj.title = menu.menuname;
                  tabObj.ifIframe = true;
                } else {
                  tabObj = this.$app.views.getView(viewId);
                }
                if (!tabObj) {
                  return false;
                }
                const tabView = Object.assign({args: {data: menu}}, tabObj, {id: viewId || ''});
                this.$nav.showView(tabView);
              })
            },

            showMenuTab(menu) {
                this.showView(menu);
                this.closeSideMenu();
            },

            showFirstMenu(menu) {
                this.activeMenu = menu.menuid;
            },

            closeSideMenu() {
                this.$emit("closeSideMenu");
            },

            async collectChange(type, menu) {
                if(type==='true'){
                    const resp = await this.$api.menuUserRefApi.saveMenuUserRefList(menu);
                    if(resp.code==='repeat'){
                        this.$msg.warning(resp.message);
                        return ;
                    }
                }else {
                    await this.$api.menuUserRefApi.deleteMenuUserRefList(menu);
                }
                this.$emit('markMenuChange')
            },

            isMenuMarked(menucode){
                let isMarked = false;
                if(menucode){
                    const find = this.$lodash.findIndex(this.markMenu, {menucode: menucode})
                    if(find > -1) {
                        isMarked = true;
                    }
                }
                return isMarked;
            }
        },
        watch: {
            'searchValue'(val) {
                if (val) {
                    for(let i=0;i<this.showMenu.children.length;i++){
                        let nowChildren = this.showMenu.children[i].children;
                        this.showMenu.children[i].children = nowChildren.filter(item => (item.menuname).indexOf(val) > -1)
                    }
                } else {
                    this.showMenu = this.$utils.deepClone(this.sideMenu);
                }
            },
            'sideMenu'(val) {
                this.showMenu = this.$utils.deepClone(val);
            }
        }
    }
</script>
<style scoped>
    .side-menu-close-icon {
        position: absolute;
        right: 20px;
        top: -5px;
        font-size: 18px;
        cursor: pointer;
    }
</style>
