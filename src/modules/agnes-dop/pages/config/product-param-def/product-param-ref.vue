<template>
  <div class="gf-fit">
    <div class="gf-role-auth">
      <div class="gf-role-auth-form">
        <gf-grid grid-no="agnes-product-param-ref" ref="grid" quick-text-max-width="300px"
                 :query-args="queryArgs" height="100%">
          <template slot="left">
            <gf-button class="action-btn" size="mini" @click="associated">添加</gf-button>
          </template>
        </gf-grid>
      </div>
    </div>
  </div>
</template>

<script>
import ProductParamRefDlg from "./product-param-ref-dlg"

export default {
  data() {
    return {

      form: {
        linkManIdList: []
      },
      queryArgs: {
        productParamId: '',
      }
    }
  },
  props: {
    reqData: {
      type: Object,
      request: true
    }
  },
  watch: {
    reqData: {
      handler() {
        if (this.reqData.productParamId) {
          this.queryArgs.productParamId = this.reqData.productParamId;
          this.reloadData();
        }
      },
      deep: true
    }
  },
  mounted() {
  },
  methods: {
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
    associated() {

      this.associatedProduct({"productParamId": this.queryArgs.productParamId}, this.onLoad.bind(this));
    },
    reloadData() {
      this.$refs.grid.reloadData();
    },
    async onLoad() {
      this.reloadData();
    },
    async deleteProductParamRef(params) {
      const ok = await this.$msg.ask(`确认删除此关联产品?`);
      if (!ok) {
        return
      }
      try {
        const p = this.$api.productParamApi.removeRef(params.data.productParamId, params.data.productId);
        await this.$app.blockingApp(p);
        this.reloadData()
        this.$msg.success('删除关联成功');
      } catch (reason) {
        this.$msg.error(reason);
      }
    }
  },
}
</script>
