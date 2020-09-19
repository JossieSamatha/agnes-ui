<template>
    <div class="digital-flop" :style="{'flex-direction': this.compOption.direction, 'align-items': this.compOption.numOption['align-items']}">
        <basic-text class="prefix"
                     v-if="compOption.preOption.contentText"
                     :compOption="compOption.preOption"
        ></basic-text>
        <dv-digital-flop ref="digital"
                         :config="digitalFlopNum"
                         style="flex: 0 0 auto"
                         :style="{width: this.compOption.numOption.width+'px', height: this.compOption.numOption['font-size']+'px'}"/>
        <basic-text  class="suffix"
                     v-if="compOption.sufOption.contentText"
                     :compOption="compOption.sufOption"
        ></basic-text>
    </div>

</template>

<script>
    import basicText from './basic-text'
    export default {
        name: 'digital-flop',
        props: {
            position: Object,
            compOption: {
                type: Object
            }
        },
        components: {
            'basic-text': basicText
        },
        computed: {
            digitalFlopNum(){
                const bold = this.compOption.numOption['font-style'].includes('bold');
                var numObj = {
                    number: [this.compOption.numOption.number],
                    content: '{nt}',
                    toFixed: this.compOption.numOption.toFixed,
                    textAlign: this.compOption.numOption.textAlign,
                    style: {
                        fill: this.compOption.numOption.color,
                        fontSize: this.compOption.numOption['font-size'],
                        fontWeight: bold ? 'bold' : 'normal',
                        shadowBlur: this.compOption.numOption.shadowBlur,
                        shadowColor: this.compOption.numOption.shadowColor,
                        shadowOffsetX: this.compOption.numOption.shadowOffsetX,
                        shadowOffsetY: this.compOption.numOption.shadowOffsetY,
                    }
                };
                if(this.compOption.numOption.formatter === 'money'){
                    numObj.formatter = this.mapNumType;
                }
                return numObj;
            }
        },
        methods: {
            mapNumType(number){
                return this.$fmt.formateThousandthMoney(number);
            }
        },
        watch: {
            'compOption.numOption.width': {
                handler(){
                    this.$nextTick(()=>{
                        this.$refs.digital.init();
                    });
                },
                deep: true
            },
            'position.width': {
                handler(){
                    this.$nextTick(()=> {
                        this.$refs.digital.init();
                    })
                },
                deep: true
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