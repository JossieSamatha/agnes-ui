<template>
  <div>
    <div v-for="(item, index) in rosterList"
         :key="index" class="todolist-container">
      <div class="work-icon">
        <img :src="getImgPath(item.rosterType)" alt="work-icon">
      </div>
      <div class="task-des">
        <div>
          {{ item.userName }}&nbsp;
          <span style="color:#9a9a9a;">({{ item.userId }})</span>
        </div>
        <div>Tel:{{ item.oTel }}</div>
      </div>
      <div class="notice-state">
        <div @click="showRoster(item)">{{ getRosterType(item.rosterType) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comp-work",
  props: {
    moduleObj: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      todayDate: new Date().toLocaleDateString().replace(/\//g, '-'),
      rosterList: [],
      rosterType: this.$app.dict.getDictItems('AGNES_ROSTER_TYPE'),
      rosterStatus: this.$app.dict.getDictItems('AGNES_RELEASE_STATUS')
    }
  },
  async created() {
    const resp = await this.$api.changeDataApi.getChangeData();
    const resChangeData = resp.data;
    if (resChangeData && resChangeData.bizDate) {
      this.todayDate = resChangeData.bizDate;
    }

    this.$api.ruleTableApi.getUserOfToday(this.todayDate, this.moduleObj.pageType).then(res => {
      this.rosterList = res.data;
    });
  },
  mounted() {
    this.$api.ruleTableApi.getUserOfToday(this.todayDate, this.moduleObj.pageType).then(res => {
      this.rosterList = res.data;
    });
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
    getImgPath(val) {
      if (val.includes("00") && !val.includes("-")) {
        return require("../../../assets/sun.png")
      } else if (val.includes("01") && !val.includes("-")) {
        return require("../../../assets/moon.png")
      } else if (val.includes("-02")) {
        return require("../../../assets/key.png")
      } else if (val.includes("-03")) {
        return require("../../../assets/recheck.png")
      } else {
        return require("../../../assets/moon.png")
      }

    },

    getRosterType(rosterTypeId) {
      return this.$lodash.find(this.rosterType, {dictId: rosterTypeId}).dictName;
    },
  }
}
</script>

<style scoped>
.todolist-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  border-bottom: 1px dashed #eaeaea;
}

.work-icon,
.task-des,
.task-time {
  font-size: 12px;
}

.work-icon {
  margin-right: 10px;
}

.task-des {
  flex: 1;
  color: #666;
}

.task-time {
  width: 60px;
  padding: 0 10px;
}

.task-des > div {
  line-height: 25px;
}

.task-time > div:nth-child(1) {
  color: #9a9a9a;
}

.task-time > div:nth-child(2) {
  color: #ccc;
}

.notice-state {
  font-size: 12px;
  color: #999;
}
</style>
