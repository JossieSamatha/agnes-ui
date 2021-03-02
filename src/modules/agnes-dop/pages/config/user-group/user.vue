<template>
    <div style="height: 100%">
        <gf-grid ref="grid" grid-no="agnes-user" :query-args="queryArgs" height="100%">
            <template slot="left">
                <gf-button class="action-btn" :aria-disabled="disabled" @click="addRow" size="mini">添加</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import UserSelect from "./select";
    import lodash from "lodash";
    import UpdateSeqNumDlg from "./user-update-seq-num";
    export default {
        name: "userAuth",
        props: {
            row: {required: true}
        },
        data() {
            return {
                disabled: true,
                queryArgs: {},
            }
        },
        mounted() {
            this.onSearch();
        },
        methods: {
            onSearch() {
                if (this.row != null) {
                    this.queryArgs.userGroupId = this.row.userGroupId;
                    this.$refs.grid.reloadData(true);
                }
            },
            showDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$nav.showDialog(
                    UpdateSeqNumDlg,
                    {
                        args: {row, mode, actionOk},
                        width: '50%',
                        title: this.$dialog.formatTitle('序号修改', mode),
                    }
                );
            },
            async onEditModel() {
                this.onSearch();
            },
            editRow(param){
                this.showDlg('edit', param.data, this.onEditModel.bind(this));
            },
            addRow() {
                if(this.row===null){
                    this.$msg.warning("请选择群组!");
                    return;
                }
                // 查询用户
                let fieldData = {dataType: this.$store.getters.appConfig.orgType, multiSelect: true, users: []};
                let _this = this;
                this.$dialog.create({
                    title: '新增授权用户',
                    component: UserSelect,
                    closeOnClickModal: false,
                    args: {data: fieldData},
                    beforeClose: function (args, action) {
                        if (action && action === 'ok') {
                            try {
                                // 保存用户
                                let userIds = lodash.map(args.data.users,"userId");
                                this.$api.userGroupApi.saveUserGroupRef({"userIds":userIds,"userGroupId":_this.row.userGroupId}).then(function (resp) {
                                    if(resp.data === "success"){
                                        _this.onSearch();
                                    }
                                });
                            } catch (reason) {
                                this.$msg.error(reason);
                            }
                        } else {
                            _this.onSearch();
                        }
                    }
                });
            },
            async removeRow(params) {
                const ok = await this.$msg.ask(`确认移除选中的联系人吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    let p = this.$api.userGroupApi.deleteUserGroupRef({"userGroupRefId":params.data.userGroupRefId});
                    await this.$app.blockingApp(p);
                    this.onSearch();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            }
        },
        watch: {
            row(newVal) {
                this.onSearch();
                this.disabled = !newVal;
            }
        }
    }
</script>