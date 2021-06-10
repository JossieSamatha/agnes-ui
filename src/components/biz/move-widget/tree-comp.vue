<template>
    <div class="tree-comp">
        <div class="input-box">
            <el-input size="mini" suffix-icon="el-icon-search" clearable v-model="filterInputValue"
                @change="onFilter" placeholder="请输入检索内容">
            </el-input>
        </div>
        <el-tree class="tree-self" ref="treeComp"
            v-for="(treeItem, index) in treeOptions" :key="index" 
            node-key="id"
            :data="treeItem.treeData"
            :filter-node-method="filterNode"
            :props="metaCategoryProps"
            :highlight-current="true"
             :default-expand-all="true"
            v-bind="treeItem.defaultProps"
            v-on="treeItem.defaultActions"
        >
            <div class="tree-node" slot-scope="{ data }">
                <span class="ellipsis" :title="data.name">{{ data.name }}</span>
            </div>
        </el-tree>
    </div>
</template>

<script>
export default {
    name: 'TreeComp',
    props: {
        treeOptions: { type: Array }
    },
    data() {
        return {
            metaCategoryProps: { // 树节点数据属性配置
                value: 'id',
                label: 'name',
                // children: 'childrenCategory'
                // emitPath: false // 只返回，选中节点的值
            },
            filterInputValue: '',  // 过滤搜素值
            curChoosedData: {}     // 当前节点数据
        }
    },
    watch: {
        curChoosedData(val){
            this.$emit('curChoosedDataChange', val);
        }
    },
    methods: {
        // 过滤值改变触发filterNode
        onFilter() {
            this.$refs.treeComp.filter(this.filterInputValue);
        },

        // 筛选树节点
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        }
    }
}
</script>
<style scoped>
    .tree-comp {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }

    .tree-comp .input-box >>> .el-input__inner {
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #A8AED3;
        height: 32px;
        line-height: 32px;
    }

    .tree-comp .input-box >>> .el-input__suffix-inner {
        line-height: 32px;
        font-size: 16px;
    }

    .tree-comp .input-box >>> .el-input--suffix {
        display: none;
    }

   .tree-comp .el-tree {
        /* flex: 1; */
        max-height: 100%;
        overflow-y: auto;
    }

    .tree-node {
        flex: 1;
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        /*background: #fff;*/
        z-index: 2;
    }
</style>
