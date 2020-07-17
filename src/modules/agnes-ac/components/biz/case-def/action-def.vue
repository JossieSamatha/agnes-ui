<template>
    <div class="stageItem" v-if="action">
        <div class="stageItemContent">
            <slot name="steps"></slot>
        </div>
    </div>
</template>

<script>
    function resetAction() {
        return {
            actionType: "",
            attrs: {},
            automation: false,
            stepCode: this.$caseUtils.randomString(6),
            defType: "action"
        }
    }

    export default {
        props: {
            action: {
                type: Object,
                default: resetAction
            }
        },
    }
</script>
<style>

</style>
