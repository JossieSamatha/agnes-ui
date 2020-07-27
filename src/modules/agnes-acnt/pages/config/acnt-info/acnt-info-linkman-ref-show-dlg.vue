<template>
    <div>
        <gf-grid  grid-no="agnes-acnt-info-linkman-ref-show" ref="grid"
                  :row-data="datas"  :query-args="queryParam">
        </gf-grid>

    </div>
</template>

<script>

    export default {
        props: {
            mode: {
                type: String,
                default: 'view'
            },
            row: Object,
            actionOk: Function
        },
        data() {
            return {
                datas:[],
                queryParam:{
                    acntId :""
                }
            }
        },
        beforeMount() {
            if(this.row.acntId){
                this.queryParam.acntId = this.row.acntId;
            }
        },
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            }

        }
    }
</script>

<style scoped>

</style>
