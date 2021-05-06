<template>
  <div>
    <el-form :model="form.reFunDef" :disabled=this.isNoEdit ref="form" :rules="rules" label-width="85px"
             style="padding: 10px">
      <el-form-item label="函数名称" prop="fnName">
        <gf-input type="text" v-model="form.reFunDef.fnName" :max-byte-len="64" style="width: 86%"/>
      </el-form-item>
      <el-form-item label="函数编号" prop="fnCode">
        <gf-input type="text" v-model="form.reFunDef.fnCode" :max-byte-len="8" style="width: 86%"
                  clear-regex="[^a-zA-Z\d\x00-\xff]"/>
      </el-form-item>
      <el-form-item label="函数类型" prop="fnType">
        <gf-dict-select dict-type="AGNES_FUN_TYPE" v-model="form.reFunDef.fnType" style="width: 86%"></gf-dict-select>
      </el-form-item>
      <el-form-item label="api方法名" v-if="form.reFunDef.fnType === 'api'">
        <gf-input type="text" v-model="form.reFunDef.fnTarget" :max-byte-len="128" style="width: 86%"
                  clear-regex="[^a-zA-Z\x00-\xff]"/>
      </el-form-item>
      <el-form-item label="内部函数" v-if="form.reFunDef.fnType === 'inner'">
        <gf-input type="text" v-model="form.reFunDef.fnTarget" :max-byte-len="128" style="width: 86%"
                  clear-regex="[^a-zA-Z\x00-\xff]"/>
      </el-form-item>
      <el-form-item label="服务路径" v-if="form.reFunDef.fnType === 'svc'" style="width: 86%">
        <gf-input type="text" v-model="form.reFunDef.fnTarget" :max-byte-len="128"
                  clear-regex="[^a-zA-Z\x00-\xff]"/>
      </el-form-item>
      <el-row v-if="form.reFunDef.fnType === 'sql'">
        <el-form-item label="数据源" prop="bizParamDb">
          <gf-ds v-model="form.reFunDef.bizParamDb" style="width: 86%"></gf-ds>
        </el-form-item>

        <el-form-item label="SQL语句" prop="bizParamSql">
          <gf-input type="textarea" v-model="form.reFunDef.bizParamSql"
                    style="width: 86%"
                    resize="none"
                    :autosize="{minRows: 2, maxRows: 6}" clear-regex="[^\x00-\xff]"/>
        </el-form-item>
      </el-row>
      <el-form-item label="传入参数" prop="fnArgs">
        <el-select v-model="form.reFunDef.fnArgs" placeholder="选择业务对象" style="width: 86%" filterable clearable>
          <el-option
              v-for="item in modelType"
              :key="item.modelTypeId"
              :label="item.typeName"
              :value="item.modelTypeId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="返回参数" prop="fnReturn">
        <div class="line none-shrink">
          <el-select v-model="form.reFunDef.fnReturn" placeholder="选择业务对象" style="width: 86%" filterable clearable>
            <el-option
                v-for="item in modelType"
                :key="item.modelTypeId"
                :label="item.typeName"
                :value="item.modelTypeId">
            </el-option>
          </el-select>
          <gf-strbool-checkbox v-model="form.reFunDef.isReturnArray" style="margin-left: 10px">数组类型
          </gf-strbool-checkbox>
        </div>
      </el-form-item>
      <el-form-item label="函数描述" prop="fnDesc">
        <gf-input type="textarea" v-model="form.reFunDef.fnDesc"
                  style="width: 86%"
                  resize="none" :max-byte-len="128"
                  :autosize="{minRows: 2, maxRows: 6}"/>
      </el-form-item>
    </el-form>
    <dialog-footer :on-save="save" :ok-button-title="okTitle" :ok-button-visible="mode != 'view'"></dialog-footer>
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
        reFunDef: {
          fnName: '',
          fnId: '',
          fnType: '',
          fnDesc: '',
          fnCode: '',
          fnTarget: '',
          fnArgs: '',
          fnReturn: '',
          bizParamDb: '',
          bizParamSql: '',
          isReturnArray: ''
        },
        isNeedCheck:false,
      },
      isNoEdit:false,
      okTitle:'保存',
      modelType: [],
      rules: {
        'fnName': [{required: true, message: "请输入函数名称", trigger: 'blur'}],
        'fnCode': [{required: true, message: "请输入函数编号", trigger: 'blur'}],
        'fnType': [{required: true, message: "请选择函数类型", trigger: 'change'}],
      },
    }
  },

  beforeMount() {
    Object.assign(this.form.reFunDef, this.row);
    this.loadModelType();
    if(this.mode=='view' || this.mode=='check'){
      this.isNoEdit = true;
      this.okTitle = '审核';
    }
  },
  methods: {
    async loadModelType() {
      try {
        const p = this.$api.modelConfigApi.getModelTypeList();
        const resp = await this.$app.blockingApp(p);
        if (resp && resp.data) {
          this.modelType = resp.data;
        }
      } catch (reason) {
        this.$msg.error(reason);
      }
    },
    async save() {
      if(this.mode == 'check'){
        try {
          const p = this.$api.funDefineApi.changeFunDefStatus({fnId:this.form.reFunDef.fnId,status:'02'});
          await this.$app.blockingApp(p);
          this.$msg.success('审核成功');
          this.$dialog.close(this);
          if (this.actionOk) {
            await this.actionOk();
          }
        }catch (reason) {
          this.$msg.error(reason);
        }
      }else {
        const ok = await this.$refs['form'].validate();
        if (!ok) {
          return;
        }
        if(this.mode != 'add' && this.row.isLastestVersion == '0'){
          const isSave = await this.$msg.ask(`该配置选项存在历史版本，请确定是否完成选项更新！`);
          if (!isSave) {
            return ;
          }
        }
        try {
          if(this.row.fnCode != this.form.reFunDef.fnCode){
            this.form.isNeedCheck=true;
          }
          const p = this.$api.funDefineApi.addFunDef({reFunDef:this.form.reFunDef,isNeedCheck:this.form.isNeedCheck});
          const resp = await this.$app.blockingApp(p);
          if(resp.data == "0011"){
            this.$msg.warning("该函数编号已存在!");
            return;
          }else {
            if (this.actionOk) {
              await this.actionOk();
            }
            this.$msg.success('保存成功');
            this.$dialog.close(this);
          }
        } catch (reason) {
          this.$msg.error(reason);
        }
      }
    },
  },
}
</script>
