export function toColumn(menus) {
    let result = new Array();
    //一级菜单
    for(let i=0;i<menus.length;i++) {
        let first = menus[i];
        let row = {code:first.resCode, title:first.resName,actionUrl:first.actionUrl, icon: first.resIcon};
        if(!first.children || first.children.length==0){
            row['view'] = first.resCode;

        }else{
            //二级菜单 columns
            let columns = new Array();
            let defaultColumns = {code: first.resCode, title:first.resName, menus:new Array()};
            for(let j=0;j<first.children.length;j++){
                let second = first.children[j];
                if(!second.children || second.children.length==0){
                    defaultColumns.menus.push({
                        code: second.resCode,
                        title: second.resName,
                        view: second.resCode,
                        actionUrl: second.actionUrl,
                        icon: second.resIcon
                    });
                    continue;

                }

                let column = {code:second.resCode, title:second.resName, menus:new Array(),actionUrl:second.actionUrl, icon: second.resIcon}
                //三级菜单 menus
                for(let k=0;k<second.children.length;k++) {
                    let third = second.children[k];
                    column.menus.push({code:third.resCode, title:third.resName, view:third.resCode,actionUrl:third.actionUrl, icon: third.resIcon});
                }
                columns.push(column);
            }

            if(defaultColumns.menus.length>0) {
                columns.push(defaultColumns);
            }

            row['columns'] = columns;
        }

        result.push(row);
    }

    return result;
}