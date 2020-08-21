<template>
    <div class="template-board-container">
        <section ref="boardContainer" class="container" @dropover.prevent
            :style="{'background-image': getImgPath(datavConf.bgImage)}">
            <vue-drag-resize v-for="(comp, index) in datavComps"
                 :key="index"
                 :w="comp.width"
                 :h="comp.height"
                 :x="comp.left"
                 :y="comp.top"
                 :parentW="listWidth"
                 :parentH="listHeight"
                 :parentLimitation="true"
                 :axis="comp.axis"
                 :isActive="comp.active"
                 :isDraggable="comp.draggable"
                 :isResizable="comp.resizable"
                 :aspectRatio="comp.aspectRatio"
                 :z="comp.zIndex"
                 @activated="activateEv(index)"
                 @deactivated="deactivateEv(index)"
                 @dragging="changePosition($event, index)"
                 @resizing="changeSize($event, index)">
                <i class="optionIcon fa fa-close" @click="deleteComp(comp)"></i>
                <i class="optionIcon fa fa-copy" @click="copyComp(comp)"></i>
                <component :is="comp.compType" :compOption="comp"></component>
            </vue-drag-resize>
        </section>
    </div>
</template>

<script>
    export default {
        props: {
            datavConf: {
                type: Object,
                require: true
            }
        },
        data(){
            return {
                listWidth: 0,
                listHeight: 0,
                dragOptions: {
                    group: {name: 'compGroup'}
                },

            }
        },

        mounted() {
            this.$app.registerCmd('addComp', this.addComp);
            this.$app.registerCmd('compDataChange', this.compDataChange);
            var _that = this;
            this.$nextTick(function () {
                let listEl = _that.$refs.boardContainer;
                _that.listWidth = listEl.clientWidth;
                _that.listHeight = listEl.clientHeight;
                window.addEventListener('resize', ()=>{
                    _that.listWidth = listEl.clientWidth;
                    _that.listHeight = listEl.clientHeight;
                })
            });
        },

        computed: {
            datavComps() {
                return this.$store.state.dataVTemplate.datavComps
            }
        },

        methods: {
            getImgPath(imgName){
                let urlStr = require('../../assets/datav-comp/'+imgName+'.jpg');
                return  'url('+urlStr+')';
            },

            activateEv(index) {
                this.$store.dispatch('dataVTemplate/setActive', {id: index});
            },

            deactivateEv(index) {
                this.$store.dispatch('dataVTemplate/unsetActive', {id: index});
            },

            changePosition(newComp, index) {
                this.$store.dispatch('dataVTemplate/setTop', {id: index, top: newComp.top});
                this.$store.dispatch('dataVTemplate/setLeft', {id: index, left: newComp.left});
                this.$store.dispatch('dataVTemplate/setWidth', {id: index, width: newComp.width});
                this.$store.dispatch('dataVTemplate/setHeight', {id: index, height: newComp.height});
            },

            changeSize(newComp, index) {
                this.$store.dispatch('dataVTemplate/setTop', {id: index, top: newComp.top});
                this.$store.dispatch('dataVTemplate/setLeft', {id: index, left: newComp.left});
                this.$store.dispatch('dataVTemplate/setWidth', {id: index, width: newComp.width});
                this.$store.dispatch('dataVTemplate/setHeight', {id: index, height: newComp.height});

                this.$nextTick(function () {
                    // 兼容IE
                    if(document.createEvent) {
                        var event = document.createEvent("HTMLEvents");
                        event.initEvent("resize", true, true);
                        window.dispatchEvent(event);
                    } else if(document.createEventObject) {
                        window.fireEvent("onresize");
                    }
                });
            },

            // 添加组件
            addComp(comp, evt, initialPoint){
                var compOption = JSON.parse(JSON.stringify(comp.componentMeta || {}));
                compOption.width ? false : compOption.width = 200;
                compOption.height ? false : compOption.height = 250;
                var newComp = {
                    domId: this.$agnesUtils.randomString(32),
                    type: comp.type,
                    compType: comp.compName,
                    active: false,
                    left: evt.screenX - 72 - initialPoint.x,
                    top: evt.screenY - 140 - initialPoint.y,
                    draggable: true,
                    resizable: true,
                    axis: 'both',
                    aspectRatio: false,
                    zIndex: 1,
                    ...compOption
                };
                this.$store.state.dataVTemplate.datavComps.push(newComp);
            },

            compDataChange(index, attr, value){
                var newData = this.datavComps[index];
                newData[attr] = value;
                this.datavComps.splice(index, 1, newData);
            },

            deleteComp(comp){
                let _that = this;
                this.$confirm('此操作将删除该组件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _that.$utils.removeFromArray(_that.datavComps, comp);
                });
            },

            copyComp(comp){
                var newComp = JSON.parse(JSON.stringify(comp));
                newComp.domId = this.$agnesUtils.randomString(32);
                newComp.left += 20;
                newComp.top += 20;
                this.$store.state.dataVTemplate.datavComps.push(newComp);
            }
        }
    }
</script>