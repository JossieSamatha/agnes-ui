<template>
  <div>
    <el-form :model="form" label-width="90px" ref="form" style="height: 100%" :rules="rules">
      <div class="line">
        <el-form-item label="规则编号" prop="customQueryKey" style="width: 100%">
          <gf-input v-model="form.customQueryKey"></gf-input>
        </el-form-item>
        <el-form-item label="规则名称" prop="customQueryName" style="width: 100%">
          <gf-input v-model="form.customQueryName"></gf-input>
        </el-form-item>
      </div>
      <div class="line">
        <el-form-item label="业务标签" prop="bizType" style="width: 50%">
          <el-input v-model="form.bizType"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="执行脚本" prop="scriptSql" style="width: 100%">
        <gf-input
            type="textarea"
            v-model="form.scriptSql"
            resize="none"
            :autosize="{minRows: 5, maxRows: 10}"
            :max-byte-len="256"
            style="width: 98%"></gf-input>
        <el-button @click="initFields">加载列表字段</el-button>
      </el-form-item>
      <el-form-item label="加载字段" prop="fields" style="width: 100%">
        <div class="optionButtonGroup">
          <gf-button @click="removeRow" class="action-btn" size="mini">删除</gf-button>
          <gf-button @click="move('up')" class="action-btn" size="mini">上移</gf-button>
          <gf-button @click="move('down')" class="action-btn" size="mini">下移</gf-button>
        </div>
        <el-table
            :data="this.form.dopReCustomQueryFields"
            style="width: 100%"
            ref="table">
          <el-table-column
              type="selection"
              min-width="50">
          </el-table-column>
          <el-table-column
              prop="indexNo"
              label="序号"
              min-width="60">
          </el-table-column>
          <el-table-column
              prop="queryFieldKey"
              label="SQL字段"
              min-width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.queryFieldKey" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column
              prop="queryFieldName"
              label="列名"
              min-width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.queryFieldName"
                        :style="!scope.row.queryFieldName ? 'border:1px solid #f00;border-radius:5px;':''"></el-input>
            </template>
          </el-table-column>
          <el-table-column
              prop="dictTypeId"
              label="字典定义"
              min-width="100">
            <template slot-scope="scope">
              <el-select v-model="scope.row.dictTypeId" placeholder="请选择">
                <el-option
                    v-for="dict in dictData"
                    :key="dict.dictTypeId"
                    :label="dict.dictTypeName"
                    :value="dict.dictTypeId">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
              prop="isDisplay"
              label="是否显示"
              min-width="100">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.isDisplay" true-label="1" false-label="0"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
              prop="alignStyle"
              label="对齐方式"
              min-width="100">
            <template slot-scope="scope">
              <gf-dict-select dict-type="OPDS_KPI_ALIGN" v-model="scope.row.alignStyle" :clearable="false"/>
            </template>
          </el-table-column>
          <el-table-column
              prop="queryFieldType"
              label="数据类型"
              min-width="100">
            <template slot-scope="scope">
              <gf-dict-select dict-type="TASK_DEF_DATATYPE" v-model="scope.row.queryFieldType" :clearable="false"/>
            </template>
          </el-table-column>
          <el-table-column
              prop="stringFormat"
              label="格式化"
              min-width="100">
            <template slot-scope="scope">
              <gf-dict-select dict-type="OPDS_KPI_FORMATTER" v-model="scope.row.stringFormat"/>
            </template>
          </el-table-column>
          <el-table-column
              label="查询条件">
            <el-table-column label="是否查询条件" min-width="100" prop="isQuery">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.isQuery" true-label="1" false-label="0"
                             @change="changeIsQuery(scope.row)"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="默认值" min-width="100" prop="queryDefaultValue">
              <template slot-scope="scope">
                <el-input
                    v-model="scope.row.queryDefaultValue"
                    :disabled="scope.row.isQuery === '1' ? false : true"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="是否组合" min-width="100" prop="isGroup">
              <template slot-scope="scope">
                <el-checkbox
                    v-model="scope.row.isGroup"
                    true-label="1"
                    false-label="0"
                    :disabled="(scope.row.isQuery ==='1' && scope.row.queryFieldType === 'date') ? false : true "></el-checkbox>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import lodash from 'lodash';
import loadsh from "lodash";

