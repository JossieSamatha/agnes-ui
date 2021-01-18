<template>
    <el-form ref="form" class="task-def-form" :model="form"
             label-width="110px">

        <el-form-item label="主服务器" prop="fileTable">
            <div class="rule-table">
                <el-table header-row-class-name="rule-header-row"
                          header-cell-class-name="rule-header-cell"
                          row-class-name="rule-row"
                          cell-class-name="rule-cell"
                          :data="form.mainFields"
                          border stripe
                          style="width: 100%">
                    <el-table-column prop="serverAddress" label="从服务器地址">
                        <template slot-scope="scope">
                            <el-input :style="!scope.row.serverAddress ? 'border:1px solid #f00':''" v-model="scope.row.serverAddress"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="serverPort" label="从服务器端口">
                        <template slot-scope="scope">
                            <el-input :style="!scope.row.serverPort ? 'border:1px solid #f00':''" v-model="scope.row.serverPort"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="filePath" label="文件路径">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.filePath"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="fileName" label="文件名称">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.fileName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userName" label="用户名">
                        <template slot-scope="scope">
                            <el-input :style="!scope.row.userName ? 'border:1px solid #f00':''" v-model="scope.row.userName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="password" label="密码">
                        <template slot-scope="scope">
                            <el-input :style="!scope.row.password ? 'border:1px solid #f00':''" v-model="scope.row.password"></el-input>
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
        <el-form-item label="从服务器" prop="fileTable">
            <div class="rule-table">
                <el-table header-row-class-name="rule-header-row"
                          header-cell-class-name="rule-header-cell"
                          row-class-name="rule-row"
                          cell-class-name="rule-cell"
                          :data="form.secondFields"
                          border stripe
                          style="width: 100%">
                    <el-table-column prop="serverAddress" label="从服务器地址">
                        <template slot-scope="scope">
                            <el-input :style="!scope.row.serverAddress ? 'border:1px solid #f00':''" v-model="scope.row.serverAddress"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="serverPort" label="从服务器端口">
                        <template slot-scope="scope">
                            <el-input :style="!scope.row.serverPort ? 'border:1px solid #f00':''" v-model="scope.row.serverPort"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="filePath" label="文件路径">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.filePath"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="fileName" label="文件名称">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.fileName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userName" label="用户名">
                        <template slot-scope="scope">
                            <el-input :style="!scope.row.userName ? 'border:1px solid #f00':''" v-model="scope.row.userName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="password" label="密码">
                        <template slot-scope="scope">
                            <el-input :style="!scope.row.password ? 'border:1px solid #f00':''" v-model="scope.row.password"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column  prop="option" label="操作" width="52" align="center">
                        <template slot-scope="scope">
                            <span class="option-span" @click="deleteSecondRuleRow(scope.$index)">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button  @click="addSecondRule()" class="rule-add-btn" size="small">新增</el-button>
            </div>
        </el-form-item>

    </el-form>
</template>

<script>
    export default {
        name: "fileDealParams",
        props: {
            row: Object
        },
        data() {
            return {
                form:{
                    dealType:'',
                    mainFields:[{
                        serverAddress: '',
                        serverPort: '',
                        filePath: '',
                        fileName: '',
                    }],
                    secondFields:[],
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
                    serverAddress: '',
                    serverPort: '',
                    filePath: '',
                    fileName: '',
                };
                this.form.mainFields.push(newFileTableObj);
            },
            // 删除行
            deleteMainRuleRow(rowIndex){
                this.form.mainFields.splice(rowIndex, 1);
            },

            // 新增服务行
            addSecondRule(){
                const newFileTableObj = {
                    serverAddress: '',
                    serverPort: '',
                    filePath: '',
                    fileName: '',
                };
                this.form.secondFields.push(newFileTableObj);
            },
            // 删除行
            deleteSecondRuleRow(rowIndex){
                this.form.secondFields.splice(rowIndex, 1);
            },
        },


    }
</script>
<style scoped>
</style>>