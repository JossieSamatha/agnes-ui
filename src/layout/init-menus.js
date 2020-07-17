function initMenus(menus) {
    AllMenus.allMenu.children = [];
    AllMenus.markMenu = [];
    var index = 0;
    menus.forEach(colnums => {
        var hander = {
            menuid: index++,
            menucode: colnums.code,
            menuname: colnums.title,
            children: []
        }
        if(colnums.columns){
            colnums.columns.forEach(menuss=>{
                var colnum = {
                    menuid: index++,
                    menucode: menuss.code,
                    menuname: menuss.title,
                    children: []
                }
                if(menuss.menus){
                    menuss.menus.forEach(data=>{
                        colnum.children.push({
                            menuid: index++,
                            menucode: data.code,
                            menuname: data.title,
                            actionUrl:data.actionUrl
                        })
                    })
                }
                hander.children.push(colnum)
            })
        }
        AllMenus.allMenu.children.push(hander);
    })

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