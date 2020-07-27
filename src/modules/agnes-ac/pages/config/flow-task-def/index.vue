<template>
    <div>
        <gf-grid ref="grid"
                 grid-no="flow-task-field"
                 toolbar="find,refresh,more"
        >
            <template slot="left">
                <gf-button class="action-btn" @click="addFlowTask" size="mini">新增电子流程任务</gf-button>
                <gf-button class="action-btn" @click="confFlowNode" size="mini">配置流程任务节点</gf-button>
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
            showFlowTask(){
                // 抽屉创建
                this.$drawerPage.create({
                    width: 'calc(92% - 215px)',
                    title: '',
                    component: FlowTaskDetail,
                    wrapperClosable: true,
                    args: {}
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
            confFlowNode() {
                // 抽屉创建
                this.$drawerPage.create({
                    width: 'calc(92% - 215px)',
                    title: '',
                    component: 'case-config-index',
                    wrapperClosable: true,
                    args: {}
                })
            },
            updateFlowTask() {},
            deleteFlowTask() {},
            reviewFlowTask() {},
        }
    }
</script>