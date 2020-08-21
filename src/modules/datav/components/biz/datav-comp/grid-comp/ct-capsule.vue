<template>
    <dv-capsule-chart :config="config"/>
</template>

<script>
    export default {
        name: 'ct-capsule',
        props: {
            config: {
                type: Object,
                default: function () {
                    return {
                        data: [
                            {
                                name: '南阳',
                                value: 167
                            },
                            {
                                name: '周口',
                                value: 67
                            },
                            {
                                name: '漯河',
                                value: 123
                            },
                            {
                                name: '郑州',
                                value: 55
                            },
                            {
                                name: '西峡',
                                value: 98
                            }
                        ]
                    }
                }
            },
        },
    }
</script>

<style scoped>

</style>