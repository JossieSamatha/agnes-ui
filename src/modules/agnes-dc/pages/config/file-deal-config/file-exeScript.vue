<template>
    <div class="nui-fit" id="baseForm">
        <table style="width: 90%;margin: auto;padding-top: 10px;" cellspacing="0">
            <tr>
                <td colspan="2">执行脚本&nbsp;&nbsp;<label style="color: blue;">(<a @click="runExeScript" style="color: blue; cursor: pointer; font-weight: bold;">加载列表字段</a>)</label></td>
            </tr>
            <tr>
                <td colspan="2">
                    <textarea id="exeScript" name="exeScript" class="mini-textarea" emptyText="请输入查询脚本" required="true" style="width: 100%;height: 100px;"></textarea>
                </td>
            </tr>
<!--            <tr>-->
<!--                <td colspan="2">-->
<!--                    <label style="color: red;font-weight: bold;">备注：SQL脚本内置变量，kpiCode、bizDate；查询结果需要定义BIZ_NO字段；查询条件name跟返回结果字段名一样！！</label>-->
<!--                </td>-->
<!--            </tr>-->
            <tr>
                <td colspan="2" style="padding: 5px;">列表字段
                    <gf-button @click="move('up')" class="action-btn" size="mini" style="margin-left: 5px">上移</gf-button>
                    <gf-button @click="move('down')" class="action-btn" size="mini">下移</gf-button>
                    <gf-button @click="deleteRow()" class="action-btn" size="mini">删除</gf-button>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <el-table header-row-class-name="rule-header-row"
                              header-cell-class-name="rule-header-cell"
                              row-class-name="rule-row"
                              cell-class-name="rule-cell"
                              ref="multipleTable"
                              :data="form.fieldList"
                              border stripe
                              style="width: 100%">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column prop="fieldName" label="SQL字段">
                            <template slot-scope="scope">
                                <span v-show="false">{{scope.row.index = scope.$index}}</span>
                                <el-input :disabled="true" v-model="scope.row.fieldName"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="columnName" label="列名">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.columnName"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="dictTypeId" label="字典定义">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.dictTypeId"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="isDisplay" label="是否显示">
                            <template slot-scope="scope">
                                <gf-dict v-model="scope.row.isDisplay" dict-type="OPDS_YES_NO"/>
                            </template>
                        </el-table-column>
                        <el-table-column prop="align" label="对齐方式">
                            <template slot-scope="scope">
                                <gf-dict v-model="scope.row.align" dict-type="OPDS_KPI_ALIGN"/>
                            </template>
                        </el-table-column>
                        <el-table-column prop="dataType" label="数据类型">
                            <template slot-scope="scope">
                                <gf-dict v-model="scope.row.dataType" dict-type="OPDS_KPI_DATATYPE"/>
                            </template>
                        </el-table-column>
                        <el-table-column prop="formatter" label="格式化">
                            <template slot-scope="scope">
                                <gf-dict v-model="scope.row.formatter" dict-type="OPDS_KPI_FORMATTER"/>
                            </template>
                        </el-table-column>
                    </el-table>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "exeScript",
        props: {
            row: Object
        },
        data() {
            return {
                form:{
                    fieldList:[],
                }
            }
        },
        mounted() {
            // this.form = this.row;
            this.form.fieldList.push(
                {fieldName:'2',columnName:'2',dictTypeId:'OPDS_KPI_STATUS_13',isDisplay:'1',align:'left',dataType:'String',formatter:'yyyy-MM-dd'}
            )
            this.form.fieldList.push(
                {fieldName:'1',columnName:'1',dictTypeId:'OPDS_KPI_STATUS_13',isDisplay:'1',align:'left',dataType:'String',formatter:'yyyy-MM-dd'}
            )

        },
        methods: {
            async runExeScript(){

            },
            move(direction){
                let items = this.$refs.multipleTable.selection;
                if(items.length>1 || items.length===0){
                    this.$msg.warning("请选择一条记录进行操作!");
                    return;
                }
                console.log(items)
                let item = items[0];
                let index = item.index;
                if ((direction == 'up' && index == 0) || (direction == 'down' && index == this.form.fieldList.length - 1)) {
                    return false;
                } else {
                    if (direction == 'up') {
                        this.form.fieldList[index] = this.form.fieldList.splice(index - 1, 1, this.form.fieldList[index])[0];
                    } else if (direction == 'down') {
                        this.form.fieldList[index] = this.form.fieldList.splice(index + 1, 1, this.form.fieldList[index])[0];
                    }
                }
            },
            deleteRow(){
                let items = this.$refs.multipleTable.selection;
                if(items.length===0){
                    this.$msg.warning("请选择一条记录进行操作!");
                    return;
                }
                items.forEach((item)=>{
                    this.form.fieldList.splice(item.index, 1);
                })
            },

        }
    }
</script>

<style scoped>
    .gf-select-user {
        width: 100%;
        height: calc(100% - 42px);
    }
</style>