<template>
  <div class="list-view">
    <div>
      <el-tag v-for="(ptdt, prdtIndex) in prdtList"
              :key="prdtIndex"
              :closable="!disabled"
              size="small"
              @close="removeMember('prdtList', ptdt)">{{ ptdt.paramDesc }}
      </el-tag>
    </div>
    <div>
      <el-tag v-for="(ptdtType, ptdtTypeIndex) in prdtTypeList"
              :key="ptdtTypeIndex"
              :closable="!disabled"
              size="small"
              type="success"
              @close="removeMember('prdtTypeList', ptdtType)">{{ ptdtType.paramDesc }}
      </el-tag>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'chosen-list-view',
    props: {
      prdtList: Array,
      prdtTypeList: Array,
      acntList: Array,
      acntTypeList: Array,
      checkedprdtType: Array,
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      // 移除选择人员
      removeMember(list, removeObj){
        this.$utils.removeFromArray(this[list], removeObj);
        if(list != 'prdtTypeList'){
          this.$emit("reloadData", list);
        }else {
          this.$utils.removeFromArray(this.checkedprdtType, removeObj.paramId);

        }
      },
    }
  }
</script>
