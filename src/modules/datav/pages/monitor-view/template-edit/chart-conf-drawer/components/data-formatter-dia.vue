<template>
    <el-dialog
        title="数据格式"
        :visible.sync="dialogVisible"
        width="500px"
        :modal-append-to-body="false"
        :close-on-click-modal="notClose"
    >
        <el-radio :label="3" class="pre-formatter" v-model="radio">预定义格式</el-radio>

        <el-checkbox-group v-model="checkList" :disabled="radio != 3" class="check-group">
            <el-checkbox label="千分符"></el-checkbox>
            <el-checkbox label="百分比"></el-checkbox>
            <el-checkbox label="小数位数">
                <span v-if="checkList.includes('小数位数')">小数位数</span>
            </el-checkbox>
        </el-checkbox-group>

        <el-input v-model="inputNum"
                  :disabled="radio != 3"
                  placeholder="0 ~ 5"
                  class="forInputNum"
                  @change="showPreData(checkList)"
                  v-if="checkList.includes('小数位数')"
        ></el-input>

        <div class="data-preview">
            <div class="pre-title">效果预览</div>
            <div class="formatted-data">{{formattedData}}</div>
        </div>

        <el-radio :label="6" class="cus-formatter" v-model="radio">自定义格式</el-radio>

        <el-input :disabled="radio != 6"
                  v-model="cusFormattedInput"
                  placeholder="请输入自定义格式"
                  class="cus-formatter-input"
        ></el-input>

        <div style="margin-left: 25px; color: #c3cdda;">
            格式预览：<span>{{cusFormattedPre}}</span>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelFormatter">取 消</el-button>
            <el-button type="primary" @click="confirmFormatter">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "data-formatter-dia",
        props: {
            dialogVisible: Boolean,
            chartType: String
        },
        data() {
            return {
                notClose: false,
                radio: 3,
                checkList: [],
                inputNum: "0",
                formattedData: "99999",
                tempData: "99999",
                cusFormattedInput: "",
                cusFormattedPre: "2015-01-01"
            }
        },
        watch: {
            checkList: {
                handler(val) {
                    this.showPreData(val)
                },
                deep: true,
                immediate: true
            }
        },
        methods: {
            cancelFormatter() {
                this.$emit("cancelFormatter", false)
                this.$app.runCmd("clearEditFilter")
            },
            confirmFormatter() {
                this.cancelFormatter()
                let meta = {
                    inputNum: this.inputNum,
                    kilo: false,
                    hund: false,
                    deci: false
                }
                if (this.checkList.length == 1) {
                    if (this.checkList[0] == "千分符") {
                        meta.kilo = true
                    }
                    if (this.checkList[0] == "百分比") {
                        meta.hund = true
                    }
                    if (this.checkList[0] == "小数位数") {
                        meta.deci = true
                    }
                }
                if (this.checkList.length == 2) {
                    if (!this.checkList.includes("千分符")) {
                        meta.hund = true
                        meta.deci = true
                    }
                    if (!this.checkList.includes("百分比")) {
                        meta.kilo = true
                        meta.deci = true
                    }
                    if (!this.checkList.includes("小数位数")) {
                        meta.kilo = true
                        meta.hund = true
                    }
                }
                if (this.checkList.length == 3) {
                    meta.kilo = true
                    meta.hund = true
                    meta.deci = true
                }
                this.$emit("getFormatterInfo", meta)
                if (this.chartType == "pivot-grid") {
                    this.$app.runCmd("formatRowDataCmd", this.$store.state.initDataColumns)
                }
            },
            asKilohertz(val) {
                let reg = /(?=(\B\d{3})+$)/g;
                if (!val.includes(".") && !val.includes("%")) {
                    return val.replace(reg, ",")
                }
                if (val.includes(".") && !val.includes("%")) {
                    let tempArr = val.split(".")
                    return tempArr[0].replace(reg, ",") + tempArr[1]
                }
                if (!val.includes(".") && val.includes("%")) {
                    return val.replace(reg, ",") + "%"
                }
                if (val.includes(".") && val.includes("%")) {
                    let tempArr = val.split(".")
                    return tempArr[0].replace(reg, ",") + tempArr[1]
                }
            },
            asPercent(val) {
                if (val.includes(".")) {
                    let tempArr = val.split(".")
                    return tempArr[0] + "00" + "." + tempArr[1] + "%"
                } else {
                    return val + "00%"
                }
            },
            asDecimal() {
                let zeroArr = ["", "0", "00", "000", "0000", "00000"]
                if (this.inputNum != "") {
                    if (parseInt(this.inputNum) >= 5) {
                        return this.tempData + "." + zeroArr[5]
                    } else if (0 < parseInt(this.inputNum) &&  parseInt(this.inputNum)< 5) {
                        return this.tempData + "." +zeroArr[parseInt(this.inputNum)]
                    } else {
                        return this.tempData
                    }
                } else {
                    return this.tempData
                }
            },
            showPreData(val) {
                if (val.length == 0) {
                    this.formattedData = "99999"
                } else if (val.length == 1) {
                    if (val[0] == "千分符") {
                        this.formattedData = "99,999"
                    } else if (val[0] == "百分比") {
                        this.formattedData = "9999900%"
                    } else {
                        this.formattedData = this.asDecimal()
                    }
                } else if (val.length == 2) {
                    if (!val.includes("千分符")) {
                        let temp = this.asDecimal()
                        if (temp.includes(".")) {
                            let tempArr = temp.split(".")
                            this.formattedData = tempArr[0] + "00." + tempArr[1] + "%"
                        } else {
                            this.formattedData = "9999900%"
                        }
                    } else if (!val.includes("百分比")) {
                        let temp = this.asDecimal()
                        if (temp.includes(".")) {
                            let tempArr = temp.split(".")
                            this.formattedData = "99,999." + tempArr[1]
                        } else {
                            this.formattedData = "99,999"
                        }
                    } else {
                        this.formattedData = "9,999,900%"
                    }
                } else {
                    let temp = this.asDecimal()
                    if (temp.includes(".")) {
                        let tempArr = temp.split(".")
                        this.formattedData = "9,999,900." + tempArr[1] + "%"
                    } else {
                        this.formattedData = "9,999,900%"
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .data-preview {
        width: 437px;
        height: 92px;
        border: 1px solid #ccc;
        background-color: #f4f5f5;
        position: relative;
        margin-top: 5px;
    }

    .check-group,
    .data-preview {
        margin-left: 25px;
    }

    .pre-formatter,
    .data-preview,
    .cus-formatter {
        margin-bottom: 10px;
    }

    .formatted-data {
        text-align: center;
        font-size: 20px;
        line-height: 92px;
    }

    .pre-title {
        font-size: 12px;
        position: absolute;
        top: 10px;
        left: 10px;
    }
    .forInputNum {
        margin-left: 3px;
        width: 160px !important;
        position: absolute;
        top: 105px;
        right: 18px;
    }

    .cus-formatter-input {
        margin-left: 25px;
        margin-bottom: 3px;
        width: 95% !important;
    }
</style>