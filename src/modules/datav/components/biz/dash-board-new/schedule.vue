<template>
    <div class="roster-container">
        <div class="roster-item" v-for="roster in rosterList" :key="roster.userId" >
            <div class="icon">
                <img :src="getImgPath(roster.sex)" alt="avatar" width="40px" height="40px" style="border-radius: 6px">
            </div>
            <div class="info">
                <p>
                    <svg-icon :name="moduleType === 'per' ? 'calendar' : 'user'" height="12px" color="#666"></svg-icon>
                    <span>{{ moduleType === 'per' ? roster.week :  roster.userName}}</span>
                </p>
                <p>
                    <svg-icon :name="moduleType === 'per' ? 'clock' : 'phone'" height="12px" color="#666"></svg-icon>
                    <span>{{ moduleType === 'per' ? roster.date : roster.telAbbre }}</span>
                    <template v-if="moduleType === 'dep'">
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
            moduleObj: Object
        },
        data() {
            return {
                moduleType: 'per',
                todayDate: new Date().toLocaleDateString().replace(/\//g, '-'),
                rosterList: [],
                rosterType: this.$app.dict.getDictItems('AGNES_ROSTER_TYPE'),
                rosterStatus: this.$app.dict.getDictItems('AGNES_RELEASE_STATUS')
            }
        },
        async created() {
            this.moduleType = this.moduleObj.pageType;
            if(this.moduleObj.pageType === 'per'){
                this.rosterList = [
                    {userId: '001', week: '星期四', date: '12月3日', rosterType: '00', sex: 0, },
                    {userId: '002', week: '星期四', date: '12月3日', rosterType: '01', sex: 0, },
                    {userId: '003', week: '星期四', date: '12月3日', rosterType: '02', sex: 0, },
                    {userId: '004', week: '星期四', date: '12月3日', rosterType: '03', sex: 0, },
                    {userId: '005', week: '星期四', date: '12月3日', rosterType: '02', sex: 0, },
                ];
            }else{
                this.rosterList = [
                    {userId: '001', userName: '李大霄', telAbbre: '6778', oTel: '12345678', rosterType: '00', sex: 0, },
                    {userId: '002', userName: '李立昌', telAbbre: '6778', oTel: '12345678910', rosterType: '01', sex: 0, },
                    {userId: '003', userName: '林黛玉', telAbbre: '6778', oTel: '12345677777', rosterType: '02', sex: 1, },
                    {userId: '004', userName: '范冰冰', telAbbre: '6778', oTel: '12345678910', rosterType: '03', sex: 1, }
                ]
            }

        },
        mounted() {

        },

        methods: {
            showRoster(item) {
                let depViewId = 'agnes.dop.roster';
                let depView = this.$app.views.getView(depViewId);
                let depTabView = Object.assign({
                    args: {rosterType: item.rosterType, pageType: this.moduleObj.pageType},
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
