<template>
    <gf-grid grid-no="agnes-task" ref="grid" quick-text-max-width="300px"
             @row-double-click="showTask">
        <template slot="right-before">
            <gf-button @click="addTask">新增</gf-button>
        </template>
    </gf-grid>
</template>

<script>
    import TaskDef from "./task-def";

    export default {
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            showDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$nav.showDialog(
                    TaskDef,
                    {
                        args: {row, mode, actionOk},
                        width: '50%',
                        title: this.$dialog.formatTitle('任务类型', mode),
                    }
                );
            },
            async onAddModel() {
                this.reloadData();
            },
            async onEditModel() {
                this.reloadData();
            },
            addTask() {
                this.showDlg('add', {}, this.onAddModel.bind(this));
            },
            showTask(params) {
                this.showDlg('view', params.data);
            },
            editTask(params) {
                this.showDlg('edit', params.data, this.onEditModel.bind(this));
            },
            async deleteTask(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除任务类型:[${row.taskName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.taskDefineApi.deleteTask(row.taskId);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            }
        }
    }
</script>