export default {
  name: "rule-add-dlg",
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
      dictData: [],
      form: {
        pkId: '',
        customQueryKey: '',
        customQueryName: '',
        bizType: '',
        scriptSql: '',
        dopReCustomQueryFields: []
      },
      rules: {
        customQueryKey: [
          {required: true, message: '规则编号必填', trigger: 'blur'},
        ],
        customQueryName: [
          {required: true, message: '规则名称必填', trigger: 'blur'},
        ],
        scriptSql: [
          {required: true, message: '执行脚本必填', trigger: 'blur'},
        ]
      }
    }
  },
  mounted() {
    if (this.mode !== 'add') {
      Object.assign(this.form, this.row)
      this.initDict();
      this.queryFields(this.form.pkId);
    }
  },
  methods: {
    async initFields() {
      if (this.form.scriptSql !== null) {
        this.form.dopReCustomQueryFields = [];
        const p = this.$api.customQueryApi.initFields(this.form.scriptSql);
        const resp = await this.$app.blockingApp(p);
        if (resp && resp.data) {
          resp.data.forEach((item, index) => {
            this.form.dopReCustomQueryFields.push({
              queryFieldKey: item,
              queryFieldName: '',
              queryFieldType: 'string',
              indexNo: index + 1,
              dictTypeId: '',
              isDisplay: '1',
              alignStyle: '1',
              stringFormat: '',
              isQuery: '0',
              queryDefaultValue: '',
              isGroup: '0'
            })
          })
        }
      }
    },
    async initDict() {
      const p = this.$api.customQueryApi.queryDictList();
      const resp = await this.$app.blockingApp(p);
      if (resp && resp.data) {
        this.dictData = loadsh.clone(resp.data)
      }
    },
    changeIsQuery(row) {
      if (row.queryDefaultValue) {
        row.queryDefaultValue = ''
      }
      row.isGroup = '0'
    },
    async queryFields(pkId) {
      if (pkId !== null && pkId !== '') {
        this.form.dopReCustomQueryFields = [];
        const p = this.$api.customQueryApi.queryFieldList(pkId);
        const resp = await this.$app.blockingApp(p);
        if (resp && resp.data) {
          this.form.dopReCustomQueryFields = lodash.clone(resp.data)
        }
      }
    },
    async onSave() {
      const ok = await this.$refs['form'].validate();
      if (!ok) {
        return;
      }
      let validate = true;
      if (this.form.dopReCustomQueryFields) {
        for (let i = 0; i < this.form.dopReCustomQueryFields.length; i++) {
          if (this.form.dopReCustomQueryFields[i].queryFieldName === '') {
            validate = false;
            break;
          }
        }
      }
      if (!validate) {
        this.$msg.warning("请补充完整参数表格!");
        return;
      }
      try {
        const p = this.$api.customQueryApi.save(this.form);
        await this.$app.blockingApp(p);
        if (this.actionOk) {
          await this.actionOk(this.form);
        }
        this.$emit("onClose");
      } catch (e) {
        this.$msg.error(e);
      }
    },
    move(direction) {
      let items = this.$refs.table.selection;
      if (items.length > 1 || items.length === 0) {
        this.$msg.warning("请选择一条记录进行操作!");
        return;
      }
      const item = items[0];
      let index = item.indexNo;
      if (direction === 'up' && index !== 0) {
        const row = this.form.dopReCustomQueryFields[index - 1];
        item.indexNo = index - 1;
        row.indexNo = index;
        this.form.dopReCustomQueryFields[index - 1] = item;
        this.form.dopReCustomQueryFields[index] = row;
      } else if (direction === 'down' && index !== this.form.dopReCustomQueryFields.length - 1) {
        const row = this.form.dopReCustomQueryFields[index + 1];
        item.indexNo = index + 1;
        row.indexNo = index;
        this.form.dopReCustomQueryFields[index + 1] = item;
        this.form.dopReCustomQueryFields[index] = row;
      }
    },
    async removeRow() {
      let items = this.$refs.table.selection;
      if (items.length > 1 || items.length === 0) {
        this.$msg.warning("请选择一条记录进行删除!");
        return;
      }
      let index = items[0].indexNo;
      this.form.dopReCustomQueryFields.splice(index, 1);
      for (let i = index; i < this.form.dopReCustomQueryFields.length; i++) {
        this.form.dopReCustomQueryFields[i].indexNo = i;
      }

    },
    async onCancel() {
      this.$emit("onClose");
    },
  }
}
</script>

<style scoped>

</style>
