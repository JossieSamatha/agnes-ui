<template>
    <div>
        <template>
            <gf-grid grid-no="agnes-task-field" ref="grid" quick-text-max-width="300px"
                     @row-double-click="editTask" @grid-ready="onReady">
                <template slot="right-before">
                    <gf-button @click="addTask">新增</gf-button>
                    <gf-button @click="addField">审核</gf-button>
                </template>
            </gf-grid>
        </template>
    </div>
</template>

<script>
    import TaskDlg from "./task-dlg";

    export default {

        data() {
            return {}
        },
        props: {
            rowData: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        watch: {
            rowData(value) {
                if (this.grid) {
                    this.grid.setRowData(value);
                }
            }
        },


        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            onReady() {
                this.grid = this.$refs.grid;
                this.refreshRows();
            },
            refreshRows() {
                this.grid.setRowData(this.rowData);
            },

            showDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$nav.showDialog(
                    TaskDlg,
                    {
                        args: {row, mode, actionOk},
                        width: '50%',
                        title: this.$dialog.formatTitle('任务', mode),
                    }
                );
            },
            addTask() {
                this.showDlg('add', {}, this.onAddTask.bind(this));
            },
            async onAddTask() {
                this.reloadData();
            },
            editTask(params) {
                this.showDlg('edit', params.data, this.onEditTask.bind(this));
            },
            async onEditTask() {
                this.reloadData();
            },
            async deleteTask(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除字段:[${row.taskName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.taskConfigApi.deleteTask(row.pkId);
                    await this.$app.blockingApp(p);
                    this.refreshRows();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            }
        }
    };
</script>
