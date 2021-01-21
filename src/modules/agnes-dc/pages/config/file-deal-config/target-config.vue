<template>
    <el-form ref="form" class="task-def-form" :model="form"
             label-width="110px">
        <el-form-item label="目标值配置定义" prop="fileTable">
            <div class="rule-table">
                <el-table header-row-class-name="rule-header-row"
                          header-cell-class-name="rule-header-cell"
                          row-class-name="rule-row"
                          cell-class-name="rule-cell"
                          :data="form.targetFields"
                          border stripe
                          style="width: 100%">
                    <el-table-column prop="stepCode" label="序号">
                        <template slot-scope="scope">
                            <span style="'border:1px solid #f00'">{{scope.$index+1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="stepCode" label="步骤编号">
                        <template slot-scope="scope">
                            <el-input :style="!scope.row.stepCode ? 'border:1px solid #f00':''" v-model="scope.row.stepCode"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="targetType" label="目标值类型">
                        <template slot-scope="scope">
                            <gf-dict v-model="scope.row.targetType" :style="!scope.row.targetType ? 'border:1px solid #f00':''" dict-type="AGNES_DC_TARGET_TYPE"/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="targetValue" label="目标值">
                        <template slot-scope="scope">
                            <el-input :style="!scope.row.targetValue ? 'border:1px solid #f00':''" v-model="scope.row.targetValue"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column  prop="option" label="操作" width="52" align="center">
                        <template slot-scope="scope">
                            <span class="option-span" @click="deleteMainRuleRow(scope.$index)">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button  @click="addMainRule()" class="rule-add-btn" size="small">新增</el-button>
            </div>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "targetConfig",
        props: {
            row: Object
        },
        data() {
            return {
                form:{
                    targetFields:[]
                },
            }
        },
        beforeMount() {
            if(!this.row){
                this.form=this.row;
            }
        },
        methods: {
            // 新增服务行
            addMainRule(){
                const newFileTableObj = {
                    stepCode: '',
                    targetType: '',
                    targetValue: '',
                };
                this.form.targetFields.push(newFileTableObj);
            },
            // 删除行
            deleteMainRuleRow(rowIndex){
                this.form.targetFields.splice(rowIndex, 1);
            },

        },


    }
</script>
<style scoped>
</style>>