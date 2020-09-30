<template>
    <div>
        <gf-grid ref="grid"
                 grid-no="file-scan-list-field"
                 toolbar="find,refresh,more"
                 quick-text-max-width="300px"
                 @row-double-click="showDetail"
        >
            <template slot="left">
                <!-- <gf-button class="action-btn" @click="addFileAnaly" size="mini">添加</gf-button> -->
            </template>
        </gf-grid>
    </div>
</template>
<script>
    export default {
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            showFileDetail(){
            }
        }
    }
</script>