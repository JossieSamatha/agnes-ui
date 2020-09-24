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
                    <el-calendar >
                        <template
                                slot="dateCell"
                                slot-scope="{date, data}" >
                            <div v-for="item in calendarData"  v-bind:key="item.day">
                                <div v-if="data.day.toString()==item.bizDate">
                                    <div slot="reference"
                                         :class="item.workday==='0'?'txt-color':''">
                                        {{ data.day.split('-').slice(2,3).toString() }}
                                    </div>
                                    <el-popover
                                            placement="top-start"
                                            width="200"
                                            trigger="hover">
                                        <div >
                                            <el-row>
                                                <el-col>
                                                    <el-button @click="onUpdateWorkday(item,'0')">设置为节假日</el-button>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col>
                                                    <el-button @click="onUpdateWorkday(item,'1')">设置为工作日</el-button>
                                                </el-col>
                                            </el-row>
                                        </div>
                                        <div style="height:300px;width:100%"  slot="reference">
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
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
        this.workday.workday = flag;

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
