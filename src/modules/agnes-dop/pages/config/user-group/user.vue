<template>
    <div style="height: 100%">
        <gf-grid ref="grid" grid-no="agnes-user" :query-args="queryArgs" height="100%">
            <template slot="left">
                <gf-button class="action-btn" @click="addRow" size="mini">添加</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>

    export default {
        name: "userAuth",
        props: {
            row: {required: true}
        },
        data() {
            return {
                hasAuth: true,
                queryArgs: {},
            }
        },
        mounted() {
            this.onSearch();
        },
        methods: {
            onSearch() {
                if (this.row != null) {
                    this.queryArgs.userGroupId = this.row.userGroupId;
                    this.$refs.grid.reloadData(true);
                }
            },
            addRow() {
            },
            removeRow() {
            },
            isAuth() {
            }
        },
        watch: {
            row(newVal) {
                this.onSearch();
                this.disabled = !newVal || (this.isAuth()===false);
            }
        }
    }
</script>