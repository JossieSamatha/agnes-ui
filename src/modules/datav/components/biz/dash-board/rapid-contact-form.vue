<template>
    <section class="rapid-contact-form">
        <p><el-input prefix-icon="el-icon-phone-outline" v-model="moduleObj.phone">
            <el-button slot="append">拨打电话</el-button>
            </el-input>
            </p>
        <p><el-input prefix-icon="fa fa-envelope-o"  v-model="moduleObj.mail">
            <el-button slot="append">发送邮件</el-button>
            </el-input>
            </p>
        <p><el-button>新增任务</el-button></p>
        <p><el-button>添加工具</el-button></p>
        </section>
</template>

<script>
    export default {
        props: {
            moduleObj: {
                type: Object,
                required: true
            },
        }
    }
</script>