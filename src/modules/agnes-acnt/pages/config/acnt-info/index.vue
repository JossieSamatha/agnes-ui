<template>
    <div>
        <gf-grid @row-double-click="editEventDef" grid-no="agnes-acnt-info" ref="grid">
            <template slot="right-before">
<!--                <gf-button @click="addEventDef" size="mini">添加</gf-button>-->
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import acntInfoRateRefShowDlg from "./acnt-info-rate-ref-show-dlg";
    import acntInfoLinkmanRefShowDlg from "./acnt-info-linkman-ref-show-dlg";

    export default {
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            showDlg(dlg,title,mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$nav.showDialog(
                    dlg,
                    {
                        args: {row, mode, actionOk},
                        width: '60%',
                        title: this.$dialog.formatTitle(title, mode),
                    }
                );
            },
            queryRate(params) {
                this.showDlg(acntInfoRateRefShowDlg,'利率','view', params.data);
            },
            queryLinkman(params) {
                this.showDlg(acntInfoLinkmanRefShowDlg,'联系人','view', params.data);
            }
        }
    }
</script>

<style scoped>

</style>
