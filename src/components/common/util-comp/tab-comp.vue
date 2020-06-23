<template>
    <el-tabs v-model="activeName" type="card" class="normal-tab" @tab-click="handleClick">
        <el-tab-pane v-for="item in objData"
                     :name="item.name" :disabled="item.isDisabled" :key="item.name">
            <span slot="label">
                <i class="tabIcon" :class="item.icon" v-if="item.icon"></i>
                <el-badge :value="item.num" :max="99" :hidden="item.isDisabled||!item.num">
                    <span v-if="item.span">{{item.span}}</span>
                </el-badge>
            </span>
            <slot :name="item.name" :ifshow="item.loaded && !item.isDisabled"></slot>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        props: {
            objData: {
                type: Array,
                required: true
            },
        },
        data() {
            return {
                activeName: this.objData[1].name,
                showTabs: []
            }
        },
        created() {
            var _that = this;
            this.objData.forEach(function (item) {
                _that.$set(item, 'loaded', false);
            });
            if (_that.showTabs.length > 0) {
                this.objData[_that.showTabs[0].index].loaded = true;
                this.activeName = _that.showTabs[0].name;
                this.$emit('activeName', _that.showTabs[0].name);
            }
        },
        methods: {
            setActiveName(val) {
                this.activeName = val;
            },
            handleClick: function (tab) {
                this.objData[tab.index].loaded = true;
                this.$emit('tabChange', tab);
            }
        }
    }
</script>
<style>

</style>
