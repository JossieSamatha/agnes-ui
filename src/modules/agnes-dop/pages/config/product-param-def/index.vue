<template>
  <div class="gf-fit">
    <div class="gf-auth">
      <div class="gf-auth-role">
        <gf-grid grid-no="agnes-product-param" ref="grid" quick-text-max-width="200px"
                 height="100%" @row-double-click="showParam" @selected-changed="initReqDate"
                 @load-data="dataLoaded"
        >
          <template slot="left">
            <gf-button class="action-btn" size="mini" v-if="$hasPermission('agnes.dop.product.param.ref.add')"
                       @click="addParams">添加
            </gf-button>
          </template>
        </gf-grid>
      </div>
      <div class="gf-auth-body">
        <div class="gf-auth-content">
          <el-tabs v-model="authType">
            <el-tab-pane label="产品列表" name="res" :lazy="true"></el-tab-pane>
          </el-tabs>
          <div class="gf-auth-content-data">
            <ProductParamRef ref="productParamRef" :reqData="reqData"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductParamRef from "./product-param-ref"
import ProductParamDetail from "./product-param-detail"
import ProductParamRefDlg from "./product-param-ref-dlg"


export default {
  name: "index",
  components: {
    ProductParamRef,
  },
  data() {
    return {
      reqData: {
        paramCode: '',
        paramType: '',
      },
      authType: 'res',
    }
  },
  mounted() {
  },
  methods: {
    initReqDate(gridState) {
      if (gridState.selectedRow) {
        this.reqData.paramCode = gridState.selectedRow.paramCode;
        this.reqData.paramType = gridState.selectedRow.paramType;
      }
    },
    addParams() {
      this.showDlg('add', {}, this.onLoad.bind(this));
    },
    showParam(params) {
      this.showDlg('view', params.data, this.onLoad.bind(this));
    },
    editParam(params) {
      this.showDlg('edit', params.data, this.onLoad.bind(this));
    },
    async deleteParam(params) {
      const ok = await this.$msg.ask(`确认删除选中产品参数?`);
      if (!ok) {
        return
      }
      try {
        const p = this.$api.productParamApi.deleteParam(params.data.paramCode, params.data.pkId);
        await this.$app.blockingApp(p);
        this.$msg.success('删除成功');
      } catch (reason) {
        this.$msg.error("删除失败");
      }
    },
    async approveProductParam(params) {
      try {
        params.data.paramStatus = '04'
        const p = this.$api.productParamApi.updateStatus(params.data);
        await this.$app.blockingApp(p);
        this.$msg.success('审核成功');
        this.reloadData();
      } catch (reason) {
        this.$msg.error("审核失败");
      }
    },

    showDlg(mode, row, actionOk) {
      if (mode !== 'add' && !row) {
        this.$msg.warning("请选中一条记录!");
        return;
      }
      const rowData = this.$lodash.cloneDeep(row);
      this.$nav.showDialog(
          ProductParamDetail,
          {
            args: {row: rowData, mode, actionOk},
            width: '50%%',
            title: this.$dialog.formatTitle('产品参数维护', mode),
          }
      );
    },
    associatedProduct(row, actionOk) {
      this.$nav.showDialog(
          ProductParamRefDlg,
          {
            args: {row, actionOk},
            width: '50%',
            title: this.$dialog.formatTitle('产品参数关联', 'edit'),
          }
      );
    },
    reloadData() {
      this.$refs.grid.reloadData();
    },
    async onLoad() {
      this.reqData.paramCode = ''
      this.reqData.paramType = ''
      this.reloadData();
    },
    dataLoaded() {
      this.reqData.paramCode = '';
      if (this.$refs.productParamRef && this.$refs.productParamRef.$refs.grid) {
        this.$refs.productParamRef.queryArgs.paramCode = '';
        this.$refs.productParamRef.queryArgs.paramType = '';
        this.$refs.productParamRef.$refs.grid.reloadData();
      }
    }
  }
}
</script>

<style scoped>
.el-border {
  border: 1px solid rgb(238, 238, 238);
}

.gf-auth-role {
  flex-grow: 0;
  width: 500px;
  padding-right: 5px;
}

</style>
