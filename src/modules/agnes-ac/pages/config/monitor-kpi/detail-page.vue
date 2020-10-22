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
            status: String
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
        }
    }
</script>

<style scoped>

</style>