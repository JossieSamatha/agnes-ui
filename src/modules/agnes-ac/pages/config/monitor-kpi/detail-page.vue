<template>
    <div style="height: 100%; padding: 10px;">
        <gf-grid ref="grid" height="100%" :option="gridOption"></gf-grid>
    </div>
</template>

<script>
    export default {
        props: {
            kpiCode: String,
            bizDate: String,
            status: Number
        },
        data(){
            return {
                gridOption: {
                    columnDefs: [],
                    rowData:[],
                    ext: {
                        checkboxColumn: 2,
                        pagingMode: false,
                    },
                }
            }
        },
        methods: {
            // 返回关闭抽屉;
            onCancel(){
                this.$emit("onClose");
            }
        }
    }
</script>

<style scoped>

</style>