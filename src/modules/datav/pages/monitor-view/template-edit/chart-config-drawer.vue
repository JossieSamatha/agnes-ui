<template>
    <div class="template-config-sider">
        <section class="container">
            <div class="dash-chart-head">
                <div class="fx-navigation-bar">
                    <div class="nav left">
                        <div class="nav-btn nav-title fx-entry-title">
                            <div class="nav-home" @click="passCancel"><em class="el-icon-arrow-left"></em></div>
                            <div class="fx-title-editor nav-title">
                                <input v-model.lazy="chartLabel" @blur="updateChartLabel">
                                <span class="name-pre">{{chartLabel}}</span>
                            </div>
                        </div>
                    </div>
                    <div style="float: right; margin-right: 10px;">
                        <el-button type="primary" @click="passSaveConfirm"
                                   style="width: 80px;padding: 9px 15px; background-color: #0f5eff;">保存
                        </el-button>
                    </div>
                </div>
            </div>
            <data-configure></data-configure>
        </section>
    </div>
</template>

<script>
    import dataConfigure from './chart-conf-drawer/data-conf'

    export default {
        data() {
            return {
                svgImg: this.$svgImg,
                menuFold: false,
                activeTab: 'dataConf',
                dataResource: '',
                ifGridShow: false,
                curentCompObj: {},
                activeComp: {},
                chartLabel: '未命名图表',
                isCancel: false
            }
        },
        components: {
            'data-configure': dataConfigure
        },
        computed: {
            ifShowCharts() {
                return this.activeComp.type == 'chart';
            },
            editItemState() {
                return this.$store.state.editItem.comp.label;
            }
        },
        methods: {
            passCancel() {
                if (this.isCancel === true) {
                    this.$confirm('图表设计有修改，是否保存？', {
                        confirmButtonText: '保存并继续',
                        cancelButtonText: '不保存',
                        type: 'warning',
                        showClose: false,
                    }).then(() => {
                        this.passSaveConfirm();
                    }).catch(() => {
                        this.$app.runCmd("cancelEditCmd")
                    });
                } else {
                    this.$app.runCmd("cancelEditCmd")
                }
            },
            passSaveConfirm() {
                this.$app.runCmd("saveChartCmd")
            },
            updateChartLabel() {
                this.$app.runCmd("updateChartLabelCmd", this.chartLabel);
            },
            cancelTip(val) {
                this.isCancel = val;
            }
        },
        mounted() {
            this.$app.registerCmd('cancelTip', this.cancelTip)
            if (this.$store.state.chartLabel.length > 0) {
                this.chartLabel = this.$store.state.chartLabel;
            }
        },
        watch: {
            editItemState() {
                this.chartLabel = this.editItemState;
            }
        }

    }
</script>
