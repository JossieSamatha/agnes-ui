<template>
    <div class="dynamic-data-container">
        <el-input v-model="searchValue"></el-input>
        <div class="content">
            <ul class="dynamic-ul">
                <li class="dynamic-item" v-for="dynamic in dynamicArr" :key="dynamic.value">
                    <span class="dynamic-label">{{dynamic.label}}</span>
                    <i class="fa fa-edit"></i>
                    <i class="fa fa-trash-o"></i>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
    export default {
        data(){
            return {
                searchValue: '',
                dynamicArr: [{label: '日均话务量', value: '0'},{label: '话务量日均环比', value: '1'},
                    {label: '话务总量趋势', value: '2'}]
            }
        },
        computed: {

        },
        methods: {

        }
    }
</script>

<style scoped>

</style>