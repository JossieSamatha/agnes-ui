<template>
    <dv-scroll-board :config="config" :style="{width: compOption.width+'px', height: compOption.height+'px'}" />
</template>

<script>
    export default {
        name: 'static-grid',
        props: {
            config: {
                type: Object,
                default: function () {
                    return {
                        header: ['任务', '场景'],
                        data: [
                            ['数据收发', 'TA批处理监控台'],
                            ['创新TA', 'TA批处理监控台'],
                            ['直销中心', 'TA批处理监控台'],
                            ['早班数据员', 'FA清算工作台'],
                            ['日间清算', 'TA批处理监控台'],
                            ['邮件检查', 'TA批处理监控台'],

                        ]
                    }
                }
            },
            compOption: {
                type: Object
            }
        },
    }
</script>