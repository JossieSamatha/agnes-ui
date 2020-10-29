<template>
    <div>
        <el-row>
            <el-col style="height:100%;" :span="4" >
                <div  style="height:100%;border:1px solid #F6F8FA;border-radius:5px;background-color:#F6F8FA;margin-right:8px;padding-left:8px;padding-top:4px">
                    <el-button size="small">同步</el-button>
                    <el-button size="small" @click="initWork()">初始化</el-button>
                    <div v-for="(item,index) in areaList" :key="index"
                         :v-model="queryParam.workdayAreaCode"
                         @click="choseOptions(index,item)"
                         v-bind:class="{'act-button':flag==index}">
                        <gf-button type="text" >{{item.dictName}}</gf-button>
                    </div>
                </div>
            </el-col>
            <el-col :span="20">
                <div >
                    <el-calendar>
                        <template slot="dateCell" slot-scope="{date, data}">
                            <el-popover
                                    placement="top-start"
                                    width="200"
                                    trigger="click">
                                <div>
                                    <el-button @click="onUpdateWorkday(item,'0')">设置为节假日</el-button>
                                    <el-button @click="onUpdateWorkday(item,'1')">设置为工作日</el-button>
                                    <el-button @click="onUpdateWorkday(item,'FridayTag')">设置为特殊星期五</el-button>
                                    <el-button @click="onUpdateWorkday(item,'SundayTag')">设置为特殊周日</el-button>
                                </div>
                                <el-button slot="reference">
                                    <template v-for="item in calendarData">
                                        <div v-if="data.day.toString()==item.bizDate" :key="item.day"
                                             :class="item.workday==='0'?'txt-color':''">
                                            {{ data.day.split('-').slice(2,3).toString()}}
                                            <p v-if="item.paramCode==='FridayTag'">{{item.paramName}}</p>
                                            <p v-if="item.paramCode==='SundayTag'">{{item.paramName}}</p>
                                        </div>
                                    </template>
                                </el-button>
                            </el-popover>
                        </template>
                    </el-calendar>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import initWorkDay from './init-workday-dlg'
export default {
    data() {
        return {
            workday:{
                workdayAreaCode:"01",
            },
            calendarData: {
                data:[]
            },
            areaList:[],
            queryParam:{
                workdayAreaCode :"01"
            },
            flag:0
        }
    },
    mounted(){

        let dictTypeId="AC_AREA";
        this.areaList=this.$app.dict.getDictItems(dictTypeId);
        this.workday.workdayAreaCode=this.areaList[0].dictId;
        this.onListWorkday(this.workday);

    },
    watch:{
        calendarData(val){
            this.calendarData=val;
        },

    },
    methods:{
        list(workday){
          this.onListWorkday(workday);
        },
      async onListWorkday(workday) {
        try {
          const resp = await this.$api.workdayConfigApi.getWorkdayList(workday);
          this.calendarData = resp.data;
        } catch (reason) {
          this.$msg.error(reason);
        }
      },
      initWork() {
        this.$nav.showDialog(
            initWorkDay,
            {
              args: {},
              width: '50%',
              title: this.$dialog.formatTitle('初始化工作日', 'edit'),
            }
        );
      },
      async onUpdateWorkday(item, flag) {
        this.workday.workdayId = item.workdayId;
        this.workday.bizDate = item.bizDate;
        this.workday.workdayAreaCode = item.workdayAreaCode;
        if(flag.match(/0|1/)){
            this.workday.workday = flag;
        }else {
            if('FridayTag' === flag){
                this.workday.paramName = "特殊周五";
            }else {
                this.workday.paramName = "特殊周日";
            }
            this.workday.paramCode = flag;
            this.workday.paramId = item.paramId;
        }

        try {
          await this.$api.workdayConfigApi.updateWorkday(this.workday);
          this.list(this.workday)
          this.$msg.success('保存成功');
            } catch (reason) {
                this.$msg.error(reason);
            }
        },
        choseOptions(id,item){
            this.flag=id;
            this.queryParam.workdayAreaCode=item.dictId;
            this.onListWorkday(this.queryParam);
        },
    }
}
</script>

<style >
.txt-color{
    color: red;
}
.act-button{
    background-color:#F6F8FA;
}
</style>
