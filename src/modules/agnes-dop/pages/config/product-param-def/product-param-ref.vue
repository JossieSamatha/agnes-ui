<template>
  <div class="gf-fit">
    <div class="gf-role-auth">
      <div class="gf-role-auth-form">
        <gf-grid grid-no="agnes-product-param-ref" ref="grid" quick-text-max-width="300px"
                 :query-args="queryArgs" height="100%">
          <template slot="left">
            <gf-button class="action-btn" v-if="$hasPermission('agnes.dop.product.param.ref.addRef')" size="mini"
                       @click="associated">添加
            </gf-button>
          </template>
        </gf-grid>
      </div>
    </div>
  </div>
</template>

<script>
import ProductParamRefDlg from "./product-param-ref-dlg"
import ProductParamRefEdit from './product-param-ref-edit'


export default {
  data() {
    return {

      form: {
        linkManIdList: []
      },
      queryArgs: {
        paramCode: '',
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
        if (this.reqData.paramCode) {
          this.queryArgs.paramCode = this.reqData.paramCode;
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
      if (!this.queryArgs.paramCode) {
        this.$msg.warning("请先选中一条参数");
        return
      }

      this.associatedProduct({
        "paramCode": this.queryArgs.paramCode,
        "paramType": this.reqData.paramType
      }, this.onLoad.bind(this));
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
        const p = this.$api.productParamApi.removeRef(params.data.pkId);
        await this.$app.blockingApp(p);
        this.reloadData()
        this.$msg.success('删除关联成功');
      } catch (reason) {
        this.$msg.error(reason);
      }
    },
    editProductParamRef(params) {
      this.showDlg(params.data, this.onLoad.bind(this))
    },
    async approveProductParamRef(params) {
      try {
        const param = {
          pkId: params.data.pkId,
          status: '04',
        }
        const p = this.$api.productParamApi.updateProductParamRefStatus(param)
        await this.$app.blockingApp(p);
        this.$msg.success("审核成功");
        this.reloadData();
      } catch (reason) {
        this.$msg.error("审核失败");
      }
    },
    showDlg(row, actionOk) {
      if (!row) {
        this.$msg.warning("请选中一条记录!");
        return;
      }
      this.$nav.showDialog(
          ProductParamRefEdit,
          {
            args: {row, actionOk},
            width: '50%',
            title: this.$dialog.formatTitle('产品参数关系维护', "edit"),
          }
      );
    },
  },
}
</script>
