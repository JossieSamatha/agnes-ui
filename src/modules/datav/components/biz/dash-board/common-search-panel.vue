<template>
    <div class="common-search-panel">
            <span>
                <gf-global-search v-model="searchValue"
                                  placeholder="全局搜索"
                                  :appMenus="appMenus"
                                  :adminMenus="adminMenus"
                ></gf-global-search>
                <robot-wisdom></robot-wisdom>
            </span>
        <div class="biz-date-square">
            <em class="el-icon-time" style="margin-right: 3px;font-size: 15px;font-weight: bold"></em>
            {{bizDateComplete}}
        </div>
    </div>
</template>

<script>
    import init from "../../../../../layout/init-menus";
    import {toColumn} from "../../../../../layout/menus";

    export default {
        data() {
            return {
                searchValue: '',
                localTime: '',
                appMenus: {},
                adminMenus: {}
            }
        },

        created(){
            // 获取日切值
            this.localTime = new Date();
            this.localTimer = setInterval( ()=> {
                this.localTime = new Date();
            }, 1000);
            this.loadMenus();
        },

        computed: {
            bizDateComplete() {
                let bizdate = this.$dateUtils.formatDate(this.localTime, 'yyyy-MM-dd HH:mm:ss');
                if(window.bizDate){
                    bizdate = window.bizDate + ' ' + bizdate.slice(11, 19);
                }
                return bizdate;
            }
        },

        methods: {
            loadMenus() {
                let data = this.$store.getters.menus;
                if (data) {
                    data.forEach(menu => {
                        if (menu.resCode === 'app') {
                            Object.assign(this.appMenus, init.initMenus(toColumn(menu.children)))
                        } else if (menu.resCode === 'admin') {
                            Object.assign(this.adminMenus, init.initMenus(toColumn(menu.children)))
                        }
                    });
                }
            }
        },

        destroyed() {
            // 清楚定时器
            clearInterval(this.localTimer);
        }

    }
</script>

<style scoped>

</style>