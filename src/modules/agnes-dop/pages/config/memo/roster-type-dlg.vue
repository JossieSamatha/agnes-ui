<template>
    <div>
        <el-form class="fit-box" :disabled="mode==='view'" :model="form" ref="form" :rules="rules" label-width="85px"
                 style="padding: 10px;">
            <el-form-item label="值班区间" prop="rosterStartDate">
                <div class="line">
                    <el-form-item prop="rosterStartDate">
                        <el-date-picker
                                v-model="form.rosterStartDate"
                                align="left"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <span style="margin: 0 15px">至</span>
                    <el-form-item prop="rosterEndDate">
                        <el-date-picker
                                v-model="form.rosterEndDate"
                                align="left"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </div>
            </el-form-item>
            <el-form-item label="值班类型" prop="rosterTypeArr">
                <el-select v-model="form.rosterTypeArr" multiple clearable>
                    <el-option v-for="item in rosterTypeDict" :key="item.dictId" :label="item.dictName" :value="item.dictId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="值班人员" prop="memberRefList">
                <gf-person-chosen ref="memberRef"
                                  :disabled="mode !== 'add' && mode !== 'edit'"
                                  :memberRefList="form.memberRefList"
                                  chosenType="user"
                                  @getMemberList="getMemberList"
                >
                </gf-person-chosen>
            </el-form-item>
        </el-form>
        <span class="note">注：值班类型多选与值班人员多选一致，会按照顺序进行对应批量生产排班，可以选择时调整顺序。</span>
        <dialog-footer :ok-button-visible="mode !== 'view'" :on-save="onSave" ok-button-title="确定"></dialog-footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                rosterTypeDict: this.$app.dict.getDictItems('AGNES_ROSTER_TYPE'),
                form: {
                    rosterStartDate: '',
                    rosterEndDate: '',
                    rosterTypeArr: [],
                    rosterType: '',
                    memberRefList: [],
                    rosterNoticeUser: ''
                },
                rules: {
                    'rosterStartDate': [{required: true, message: "请选择值班开始时间"}],
                    'rosterEndDate': [{required: true, message: "请选择值班结束时间"}],
                    'rosterTypeArr': [{type: 'array', required: true, message: "请选择值班类型"}],
                    'memberRefList': [{type: 'array',required: true, message: "请选择值班人员"}],
                },
            };
        },
        props: {
            mode: {
                type: String,
                default: 'add'
            },
            row: Object,
            actionOk: Function
        },

        beforeMount() {
            if(!(this.mode === 'add')) {
              this.$lodash.assign(this.form, this.row);
              //this.form.memberRefList = this.row.rosterNoticeUser.split(',');
              this.form.rosterTypeArr = this.row.rosterType.split(',');
              this.form.memberRefList = JSON.parse(this.row.rosterNoticeUser);
            }
        },

        methods: {
            getMemberList(val){
                this.form.memberRefList = val;
            },

            async onSave() {
                const ok = await this.$refs.form.validate();
                if (!ok) {
                    return;
                }
                try {
                  this.form.rosterNoticeUser = JSON.stringify(this.form.memberRefList);
                  this.form.rosterType = this.form.rosterTypeArr.join(',');
                  const p = this.$api.rosterApi.saveDef(this.form);
                  const req = await this.$app.blockingApp(p);
                  if (req.data != null) {
                    this.$msg.warning(req.data);
                    return;
                  }
                  if (this.actionOk) {
                    await this.actionOk(this.form, this.row);
                  }
                  this.$msg.success('保存成功');
                    this.$dialog.close(this);
                } catch (e) {
                    this.$msg.error(e);
                }
            }
        }
    }
</script>

<style scoped>
    .note {
        color: #999;
        text-indent: 2em;
    }
</style>
