<template>
    <div>
        <div class="conf-row">
            <p class="conf-row-title">组件位置</p>
            <div class="conf-row-item">
                <div class="row-inp">
                    <span>top</span>
                    <el-input v-model="compData.top" @keyup="changeTop">
                        <span v-show="activeComp" class="conf-icon" slot="append" :class="topIsLocked? 'el-icon-lock':'el-icon-unlock'" @click="toggleYLock"></span>
                    </el-input>
                </div>
                <div class="row-inp">
                    <span>left</span>
                    <el-input v-model="compData.left" @keyup="changeLeft">
                        <span v-show="activeComp" class="conf-icon" slot="append" :class="leftIsLocked? 'el-icon-lock':'el-icon-unlock'"  @click="toggleXLock"></span>
                    </el-input>
                </div>
            </div>
        </div>
        <div class="conf-row">
            <p class="conf-row-title">组件宽高</p>
            <div class="conf-row-item">
                <div class="row-inp">
                    <span>width</span>
                    <el-input v-model="compData.width" @keyup="changeWidth"></el-input>
                </div>
                <div class="row-inp">
                    <span>height</span>
                    <el-input v-model="compData.height" @keyup="changeHeight"></el-input>
                </div>
            </div>
        </div>
        <div class="conf-row">
            <p class="conf-row-title">限制条件</p>
            <div class="conf-row-item switchItem">
                <div class="row-inp">
                    <span>拉伸</span>
                    <el-switch v-model="compData.resizable" @change="toggleResizable"></el-switch>
                </div>
                <div class="row-inp">
                    <span>等比拉伸</span>
                    <el-switch v-model="compData.aspectRatio" @change="toggleAspect"></el-switch>
                </div>
                <div class="row-inp">
                    <span>拖动</span>
                    <el-switch v-model="compData.draggable" @change="toggleDraggable"></el-switch>
                </div>
            </div>
            <div class="conf-row-item switchItem">
                <div class="row-inp">
                    <span>置顶</span>
                    <el-switch v-model="zIndexTop" @change="toTop" :disabled="zIndexTop == 'null'"></el-switch>
                </div>
                <div class="row-inp">
                    <span>置底</span>
                    <el-switch v-model="zIndexBottom" @change="toBottom" :disabled="zIndexBottom == 'null'"></el-switch>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            activeComp() {
                return this.$store.getters['dataVTemplate/getActive'];
            },

            compData() {
                return this.activeComp === null ? '' : this.$store.state.dataVTemplate.datavComps[this.activeComp];
            },

            topIsLocked() {
                if (this.activeComp === null) {
                    return false;
                }
                return (this.compData.axis === 'x' || this.compData.axis === 'none')
            },

            leftIsLocked() {
                if (this.activeComp === null) {
                    return false;
                }
                return (this.compData.axis === 'y' ||
                    this.compData.axis === 'none')
            },

            zIndexTop: {
                get(){
                    if (this.activeComp === null) {
                        return 'null';
                    }else{
                        return this.compData.zIndex === this.$store.state.dataVTemplate.datavComps.length;
                    }
                },
                set(v){
                    this.$store.state.dataVTemplate.datavComps.zIndexTop = v;
                }
            },

            zIndexBottom: {
                get(){
                    if (this.activeComp === null) {
                        return 'null';
                    }else{
                        return this.compData.zIndex === 1;
                    }
                },
                set(v){
                    this.$store.state.dataVTemplate.datavComps.zIndexBottom = v;
                }
            }
        },
        methods: {
            toggleYLock() {
                if (this.activeComp === null) {
                    return
                }

                this.$store.dispatch('dataVTemplate/changeYLock', {id: this.activeComp});
            },
            toggleXLock() {
                if (this.activeComp === null) {
                    return
                }

                this.$store.dispatch('dataVTemplate/changeXLock', {id: this.activeComp});
            },

            toggleAspect() {
                if (this.activeComp === null) {
                    return
                }
                if (!this.compData.aspectRatio) {
                    this.$store.dispatch('dataVTemplate/setAspect', {id: this.activeComp});
                } else {
                    this.$store.dispatch('dataVTemplate/unsetAspect', {id: this.activeComp});
                }
            },

            toggleParentLimitation() {
                this.$store.dispatch('dataVTemplate/toggleParentLimitation', {id: this.activeComp});
            },

            toggleResizable() {
                this.$store.dispatch('dataVTemplate/toggleResizable', {id: this.activeComp});
            },

            toggleDraggable() {
                this.$store.dispatch('dataVTemplate/toggleDraggable', {id: this.activeComp});
            },

            toggleSnapToGrid() {
                this.$store.dispatch('dataVTemplate/toggleSnapToGrid', {id: this.activeComp});
            },

            toTop(val) {
                if(val){
                    this.$store.dispatch('dataVTemplate/changeZToTop', {id: this.activeComp});
                }else{
                    this.$store.dispatch('dataVTemplate/changeZToBottom', {id: this.activeComp});
                }

            },

            toBottom(val) {
                if(!val){
                    this.$store.dispatch('dataVTemplate/changeZToTop', {id: this.activeComp});
                }else{
                    this.$store.dispatch('dataVTemplate/changeZToBottom', {id: this.activeComp});
                }

            },

            changeTop(ev) {
                let top = parseInt(ev.target.value);

                if (typeof top !== 'number' || isNaN(top)) {
                    top = this.compData.top;
                    ev.target.value = top;
                    return
                }

                this.$store.dispatch('dataVTemplate/setTop', {id: this.activeComp, top: top});
            },

            changeLeft(ev) {
                let left = parseInt(ev.target.value);

                if (typeof left !== 'number' || isNaN(left)) {
                    left = this.compData.left;
                    ev.target.value = left;
                }

                this.$store.dispatch('dataVTemplate/setLeft', {id: this.activeComp, left: left});
            },

            changeWidth(ev){
                let width = parseInt(ev.target.value);

                if (typeof width !== 'number' || isNaN(width)) {
                    width = this.compData.width;
                    ev.target.value = width;
                }

                this.$store.dispatch('dataVTemplate/setWidth', {id: this.activeComp, width: width});
            },

            changeHeight(ev){
                let height = parseInt(ev.target.value);

                if (typeof height !== 'number' || isNaN(height)) {
                    height = this.compData.height;
                    ev.target.value = height;
                }

                this.$store.dispatch('dataVTemplate/setHeight', {id: this.activeComp, height: height});
            }
        }
    }
</script>

<style scoped>

</style>