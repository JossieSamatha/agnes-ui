<template>
    <div class="stage-item" v-if="action">
        <div class="stage-item-content">
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
            stepCode: this.$agnesAcUtils.randomString(6),
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
