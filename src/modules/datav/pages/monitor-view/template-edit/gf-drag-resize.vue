<template>
    <vue-drag-resize ref="dragResize"
                     :w="parseInt(position.width)"
                     :h="parseInt(position.height)"
                     :x="parseInt(position.left)"
                     :y="parseInt(position.top)"
                     :axis="position.axis"
                     :isActive="isActive"
                     :isDraggable="position.draggable"
                     :isResizable="position.resizable"
                     :aspectRatio="position.aspectRatio"
                     :z="position.zIndex"
                     :parentW="listWidth"
                     :parentH="listHeight"
                     :parentLimitation="true"
                     contentClass="box-shaddow"
                     @activated="activateEv"
                     @deactivated="deactivateEv"
                     @dragging="changePosition($event)"
                     @resizing="changePosition($event)">
        <i class="optionIcon fa fa-close" @click="deleteComp"></i>
        <i class="optionIcon fa fa-copy" @click="copyComp"></i>
        <slot name="drag-size-content"></slot>
    </vue-drag-resize>
</template>
<script>
    export default {
        props: {
            compId: {
                type: String,
                require: true
            },
            compIndex: {
                type: Number,
                require: true
            },
            compName: {
                type: String,
                require: true
            },
            isActive: {
                type: Boolean,
                require: true
            },
            position: {
                type: Object,
                default: function () {
                    return {
                        width: 200,
                        height: 150,
                        positionX: 10,
                        positionY: 10,
                        draggable: true,
                        resizable: true,
                        axis: 'both',
                        aspectRatio: false,
                        zIndex: 1,
                    }
                }
            },
            optional: {
                type: Object
            },
        },
        data(){
            return {
                listWidth: 0,
                listHeight: 0,
            }
        },
        mounted() {
            this.$nextTick( ()=> {
                let listEl = this.$refs.dragResize.parentElement;
                this.listWidth = listEl.clientWidth;
                this.listHeight = listEl.clientHeight;
                window.addEventListener('resize', ()=>{
                    this.listWidth = listEl.clientWidth;
                    this.listHeight = listEl.clientHeight;
                })
            });
        },
        methods: {
            activateEv() {
                this.$datavTemplateService.setActive(this.compId);
                this.$datavTemplateService.curComp.position = this.position;
            },

            deactivateEv() {
                this.$datavTemplateService.setDisActive(this.compId);
            },

            // 修改组件大小位置
            changePosition(newComp) {
                this.$datavTemplateService.curComp.position.top = newComp.top;
                this.$datavTemplateService.curComp.position.left = newComp.left;
                this.$datavTemplateService.curComp.position.width = newComp.width;
                this.$datavTemplateService.curComp.position.height = newComp.height;
            },

            compDataChange(index, attr, value){
                var newData = this.datavComps[index];
                newData[attr] = value;
                this.$datavTemplateService.addComp(newData);
            },

            deleteComp(){
                let _that = this;
                this.$confirm('此操作将删除该组件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$datavTemplateService.removeComp(_that.compIndex);
                });
            },

            copyComp(){
                var newComp = this.$utils.deepClone(this._props);
                newComp.compId = this.$agnesUtils.randomString(32);
                newComp.isActive = true;
                newComp.position.left += 20;
                newComp.position.top += 20;
                this.$datavTemplateService.addComp(newComp);
                this.$datavTemplateService.setActive(newComp.compId);
            }
        }
    }
</script>