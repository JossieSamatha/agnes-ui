<template>
  <div class="gf-fit">
    <div class="gf-auth">
      <div class="gf-auth-body">
        <div class="gf-auth-content">
          <span v-if="tabData === null || tabData.length=== 0">没有可展示的自定义查询</span>
          <el-tabs v-model="tabValue" style="height:100%" @tab-click="handleClick">
            <el-tab-pane
                :key="item.pkId"
                v-for="item in tabData"
                :label="item.customQueryName"
                :name="item.pkId"
                :lazy="true"
            >
              <el-form class="search-panel" label-width="75px">
                <template v-for="group in queryDataGroup">
                  <div class="line" :key="group">
                    <div v-for="(item,index) in queryData" :key="index">
                      <div v-if="index >= group *2 - 2 && index <group*2" :key="index">
                        <el-form-item :label="item.queryFieldName" prop="queryDefaultValue" :key="item.pkId"
                                      style="width: 100%;">
                          <el-select v-model="item.queryDefaultValue" v-if="item.dictTypeId" filterable clearable
                                     placeholder="请选择">
                            <el-option
                                v-for="dict in getOption(item.dictTypeId)"
                                :key="dict.dictId"
                                :label="dict.dictName"
                                :value="dict.dictId">
                            </el-option>
                          </el-select>
                          <el-input v-else-if="item.queryFieldType === 'string'" v-model="item.queryDefaultValue"
                                    clearable/>
                          <el-input type="number" v-else-if="item.queryFieldType === 'number'"
                                    v-model="item.queryDefaultValue" clearable/>
                          <el-date-picker
                              v-else-if="item.queryFieldType === 'date' && item.isGroup === '0'"
                              v-model="item.queryDefaultValue"
                              type="date"
                              placeholder="选择日期"
                              format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd">
                          </el-date-picker>
                          <el-date-picker
                              v-else-if="item.queryFieldType === 'date' && item.isGroup === '1'"
                              v-model="item.queryDefaultValue"
                              type="daterange"
                              range-separator="-"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd">
                          </el-date-picker>
                        </el-form-item>
                      </div>
                    </div>
                  </div>
                </template>
                <el-button class="option-btn" @click="reloadData(item.pkId)" type="primary" v-if="queryData.length > 0">
                  查询
                </el-button>
                <el-button class="option-btn" @click="reSetSearch" v-if="queryData.length > 0">重置</el-button>
              </el-form>
              <gf-grid :options="gridOptions" quick-text-max-width="300px" height="100%" ref="grid"></gf-grid>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateUtil from '@hex/gf-ui/src/util/date-utils'
import lodash from 'lodash';
import loadsh from "lodash";

