<template>
    <div class="gf-fit">
        <div class="gf-auth">
            <div class="gf-auth-body">
                <div class="gf-auth-content">
                    <el-tabs v-model="authType">
                        <el-tab-pane label="基本信息" name="baseInfo" :lazy="true">
                            <BaseInfo :baseInfo="this.baseInfo"/>
                        </el-tab-pane>
                        <el-tab-pane label="执行参数" name="execParams" :lazy="true">
                            <FileDealParams :row="this.baseInfo"/>
                        </el-tab-pane>
                        <el-tab-pane label="钻取明细" name="exeScript" :lazy="true">
                            <FileExeScript :row="this.baseInfo"/>
                        </el-tab-pane>
                        <el-tab-pane label="目标值配置" name="target" :lazy="true">
                            <FileDealTarget :row="this.baseInfo"/>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    import BaseInfo from "./base-info";
    import FileDealParams from "./file-deal-config-params";
    import FileDealTarget from "./target-config";
    import FileExeScript from "./file-exeScript";

    export default {
        name: 'gf-auth',
        components: {
            BaseInfo,
            FileDealParams,
            FileDealTarget,
            FileExeScript
        },
        props: {
            mode: {
                type: String,
                default: 'add'
            },
            row: Object,
            actionOk: Function
        },
        data() {
            return {
                authType: 'baseInfo',
                currentRow: null,
                baseInfo:{
                    dealCode:'',
                    dealName:'',
                    dealType:'0',
                    bizType:'',
                    remark:'',
                    mainFields:[],
                    secondFields:[],
                    exeScript:'',
                    targetFields:[],
                    fieldList:[],
                }
            };
        },
        beforeMount() {
            if (this.mode !== 'add') {
                Object.assign(this.baseInfo, this.row);
                this.initData();
            }
        },
        methods: {
            async initData(){
            },
            async onCancel() {
                this.$emit("onClose");
            },
            async onSave(){
                if (this.baseInfo.dealCode === '') {
                    this.$msg.error("请完善基本信息填写！");
                    return;
                }
            }
        }
    }
</script>
<style>
    .gf-auth {
        height: 100%;
        display: flex;
        flex-direction: row;
    }

    .gf-auth-role {
        flex-grow: 0;
        width: 355px;
        padding-right: 5px;
    }

    .gf-auth-body {
        flex: 1;
        width: 0;
    }

    .gf-auth-body .el-tabs__header {
        margin-bottom: 0px;
    }

    .gf-auth-content {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .gf-auth-content .el-tabs {
        flex-grow: 0;
        flex-shrink: 0;
    }

    .gf-auth-content .gf-auth-content-data {
        flex: 1;
        height: 0;
    }
</style>