<template>
    <div>
        <div class="linkman-list" v-for="(item, index) in productArr" :key="index">
            <div class="state-icon">
                <em class="el-icon-price-tag"></em>
            </div>
            <div class="notice-info">
                <p>({{item.productCode}}){{item.productShortName}}</p>
            </div>
            <div class="notice-state">
                {{getProClass(item.productClass)}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "comp-common",
        props: {
            moduleObj: {
                type: Object,
                require: true
            }
        },
        data(){
            return {
                productArr: [],
                classDict: this.$app.dict.getDictItems('AGNES_PRODUCT_CLASS'),
            }
        },
        created(){
            this.$api.productApi.productList().then(res => {
                this.productArr = res.data.rows;
            })
        },
        methods: {
            getProClass(classId){
                if(classId){
                    return this.$lodash.find(this.classDict, {dictId: classId}).dictName;
                }else{
                    return ''
                }
            },
        }
    }
</script>

<style scoped>
    .linkman-list {
        display: flex;
        width: 100%;
        align-items: center;
        margin-bottom: 15px;
        min-height: 40px;
        max-height: 60px;
        padding: 0 10px 0 0;
    }
    .state-icon,
    .notice-info,
    .notice-state {
        font-size: 12px;
    }
    .state-icon {
        color: #476DBE;
        font-size: 15px;
        margin-right: 10px;
    }
    .notice-info {
        flex: 1;
        color: #666;
    }

    .notice-info>p {
        height: 25px;
        line-height: 25px;
    }

    .notice-state {
        color: #999;
    }
</style>