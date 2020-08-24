<template>
    <div class="template-page">
        <div class="search-panel">
            <el-select v-model="orderSearchValue" placeholder="请选择排序方式">
                <el-option v-for="item in orderOption" :key="item.id" :value="item.id" :label="item.value">
                </el-option>
            </el-select>
            <el-select v-model="tagSearchValue" placeholder="请选择标签分类">
                <el-option v-for="item in tagOption" :key="item.id" :value="item.id" :label="item.value">
                </el-option>
            </el-select>
            <el-select v-model="bizSearchValue" placeholder="请选择业务分类">
                <el-option v-for="item in bizTypeOption" :key="item.id" :value="item.id" :label="item.value">
                </el-option>
            </el-select>
            <el-input class="searchInput" v-model="templateFilter" clearable placeholder="模板搜索" suffix-icon="el-icon-search">
            </el-input>
        </div>
        <section class="template-container">
            <div class="template-item new" @click="addTemplate">
                <div>
                    <el-button type="text">
                        <i class="el-icon-plus"></i>
                        <div class="component-label">新建模板</div>
                    </el-button>
                </div>
            </div>
            <template-item v-for="template in templateList" :key="template.id" :templateObj="template"></template-item>
            <template v-if="templateList.length+1%rowNum!==0">
                <div class="template-item" style="opacity: 0" v-for="item in rowNum-templateList.length%rowNum-1" :key="item"></div>
            </template>
        </section>
    </div>
</template>

<script>
    import templateItem from './template-item';
    export default {
        data() {
            return {
                activeTab: 'template',
                rowNum: 5,
                orderSearchValue: '1',
                orderOption: [
                    {id: '1', value: '我的排序'},
                    {id: '2', value: '按修改时间排序'},
                    {id: '3', value: '按创建时间排序'},
                    {id: '4', value: '按标题排序'}
                ],
                tagSearchValue: '',
                tagOption: [],
                bizSearchValue: '1',
                bizTypeOption: [
                    {id: '1', value: '托管'},
                    {id: '2', value: '清算'},
                    {id: '3', value: '核算'}
                ],
                templateFilter: '',
                templateList: [
                    {id: '1001', title: '托管业务模板', tag: ['托管'], img: 'template-img01.jpg'},
                    {id: '1002', title: '清算业务模板', tag: ['托管', '清算'], img: 'template-img02.jpg'},
                    {id: '1003', title: '清算业务模板', img: 'template-img02.jpg'},
                    {id: '1005', title: '清算业务模板', img: 'template-img01.jpg'},
                    {id: '1004', title: '清算业务模板', img: 'template-img02.jpg'}
                ]
            }
        },
        components:{
           'template-item': templateItem,
        }, 
        mounted() {
            var that = this;
            this.rowNum = this.getTempRowNum(document.body.offsetWidth);
            window.addEventListener('resize', function () {
                that.rowNum = that.getTempRowNum(document.body.offsetWidth);
            });
        },
        methods: {
            addTemplate(){
                const viewId = 'datav.dataV.editBoard';
                const pageView = this.$app.views.getView(viewId);
                if (!pageView) {
                    return;
                }
                const tabView = Object.assign({args: ''}, pageView, {id: viewId});
                this.$nav.showView(tabView);
            },

            // 获取每行模板个数
            getTempRowNum(docWidth){
                if(docWidth < 1200){
                    return 3;
                } else if(docWidth < 1560) {
                    return 4;
                }else {
                    return 5;
                }
            }
        }
    }
</script>