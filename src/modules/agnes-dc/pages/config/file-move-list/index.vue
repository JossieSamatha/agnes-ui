<template>
    <div>
        <gf-grid ref="grid"
                 grid-no="file-move-list-field"
                 toolbar="find,refresh,more"
                 quick-text-max-width="300px"
                 @row-double-click="showDetail"
        >
            <template slot="left">
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
        }
    }
</script>