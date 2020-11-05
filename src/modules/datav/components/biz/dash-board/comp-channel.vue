<template>
    <div>
        <div class="linkman-list" v-for="(item, index) in channelArr" :key="index">
            <div class="state-icon">
                <em class="el-icon-place"></em>
            </div>
            <div class="notice-info">
                <p>({{item.channelCode}}){{item.channelName}}</p>
            </div>
            <div class="notice-state">
                {{getChannelType(item.channelType)}}
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
                channelArr: [],
                channelTypeDict: this.$app.dict.getDictItems('AGNES_DOP_CHANNEL_TYPE'),
            }
        },
        created(){
            this.$api.channelApi.getChannelList().then(res => {
                this.channelArr = res.data.rows;
            })
        },
        methods: {
            getChannelType(channelType){
                if(channelType){
                    const dictObj = this.$lodash.find(this.channelTypeDict, {dictId: channelType});
                    if(dictObj){
                        return dictObj.dictName;
                    }
                }
            },
        }
    }
</script>

<style scoped>
    .linkman-list {
      display: flex;
      width: 100%;
      align-items: center;
      margin-bottom: 15px;
      min-height: 40px;
      max-height: 60px;
      padding: 0 10px 0 0;
      border-bottom: 1px dashed #eaeaea;
    }

    .state-icon,
    .notice-info,
    .notice-state {
        font-size: 12px;
    }

    .state-icon {
        color: #666;
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
