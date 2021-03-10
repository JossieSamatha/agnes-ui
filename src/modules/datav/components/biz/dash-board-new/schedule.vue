<template>
    <div class="roster-container">
        <div class="roster-item" v-for="(roster, index) in rosterList" :key="index" >
            <div class="icon">
                <img src="../../../assets/clientView/avatar.png" alt="avatar" width="40px" height="40px" style="border-radius: 6px">
            </div>
            <div class="info">
                <p>
                    <svg-icon :name="pageType === 'personal' ? 'calendar' : 'user'" height="12px" color="#666"></svg-icon>
                    <span>{{ pageType === 'personal' ? roster.week :  roster.userName}}</span>
                </p>
                <p>
                    <svg-icon :name="pageType === 'personal' ? 'clock' : 'phone'" height="12px" color="#666"></svg-icon>
                    <span>{{
                        pageType === 'personal' ? roster.rosterDate : roster.oTel && roster.oTel.substr(roster.oTel.length - 4, roster.oTel.length - 1)
                      }}</span>
                    <template v-if="pageType === 'department'">
                        <svg-icon name="mobile" height="12px" color="#666"></svg-icon>
                      <span class="telSpan">{{ roster.mobileNo }}</span>
                    </template>
                </p>
            </div>
            <div class="type">
              <div @click="showRoster(roster)">{{ getRosterType(roster.rosterType) }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            pageType: String,
            quartzTime: String,
        },
        data() {
            return {
                todayDate: new Date().toLocaleDateString().replace(/\//g, '-'),
                rosterList: [],
                rosterType: this.$app.dict.getDictItems('AGNES_ROSTER_TYPE'),
                rosterStatus: this.$app.dict.getDictItems('AGNES_RELEASE_STATUS')
            }
        },
        mounted() {
            this.initDate();
            this.startInterval();
        },

        watch: {
            // 监听,当路由发生变化的时候执行
            $route(to, from) {
                if (this.pageType === 'personal' && from.path === '/datav.client.view' ||
                    this.pageType === 'department' && from.path === '/datav.dep.view') {
                    this.clearInterval();
                }
                if (this.pageType === 'personal' && to.path === '/datav.client.view' ||
                    this.pageType === 'department' && to.path === '/datav.dep.view') {
                    this.startInterval();
                }
            }
        },

        computed: {
            intervalMin(){
                const quartzTime = this.quartzTime ? this.quartzTime : '5';
                return parseInt(quartzTime)*60*1000;
            }
        },

        methods: {
            initDate(){
                this.$api.changeDataApi.getChangeData().then((resp)=>{
                    const resChangeData = resp.data;
                    const exeTime = resChangeData ? resChangeData.bizDate : this.todayDate;
                    this.$api.HomePageApi.selectRosterDetailOfWeek({
                        rosterDate: exeTime,
                        pageType: this.pageType
                    }).then((resp1)=>{
                        this.rosterList = resp1.data;
                    });
                });
            },
            refreshData(){
                this.initDate();
            },
            showRoster(item) {
              let depViewId = 'agnes.dop.roster.ru';
              let depView = this.$app.views.getView(depViewId);
                let depTabView = Object.assign({
                  args: {rosterType: item.rosterType},
                  id: depViewId
                }, depView);
                this.$nav.showView(depTabView);
            },

            getRosterType(rosterTypeId) {
                if(rosterTypeId && this.$lodash.find(this.rosterType, {dictId: rosterTypeId})){
                    return this.$lodash.find(this.rosterType, {dictId: rosterTypeId}).dictName;
                }
            },

            startInterval(){
                this.freshInterval = setInterval(() => {
                    if (this.pageType === 'personal' && this.$route.path === '/datav.client.view' ||
                        this.pageType === 'department' && this.$route.path === '/datav.dep.view') {
                        this.initDate();
                    }else{
                        this.clearInterval();
                    }
                }, this.intervalMin);
            },

            clearInterval(){
                clearInterval(this.freshInterval);
            }
        }
    }
</script>

<style scoped>
    .roster-item {
        display: flex;
        width: 100%;
        height: 60px;
        align-items: center;
    }

    .roster-item .icon {
        margin-right: 12px;
    }

    .roster-item .info {
        flex: 1;
        width: calc(100% - 120px);
    }

    .roster-item .info>p {
        display: flex;
        align-items: center;
        height: 20px;
        line-height: 12px;
        color: #666;
        font-size: 12px;
    }

    .roster-item .info>p>span {
        margin-right: 10px;
    }

    .roster-item .info>p em.svg-icon {
        margin-right: 6px;
    }

    .roster-item .info>p .telSpan {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .roster-item .type {
        flex: none;
        height: 22px;
        line-height: 22px;
        background: #4097FF;
        color: #fff;
        font-size: 12px;
        border-radius: 11px;
        padding: 0 8px;
    }


</style>
