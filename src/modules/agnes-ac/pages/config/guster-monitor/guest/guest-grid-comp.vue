<template>
    <gf-grid :options="gridOption" height="100%"></gf-grid>
</template>

<script>
    export default {
        props: {
            moduleObj: {
                type: Object,
                required: true
            },
        },
        data: function () {
            return  {
            }
        },
        mounted : function() {
        },
        computed:{
            gridOption(){
                let newGridOption = {};
                newGridOption = JSON.parse(this.moduleObj.gridOption);
                if(typeof(this.moduleObj.columnDefs) == 'object'){
                    this.$set(newGridOption,'columnDefs',this.moduleObj.columnDefs);
                }else{
                    const columnDefs = JSON.parse(this.moduleObj.columnDefs);
                    this.$set(newGridOption,'columnDefs',columnDefs);
                }

                this.$set(newGridOption,'rowData',JSON.parse(this.moduleObj.rowData));
                return newGridOption;
            }
        },
        methods: {
        }
    }
</script>