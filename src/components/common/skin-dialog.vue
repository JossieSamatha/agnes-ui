<template>
    <div>
        <ul class="skin-container">
            <li class="skin-item" :class="{'checked': skin === choosed}"
                v-for="skin in skinList" :key="skin"
                @click="chooseSkin(skin)"
            >
                <img :src="getImgPath(skin)" alt="skin" width="200px" height="140px">
                <em class="el-icon-circle-check" v-show="skin === choosed"></em>
            </li>
        </ul>
        <dialog-footer :on-save="onSave" ok-button-title="确认"></dialog-footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                skinList: [
                    'default-blue', 'sand-gold', 'watcher-black',
                    'city-dark', 'rabbit-pink', 'christmas-red'
                ],
                choosed: 'default-blue'
            }
        },
        methods: {
            onSave() {
                
            },

            chooseSkin(skin){
                this.choosed = skin;
                const bgDom = document.getElementsByClassName('gf-layout-default');
                if(bgDom && bgDom.length>0){
                    bgDom[0].style['background-image'] = 'url('+this.getImgPath(skin)+')';
                }
            },

            getImgPath(imgName){
                if(imgName){
                    let urlStr = require('../../assets/skin/'+imgName+'-nail.jpg')
                    return  urlStr;
                }
            },
        },
    }
</script>

<style scoped>
    .skin-container {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .skin-container .skin-item {
        position: relative;
        margin-bottom: 20px;
        border-radius: 6px;
        cursor: pointer;
        overflow: hidden;
    }

    .skin-container .skin-item .el-icon-circle-check{
        position: absolute;
        top: 10px;
        right: 10px;
        color: #fff;
        font-size: 17px;
    }

</style>