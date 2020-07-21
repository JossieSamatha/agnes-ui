function showTab(url, code, name) {
    let tabObj = {
        id: code,
        title: name,
        actionUrl: url,
        ifIframe: true
    };
    let tabView = Object.assign({args: {data: tabObj}}, tabObj, {id: code || ''});
    let tab = this.$gfui.$app.nav.showView(tabView);

    return tab;
}

function getCurrentTab() {
    let tabBar = this.windowThis.$gfui.$app.nav.tabBar;
    let tabKey = tabBar.currentTabKey;
    return {
        close: () => {
            tabBar.closeTab(tabKey);
        }
    }
}

window.showTab = showTab;

window.App = {
    $tabBar: {
        windowThis: window,
        currentTabKey: '',
        getCurrentTab: getCurrentTab
    }
};

