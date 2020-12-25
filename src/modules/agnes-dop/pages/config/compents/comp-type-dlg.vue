<template>
    <div>
        <el-form class="fit-box" :disabled="mode==='view'" :model="form" ref="form" :rules="rules" label-width="150px"
                 style="padding: 10px;">
            <el-form-item label="描述" prop="label">
            <gf-input type="text" maxlength="64" v-model="form.label" style="width: 40%"/>
            </el-form-item>
            <el-form-item label="组件类型" prop="compType">
              <gf-dict v-model="form.compType" dict-type="AGNES_DOP_COMPENT_TYPE"  style="width: 40%"/>
            </el-form-item>
            <el-form-item label="菜单地址" prop="menuId" >
                <el-select v-model="form.menuId"
                           filterable clearable
                           placeholder="请选择" style="width: 40%">
                    <gf-filter-option
                            v-for="item in menuList"
                            :key="item.actionUrl"
                            :label="item.resName"
                            :value="item.actionUrl">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否查看详情" prop="arrowShow" >
                <el-select v-model="form.arrowShow"
                           filterable clearable
                           placeholder="请选择" style="width: 40%">
                    <gf-filter-option
                            v-for="item in arrowShowArry"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item label="参数">
                <el-input v-model="form.compParams" type="textarea" :rows="2" placeholder="请输入内容" style="width: 40%"/>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
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
                form: {
                    label: '',
                    compType: '',
                    menuId: '',
                    arrowShow: '0',
                    compParams: '',
                },
                menuList:[],
                arrowShowArry:[{value:"0",label:'否'},{value:"1",label:'是'}],
                rules: {
                    label: [{required: true, message: "请输入组件描述"}],
                    compType: [{required: true, message: "请选择组件类型"}],
                    menuId: [{required: true, message: "请选择菜单"}],
                    arrowShow: [{required: true, message: "请选择是否显示"}]
                },
            };
        },
        beforeMount() {
            Object.assign(this.form, this.row);
            this.initData();
        },
        methods: {
            async initData(){
                let resp = await this.$api.funcConfigApi.getMenuList();
                this.menuList = resp.data;
            },
            async onSave() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                try {
                    const p = this.$api.compBoardApi.saveComponents(this.form);
                    await this.$app.blockingApp(p);
                    this.$msg.success('保存成功');
                    if(this.actionOk){
                        await this.actionOk();
                    }
                    this.$emit("onClose");
                } catch (e) {
                    this.$msg.error(e);
                }
            },
            // 返回关闭抽屉;
            onCancel(){
                this.$emit("onClose");
            },
        }
    }
</script>