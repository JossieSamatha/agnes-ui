<template>
    <dv-scroll-board :config="config" :style="{width: position.width+'px', height: position.height+'px'}" />
</template>

<script>
    export default {
        name: 'static-grid',
        props: {
            position: Object,
            compOption: {
                type: Object
            }
        },
        computed: {
            config(){
                return ()=>{
                    return this.compOption;
                };
            }
        }
    }
</script>