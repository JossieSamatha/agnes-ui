<template>
    <div ref="spig" class="spig" :class="ifShowInput ? '' : 'messageType'">
        <div ref="littleW" class="little-W"
             @dblclick="ifShowInput = !ifShowInput"
             :style="{'background-image': robotImg}"
        >
        </div>
        <slot :ifShowInput="ifShowInput"></slot>
        <transition name="slide-fade interval-fade">
            <div ref="message" class="message" v-show="!ifShowInput">{{message}}</div>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: '...',
                userName: '',
                ana: [
                    '最酷的，好像都是最固执的坚持',
                    '不论还有没有力量，我们多少撞一撞南墙。',
                    '舞台这么大，走到中间需要一点时间。',
                    '消灭生活中的谣言或许天真，但总要有人为此坚持。',
                    '不要计算时间，时间没有标准答案。',
                    '愿你出走半生，归来仍是少年。',
                    '南来北往，不辜负生活，不迷失方向。',
                    '走过很多弯路，也好过原地踏步。',
                    '一旦决定出发，最困难的就已结束。',
                    '总有一首单曲循环，陪你把孤单变成勇敢。',
                    '学会告别，才能和更好的相逢。',
                    '总有美好等待着你来签收，不管你是否寄出期待。',
                    '好戏还在后面。',
                    '你在经历变化，也在创造变化。每次付出，都有意义。',
                    '有些问题能搜到答案，有些问题时间给你答案。',
                    '总有一天，把生活淘成我想要的样子。',
                    '每一刻，都是理想生活。',
                    '再小的兴趣，都不孤单。',
                    '这座城，永远有你未曾见过的风景。',
                    '不要只顾匆匆赶路，停下来好好感悟。',
                    '时间不复，唯爱与美食不可辜负。',
                    '世界再嘈杂，也要听见内心的声音。',
                    '一眼都看不到你，怎么可能看的上你。',
                    '刷过一百部剧，就像经历了一百种人生。',
                    '我们终将改变潮水的方向。',
                    '你排位上了8星，别人英语过了8级。',
                    '每个人，都是自己的创业者。',
                    '人生不止眼前的枸杞，还有习惯性不放弃。',
                    '我们读书，因为我们孤单，我们读书，然后就不孤单。',
                    '不犬儒，不媚俗。',
                    '越是了解世界更多，越是期待自己更加不同。',
                    '向未来生长吧，世界还需要我们不断提问。',
                    '从这里看透这个世界，再去改变它。',
                    '用理性和洞见，去叩问这个时代。',
                    'playing as a boy, living as a man.',
                    '青春无关年华，它是你不认怂的每时每刻。',
                    '生活中更大的挫折是：我本可以。',
                    '给自己断了后路，人生就处处是路。',
                    '以前是有贼心，没贼胆，现在的问题是贼去哪了？',
                    '总觉一切尚早，未来很远，转眼已是年华虚度。',
                    '人的一生，是他所抓住的时间。',
                    '听过很多人指点江山，才明白所有的成绩都始于默默搬砖。',
                    '加油！打工人！'
                ],
                ifShowInput: false,
                bizDate: window.bizDate,
                anaInterval: null,
                robotImg: ''
            }
        },
        mounted() {
            this.userName = this.$app.session.data.user.userName;
            this.init();
            this.robotImg = this.getRobotImg('wisdom_happy');
            this.robotChange();
        },

        methods: {
            init() {
                const nowHour = (new Date()).getHours();
                switch (true) {
                    case (nowHour > 0 && nowHour <= 7):
                        this.message = `最酷的，好像都是最固执的坚持。${this.userName}辛苦了！`;
                        break;
                    case (nowHour > 7 && nowHour <= 10):
                        this.message = `太阳当空照，花儿对我笑，小鸟说，${this.userName}早！早！早！`;
                        break;
                    case ((nowHour > 10 && nowHour <= 14)):
                        this.message = `${this.userName}！中午好！`;
                        break;
                    case ((nowHour > 14 && nowHour <= 18)):
                        this.message = `人的一生，是他所抓住的时间。${this.userName}！下午好！`;
                        break;
                    default:
                        this.message = `${this.userName}，披星戴月，晚班有我的陪伴！`
                }
            },

            getRobotImg(img) {
                let urlStr = require('../../../assets/img/' + img + '.png');
                return 'url(' + urlStr + ')';
            },

            robotChange() {
                const imgName = ['wisdom_giggle', 'wisdom_happy', 'wisdom_laugh', 'wisdom_smile'];
                this.robotInterval = setInterval(() => {
                    this.robotImg = this.getRobotImg(imgName[Math.floor((Math.random() * imgName.length))]);
                }, 30000);
            },

            messageChange() {
                this.anaInterval = setInterval(() => {
                    this.message = this.ana[Math.floor((Math.random() * this.ana.length))];
                }, 30000);
            }
        },
        beforeDestroy: function () {
            if (this.anaInterval) {
                clearInterval(this.anaInterval);
            }

            if (this.robotInterval) {
                clearInterval(this.robotInterval);
            }
        },
    }
</script>

<style scoped>
    .spig {
        position: relative;
        display: flex;
        align-items: center;
        width: 80%;
        padding-left: 60px;
        margin-right: 10px;
    }

    .spig .message {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        max-height: 46px;
        color: #191919;
        border: 1px solid #eeeeee;
        border-left: none;
        background: #ddd;
        border-radius: 5px;
        padding: 5px 10px;
        z-index: 10000;
        box-shadow: 0 0 15px #eeeeee;
        outline: none;
        overflow: hidden;
    }

    .little-W {
        position: absolute;
        left: 0;
        top: calc(50% - 25px);
        flex: none;
        width: 50px;
        height: 50px;
        cursor: pointer;
        background-repeat: no-repeat;
        background-size: contain;
        transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        -webkit-animation: jump 1s infinite;
    }

    @-webkit-keyframes jump {
        0% {
            top: calc(50% - 22px);
        }

        50% {
            top: calc(50% - 30px);
        }

        100% {
            top: calc(50% - 22px);
        }
    }

    .slide-fade-enter-active {
        transition: all 1s ease;
    }

    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(380px);
        opacity: 0;
    }

</style>