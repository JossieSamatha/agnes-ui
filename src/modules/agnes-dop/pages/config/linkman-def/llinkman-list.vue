<template>
    <gf-grid grid-no="agnes-linkman-field" ref="grid" quick-text-max-width="300px"
              :query-args="queryArgs" height="100%" @row-double-click="showLinkman">
        <template slot="left">
            <gf-button v-if="$hasPermission('agnes.dop.linkman.add')" class="action-btn" @click="addLinkMan"
                       size="mini">添加
            </gf-button>
            <gf-button v-if="$hasPermission('agnes.dop.linkman.export')"  @click="exportExcel" class="action-btn">导出</gf-button>
            <menu-config-upload v-if="$hasPermission('agnes.dop.linkman.input')" :res-name=menuConfigInfo.resName :if-pk-id="menuConfigInfo.inputParam">
            </menu-config-upload>
        </template>
    </gf-grid>
</template>

<script>
    import linkManBaseDlg from "./linkman-base-dlg"
    export default {
        data() {
            return {
                queryArgs:{
                    'extOrgId':'',
                },
                menuConfigInfo:{
                    resName:'',
                    inputParam:'',},
            }
        },
        props: {
            reqData:{
                type:Object,
                request:true
            }
        },
        watch: {
            reqData:{
                handler() {
                    this.queryArgs.extOrgId = this.reqData.extOrgId;
                    this.reloadData();

                },
                deep:true
            }
        },
        mounted() {
            this.initData();
        },
        methods: {
            async initData(){
                let resp1 = await this.$api.funcConfigApi.queryMenuByActionUrl({'actionUrl':this.$app.nav.tabBar.currentTabKey});
                if(resp1.data){
                    this.menuConfigInfo = resp1.data;
                }
            },
          reloadData() {
            this.$refs.grid.reloadData();
          },
          showDlg(mode, row, actionOk) {
            if (mode !== 'add' && !row) {
              this.$msg.warning("请选中一条记录!");
              return;
            }
            this.$nav.showDialog(
                linkManBaseDlg,
                {
                  args: {row, mode, actionOk},
                  width: '50%%',
                  title: this.$dialog.formatTitle('联系人信息', mode),
                }
            );
          },
          async onAddLoad() {
            this.reloadData()
          },
          addLinkMan() {
            this.showDlg('add', {"extOrgId": this.reqData.extOrgId}, this.onAddLoad.bind(this));
          },
          showLinkman(params) {
            this.showDlg('view', params.data);
          },
          editLinkMan(params) {
            this.showDlg('edit', params.data, this.onAddLoad.bind(this));
          },
          async deleteLinkMan(params) {
            const row = params.data;
            const ok = await this.$msg.ask(`确认删除选中的联系人吗, 是否继续?`);
            if (!ok) {
              return
            }
            try {
              const p = this.$api.linkmanApi.deleteLinkMan(row);
              await this.$app.blockingApp(p);
              this.reloadData();
            } catch (reason) {
              this.$msg.error(reason);
            }
          },
          async approveLinkman(params) {
            const row = params.data;
            const ok = await this.$msg.ask(`确认复核所选记录吗, 是否继续?`);
            if (!ok) {
              return
            }
            try {
              const p = this.$api.linkmanApi.updateLinkmanStatus(row.linkmanId, "04");
              await this.$app.blockingApp(p);
              this.reloadData();
            } catch (reason) {
              this.$msg.error(reason);
            }
          },
        async exportExcel() {
            if(this.menuConfigInfo == undefined || this.menuConfigInfo.outputParam == null || this.menuConfigInfo.outputParam == undefined){
                this.$msg.error('请完善导出相关配置！');
                return ;
            }
            let pkIds = '';
            let rows = this.$refs.grid.getSelectedRows();
            if(rows.length == 0){
                rows = this.$refs.grid.getRowData();
            }
            rows.forEach((item)=>{
                pkIds = pkIds + item.linkmanId +",";
            });
            pkIds = pkIds.substring(0, pkIds.lastIndexOf(","));
            let pkId = this.menuConfigInfo.outputParam;
            let fileName = this.menuConfigInfo.resName;
            const basePath = window.location.href.split("#/")[0];
            window.open(basePath + "api/data-pipe/v1/etl/file/exportexcel?pkId="+pkId+"&fileName="+fileName+"&pkIds="+pkIds);
        },
        }
    }
</script>
