<template>
    <div class="detail-popover" :style="styleProps">
        <div class="header">
            <span class="title" :class="{roster: dataEventType === 'roster'}">
                {{dataEventType === 'memo' ? '计划详情' : '排班详情'}}</span>
            <span>
                <em class="el-icon-edit" v-show="dataEventType === 'memo'" @click="editDetail"></em>
                <em class="el-icon-delete" @click="deleteDetail"></em>
                <em class="el-icon-close" @click="closePopover"></em>
            </span>
        </div>
        <div class="body">
            <p>
                <svg-icon name="text" height="10px" color="#999"></svg-icon>
                <span class="text" :title="dataEventObj.memoDesc || dataEventObj.rosterInfo">
                    {{dataEventObj.memoDesc || dataEventObj.rosterInfo}}
                </span>
            </p>
            <p>
                <template v-if="dataEventType === 'memo'">
                    <svg-icon name="user" height="12px" color="#999"></svg-icon>
                    <span>{{dataEventObj.memoNoticeUser}}</span>
                </template>
                <template v-else>
                    <svg-icon name="phone" height="12px" color="#999"></svg-icon>
                    <span>{{dataEventObj.oTel}}</span>
                </template>
            </p>
            <p>
                <svg-icon name="calendar" height="12px" color="#999"></svg-icon>
                <span>{{dataEventObj.memoDate || dataEventObj.rosterDate}}</span>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
          dataEventType: String,
          styleProps: Object,
          dataEventObj: Object,
          actionOk: Function,
        },
        data() {
            return {
            }
        },
        mounted(){
            console.log('this.dataEventObj', this.dataEventObj)
        },
        methods: {
            closePopover() {
                this.$emit('closePopover');
            },

            editDetail(){
                this.$prompt('请输入记录事项', '日历计划-记录事项编辑', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '批次修改',
                    cancelButtonText: '单条修改',
                    inputType: 'textarea',
                    inputValue: this.dataEventObj.memoDesc,
                    type: 'warning',
                    beforeClose: async (action, instance, done) => {
                        if(action === 'close') {
                            done();return;
                        }
                        let newObj = this.dataEventObj;
                        newObj.memoDesc = instance.inputValue;
                        newObj.isDelete = action === 'confirm';
                        try {
                          const p = this.$api.memoApi.saveRuMemo(newObj);
                          await this.$app.blockingApp(p);
                          this.$emit('refreshCalendar');
                          this.$msg.success('修改成功');
                          if (this.actionOk) {
                            await this.actionOk();
                          }
                          done();
                        } catch (reason) {
                            this.$msg.error(reason);
                        }
                    }
                })
            },

            deleteDetail(){
                const ifMemo = this.dataEventType === 'memo';
                const title = ifMemo ? '日历' : '排班';
                this.$confirm('是否删除同一批次所有数据?', title+'计划删除', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '批次删除',
                    cancelButtonText: '单条删除',
                    type: 'warning',
                    beforeClose: async (action, instance, done) => {
                        if(action === 'close') {
                            done();return;
                        }
                        let newObj = this.dataEventObj;
                        newObj.isDelete = action === 'confirm';
                        try {
                          let p = {};
                          if (ifMemo) {
                            p = this.$api.memoApi.deleteRuMemo(newObj);
                          } else {
                            p = this.$api.rosterApi.deleteRuRoster(newObj);
                          }
                          await this.$app.blockingApp(p);
                          this.$emit('refreshCalendar');
                          this.$msg.success('删除成功');
                          if (this.actionOk) {
                            await this.actionOk();
                          }
                          done();
                        } catch (reason) {
                          this.$msg.error('删除失败');
                        }
                    }
                })
            }
        },
    }
</script>

<style scoped>
    .detail-popover {
        position: absolute;
        right: 0;
        width: 200px;
        font-size: 12px;
        padding: 14px;
        background: #fff;
        box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
        border-radius: 6px;
    }

    .detail-popover::before {
        content: '';
        position: absolute;
        left: -10px;
        top: 5px;
        border: 5px solid transparent;
        border-right-color: #fff;
    }

    .detail-popover .header {
        display: flex;
        justify-content: space-between;
    }

    .detail-popover .header>span:first-child {
        position: relative;
        color: #333;
        font-family: SourceHanSansCN-Medium;
        padding-left: 10px;
    }

    .detail-popover .header>span.title::before {
        content: '';
        position: absolute;
        top: 6px;
        left: 0;
        display: block;
        width: 6px;
        height: 6px;
        background: #3CACEC;
        border-radius: 50%;
    }

    .detail-popover .header>span.title.roster::before {
        background: #FFB727;
    }

    .detail-popover .header>span:last-child {
        color: #999;
    }

    .detail-popover .header>span:last-child em {
        font-size: 14px;
        cursor: pointer;
    }

    .detail-popover .header>span:last-child .el-icon-edit {
        color: #0F5EFF;
    }

    .detail-popover .header>span:last-child .el-icon-delete {
        color: #f7603d;
        margin: 0 6px;
    }

    .detail-popover .body {
        margin-top: 6px;
    }

    .detail-popover .body p {
        display: flex;
        align-items: center;
        height: 24px;
        line-height: 24px;
    }

    .detail-popover .body p .text {
        display: block;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .detail-popover .body .svg-icon {
        line-height: 0;
        margin-right: 6px;
    }
</style>
