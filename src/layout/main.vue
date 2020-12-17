<template>
    <gf-layout-default>
        <template slot="logo"><span></span></template>
        <template slot="menu"><span></span></template>
        <div class="top-menu-right" slot="nav-user-before">
            <div class="top-menu-item feedback" title="意见反馈" @click="handelfeedback">
                <svg-icon name="feedback" height="17px"/>
            </div>
            <div class="top-menu-item" title="帮助" @click="openHelpPage">
                <svg-icon name="question-doc" height="16px"/>
            </div>
            <div class="top-menu-item" title="换肤">
                <svg-icon name="skin-change" height="16px"/>
            </div>
            <div class="top-menu-item" title="消息提醒"  @click="handelNotice">
                <el-badge :value=unreadCount :hidden="!unreadCount">
                    <svg-icon name="msg-inform" height="20px"/>
                </el-badge>
            </div>
        </div>
        <div class="common-search-panel" slot="nav-user-after">
            <gf-global-search v-model="searchValue"
                              placeholder="全局搜索"
                              :appMenus="appMenus"
                              :adminMenus="adminMenus"
            ></gf-global-search>
            <robot-wisdom></robot-wisdom>
            <div class="biz-date-square">
                <em class="el-icon-time" style="margin-right: 3px;font-size: 15px;font-weight: bold"></em>
                {{bizDateComplete}}
            </div>
        </div>
        <template slot="sidebar-menu" slot-scope="props">
            <gf-vertical-expand v-show="!props.maximizeView"
                                :allMenu="menus.allMenu"
                                :markMenu="menus.markMenu"
                                @studioTypeChange="studioTypeChange"
            >
            </gf-vertical-expand>
        </template>
        <notice-box :noticeData="noticeData" :showDrawer="showNoticeDrawer"
                    @refreshNotice="handelNotice"
                    @getUnreadCount="getUnreadCount"
                    @noticeDrawerClose="noticeDrawerClose"
        ></notice-box>
    </gf-layout-default>
</template>