export default {
  name: "index",

  data() {
    return {
      tabValue: '',
      tabData: [],
      queryData: [],
      queryDataGroup: 0,
      gridOptions: {
        columnDefs: [],
        rowData: [],
        multiSelect: true,
        ext: {
          pagingMode: false, //不分页
          checkboxColumn: 2, //是否显示checkbox列,
          enableExportLocal: true,
          autoFitColumnMode: 1,
        },
      },
    }
  },
  beforeMount() {
    this.queryCustomQueryList();
  },
  methods: {
    async queryCustomQueryList() {
      const p = this.$api.customQueryApi.queryCustomQueryList();
      const resp = await this.$app.blockingApp(p);
      if (resp && resp.data) {
        this.tabData = lodash.clone(resp.data);
        if (!lodash.isEmpty(this.tabData)) {
          this.tabValue = this.tabData[0].pkId;
          await this.initQueryData(this.tabData[0].pkId);
        }
      }
    },
    async initQueryData(pkId) {
      const p = this.$api.customQueryApi.queryCustomFieldOfIsQuery(pkId);
      const resp = await this.$app.blockingApp(p);
      if (resp && resp.data) {
        this.queryData = loadsh.clone(resp.data);
        this.queryDataGroup = Math.ceil(this.queryData.length / 2)
      }
      await this.loadAgGrid(pkId, '');
    },
    async loadAgGrid(pkId, type) {
      this.gridOptions.columnDefs = [];
      this.gridOptions.rowData = [];
      this.gridOptions.api.setRowData([])
      const param = {
        pkId: pkId,
        queryData: this.queryData,
      }
      const p = this.$api.customQueryApi.queryCustomQueryDetail(param)
      const resp = await this.$app.blockingApp(p);
      if (resp && resp.data) {
        const columns = [];
        resp.data.dopReCustomQueryFields.forEach(item => {
          if (item.isDisplay !== '0') {
            let column = {
              headerName: item.queryFieldName,
              field: item.queryFieldKey,
              resizable: true,
              suppressMovable: true,
              cellClass: 'right',
              headerAlign: 'right',
              valueFormatter: function (params) {
                if (item.queryFieldType === 'date' && item.stringFormat) {
                  let formatDate = ''
                  formatDate = dateUtil.formatDate(params.value, item.stringFormat)
                  return formatDate;
                } else if (item.dictTypeId) {
                  const dicts = window.$gfui.$app.dict.getDictItem(item.dictTypeId, params.value);
                  if (dicts) {
                    return dicts.dictName;
                  } else {
                    return params.value;
                  }
                } else if (item.queryFieldType === 'amount' && item.stringFormat) {
                  return this.formatNumber(params.value, item.stringFormat);
                }
              }
            };
            columns.push(column);
          }
        })
        if (type !== 'query') {
          this.gridOptions.api.setColumnDefs(columns)
        }
        this.gridOptions.api.setRowData(resp.data.resultMapList)
        //this.gridOptions.api.sizeColumnsToFit()
      }
    },
    handleClick(tab) {
      if (tab && tab.name) {
        this.initQueryData(tab.name);
      }
    },
    getOption(dictTypeId) {
      const dicts = window.$gfui.$app.dict.getDictItems(dictTypeId);
      if (dicts) {
        return dicts;
      } else {
        return [];
      }
    },
    reSetSearch() {
      this.queryData.forEach(item => {
        item.queryDefaultValue = null;
      })
    },
    reloadData(pkId) {
      this.loadAgGrid(pkId, 'query')
    },
    formatNumber(num, pattern) {
      var fmtarr = pattern ? pattern.split('.') : [''];
      // 四舍五入处理
      var decimals = (fmtarr.length > 1 ? fmtarr[1].length : 0);
      num = Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);

      var strarr = num ? num.toString().split('.') : ['0'];
      var retstr = '';

      // 整数部分
      var str = strarr[0];
      var fmt = fmtarr[0];
      var i = str.length - 1;
      var comma = false;
      for (var f = fmt.length - 1; f >= 0; f--) {
        switch (fmt.substr(f, 1)) {
          case '#':
            if (i >= 0) {
              retstr = str.substr(i--, 1) + retstr;       // 加当前字符
            }
            break;
          case '0':
            if (i >= 0) {
              retstr = str.substr(i--, 1) + retstr;       // 加当前字符
            } else {
              retstr = '0' + retstr;                      // 补0
            }
            break;
          case ',':
            comma = true;                                   // 有千位符
            retstr = ',' + retstr;                          // 直接加上逗号（，）
            break;
        }
      }
      // 整数字符串替换格式后剩余字符串处理
      if (i >= 0) {
        if (comma) {
          var l = str.length;
          for (; i >= 0; i--) {
            retstr = str.substr(i, 1) + retstr;
            if (i > 0 && ((l - i) % 3) == 0) {
              retstr = ',' + retstr;
            }
          }
        } else {
          retstr = str.substr(0, i + 1) + retstr;
        }
      }

      retstr = retstr + '.';
      // 处理小数部分
      str = strarr.length > 1 ? strarr[1] : '';
      fmt = fmtarr.length > 1 ? fmtarr[1] : '';
      i = 0;
      for (let f = 0; f < fmt.length; f++) {
        switch (fmt.substr(f, 1)) {
          case '#':
            if (i < str.length) {
              retstr += str.substr(i++, 1);               // 加当前字符
            }
            break;
          case '0':
            if (i < str.length) {
              retstr += str.substr(i++, 1);               // 加当前字符
            } else {
              retstr += '0';                              // 补0
            }
            break;
        }
      }

      // 返回
      // 1.去掉开头的逗号（，）和加号（+）；2.结尾的小数点（.)
      return retstr.replace(/^,+/, '').replace(/\.$/, '');
    }

  }
}
</script>

<style scoped>
.gf-auth {
  height: 100%;
  display: flex;
  flex-direction: row;
}

.gf-auth-role {
  flex-grow: 0;
  width: 355px;
  padding-right: 5px;
}

.gf-auth-body {
  flex: 1;
  width: 0;
}

.gf-auth-body .el-tabs__header {
  margin-bottom: 0px;
}

.gf-auth-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.gf-auth-content .el-tabs {
  flex-grow: 0;
  flex-shrink: 0;
}

.gf-auth-content .gf-auth-content-data {
  flex: 1;
  height: 0;
}
</style>
