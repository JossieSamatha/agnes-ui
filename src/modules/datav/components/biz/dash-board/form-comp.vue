<template>
    <el-form class="form_comp" :model="formObj" :label-width="formObj.labelWidth">
        <template v-for="item in moduleObj.fromItemArr">
            <el-form-item v-if="item.type == 'button'" label="" :prop="item.field" :key="item.field">
                <p><el-button size="small" type="primary">{{item.label}}</el-button></p>
            </el-form-item>
            <el-form-item v-else :label="item.label" :prop="item.field" :key="item.field">
                <template v-if="item.type == 'label'">
                    <p><span>{{formObj[item.field]}}</span></p>
                </template>
                <template v-if="item.type == 'select'">
                    <el-select v-model="formObj[item.field]" :popper-append-to-body="false" placeholder="item.placeholder">
                        <el-option v-for="option in item.option" :key="option.value" :label="option.label" :value="option.value">
                        </el-option>
                    </el-select>
                </template>
                <template v-if="item.type == 'input'">
                    <el-input v-model="formObj[item.field]"></el-input>
                    </template>
                <template v-if="item.type == 'radioBox'">
                    <el-radio-group v-model="formObj[item.field]">
                        <el-radio v-for="option in item.option" :key="option.value" :label="option.value">{{option.label}}</el-radio>
                        </el-radio-group>
                    </template>
                <template v-if="item.type == 'checkbox'">
                    <el-checkbox-group v-model="formObj[item.field]">
                        <el-checkbox v-for="option in item.option" :key="option.value" :label="option.value">{{option.label}}</el-checkbox>
                    </el-checkbox-group>
                </template>
            </el-form-item>
        </template>
    </el-form>
</template>

<script>
    export default {
        props: {
            moduleObj: {
                type: Object,
                required: true
            },
        },
        data: function () {
            return  {
                formObj: {
                    labelWidth: '65px',
                    guestName: 'XXXXXXX银行',
                    guestType: '商业银行',
                    guestAttr: '0',
                    contactWay: '',
                    ifPurchase: '0',
                    manage: ['0']
                },
                fromItemArr: [
                    {
                        type: 'label',
                        field: 'guestName',
                        label: '客户名称'
                    },{
                        type: 'label',
                        field: 'guestType',
                        label: '客户类型'
                    },{
                        type: 'select',
                        field: 'guestAttr',
                        label: '客户属性',
                        placeholder: '请选择...',
                        option: [{value:'0',label:'属性一'},{value:'1',label:'属性二'},{value:'2',label:'属性三'}],
                    },{
                        type: 'input',
                        field: 'contactWay',
                        label: '联系方式'
                    },{
                        type: 'radioBox',
                        field: 'ifPurchase',
                        label: '是否申购',
                        option: [{value:'0',label:'是'},{value:'1',label:'否'}],
                    },{
                        type: 'checkbox',
                        field: 'manage',
                        label: '组合经理',
                        option: [{value:'0',label:'张三'},{value:'1',label:'李四'},{value:'2',label:'王五'}],
                    },{
                        type: 'button',
                        label: '保存',
                        position: 'bottom'
                    },
                ]
            }
        },
        mounted : function() {
            this.formObj = this.moduleObj.formObj;
        },
        computed:{

        },
    }
</script>