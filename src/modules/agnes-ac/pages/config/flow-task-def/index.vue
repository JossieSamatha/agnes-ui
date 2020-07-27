<template>
    <div>
        <gf-grid ref="grid"
                 grid-no="flow-task-field"
                 toolbar="find,refresh,more"
        >
            <template slot="left">
                <gf-button class="action-btn" @click="addFlowTask" size="mini">新增电子流程任务</gf-button>
                <gf-button class="action-btn" @click="confFlowNode('add',{})" size="mini">配置流程任务节点</gf-button>
                <gf-button class="action-btn" @click="updateFlowTask" size="mini">修改</gf-button>
                <gf-button class="action-btn" @click="deleteFlowTask" size="mini">删除</gf-button>
                <gf-button class="action-btn" @click="reviewFlowTask" size="mini">复核</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import FlowTaskDetail from './flow-task-detail'
    export default {
        methods: {
            showFlowTask(mode, rowData, actionOk){
                if (mode !== 'add' && !rowData) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                // 抽屉创建
                this.$drawerPage.create({
                    width: 'calc(92% - 215px)',
                    title: ['电子流程任务',mode],
                    component: FlowTaskDetail,
                    wrapperClosable: false,
                    args: {mode, rowData, actionOk}
                })
            },
            reloadData() {
                this.$refs.grid.reloadData(true);
            },
            async onAddFlowTask() {
                await this.reloadData();
            },
            addFlowTask() {
                    this.showFlowTask('add', {}, this.onAddFlowTask.bind(this));
            },
            confFlowNode(mode, rowData, actionOk) {
                // 抽屉创建
                this.$drawerPage.create({
                    width: 'calc(92% - 215px)',
                    title: ['流程任务节点配置',mode],
                    component: 'case-config-index',
                    wrapperClosable: true,
                    args: {mode, rowData, actionOk}
                })
            },
            updateFlowTask() {},
            deleteFlowTask() {},
            reviewFlowTask() {},
        }
    }
</script>