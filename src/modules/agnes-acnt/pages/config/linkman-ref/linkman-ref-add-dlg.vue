<template>
    <div>
        <el-form class="fit-box" :model="form" ref="form" :rules="rules" label-width="100px"
                 style="padding: 10px;" :disabled="mode==='view' ||mode==='check'">
          <el-form-item label="账户名称" prop="acntId" style="width: 100%">
            <el-select style="width: 90%" class="multiple-select" v-model="form.acntId"
                       filterable clearable
                       placeholder="请选择账户名称">
              <gf-filter-option
                  v-for="item in acntList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </gf-filter-option>
            </el-select>
          </el-form-item>
            <el-form-item label="联系人姓名" prop="linkmanId">
              <el-select style="width: 90%" class="multiple-select" v-model="form.linkmanId"
                         filterable clearable
                         placeholder="请选择联系人姓名">
                <gf-filter-option
                    v-for="item in linkList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </gf-filter-option>
              </el-select>
              <el-button style="border: none;padding-left: 5px;font-size: 17px;vertical-align: middle"
                         icon="el-icon-edit-outline" @click="addLinKman"/>
            </el-form-item>
          <el-form-item label="生效时间" prop="startDt">
            <el-date-picker
                style="width: 90%"
                v-model="form.startDt"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="生效时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="失效时间" prop="endDt">
            <el-date-picker
                style="width: 90%"
                v-model="form.endDt"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="失效时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <dialog-footer :on-save="onSave" ok-button-title="确定"></dialog-footer>
    </div>
</template>

<script>
import LinkmanBaseDlg from "../../../../agnes-dop/pages/config/linkman-def/linkman-base-dlg"
    export default {
        data() {
            return {
                form: {
                  acntName: '',
                  acntId: '',
                  linkmanName: '',
                  linkmanId: '',
                  status: '',
                  startDt: window.bizDate,
                  endDt: '9999-12-31'
                },
                acntList: [],
                linkList: [],
                rules: {
                    'acntId': [{required: true, message: "请选择账户名称"}],
                    'linkmanId': [{required: true, message: "请选择联系人名称"}],
                },
            }
        },
        props: {
            mode: {
                type: String,
                default: 'add'
            },
            ui:String,
            row: Object,
            actionOk: Function
        },
        beforeMount() {
            Object.assign(this.form, this.row);
            this.getOptionAcntData()
            this.getOptionListData()
        },
        methods: {
            async getOptionAcntData() {
                try {
                    let groupOption = await this.$api.acntInfoApi.getAcntInfoList();
                    let list = groupOption.data;
                    list.forEach((item) => {
                        this.acntList.push({label:item.acntLabel, value: item.acntId});
                    });
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async getOptionListData() {
              this.linkList = [];
                try {
                    let groupOption = await this.$api.linkmanApi.queryAllLinkManList();
                    let list = groupOption.data;
                    list.forEach((item) => {
                      this.linkList.push({label: item.linkmanName + '-' + item.extOrgName, value: item.linkmanId});
                    });
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async onSave() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                try {
                    if(this.ui === "1"){
                        const p = this.$api.linkmanRefApi.checkLinkman(this.form);
                        await this.$app.blockingApp(p);
                        this.$msg.success('审核通过！');
                    }else {
                        const p = this.$api.linkmanRefApi.saveLinkmanRef(this.form);
                      await this.$app.blockingApp(p);
                      this.$msg.success('保存成功！');
                    }
                  if (this.actionOk) {
                    await this.actionOk(this.form, this.row);
                  }
                  this.$dialog.close(this);
                } catch (e) {
                  this.$msg.error(e);
                }
            },
          addLinKman() {
            let actionOk = this.reloadLinkmanList.bind(this);
            let mode = 'add'
            this.$nav.showDialog(
                LinkmanBaseDlg,
                {
                  args: {row: {}, mode, actionOk},
                  width: '50%',
                  title: this.$dialog.formatTitle('联系人维护', 'add'),
                }
            );
          },
          async reloadLinkmanList() {
            this.getOptionListData();
          }
        }
    }
</script>
