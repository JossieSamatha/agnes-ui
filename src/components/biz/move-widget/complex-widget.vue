<template>
    <div class="complex-widget">
        <move-Widget :compTitle="getCompTitle"
            :compType="compType"
            @compChange="compChange"
            @settingClick="settingClick"
        >
            <template slot="comp-slot">
                <calendar-widget v-if="compType.includes('calendar')"
                                 v-show="!showTree"
                                 @dateChange="dateChange"
                >
                </calendar-widget>
                <tree-comp ref="moveTreeComp" v-if="compType.includes('tree')"
                    v-show="showTree"
                    :treeOptions="treeOptions"
                >
                </tree-comp>
            </template>
        </move-Widget>
        <tree-data-manage ref="manageTreeData" :data="manageTreeData" @checkNodes="manageCheckNodes"></tree-data-manage>
    </div>
</template>

<script>
import MoveWidget from './move-widget.vue';
import TreeDataManage from './tree-data-manage.vue';
import TreeComp from './tree-comp.vue';
import calendarWidget from './calendar-widget'

export default {
    props: {
        compType: {
            type: Array,
            default() {
                return ['tree'];
            }
        },
        compTitle: {
            type: String
        },
        manageTreeData: {
            type: Array
        },
        treeOptions: {
            type: Array
        }
    },
    components: {
        'move-Widget': MoveWidget,
        'tree-data-manage': TreeDataManage,
        'tree-comp': TreeComp,
        'calendar-widget': calendarWidget
    },
    data() {
        return {
            showTree: true,
            curTreeData: [],
            curTreeRef: this.getCurTreeRef
        }
    },
    computed: {
        getCompTitle() {
            if(this.showTree){
                return this.compTitle;
            }else{
                return '运营日历工作台';
            }
        }
    },
    mounted() {
        this.showTree = !(this.compType && this.compType.includes('calendar'));
        this.curTreeData = this.treeData ? this.treeData : [];
    },
    methods: {
        compChange() {
            this.showTree = !this.showTree;
        },

        // 显示树数据管理弹框
        settingClick() {
            this.$refs.manageTreeData.show();
        },

        // 树数据管理弹框 -- 选择确认后发送选择数据
        manageCheckNodes(val) {
            this.curTreeData = val;
            this.$emit('manageCheckNodes', val);
        },

        // 日历组件日历切换
        dateChange(date){
            this.$emit('dateChange', date);
        },

        getCurTreeRef() {
            const moveTreeComp = this.$refs.moveTreeComp;
            if (moveTreeComp && moveTreeComp.$refs.treeComp) {
                return moveTreeComp;
            } else {
                return null;
            }
        }
    }
}
</script>

<style scoped>
.complex-widget {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
