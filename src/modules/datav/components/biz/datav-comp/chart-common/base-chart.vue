<template>
    <div :style="canvasStyle"></div>
</template>

<script>
    import {getType, debounce} from 'utils-lite'
    export default {
        props: {
            width: {type: String, default: 'auto'},
            height: {type: String, default: '400px'},
            title: {},
            legend: [Object, Array],
            grid: {type: [Object, Array]},
            xAxis: [Object, Array],
            yAxis: [Object, Array],
            tooltip: Object,
            data: {type: [Object, Array], default() {return {}}},
            series: [Object, Array],
            colors: {type: Array},
            setOptionOpts: {type: [Boolean, Object], default: true},
            theme: Object,
            themeName: String,
            tooltipFormatter: {type: Function},
            resizeable: {type: Boolean, default: true},
            resizeDelay: {type: Number, default: 200},
            changeDelay: {type: Number, default: 0},
            widthChangeDelay: {type: Number, default: 300},
            cancelResizeCheck: Boolean,
        },
        data: function () {
            return {
                myChart: {},
            }
        },
        watch: {
            data: {
                deep: true,
                // handler (v) { if (v) { this.changeHandler() } }
            },
            width: 'nextTickResize',
            height: 'nextTickResize',
            resizeable: 'resizeableHandler'
        },
        computed: {
            canvasStyle() {
                return {
                    width: this.width,
                    height: this.height,
                    position: 'relative'
                }
            },

            chartColor() {
                return this.colors || (this.theme && this.theme.color)
            }
        },
        methods: {
            dataHandler () {
                // if (!this.chartHandler) return
                // let data = this.data
                // const { columns = [], rows = [] } = data
                // const extra = {
                //     tooltipVisible: this.tooltipVisible,
                //     legendVisible: this.legendVisible,
                //     echarts: this.echarts,
                //     color: this.chartColor,
                //     tooltipFormatter: this.tooltipFormatter,
                //     _once: this._once
                // }
                // if (this.beforeConfig) data = this.beforeConfig(data)
                //
                // let options = this.chartHandler(columns, rows, this.settings, extra)
                // if (options) {
                //     if (typeof options.then === 'function') {
                //         options.then(this.optionsHandler)
                //     } else {
                //         this.optionsHandler(options)
                //     }
                // }
            },
            nextTickResize () {
                this.$nextTick(this.resize);
            },

            resize () {
                if (!this.cancelResizeCheck) {
                    if (this.$el &&
                        this.$el.clientWidth &&
                        this.$el.clientHeight) {
                        this.echartsResize()
                    }
                } else {
                    this.echartsResize()
                }
            },

            echartsResize () {
                this.myChart && this.myChart.resize()
            },

            resizeableHandler (resizeable) {
                if (resizeable && !this._once.onresize) this.addResizeListener()
                if (!resizeable && this._once.onresize) this.removeResizeListener()
            },

            addResizeListener () {
                window.addEventListener('resize', this.resizeHandler)
                this._once.onresize = true
            },

            removeResizeListener () {
                window.removeEventListener('resize', this.resizeHandler)
                this._once.onresize = false
            },

            createEventProxy () {
                // 只要用户使用 on 方法绑定的事件都做一层代理，
                // 是否真正执行相应的事件方法取决于该方法是否仍然存在 events 中
                // 实现 events 的动态响应
                const self = this
                const keys = Object.keys(this.events || {})
                keys.length && keys.forEach(ev => {
                    if (this.registeredEvents.indexOf(ev) === -1) {
                        this.registeredEvents.push(ev)
                        this.echarts.on(ev, (function (ev) {
                            return function (...args) {
                                if (ev in self.events) {
                                    self.events[ev].apply(null, args)
                                }
                            }
                        })(ev))
                    }
                })
            },

            addWatchToProps () {
                const watchedVariable = this._watchers.map(watcher => watcher.expression)
                Object.keys(this.$props).forEach(prop => {
                    if (!~watchedVariable.indexOf(prop) && !~STATIC_PROPS.indexOf(prop)) {
                        const opts = {}
                        if (~['[object Object]', '[object Array]'].indexOf(getType(this.$props[prop]))) {
                            opts.deep = true
                        }
                        this.$watch(prop, () => {
                            this.changeHandler()
                        }, opts)
                    }
                })
            },

            init () {
                if (this.myChart) return
                const themeName = this.themeName || this.theme;
                this.myChart = this.echarts.init(this.$el, themeName)
                if (this.data) this.changeHandler()
                this.createEventProxy()
                if (this.resizeable) this.addResizeListener()
            },
        },

        created () {
            this.myChart = null
            this.registeredEvents = []
            this._once = {}
            this._store = {}
            this.resizeHandler = debounce(this.resize, this.resizeDelay)
            this.changeHandler = debounce(this.dataHandler, this.changeDelay)
            this.addWatchToProps()
        },

        mounted () {
            this.init();
        },

        beforeDestroy () {
            this.clean()
        },
    }
</script>