<template>
  <div style="margin-left: 20px;">
    <gf-grid ref="grid" :options="gridOptions" class="grid-class" :height="height">
        <template slot="left">
          <gf-button class="action-btn" @click="updateManul" size="mini">人工一致</gf-button>
        </template>
    </gf-grid>
    <gf-input
        style="margin: 20px 0 10px -10px;"
        :max-byte-len="2000"
        type="textarea"
        :rows="2"
        :placeholder= "placeholder"
        v-model="remarks">
    </gf-input>
  </div>
</template>

<script>

    export default {
        props: {
            data: Object,
            toolbar: {
                default: "more"
            }
        },
        data() {
            return {
                height: "80%",
                bizDate:"",
                kpiDetail:{},
                gridOptions: {
                    columnDefs: [],
                    rowData:[],
                    ext: {
                        checkboxSelection: true,
                        checkboxColumn: 1,
                        pagingMode: false,

                    },
                },
                query:{q:{}},
                remarks: "",
                placeholder: "请输入备注",
            }
        },
        mounted() {
          this.kpiDetail.kpiCode= this.data.kpiCode;
          this.bizDate= this.data.bizDate;
          this.query.q.bizDate = this.data.bizDate;
          this.init();
        },
        methods: {
            async init(){
              try {
                const p1 = this.$api.kpiDefineApi.getKpiDetail(this.kpiDetail);
                const resp1 = await this.$app.blockingApp(p1);
                if(resp1.status){
                  this.kpiDetail =resp1.data;
                }
                this.query.q.kpiCode =this.kpiDetail.kpiCode;
                this.query.q.status = "0";
                const p2 = this.$api.kpiDefineApi.getKpiDetails(this.query);
                const resp2 = await this.$app.blockingApp(p2);
                if(resp2.data && resp2.data.length>0){
                  const rows=resp2.data;
                  const keys = Object.keys(rows[0]);
                  const columnDefsArray=this.getSqlGridOptions(keys);
                  this.gridOptions.api.setColumnDefs(columnDefsArray);
                  this.gridOptions.api.setRowData(rows);
                }
                const p3 = this.$api.kpiDefineApi.getKpiFields(this.kpiDetail.kpiCode);
                const resp3 = await this.$app.blockingApp(p3);
                if(resp3.data && resp3.data.length>0){
                  const columnDefsArray=this.getKpiGridOptions(resp3.data);
                  this.gridOptions.api.setColumnDefs(columnDefsArray);
                }
              } catch (reason) {
                this.$msg.error(reason);
              }
            },
            onCancel() {
                this.$emit("onClose");
            },
            reloadData() {
                let _this =this;
                this.$api.kpiDefineApi.getKpiDetails(this.query).then((resp) => {
                    if(resp.data && resp.data.length>0){
                        _this.gridOptions.api.setRowData(resp.data);
                    }
                });
            },
            getSqlGridOptions(resp) {
                return resp.map((item)=>{return {headerName: item, field: item, cellClass: "left", suppressMovable:true}});
            },
            getKpiGridOptions(resp) {
                return resp.map((item)=>{return {headerName: item.columnName, field: item.fieldName, cellClass: "left", suppressMovable:true}});
            },
            updateManul(){
                let _this=this;
                const rows = this.$refs.grid.getSelectedRows();
                if (rows.length === 0) {
                  this.$msg.warning("请选中一条记录!");
                  return;
                }
                const factors = rows.map((item)=>{return {kpiCode:this.kpiDetail.kpiCode, bizDate:new Date(_this.bizDate), bizKey:item.PRODUCT_CODE}});
                const params={"factors":factors ,"remarks":this.remarks};
                this.$api.kpiDefineApi.updateManul(params).then((resp) => {
                    if(resp.status){
                        _this.onCancel();
                    }
                });
            }
        }
    }
</script>

<style scoped>
</style>