<script>
    import {toColumn} from "./menus";
    import init from './init-menus';
    export default {
        data() {
            return {
                svgImg: this.$svgImg,
                appMenus: {},
                adminMenus: {
                    allMenu: {
                        children: []
                    }
                },
                menus: {},
                noticeData: [],
                studioType: 'adminMenus',
                searchValue: '',
                showNoticeDrawer: false,
                content: '',
                feedbackShow: false,
                bizDateTimer: null, // 日切日期定时器
                unreadCount:"",
                localTime: ''
            }
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
            showView(viewId) {
                this.view = viewId;
            },
            showTabView: function (viewId) {
                const pageView = this.$app.views.getView(viewId);
                if (!pageView) {
                    return;
                }
                const tabView = Object.assign({args: {data: {}}}, pageView, {id: viewId || ''});
                this.$nav.showView(tabView);
            },
            loadMenus() {
                //初始化菜单
                let _this = this;
                let otherMenus = [];
                let data = this.$store.getters.menus;
                if (data) {
                    data.forEach(menu => {
                        if (menu.resCode === 'app') {
                            Object.assign(_this.appMenus, init.initMenus(toColumn(menu.children)))
                        } else if (menu.resCode === 'admin') {
                            Object.assign(_this.adminMenus, init.initMenus(toColumn(menu.children)))
                        } else {
                            otherMenus.push(menu)
                        }
                    });
                    const other = init.initMenus(toColumn(otherMenus));
                    if (other.allMenu.children) {
                        other.allMenu.children.forEach(childData => {
                            _this.adminMenus.allMenu.children.push(childData)
                        })
                    }
                    this.studioTypeChange('appMenus');
                }
            },
            changePwd: function () {
                let publicKey = this.$store.getters.appConfig.publicKey;
                let _this = this;
                this.$dialog.create({
                    title: '修改密码',
                    component: 'gf-pwd-page',
                    closeOnClickModal: false,
                    args: {publicKey: publicKey},
                    beforeClose: function (args, action) {
                        if (action && action == 'ok') {
                            _this.logout();
                        }
                    }
                })
            },
            logout: function () {
                // 判断是否有抽屉存在，若有，移除
                const drawerList = document.getElementsByClassName('gf-page-drawer');
                if (drawerList.length > 0) {
                    drawerList.forEach(x => {
                        document.body.removeChild(x);
                    });
                }
                // 退出登录后清楚定时器
                clearInterval(this.bizDateTimer);
                clearInterval(this.localTimer);

                this.$store.dispatch('logout').then(() => {
                    this.$router.push({path: '/login'});
                });
            },
            showMain() {
                let clientViewId = 'datav.client.view';
                let clientView = this.$app.views.getView(clientViewId);
                let clientTabView = Object.assign({args: {}, id: clientViewId}, clientView);
                this.$nav.showView(clientTabView);

                let depViewId = 'datav.dep.view';
                let depView = this.$app.views.getView(depViewId);
                let depTabView = Object.assign({args: {}, id: depViewId}, depView);
                this.$nav.showView(depTabView);
            },
            studioTypeChange(val) {
                if (val === 'appMenus') {
                    this.menus = this.appMenus;
                } else {
                    this.menus = this.adminMenus;
                }
            },
            async handelNotice() {
                this.showNoticeDrawer = true;
                const resp = await this.$api.ruleTableApi.getMsgBoxList();
                this.noticeData = resp.data.splice(0,9);
            },

            noticeDrawerClose() {
                this.showNoticeDrawer = false;
            },

            handelfeedback() {
                this.$drawerPage.create({
                    width: 'calc(100% - 250px)',
                    title: ['意见反馈'],
                    component: 'agnes-msg-send',
                    okButtonTitle:'发送'
                })
            },

            async resize() {
                // 拉伸结束后，触发窗口resize监听事件
                await this.$nextTick(function () {
                    // 兼容IE
                    if (document.createEvent) {
                        let event = document.createEvent("HTMLEvents");
                        event.initEvent("resize", true, true);
                        window.dispatchEvent(event);
                    } else if (document.createEventObject) {
                        window.fireEvent("onresize");
                    }
                });
            },

            // 获取日切值
            async getChangeDate() {
                try {
                    const resp = await this.$api.changeDataApi.getChangeData();
                    const resChangeData = resp.data;
                    if (resChangeData.bizDate && resChangeData.bizDate !== window.bizDate) {
                        window.bizDate = resChangeData.bizDate;
                    }
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

            // 获取消息数量
            async getUnreadCount() {
                try {
                    const resp = await this.$api.ruleTableApi.getUnreadCount();
                    this.unreadCount = resp.data;
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async feedbackSubmit(){
                let mailTo = this.$app.dict.getDictName("AGNES_FEEDBACK_MAIL",'to');
                let mailCc = this.$app.dict.getDictName("AGNES_FEEDBACK_MAIL",'cc');
                let from = {mailTo:mailTo,mailCc:mailCc,content:this.content}
                try {
                    await this.$api.ruleTableApi.feedbackSubmit(from);
                    this.$msg.success('提交成功');
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

            openHelpPage(){
                this.$drawerPage.create({
                    width: 'calc(100% - 250px)',
                    title: ['帮助文档', 'view'],
                    component: 'help-info-page',
                    okButtonVisible: false
                })
            }
        },
        async mounted() {
            //加载菜单
            this.loadMenus();
            // 获取日切值
            this.localTime = new Date();
            this.getChangeDate();
            this.getUnreadCount();
            this.bizDateTimer = setInterval(() => {
                this.getChangeDate();
                this.getUnreadCount();
            }, 300000);
            this.localTimer = setInterval( ()=> {
                this.localTime = new Date();
            }, 1000);
            //默认加载首页、部门首页
            this.$nav.closeAllTab();
            this.showMain();
            this.$app.registerCmd('gf.changePwd', () => this.changePwd());
            this.$app.registerCmd('gf.logout', () => this.logout());
            this.$app.registerCmd('gf.bizDateChange', () => this.getChangeDate());
            this.$nav.tabBar.chromeTabs.$on("activeTabChange", () => {
                this.resize();
            });
        }
    };
</script>

<style scoped>
    .design-sketch-img {
        position: fixed;
        top: 0;
        left: 0;
        width: auto;
        height: 100%;
        z-index: 1000;
    }
</style>
