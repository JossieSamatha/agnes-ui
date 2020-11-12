<template>
    <gf-layout-default>
        <template slot="logo">
            <img :src="require('../assets/img/login-logo.png')" alt="logo" class="gf-app-logo">
        </template>
        <template slot="menu"><span></span></template>
        <div class="top-menu-right" slot="nav-user-before">
            <div class="top-menu-item search-item">
                <el-input class="search" placeholder="全局搜索" suffix-icon="el-icon-search" v-model="searchValue"></el-input>
            </div>
            <div class="top-menu-item">
                <span class="iconImg" title="帮助" v-html="svgImg.helpIcon"></span>
            </div>
            <div class="top-menu-item" @click="handelNotice">
                <el-badge :value=unreadCount>
                    <span class="iconImg" title="消息提醒" v-html="svgImg.noticeIcon"></span>
                </el-badge>
            </div>
        </div>
        <template slot="sidebar-menu" slot-scope="props">
            <gf-vertical-expand v-show="!props.maximizeView" :allMenu="menus.allMenu" :markMenu="menus.markMenu">
            </gf-vertical-expand>
        </template>
        <template slot="tab-bar-left">
            <el-select class="studio-type" v-model="studioType" :popper-append-to-body="false"
                       @change="studioTypeChange">
                <el-option value="appMenus" label="应用模式（APP STUDIO）"></el-option>
                <el-option value="adminMenus" label="管理模式（DEV STUDIO）"></el-option>
            </el-select>
        </template>
        <notice-box :noticeData="noticeData" :showDrawer="showNoticeDrawer"
                    @refreshNotice="handelNotice"
                    @getUnreadCount="getUnreadCount"
                    @noticeDrawerClose="noticeDrawerClose"
        ></notice-box>
        <el-popover popper-class="feedbackPopover" width="300" placement="right" trigger="click" @show="handelfeedback(true)" @hide="handelfeedback(false)">
            <el-form ref="feedbackForm" label-position="top" size="mini">
                <el-form-item label="聆听:意见反馈" prop="name">
                    <el-input type="textarea"
                            :rows="2"
                            placeholder="请留下您的宝贵意见"
                            v-model="content">
                    </el-input>
                </el-form-item>
            </el-form>
            <p><el-button @click="feedbackSubmit">提交</el-button></p>
            <div class="funBtn feedback" slot="reference" title="意见反馈">
                <em class="fa fa-envelope-o" v-if="!feedbackShow"></em>
                <em class="fa fa-envelope-open-o" v-if="feedbackShow"></em>
            </div>
        </el-popover>
    </gf-layout-default>
</template>

<script>
    import {toColumn} from "./menus";
    import init from './init-menus'
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
                studioType: 'appMenus',
                searchValue: '',
                showNoticeDrawer: false,
                content: '',
                feedbackShow: false,
                bizDateTimer: null, // 日切日期定时器
                unreadCount:""
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
            loadMenus(){
                //初始化菜单
                let _this = this;
                let otherMenus = [];
                let data = this.$store.getters.menus;
                if(data){

                    data.forEach(menu=> {
                            if (menu.resCode === 'app') {
                                Object.assign(_this.appMenus,init.initMenus(toColumn(menu.children)))
                            }
                            else if(menu.resCode === 'admin'){
                                Object.assign(_this.adminMenus,init.initMenus(toColumn(menu.children)))
                            }
                            else {
                                otherMenus.push(menu)
                            }
                    });
                    const other = init.initMenus(toColumn(otherMenus));
                    if(other.allMenu.children){
                        other.allMenu.children.forEach(childData=>{
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
                if(drawerList.length > 0){
                    drawerList.forEach(x=>{
                        document.body.removeChild(x);
                    });
                }
                // 退出登录后清楚定时器
                clearInterval(this.bizDateTimer);

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
                if(val === 'appMenus'){
                    this.menus = this.appMenus;
                }else{
                    this.menus = this.adminMenus;
                }
            },
            async handelNotice(){
                this.showNoticeDrawer = true;
                const resp = await this.$api.ruleTableApi.getMsgBoxList();
                this.noticeData = resp.data;
            },

            noticeDrawerClose() {
                this.showNoticeDrawer = false;
            },

            handelfeedback(ifShow) {
                this.feedbackShow = ifShow;
            },

            async resize(){
                // 拉伸结束后，触发窗口resize监听事件
                await this.$nextTick(function () {
                    // 兼容IE
                    if(document.createEvent) {
                        let event = document.createEvent("HTMLEvents");
                        event.initEvent("resize", true, true);
                        window.dispatchEvent(event);
                    } else if(document.createEventObject) {
                        window.fireEvent("onresize");
                    }
                });
            },

            // 获取日切值
            async getChangeDate() {
                try {
                    const resp = await this.$api.changeDataApi.getChangeData();
                    const resChangeData = resp.data;
                    if(resChangeData.bizDate && resChangeData.bizDate !== window.bizDate){
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
            }
        },
        async mounted() {
            //加载菜单
            this.loadMenus();
            // 获取日切值
            this.getChangeDate();
            this.getUnreadCount();
            this.bizDateTimer = setInterval(()=>{
                this.getChangeDate();
                this.getUnreadCount();
            }, 300000)
            //默认加载首页、部门首页
            this.$nav.closeAllTab();
            this.showMain();
            this.$app.registerCmd('gf.changePwd', () => this.changePwd());
            this.$app.registerCmd('gf.logout', () => this.logout());
            this.$app.registerCmd('gf.bizDateChange', () => this.getChangeDate());
            this.$nav.tabBar.chromeTabs.$on("activeTabChange", ()=>{
                this.resize();
            });
        }
    };
</script>
