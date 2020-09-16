<template>
    <div>
        <div class="conf-row">
            <p class="conf-row-title">组件位置</p>
            <div class="conf-row-item">
                <div class="row-inp">
                    <span>上距</span>
                    <el-input v-model="position.top">
                        <span v-show="compId" class="conf-icon" slot="append" :class="topIsLocked? 'el-icon-lock':'el-icon-unlock'" @click="toggleXYLock('x')"></span>
                    </el-input>
                </div>
                <div class="row-inp">
                    <span>左距</span>
                    <el-input v-model="position.left">
                        <span v-show="compId" class="conf-icon" slot="append" :class="leftIsLocked? 'el-icon-lock':'el-icon-unlock'"  @click="toggleXYLock('y')"></span>
                    </el-input>
                </div>
            </div>
        </div>
        <div class="conf-row">
            <p class="conf-row-title">组件宽高</p>
            <div class="conf-row-item">
                <div class="row-inp">
                    <span>宽度</span>
                    <el-input v-model="position.width"></el-input>
                </div>
                <div class="row-inp">
                    <span>高度</span>
                    <el-input v-model="position.height"></el-input>
                </div>
            </div>
        </div>
        <div class="conf-row">
            <p class="conf-row-title">垂直层级</p>
            <div class="conf-row-item">
                <div class="row-inp" style="flex: 0 calc(50% - 5px)">
                    <span>层级</span>
                    <el-input v-model="position.zIndex"></el-input>
                </div>
            </div>
        </div>
        <div class="conf-row">
            <p class="conf-row-title">限制条件</p>
            <div class="conf-row-item switchItem">
                <div class="row-inp">
                    <span>拉伸</span>
                    <el-switch v-model="position.resizable"></el-switch>
                </div>
                <div class="row-inp">
                    <span>等比拉伸</span>
                    <el-switch v-model="position.aspectRatio"></el-switch>
                </div>
                <div class="row-inp">
                    <span>拖动</span>
                    <el-switch v-model="position.draggable"></el-switch>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return this.$datavTemplateService.data;
        },
        computed: {
            position(){
                return this.curComp.position || {};
            },
            compId(){
                return this.curComp.compId;
            },
            topIsLocked() {
                if (!this.compId) {
                    return false;
                }
                return (this.position.axis === 'x' || this.position.axis === 'none')
            },

            leftIsLocked() {
                if (!this.compId) {
                    return false;
                }
                return (this.position.axis === 'y' ||
                    this.position.axis === 'none')
            }
        },
        methods: {
            toggleXYLock(dir){
                if (!this.compId) {
                    return
                }
                if((dir === 'x' && this.topIsLocked) || (dir === 'y' && this.leftIsLocked)){
                    this.curComp.position.axis = 'both';
                }else{
                    this.curComp.position.axis = dir;
                }
            }
        }
    }
</script>