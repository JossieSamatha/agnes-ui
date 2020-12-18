<template>
    <div>
        <div class="linkman-list" v-for="(item, index) in linkmanArr" :key="index">
            <div class="state-icon">
                <em class="fa fa-user-o"></em>
            </div>
            <div class="notice-info">
                <p><span style="color: #333">{{ item.linkmanName }}</span>
                  <span
                      v-if="item.linkmanDept!=null && item.linkmanRoleId!=null">[{{ item.linkmanDept }}/{{ item.linkmanRoleId }}]</span>
                  <!--                    <span v-if="item.linkmanRoleId">【{{getDictName(item.linkmanRoleId, 'postDict')}}】</span>-->
                </p>
                <p v-if="item.linkmanPhone">Tel: {{item.linkmanPhone}}</p>
            </div>
            <div class="notice-state">
                {{item.extOrgName}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "comp-common",
        props: {
            moduleObj: {
                type: Object,
                require: true
            }
        },
        data(){
            return {
                linkmanArr: [],
                postDict: this.$app.dict.getDictItems('AGNES_ROSTER_POST'),
                DeptDict: this.$app.dict.getDictItems('AGNES_ROSTER_DEPT'),
                statusDict: this.$app.dict.getDictItems('AGNES_RELEASE_STATUS')
            }
        },
        created(){
            this.$api.linkmanApi.queryAllLinkManList().then(res => {
                this.linkmanArr = res.data;
            })
        },
        methods: {
            getDictName(dictId, dictType){
                if(dictId && dictType){
                    if(this.$lodash.find(this[dictType], {dictId: dictId})){
                        return this.$lodash.find(this[dictType], {dictId: dictId}).dictName;
                    } else {
                      return ''
                    }
                }else{
                    return ''
                }
            },
        }
    }
</script>

<style scoped>
    .linkman-list {
        display: flex;
        width: 100%;
        height: 70px;
        align-items: center;
        padding: 0 10px 0 0;
        border-bottom: 1px dashed #eaeaea;
    }
    .state-icon,
    .notice-info,
    .notice-state {
        font-size: 12px;
    }
    .state-icon {
        color: #999;
        font-size: 15px;
        margin-right: 10px;
    }
    .notice-info {
        flex: 1;
        color: #666;
    }

    .notice-info>p {
        height: 25px;
        line-height: 25px;
    }

    .notice-state {
        color: #999;
    }
</style>
