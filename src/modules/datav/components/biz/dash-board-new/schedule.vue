<template>
    <div class="roster-container">
        <div class="roster-item" v-for="roster in rosterList" :key="roster.userId" >
            <div class="icon">
                <img :src="getImgPath(roster.sex)" alt="avatar" width="40px" height="40px" style="border-radius: 6px">
            </div>
            <div class="info">
                <p>
                    <svg-icon :name="pageType === 'personal' ? 'calendar' : 'user'" height="12px" color="#666"></svg-icon>
                    <span>{{ pageType === 'personal' ? roster.week :  roster.userName}}</span>
                </p>
                <p>
                    <svg-icon :name="pageType === 'personal' ? 'clock' : 'phone'" height="12px" color="#666"></svg-icon>
                    <span>{{ pageType === 'personal' ? roster.rosterDate : roster.oTel }}</span>
                    <template v-if="pageType === 'dep'">
                        <svg-icon name="mobile" height="12px" color="#666"></svg-icon>
                        <span class="telSpan">{{ roster.oTel }}</span>
                    </template>
                </p>
            </div>
            <div class="type">
                <span>{{getRosterType(roster.rosterType)}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            pageType: String
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
        },

        methods: {
            async initDate(){
                const resp = await this.$api.changeDataApi.getChangeData();
                const resChangeData = resp.data;
                let exeTime = resChangeData.bizDate;
                if(this.pageType === 'personal') {
                    let resp1 = await this.$api.HomePageApi.selectRosterDetailOfWeek({
                        rosterDate: exeTime,
                        pageType: 'personal'
                    });
                    if (resp1) {
                        this.rosterList = resp1.data;
                    }
                }else {
                    let resp1 = await this.$api.HomePageApi.selectRosterDetailOfWeek({
                        rosterDate: exeTime,
                        pageType: 'department'
                    });
                    if (resp1) {
                        this.rosterList = resp1.data;
                    }
                }
            },
            showRoster(item) {
                let depViewId = 'agnes.dop.roster';
                let depView = this.$app.views.getView(depViewId);
                let depTabView = Object.assign({
                    args: {rosterType: item.rosterType, pageType: this.pageType},
                    id: depViewId
                }, depView);
                this.$nav.showView(depTabView);
            },

            getRosterType(rosterTypeId) {
                if(rosterTypeId && this.$lodash.find(this.rosterType, {dictId: rosterTypeId})){
                    return this.$lodash.find(this.rosterType, {dictId: rosterTypeId}).dictName;
                }
            },

            getImgPath(sex){
                if(sex === 0){
                    return require("../../../assets/clientView/avatar-boy.jpg");
                }else{
                    return require("../../../assets/clientView/avatar-gril.jpg");
                }
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
