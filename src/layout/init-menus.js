function initMenus(menus) {
    let AllMenus = {
        allMenu: {
            menuid: "root",
            children: []
        },
        markMenu: [],
    }
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
var index = 0;

export default {
    initMenus
}