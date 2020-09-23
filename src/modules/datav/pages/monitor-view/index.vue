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
            <div class="template-item new" @click="openEditPage({opType: 'add'})">
                <div>
                    <el-button type="text">
                        <i class="el-icon-plus"></i>
                        <div class="component-label">新建大屏</div>
                    </el-button>
                </div>
            </div>
            <template-item v-for="template in templateList"
                           :key="template.id"
                           :templateObj="template"
                           @deleteTemplate="deleteTemplate"
            ></template-item>
            <template v-if="templateList.length+1%rowNum!==0">
                <div class="template-item" style="opacity: 0" v-for="item in rowNum-templateList.length%rowNum-1" :key="item"></div>
            </template>
        </section>
    </div>
</template>

<script>
    import templateItem from './template-item';
    import mockData from './mockDataVData';
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
                templateList: [],
                defaultBoardContent: function () {
                    return {
                        id: this.$agnesUtils.randomString(32),
                        title: "",
                        label: "",
                        type: "single",
                        category: "month",
                        thumbnail: "bg0",
                        newTemplate: true,
                        content: JSON.stringify({
                            pageWidth: 1920,
                            pageHeight: 1048,
                            pageScale: 100,
                            bgImage: 'bg0',
                            datavComps: []
                        })
                    }
                }
            }
        },
        components:{
           'template-item': templateItem,
        },
        created(){
            this.$dataVBus.$on('openEditPage', templateObj=>this.openEditPage(templateObj));
        },
        mounted() {
            this.rowNum = this.getTempRowNum(document.body.offsetWidth);
            window.addEventListener('resize', () => {
                this.rowNum = this.getTempRowNum(document.body.offsetWidth);
            });
            this.getDataVList();
        },
        methods: {
            async getDataVList(){
                const res = this.$api.dataVConfig.getTemplatesList();
                const list = await this.$app.blockingApp(res);
                if(list.data && list.data.data&& list.data.data.length>0){
                    this.templateList = list.data.data;
                }else{
                    this.templateList = [];
                }
            },

            // 打开编辑页
            openEditPage(params){
                const viewId = 'datav.monitor.editBoard';
                const pageView = this.$app.views.getView(viewId);
                if (!pageView) {
                    return;
                }
                const dataVData = this.setTemplateState(params);
                if(!dataVData){
                    return;
                }
                this.$datavTemplateService.init(dataVData);
                const tabView = Object.assign({args: {dataVData}}, pageView, {id: viewId});
                this.$nav.showView(tabView);
            },

            setTemplateState(params){
                const {opType, templateObj} = params;
                let initStateData = this.defaultBoardContent();
                if(opType === 'edit') {
                    const list = mockData().dataVTemplate;
                    initStateData = this.$lodash.find(list, {id: templateObj.id});
                }
                return initStateData;
            },

            // 删除大屏
            async deleteTemplate(templateId){
                const ok = await this.$msg.ask(`是否确认删除大屏?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.dataVConfig.deleteTemplate(templateId);
                    const res = await this.$app.blockingApp(p);
                    if(res.ok){
                        this.getDataVList();
                        this.$msg.success('删除成功!');
                    }else{
                        this.$msg.error(res.message);
                    }
                } catch (reason) {
                    this.$msg.error(reason);
                }
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