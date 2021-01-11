<template>
    <gf-grid grid-no="data-pipe-task" ref="grid" quick-text-max-width="300px" height="100%" @row-double-click="showTask">
        <template slot="left" >
            <gf-button class="action-btn" @click="addTask" size="mini">添加</gf-button>
        </template>
    </gf-grid>
</template>

<script>
    import dataPipeTask from "./data-pipe-task-tab"
    export default {
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            // 抽屉创建
            showDrawer(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                let isShow = true;
                let cancelTitle = '取消';
                if(mode==='view'){
                    cancelTitle = '关闭';
                    isShow = false;
                }
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: ['调度配置',mode],
                    component: dataPipeTask,
                    args: {row, mode, actionOk},
                    okButtonVisible: isShow,                             // 保存按钮是否显示
                    okButtonTitle: '保存',                                // 保存按钮名称按需传入
                    cancelButtonTitle: cancelTitle,                         // 取消按钮名称按需传入
                    pageEl: this.$el
                });
            },
            async onAddTask() {
                this.reloadData();
            },
            async onEditTask() {
                this.reloadData();
            },
            addTask() {
                this.showDrawer('add', {},this.onAddTask.bind(this));
            },
            editTask(params) {
                this.showDrawer("edit",params.data, this.onEditTask.bind(this));
            },
            showTask(params){
                this.showDrawer("view",params.data);
            },
            async deleteTask(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除所选任务吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                  const ids = [];
                  ids.push(row.taskId)
                  const p = this.$api.dataPipeApi.deleteTask({ids});
                  await this.$app.blockingApp(p);
                  this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async updateTaskStatus(params) {
                try {
                    const p = this.$api.dataPipeApi.updateTaskStatus(params.data);
                    await this.$app.blockingApp(p);
                  this.reloadData();
                } catch (reason) {
                  this.$msg.error(reason);
                }
            },
          start(params) {
            this.updateTaskStatus(params);
          },
          stop(params) {
            this.updateTaskStatus(params);
          },
          execute(params) {
            console.log(params)
          }
        }
    }

</script>
