<template>
    <div>
        <el-form class="fit-box" :disabled="mode==='view'" :model="form" ref="form" :rules="rules"
                 label-width="85px"
                 style="padding: 10px;">
          <el-form-item label="群组名称" prop="userGroupName" style="width: 100%">
            <gf-input type="text" v-model="form.userGroupName"/>
          </el-form-item>
          <el-form-item label="群组代码" prop="userGroupCode" style="width: 100%">
            <gf-input type="text" v-model="form.userGroupCode"/>
          </el-form-item>
          <el-form-item label="群组标签" prop="userGroupTag">
            <el-select class="multiple-select" v-model="form.userGroupTagArr"
                       filterable clearable multiple
                       placeholder="请选择">
              <gf-filter-option
                  v-for="item in userGroupTagOption"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId">
              </gf-filter-option>
            </el-select>
          </el-form-item>
        </el-form>
        <dialog-footer :ok-button="mode !== 'view'" :on-save="onSave" ok-button-title="保存"></dialog-footer>
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
              userGroupTagOption: [],
              form: {
                'userGroupName': '',
                'userGroupId': '',
                'userGroupCode': '',
                'userGroupTag': '',
                'userGroupTagArr': [],
              },
              memberRefList: [],
              rosterDate: '',
              rules: {
                    'userGroupName': [{required: true, message: "请输入群组名称", trigger: 'blur'}],
                    'userGroupCode': [{required: true, message: "请输入群组代码", trigger: 'blur'}],
                'userGroupTagArr': [{required: true, message: "请选择群组标签", trigger: 'blur'}]
                },
            }
        },
        beforeMount() {
          this.userGroupTagOption = this.$app.dict.getDictItems("AGNES_USER_GROUP_TAG");
          if (this.mode !== 'add') {
            Object.assign(this.form, this.row);
            if (this.form.userGroupTag) {
              this.form.userGroupTagArr = this.form.userGroupTag.split(',');
            }
          }
        },
        methods: {
            async onSave() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                try {

                  this.form.userGroupTag = this.form.userGroupTagArr.join(',')
                  const p = this.$api.userGroupApi.saveUserGroup(this.form);
                  await this.$app.blockingApp(p);

                  if (this.actionOk) {
                    await this.actionOk();
                  }

                  this.$msg.success('保存成功');
                  this.$dialog.close(this);
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
        }
    }
</script>
