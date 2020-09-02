import lodash from 'lodash';
import Service from "../service";


export default class DictService extends Service {
    constructor(app) {
        super(app);
        this.dictItemMap = new Map();
        this.dictMap = {};
        this.dictOptions = app.options.dictOpts || {};
    }

    getDictItems(dictType) {
        return this.dictMap[dictType];
    }

    getDictItem(dictType, dictId) {
        const catchItem = this.dictItemMap.get(dictType);
        if (!catchItem) {
            return {dictId: dictId, dictName: dictId};
        }
        return catchItem.mapping[dictId];
    }

    getDictName(dictType, dictId) {
        const foundItem = this.getDictItem(dictType, dictId);
        if (foundItem === void 0) {
            return dictId;
        } else {
            return foundItem[this.dictOptions.nameField];
        }
    }

    init(dictMap, options) {
        lodash.extend(this.dictOptions, options);
        this.dictItemMap.clear();
        const idField = this.dictOptions.idField || 'dictId';
        const nameField = this.dictOptions.nameField || 'dictName';
        lodash.forIn(dictMap, (dictItems, key) => {
            const catchItem = {sourceItems: dictItems, mapping: {}};
            dictItems.forEach(x => {
                const dictId = x[idField];
                if (!dictId) {
                    return;
                }
                x.dictId = dictId;
                x.dictName = x[nameField];
                catchItem.mapping[dictId] = x;
            });
            this.dictItemMap.set(key, catchItem);
        });
        this.dictMap = dictMap;
    }
}
