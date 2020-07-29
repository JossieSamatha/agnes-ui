<template>
    <div>
        <gf-grid @row-double-click="viewTask" grid-no="agnes-task-todo" ref="grid">

        </gf-grid>
    </div>
</template>

<script>
    //import KpiDef from "../kpi-def/index"
    import TaskConfDlg from "./task-confirm-dlg"

    export default {
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            viewTask(params) {
                const row = params.data;
                if (row.taskType === '1') {
                    let kpiCode = row.taskKey;
                    let bizDate = row.taskStartTm;
                    // this.$nav.showDialog(
                    //     KpiDef,
                    //     {
                    //         args: {kpiCode, bizDate},
                    //         width: '80%',
                    //         title: this.$dialog.formatTitle('指标任务详情')
                    //     }
                    // );
                    let pageView = this.$app.views.getView("agnes.kpi.def");
                    let tabView = Object.assign({
                        args: {kpiCode, bizDate},
                        id: "agnes.kpi.def"
                    }, pageView);
                    this.$nav.showView(tabView);
                }
            },
            async onViewTask() {
                this.reloadData();
            },
            confirmTask(params) {
                const row = params.data;
                let mode = 'edit';
                let actionOk = this.onConfirmTask.bind(this);
                if (row.taskType === '1') {
                    this.$nav.showDialog(
                        TaskConfDlg,
                        {
                            args: {row, mode, actionOk},
                            width: '35%',
                            title: this.$dialog.formatTitle('确认任务', mode)
                        }
                    );
                }
            },
            async onConfirmTask() {
                this.reloadData();
            },
        }
    }
</script>