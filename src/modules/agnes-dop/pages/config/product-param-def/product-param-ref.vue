<template>
  <div class="gf-fit">
    <el-tabs v-model="this.app.code" tab-position="left" class="gf-role-auth-apps" type="border-card">
      <el-tab-pane :key="this.app.code" :label='this.app.name' :name="this.app.code">
        <div class="gf-fit">
          <div class="gf-role-auth">
            <div class="gf-role-auth-form">
              <gf-grid grid-no="agnes-product-param-ref" ref="grid" quick-text-max-width="300px"
                       :query-args="queryArgs" height="100%">
              </gf-grid>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      app: {
        name: '流程列表',
        code: 'product',
      },
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
    reloadData() {
      this.$refs.grid.reloadData();
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
