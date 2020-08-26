function showTab(url, code, name) {
    let tabObj;
    let tabView;
    if(typeof url == "string"){
        tabObj = {
            id: code,
            title: name,
            actionUrl: url,
            ifIframe: true
        };
        tabView = Object.assign({args: {data: tabObj}}, tabObj, {id: code || ''});
    }else{
        tabObj = this.$app.views.getView(url.viewId);
        tabView = Object.assign({args: {data: url}}, tabObj, {id: code || ''});
    }
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

