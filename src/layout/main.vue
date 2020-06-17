<template>
    <gf-layout-default>
        <template slot="logo">
            <img :src="require('../assets/img/logo-white.png')" alt="logo" class="gf-app-logo">
        </template>
        <template slot="menu">
            <el-select class="studioType" v-model="studioType" :popper-append-to-body="false"
                       @change="studioTypeChange">
                <el-option value="0" label="应用模式（APP STUDIO）"></el-option>
                <el-option value="1" label="管理模式（DEV STUDIO）"></el-option>
            </el-select>
        </template>
        <div class="top-menu-right" slot="nav-user-before">
            <div class="top-menu-item">
                <el-input class="search" placeholder="全局搜索" suffix-icon="el-icon-search" v-model="searchValue"></el-input>
            </div>
            <div class="top-menu-item">
                <span class="iconImg" title="帮助" v-html="svgImg.helpIcon"></span>
            </div>
            <div class="top-menu-item" @click="handelNotice">
                <el-badge :value="12">
                    <span class="iconImg" title="消息提醒" v-html="svgImg.noticeIcon"></span>
                </el-badge>
            </div>
        </div>
        <template slot="sidebar-menu">
            <gf-vertical-expand :allMenu="menus.allMenu" :markMenu="menus.markMenu">
            </gf-vertical-expand>
        </template>
        <notice-box :noticeData="noticeData" :showDrawer="showNoticeDrawer" @noticeDrawerClose="noticeDrawerClose"></notice-box>
        <el-popover popper-class="feedbackPopover" width="300" placement="right" trigger="click" @show="handelfeedback(true)" @hide="handelfeedback(false)">
            <el-form ref="feedbackForm" label-position="top" size="mini">
                <el-form-item label="聆听:意见反馈" prop="name">
                    <el-input type="textarea"
                            :rows="2"
                            placeholder="请留下您的宝贵意见"
                            v-model="feedbackContent">
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="funBtn feedback" slot="reference" title="意见反馈">
                <i class="fa fa-envelope-o" v-if="!feedbackShow"></i>
                <i class="fa fa-envelope-open-o" v-if="feedbackShow"></i>
            </div>
        </el-popover>
    </gf-layout-default>
</template>

<script>
    import noticeData from './noticeData'
    import {toColumn} from "@hex/goframe-ui-admin/src/utils/menu";
    import init from './initMenus'
    export default {
        data() {
            return {
                svgImg: this.$svgImg,
                menus: init.initMenus(toColumn(this.$store.getters.menus)),
                noticeData: noticeData,
                studioType: '0',
                searchValue: '',
                showNoticeDrawer: false,
                feedbackContent: '',
                feedbackShow: false
            }
        },
        methods: {
            showView(viewId) {
                this.view = viewId;
            },
            showTabView: function(viewId){
                const pageView = this.$app.views.getView(viewId);
                if (!pageView) {
                    return;
                }
                const tabView = Object.assign({args: {data: {}}}, pageView, {id: viewId || ''});
                this.$nav.showView(tabView);
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
                let _this = this;
                this.$store.dispatch('logout').then(() => {
                    _this.$router.push({path: '/login'});
                });
            },
            showMain() {
                let viewId = 'datav.clientview';
                let pageView = this.$app.views.getView(viewId);
                let tabView = Object.assign({args: {}, id: viewId}, pageView);
                this.$nav.showView(tabView);
            },
            studioTypeChange(val) {
                if(val == '0'){
                    this.showView('aicm.studio.web');
                }else{
                    this.showView('aicm.nuxeo.web');
                }
            },
            handelNotice(){
                this.showNoticeDrawer = true;
            },

            noticeDrawerClose(){
                this.showNoticeDrawer = false;
            },

            handelfeedback(ifShow){
                this.feedbackShow = ifShow;
            }
        },
        async mounted() {
            //默认加载首页
            this.showMain();
            this.$app.registerCmd('gf.changePwd',() => this.changePwd());
            this.$app.registerCmd('gf.logout',() => this.logout());
        }
    };
</script>

<style>
</style>
