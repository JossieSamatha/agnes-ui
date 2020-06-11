<template>
    <router-view/>
</template>

<script>

    // import menus from "./layout/menus";

    export default {
        name: "App",
        data() {
            return {
                session: this.$app.session.data
            }
        },
        mounted() {
            // this.$app.session.onLogin({
            //     menus: menus
            // })
        },
    }
</script>

<style>
    @import "../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css";
    @import "../node_modules/element-ui/lib/theme-chalk/index.css";
    @import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
    @import "~@hex/goframe-ui/src/lib/tabs/chrome-tabs.css";
    @import "~@hex/goframe-ui/src/lib/semantic-ui-css/semantic.css";
    @import "~@hex/goframe-ui/src/style/gf-ui.css";
    @import "~@hex/goframe-ui-admin/src/style/gf.css";

    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
    }

    button {
        padding: 5px;
        margin: 0 10px;
    }


</style>