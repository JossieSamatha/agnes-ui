<template>
    <div class="optional-cell" v-if="params.data">
        <el-popover class="icon-popper" placement="bottom-start"
                    title="备注"
                    width="300"
                    trigger="click">
            <el-input type="textarea" :rows="1" placeholder="请输入备注内容" v-model="remark">
            </el-input>
            <div style="text-align: right; margin-top: 10px">
                <el-button class="op-btn primary" size="mini" @click="executeKpi">提交</el-button>
            </div>
            <el-button slot="reference" size="mini" type="text"
                       :disabled="isDisabled"
                       @click="popoverClick" title="干预通过">
                <span class="svgSpan" v-html="svgImg.forcePass"></span>
            </el-button>
        </el-popover>
        <el-button class="icon-popper" size="mini" type="text"
                   :disabled="isDisabled"
                   @click="exeTaskJob" title="重新执行">
            <span class="svgSpan" v-html="svgImg.reExecute"></span>
        </el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                remark: '',
                popoverVisible: false,
                svgImg: this.$lcImg,
            }
        },
        beforeMount() {
            if (this.params.data) {
                this.remark = this.params.data.remark;
            }
        },
        computed: {
            isDisabled() {
                return !this.params.data.isTimeout;
            }
        },
        methods: {
            // 干预通过
            async executeKpi() {
                this.handleCmd('executeKpi');
            },

            popoverClick() {
                this.popoverVisible = true;
            },

            // 重新执行
            async exeTaskJob() {
                const ok = await this.$msg.ask(`是否确认重新执行`);
                if (ok) {
                    this.handleCmd('exeTaskJob');
                }
            },

            handleCmd(actionType) {
                this.params.api.execCmd(actionType, this.params);
            }
        }
    }
</script>


<style scoped>
    .optional-cell {
        line-height: 1;
    }

    .optional-cell .svgSpan {
        display: inline-block;
        width: 16px;
        height: 16px;
        cursor: pointer;
    }

    .optional-cell .svgSpan >>> svg {
        width: 100%;
        height: 100%;
    }

    .optional-cell > span + span {
        margin-left: 10px;
    }

    .optional-cell .svgSpan > svg {
        width: 100%;
        height: 100%;
    }

    .op-btn {
        height: 25px;
        padding: 5px 19px;
        border-color: #E1E4E8;
        color: #333;
        background: transparent;
        font-size: 14px;
    }

    .op-btn.primary {
        color: #fff;
        background: #0f5eff;
        border-color: #0f5eff;
    }
</style>
