/* 产生随机数 */
function randomString(len) {
    len = len || 32;
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let maxPos = $chars.length;
    let result = '';
    for (let i = 0; i < len; i++) {
        result += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}

function closeTab(tabKey) {
    const tabBar = window.$gfui.$app.nav.tabBar;
    tabBar.closeTab(tabKey);
}



export default {
    randomString,
    closeTab
}