<template>
    <div class="gf-side-menu">
        <div class="menu-container">
            <div class="header">
                <el-input class="search" placeholder="请输入关键词" suffix-icon="el-icon-search" v-model="searchValue"></el-input>
            </div>
            <div class="scroll-container">
                <div class="content">
                    <section class="stairMenu" v-for="menu in secondMenuObj" :key="menu.menuid">
                        <p class="menu-label" :class="activeMenu == menu.menuid ? 'active' : ''">{{menu.menuname}}</p>
                        <ul class="second-menu" v-for="submenu in menu.children" :key="submenu.menuid">
                            <li class="menu-label">
                                <span>{{submenu.menuname}}</span>
                                <i class="star fa fa-star-o" v-if="submenu.collect != 'true'" @click="collectChange('true',submenu)"></i>
                                <i class="star fa fa-star" v-else @click="collectChange('false',submenu)"></i>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
        <div class="speedyMenu">
            <div class="gf-menu entrance-menu">
                <div class="gf-menu-item speedy" @click="closeSideMenu">
                    <i class="el-icon-close"></i>
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
        data() {
            return {
                searchValue: '',
                activeMenu: '',
            };
        },
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
        computed: {
            secondMenuObj(){
                return this.sideMenu.children.map(function (menu) {
                    if(!menu.children){
                        menu.children = [];
                        menu.children.push(menu);
                    }
                    return menu;
                });
            }
        },
        methods: {
            showView: function (res) {
                const viewId = res.menuid;
                const pageView = this.$app.views.getView(viewId);
                if (!pageView) {
                    return;
                }
                const tabView = Object.assign({args: {data: res}}, pageView, {id: viewId || ''});
                this.$nav.showView(tabView);
            },

            showFirstMenu(menu) {
                this.activeMenu = menu.menuid;
            },

            closeSideMenu(){
                this.$emit("closeSideMenu");
            },

            collectChange(type, menu){
                this.$set(menu, 'collect', type);
                this.$emit('markMenuChange', {type: type, menu: menu})
            }
        }
    }
</script>
<style>
</style>