<template>
  <el-container>
    <el-aside width="200px" class="el-border">
      <el-row style="height: 30px">
        <el-input v-model="filterText" size="mini" placeholder="检索机构..."
                  suffix-icon="fa fa-search"></el-input>
      </el-row>
      <el-tree ref="tree"
               :data="treeData"
               node-key="id"
               default-expand-all
               @node-click="handleNodeClick"
               :filter-node-method="filterNode"
               style="border: 1px solid #eee;border-radius: 0;overflow-y: auto;height: calc(100% - 34px);margin-top:4px">
      </el-tree>
    </el-aside>
    <el-main height="100%" style="padding-top: 0px;padding-bottom: 0px" class="el-border">
      <linkManList :reqData="reqData"></linkManList>
    </el-main>
  </el-container>
</template>

<script>
import linkManList from "./llinkman-list"

export default {
  name: "index",
  components: {
    linkManList
  },
  data() {
    return {
      filterText: '',
      treeData: [],
      reqData: {
        extOrgId: '',
      },

      defaultProps: {
        children: 'children',
        label: 'linkmanGroupName'
      },

    }
  },
  mounted() {
    this.loadTreeNodes();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    reloadData() {

    },
    filterNode(value, data) {
      return data.label.indexOf(value) >= 0;
    },
    async loadTreeNodes() {
      try {
        this.treeData = []
        const resp = await this.$api.orgDefineApi.getApproveOrgTreeNodes();
        this.treeData.push(resp.data);
      } catch (reason) {
        this.$msg.error(reason);
      }
    },
    handleNodeClick(data) {
      this.reqData.extOrgId = '';
      if (data.extOrgId) {
        this.reqData.extOrgId = data.extOrgId
      }
    },
  },
}
</script>

<style scoped>
.el-border {
  border: 1px solid rgb(238, 238, 238);
}

</style>
