<template>
  <div>
    <el-form :model="form" :disabled="mode==='view'" ref="form" :rules="rules" label-width="100px"
             style="padding: 10px;">
      <el-form-item label="记录事项" prop="memo.memoDesc">
        <gf-input v-model="form.memo.memoDesc" type="textarea" :max-byte-len="512"></gf-input>
      </el-form-item>
      <el-form-item label="提醒日期" prop="memo.memoDate">
        <gf-date-picker v-model="form.memo.memoDt"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="提醒日期"
                        style="width: 223px"
        >
        </gf-date-picker>
      </el-form-item>
      <el-form-item label="日历类型" prop="memo.memoType">
        <gf-input v-model="form.memo.memoDesc" type="textarea" :max-byte-len="512"></gf-input>
      </el-form-item>
      <el-form-item label="通知人员">
        <gf-person-chosen ref="memberRef"
                          :memberRefList="form.memoMemberRefList"
                          chosenType="user, group, roster"
                          :rosterDate="rosterDate"
                          @getMemberList="getMemberList">
        </gf-person-chosen>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "memo-dlg"
}
</script>
