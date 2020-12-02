<template>
  <div>
    <el-form class="search-panel" label-width="100px">
      <div class="line">
        <el-form-item label="账户名称">
          <el-input v-model="queryArgs.acntName"></el-input>
        </el-form-item>
        <el-form-item label="联系人名称">
          <el-input v-model="queryArgs.linkmanName"></el-input>
        </el-form-item>
        <el-button @click="reloadData" class="option-btn" type="primary">查询</el-button>
      </div>
      <div class="line">
        <el-form-item label="归属机构">
          <el-input v-model="queryArgs.extOrgName"></el-input>
        </el-form-item>
        <el-form-item label="状态">
<!--          <gf-dict filterable clearable v-model="queryArgs.status" dict-type="AGNES_RELEASE_STATUS"/>-->
          <el-select style="width: 100%" class="multiple-select" v-model="queryArgs.status"
                     clearable filterable
                     placeholder="请选择">
            <gf-filter-option
                    v-for="item in releaseStatusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </gf-filter-option>
          </el-select>
        </el-form-item>
        <el-button @click="reSetSearch" class="option-btn">重置</el-button>
      </div>
    </el-form>
    <gf-grid grid-no="agnes-acnt-linkman-ref" ref="grid" toolbar="find,refresh,more" quick-text-max-width="300px"
             height="100%" :query-args="queryArgs">
      <template slot="left">
        <gf-button class="action-btn" @click="onAddLinkman" size="mini"
                   v-if="$hasPermission('agnes.acnt.linkman.ref.add')">添加
        </gf-button>
      </template>
    </gf-grid>
  </div>
</template>

<script>
    import linkmanRefAddDlg from './linkman-ref-add-dlg'

    export default {
      data() {
        return {
          queryArgs: {
            'acntName': '',
            'linkmanName': '',
            'extOrgName': '',
            'status': '',
          },
          releaseStatusList: [
            {value: '01', label: '待复核'},
            {value: '02', label: '待发布'},
            {value: '03', label: '已发布'},
            {value: '05', label: '已作废'}
          ]
        }
      },
      methods: {
        reSetSearch() {
          this.queryArgs = {
            'acntName': '',
            'linkmanName': '',
            'extOrgName': '',
            'status': '',
          };
          this.reloadData();
        },
        reloadData() {
          this.$refs.grid.reloadData();
        },
        showDlg(mode, row, ui, actionOk) {
          if (mode !== 'add' && !row) {
            this.$msg.warning("请选中一条记录!");
            return;
          }
          let title = this.$dialog.formatTitle("账户联系人关系维护", mode);
          if (mode == 'check') {
            title = '账户联系人关系维护-审核';
                }
                this.$nav.showDialog(
                    linkmanRefAddDlg,
                    {
                        args: {row, mode, ui, actionOk},
                        width: '50%',
                        title: title,
                    }
                );
            },
            async onAddLinkMan() {
                this.reloadData();
            },
            async onEditLinkMan() {
                this.reloadData();
            },
            onAddLinkman() {
                this.showDlg('add', {},"", this.onAddLinkMan.bind(this));
            },
            editLinkman(params) {
                this.showDlg('edit', params.data,"", this.onEditLinkMan.bind(this));
            },
            stopLinkman(params) {
                this.startLinkman(params);
            },
            checkLinkman(params) {
                this.showDlg('check', params.data,"1", this.onEditLinkMan.bind(this));
            },

            async startLinkman(params) {
              let msg = "确认发布吗, 是否继续?";
                if(params.data.status == '03'){
                    msg = "确认停用吗, 是否继续?";
                }
                const ok = await this.$msg.ask(msg);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.linkmanRefApi.startLinkman(params.data);
                    await this.$app.blockingApp(p);
                    this.$msg.success("启用成功!");
                    this.reloadData();
                } catch (e) {
                    this.$msg.error(e);
                }
            },

            async deleteLinkman(params) {
                const row = params.data;
                let rows = this.$refs.grid.getSelectedRows();
                if (!rows) {
                    this.$msg.warning("请选中一条记录!");
                    return
                }
                const ok = await this.$msg.ask(`确认删除当前选中记录吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.linkmanRefApi.deleteLinkmanRef(row);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
        },
    }
</script>
