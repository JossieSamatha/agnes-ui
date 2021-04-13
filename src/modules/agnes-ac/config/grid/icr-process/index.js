import icrProcess from "./icr-process-field";
import monitorLeader from './monitor-leader-field'

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-icr-process-field', icrProcess);
        Gfui.grid('agnes-monitor-leader-field', monitorLeader);
    }
};

export default Loading;
