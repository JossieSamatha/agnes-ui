<template>
    <gf-grid grid-no="agnes-product-field" ref="grid" quick-text-max-width="300px"
             height="100%" @row-double-click="showProduct">
      <template slot="left">
        <gf-button v-if="$hasPermission('agnes.dop.product.def.add')" class="action-btn" @click="addProduct"
                   size="mini">添加
        </gf-button>
        <gf-button v-if="$hasPermission('agnes.dop.product.def.sync')" class="action-btn" size="mini">同步产品生命周期数据
        </gf-button>
      </template>
    </gf-grid>
</template>

<script>
    import ProductDetail from "./product-detail.vue"
    export default {
        data() {
            return {
                form:{
                    linkManIdList:[]
                },
            }
        },
        props: {
            reqData:{
                type:Object,
                request:true
            }
        },
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            async onAddModel() {
                this.reloadData();
            },

          addProduct() {
            this.showDrawer('add', {}, this.onAddModel.bind(this));
          },
          editProduct(params) {
            this.showDrawer('edit', params.data, this.onAddModel.bind(this));
          },
          checkProduct(params) {
            this.showDrawer('check', params.data, this.onAddModel.bind(this));
          },
          showProduct(params) {
            this.showDrawer('view', params.data, this.onAddModel.bind(this));
          },
          deleteProduct(params) {
            this.$confirm('确定要删除产品吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              //调用接口处理所有任务
              this.deleteReload(params.data.productId);
            }).catch(() => {
              this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            async deleteReload(productId){
                // const p = this.$api.productApi.deleteProdut({productId});
                // await this.$app.blockingApp(p);
                // await this.$refs.grid.reloadData();
                // this.$msg.success('删除成功');

                const p = this.$api.productApi.deleteProdut({productId});
                let resp = await this.$app.blockingApp(p);
                if(resp.code=='error'){
                    this.$msg.error(resp.message);
                }else if(resp.code == '00000000'){
                    await this.$refs.grid.reloadData();
                    this.$msg.success("删除成功!");
                }
            },
            showDrawer(mode, row, actionOk) {
              if (mode !== 'add' && !row) {
                this.$msg.warning("请选中一条记录!");
                return;
              }
              let isShow = true;
              row.isCheck = false;
              if (mode === 'check') {
                mode = 'view';
                row.isCheck = true;
              }
              if (!row.isCheck && mode === 'view') {
                isShow = false;
              }
              this.$drawerPage.create({
                width: 'calc(100% - 250px)',
                title: ['产品信息', mode],
                component: ProductDetail,
                args: {row, mode, actionOk},
                okButtonVisible: isShow,
                okButtonTitle: row.isCheck ? "复核" : '保存',
                cancelButtonTitle: '取消',
                pageEl: this.$el
              });
            },
            async onAddLoad() {
                this.reloadData()
            },
        },
    }
</script>
