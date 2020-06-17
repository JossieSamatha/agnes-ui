function initMenus(menus) {
    var index = 0;
    var hander = {
        menuid: index++,
        menucode: "gf.manage",
        menuname: "系统管理",
        children: []
    }
    menus.forEach(data => {
        var menu = {
            menuid: index++,
            menucode: data.code,
            menuname: data.title,
            children: []
        }
        if(data.columns !== null){
            data.columns[0].menus.forEach(column => {
                menu.children.push({
                    menuid: index++,
                    menucode: column.code,
                    menuname: column.title,
                    view: column.view
                })
            })
        }
        if (data.code === "gf.system.manage" || data.code === "gf.dev.manage") {
            hander.children.push(menu);
        }else {
            AllMenus.allMenu.children.push(menu);
        }
    })
    AllMenus.allMenu.children.push(hander);
    return AllMenus
}

var AllMenus = {
    allMenu: {
        menuid: "root",
        children: []
    },
    markMenu: [],
}

export default {
    initMenus
}