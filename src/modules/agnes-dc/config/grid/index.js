
import FileAnaly from "./file-analy-config/index"
import FileScan from "./file-scan-config"
import FileMove from "./file-move-config"
import FileMoveList from "./file-move-list"
import FileScanList from "./file-scan-list"

const Loading = {
    load: function (Gfui) {
        Gfui.use(FileScan);
        Gfui.use(FileMove);
        Gfui.use(FileAnaly);
        Gfui.use(FileScanList);
        Gfui.use(FileMoveList);
    }
};

export default Loading;
