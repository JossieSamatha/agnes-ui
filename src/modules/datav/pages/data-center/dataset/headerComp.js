import Vue from 'vue';

export default Vue.extend({
    template: `
        <div ref="headerInput"><el-input v-model="headerValue" @change="headerChange"></el-input></div>
    `,
    data: function() {
        return {
            headerValue: ""
        };
    },
    beforeMount() {},
    mounted() {
        this.params.column.newHeaderValue = this.params.column.newHeaderValue || this.params.displayName;
        this.headerValue = this.params.column.newHeaderValue;
    },
    methods: {
        headerChange(value){
            this.params.column.newHeaderValue = value;
        }
    },
});