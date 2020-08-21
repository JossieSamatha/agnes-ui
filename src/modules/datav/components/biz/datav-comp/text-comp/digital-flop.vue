<template>
    <div class="digital-flop">
        <dv-digital-flop :config="digitalFlopNum"/>
            <span class="unit">{{compOption.unit}}</span>
    </div>

</template>

<script>
    export default {
        name: 'digital-flop',
        props: {
            compOption: {
                type: Object
            }
        },
        computed: {
            digitalFlopNum(){
                var numObj = {
                    number: [parseInt(this.compOption.number)],
                    content: '{nt}',
                    textAlign: this.compOption.textAlign,
                    style: {
                        fill: this.compOption.color,
                        fontWeight: this.compOption.fontWeight
                    }
                };
                return numObj;
            }
        }
    }
</script>

<style>
    .digital-flop {
        display: flex;
        width: 100%;
        height: 100%;
    }
</style>