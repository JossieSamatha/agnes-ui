<template>
    <div>
        <gf-grid grid-no="agnes-task-manage" ref="grid">

        </gf-grid>
    </div>
</template>

<script>
    // import KpiDef from "../kpi-def/index"
    // import PersonTaskDetail from "../person-task-detail"
    // import TaskConfDlg from "./task-confirm-dlg"

    export default {
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            // viewTask(params) {
            //     const row = params.data;
            //     if (row.taskType === '01'||row.taskType === '1') {
            //         let kpiCode = row.taskKey;
            //         let bizDate = row.bizDt;
            //         let caseId = row.caseId;
            //         let stepCode = row.stepCode;
            //         // let pageView = this.$app.views.getView("agnes.kpi.def");
            //         // let tabView = Object.assign({
            //         //     args: {kpiCode, bizDate, caseId, stepCode},
            //         //     id: "agnes.kpi.def"
            //         // }, pageView);
            //         // this.$nav.showView(tabView);
            //         this.$drawerPage.create({
            //             width: 'calc(92% - 215px)',
            //             title: ['指标任务详情'],
            //             component: KpiDef,
            //             args: {kpiCode, bizDate, caseId, stepCode},
            //             // okButtonTitle: row.isCheck ? '审核' : '保存',
            //             okButtonVisible:false,
            //             cancelButtonTitle: row.isCheck ? '反审核' : '取消',
            //         });
            //     }else if(row.taskType === '06'||row.taskType === '6'){
            //         let kpiCode = row.taskKey;
            //         let bizDate = row.bizDt;
            //         let caseId = row.caseId;
            //         let stepCode = row.stepCode;
            //         this.$drawerPage.create({
            //             width: 'calc(92% - 215px)',
            //             title: ['人工任务详情'],
            //             component: PersonTaskDetail,
            //             args: {kpiCode, bizDate, caseId, stepCode},
            //             // okButtonTitle: row.isCheck ? '审核' : '保存',
            //             okButtonVisible:false,
            //             cancelButtonTitle: row.isCheck ? '反审核' : '取消',
            //         });
            //     }
            // },
            // async onViewTask() {
            //     this.reloadData();
            // },
            // confirmTask(params) {
            //     const row = params.data;
            //     let mode = 'edit';
            //     let actionOk = this.onConfirmTask.bind(this);
            //     if (row.taskType === '1') {
            //         this.$nav.showDialog(
            //             TaskConfDlg,
            //             {
            //                 args: {row, mode, actionOk},
            //                 width: '35%',
            //                 title: this.$dialog.formatTitle('确认任务', mode)
            //             }
            //         );
            //     }
            // },
            // async onConfirmTask() {
            //     this.reloadData();
            // },
        }
    }
</script>