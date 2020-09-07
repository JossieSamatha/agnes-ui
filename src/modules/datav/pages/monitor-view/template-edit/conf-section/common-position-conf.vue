<template>
    <div>
        <div class="conf-row">
            <p class="conf-row-title">组件位置</p>
            <div class="conf-row-item">
                <div class="row-inp">
                    <span>top</span>
                    <el-input v-model="position.top">
                        <span v-show="compIndex" class="conf-icon" slot="append" :class="topIsLocked? 'el-icon-lock':'el-icon-unlock'" @click="toggleYLock"></span>
                    </el-input>
                </div>
                <div class="row-inp">
                    <span>left</span>
                    <el-input v-model="position.left">
                        <span v-show="compIndex" class="conf-icon" slot="append" :class="leftIsLocked? 'el-icon-lock':'el-icon-unlock'"  @click="toggleXLock"></span>
                    </el-input>
                </div>
            </div>
        </div>
        <div class="conf-row">
            <p class="conf-row-title">组件宽高</p>
            <div class="conf-row-item">
                <div class="row-inp">
                    <span>width</span>
                    <el-input v-model="position.width"></el-input>
                </div>
                <div class="row-inp">
                    <span>height</span>
                    <el-input v-model="position.height"></el-input>
                </div>
            </div>
        </div>
        <div class="conf-row">
            <p class="conf-row-title">限制条件</p>
            <div class="conf-row-item switchItem">
                <div class="row-inp">
                    <span>拉伸</span>
                    <el-switch v-model="position.resizable" @change="toggleResizable"></el-switch>
                </div>
                <div class="row-inp">
                    <span>等比拉伸</span>
                    <el-switch v-model="position.aspectRatio" @change="toggleAspect"></el-switch>
                </div>
                <div class="row-inp">
                    <span>拖动</span>
                    <el-switch v-model="position.draggable" @change="toggleDraggable"></el-switch>
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
        data(){
            return this.$datavTemplateService.curComp;
        },
        updated(){
            this.position
        },
        computed: {
            topIsLocked() {
                if (this.compIndex === null) {
                    return false;
                }
                return (this.position.axis === 'x' || this.position.axis === 'none')
            },

            leftIsLocked() {
                if (this.compIndex === null) {
                    return false;
                }
                return (this.position.axis === 'y' ||
                    this.position.axis === 'none')
            },

            zIndexTop: {
                get(){
                    if (this.compIndex === null) {
                        return 'null';
                    }else{
                        return this.position.zIndex === this.$store.state.dataVTemplate.datavComps.length;
                    }
                },
                set(v){
                    this.$store.state.dataVTemplate.datavComps.zIndexTop = v;
                }
            },

            zIndexBottom: {
                get(){
                    if (this.compIndex === null) {
                        return 'null';
                    }else{
                        return this.position.zIndex === 1;
                    }
                },
                set(v){
                    this.$store.state.dataVTemplate.datavComps.zIndexBottom = v;
                }
            }
        },
        methods: {
            toggleYLock() {
                if (this.compIndex === null) {
                    return
                }

                this.$store.dispatch('dataVTemplate/changeYLock', {id: this.compIndex});
            },
            toggleXLock() {
                if (this.compIndex === null) {
                    return
                }

                this.$store.dispatch('dataVTemplate/changeXLock', {id: this.compIndex});
            },

            toggleAspect() {
                if (this.compIndex === null) {
                    return
                }
                if (!this.position.aspectRatio) {
                    this.$store.dispatch('dataVTemplate/setAspect', {id: this.compIndex});
                } else {
                    this.$store.dispatch('dataVTemplate/unsetAspect', {id: this.compIndex});
                }
            },

            toggleParentLimitation() {
                this.$store.dispatch('dataVTemplate/toggleParentLimitation', {id: this.compIndex});
            },

            toggleResizable() {
                this.$store.dispatch('dataVTemplate/toggleResizable', {id: this.compIndex});
            },

            toggleDraggable() {
                this.$store.dispatch('dataVTemplate/toggleDraggable', {id: this.compIndex});
            },

            toggleSnapToGrid() {
                this.$store.dispatch('dataVTemplate/toggleSnapToGrid', {id: this.compIndex});
            },

            toTop(val) {
                if(val){
                    this.$store.dispatch('dataVTemplate/changeZToTop', {id: this.compIndex});
                }else{
                    this.$store.dispatch('dataVTemplate/changeZToBottom', {id: this.compIndex});
                }

            },

            toBottom(val) {
                if(!val){
                    this.$store.dispatch('dataVTemplate/changeZToTop', {id: this.compIndex});
                }else{
                    this.$store.dispatch('dataVTemplate/changeZToBottom', {id: this.compIndex});
                }

            },

            changeTop(ev) {
                let top = parseInt(ev.target.value);

                if (typeof top !== 'number' || isNaN(top)) {
                    top = this.position.top;
                    ev.target.value = top;
                    return
                }

                this.$store.dispatch('dataVTemplate/setTop', {id: this.compIndex, top: top});
            },

            changeLeft(ev) {
                let left = parseInt(ev.target.value);

                if (typeof left !== 'number' || isNaN(left)) {
                    left = this.position.left;
                    ev.target.value = left;
                }

                this.$store.dispatch('dataVTemplate/setLeft', {id: this.compIndex, left: left});
            },

            changeWidth(ev){
                let width = parseInt(ev.target.value);

                if (typeof width !== 'number' || isNaN(width)) {
                    width = this.position.width;
                    ev.target.value = width;
                }

                this.$store.dispatch('dataVTemplate/setWidth', {id: this.compIndex, width: width});
            },

            changeHeight(ev){
                let height = parseInt(ev.target.value);

                if (typeof height !== 'number' || isNaN(height)) {
                    height = this.position.height;
                    ev.target.value = height;
                }

                this.$store.dispatch('dataVTemplate/setHeight', {id: this.compIndex, height: height});
            }
        }
    }
</script>

<style scoped>

</style>