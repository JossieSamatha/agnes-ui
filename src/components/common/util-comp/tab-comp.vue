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
            this.objData.forEach((item) => {
                this.$set(item, 'loaded', false);
            });
            if (this.showTabs.length > 0) {
                this.objData[this.showTabs[0].index].loaded = true;
                this.activeName = this.showTabs[0].name;
                this.$emit('activeName', this.showTabs[0].name);
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