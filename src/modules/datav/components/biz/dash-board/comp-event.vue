<template>
    <div>
        <div v-for="(item, index) in eventList"
             :key="index" class="notice-list"
        >
          <div class="task-icon">
            <em class="el-icon-chat-line-square"></em>
          </div>
          <div class="task-des">
            <div :title="item.eventDesc">
              <span>{{ item.eventDesc }}</span>
              <span>{{ getErrType(item.errType) }}</span>
            </div>
            <div :title="item.eventDate">发生时间:{{ item.eventDate }}</div>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "comp-event",
        props: {
            moduleObj: {
                type: Object,
                require: true
            }
        },
        data(){
            return {
              eventList: [],
              errTypeDict: this.$app.dict.getDictItems('AGNES_DOP_ERR_TYPE'),
            }
        },
        created(){
            if(this.moduleObj.compType === 'err'){
                this.$api.ruleTableApi.getErrList().then(res => {
                    this.eventList = res.data.rows.map((item)=>{
                        return {
                          eventDesc: item.errDesc,
                          eventDate: item.crtTs,
                          errType: item.errType
                        }
                    });
                })
            }else if(this.moduleObj.compType === 'risk'){
                this.$api.ruleTableApi.getRiskList().then(res => {
                    this.eventList = res.data.rows.map((item)=>{
                      return {
                        eventDesc: item.riskDesc,
                        eventDate: item.crtTs,
                        errType: item.errType
                      }
                    });
                })
            }

        },
      methods: {
        getErrType(errType) {
          if (errType) {
            const dictObj = this.$lodash.find(this.errTypeDict, {dictId: errType});
            if (dictObj) {
              return dictObj.dictName;
            }
          }
        },
      }
    }
</script>

<style scoped>
.notice-list {
  display: flex;
  width: 100%;
  height: 70px;
  align-items: center;
  border-bottom: 1px dashed #eaeaea;
}

.task-icon,
.task-des,
.task-time {
  font-size: 14px;
}

.task-icon {
  margin-right: 10px;
}

.task-icon > em {
  font-size: 12px;
  color: #666;
}

.task-des {
  width: 100%;
  overflow: hidden;
  font-size: 12px;
  color: #999;
}

.task-des > div:nth-child(1) {
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #666;
  margin-bottom: 6px;
}

.task-des > div:nth-child(1) > span:nth-child(1) {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}

.task-des > div:nth-child(2) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color: #ccc;
}

.task-time {
  flex: none;
  width: 55px;
  text-align: right;
  padding-right: 5px;
}

.task-time > div:nth-child(1) {
  color: #9a9a9a;
  margin-bottom: 6px;
}

.task-time > div:nth-child(2) {
  color: #ccc;
}
</style>
