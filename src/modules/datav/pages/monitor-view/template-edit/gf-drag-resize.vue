<template>
    <vue-drag-resize ref="dragResize"
                     :w="parseInt(position.width)"
                     :h="parseInt(position.height)"
                     :x="parseInt(position.left)"
                     :y="parseInt(position.top)"
                     :axis="position.axis"
                     :isActive="isActive"
                     :preventActiveBehavior="preview?true:false"
                     :isDraggable="position.draggable"
                     :isResizable="position.resizable"
                     :aspectRatio="position.aspectRatio"
                     :z="parseInt(position.zIndex || 0)"
                     :parentW="listWidth"
                     :parentH="listHeight"
                     :parentLimitation="true"
                     contentClass="box-shaddow"
                     @dblclick.native="editCompData"
                     @activated="activateEv"
                     @deactivated="deactivateEv"
                     @dragging="changePosition('drag', $event)"
                     @resizing="changePosition('resize', $event)">
        <i class="optionIcon fa fa-close" @click="deleteComp"></i>
        <i class="optionIcon fa fa-copy" @click="copyComp"></i>
        <slot name="drag-size-content" :compId="compId" :compName="compName" :optional="optional" :position="position"></slot>
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
                type: Boolean
            },
            preview: Boolean,
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
                        zIndex: 1
                    }
                }
            },
            optional: {
                type: Object,
                default: function () {
                    return {
                        type: '',
                        compName: '',
                        componentMeta: {}
                    }
                }
            },
        },
        data(){
            return {
                listWidth: 0,
                listHeight: 0,
            }
        },
        mounted() {
            this.$dataVBus.$off('compDataChange');
            this.$dataVBus.$on('compDataChange', this.compDataChange);
            this.$nextTick( ()=> {
                let listEl = this.$refs.dragResize.parentElement;
                this.listWidth = listEl.clientWidth;
                this.listHeight = listEl.clientHeight;
                this.$dataVBizFunc.windowResize(this);
                window.addEventListener('resize', ()=>{
                    this.listWidth = listEl.clientWidth;
                    this.listHeight = listEl.clientHeight;
                })
            });
        },
        methods: {
            activateEv() {
                if(this.preview) return;
                this.$datavTemplateService.setActive(this.compId);
                this.$datavTemplateService.data.curComp = this._props;
            },

            deactivateEv() {
                if(this.preview) return;
                this.$datavTemplateService.setDisActive(this.compId);
            },

            // 修改组件大小位置
            changePosition(type, newComp) {
                if(type === 'drag'){
                    this.position.top = newComp.top;
                    this.position.left = newComp.left;
                }
                if(type === 'resize'){
                    this.position.width = newComp.width;
                    this.position.height = newComp.height;
                    this.$dataVBizFunc.windowResize(this);
                }
            },

            // 组件数据修改
            compDataChange(updateData){
                const {type, compName, label, metaData} = updateData;
                this.$datavTemplateService.updateCompData(type, compName, label, metaData);
            },

            // 组件删除
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

            // 组件复制
            copyComp(){
                let newComp = this.$lodash.clone(this._props);
                newComp.compId = this.$agnesUtils.randomString(32);
                newComp.isActive = true;
                newComp.position.left += 20;
                newComp.position.top += 20;
                this.$datavTemplateService.addComp(newComp);
                this.$datavTemplateService.setActive(newComp.compId);
                this.$dataVBizFunc.windowResize(this);
            },

            // 编辑组件数据
            editCompData(){
                const compData = this.$utils.deepClone(this.optional);
                this.$store.commit("changeEditItem", {comp: compData});
                this.$dataVBus.$emit('openChartDrawer', {comp: compData});
            }
        }
    }
</script>