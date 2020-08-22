
import fileAnaly from "./file-analy-config/index"
import fileScan from "./file-scan-config/index"
import fileScanList from "./file-scan-list/index"
import fileMove from "./file-move-config/index"
import fileMoveList from "./file-move-list/index"

const Loading = {
    load: function (Gfui) {
        Gfui.componentView('dataservice.fileanaly.config', fileAnaly, {title: '文件解析配置'});
        Gfui.componentView('dataservice.filescan.config', fileScan, {title: '文件扫描配置'});
        Gfui.componentView('dataservice.filescan.list', fileScanList, {title: '文件扫描记录'});
        Gfui.componentView('dataservice.filemove.config', fileMove, {title: '文件搬运配置'});
        Gfui.componentView('dataservice.filemove.list', fileMoveList, {title: '文件搬运记录'});
    }
};

export default Loading;
