import elecProcess from "./elec-process-field";
import monitorLeader from './monitor-leader-field'

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-elec-process-field', elecProcess);
        Gfui.grid('agnes-monitor-leader-field', monitorLeader);
    }
};

export default Loading;
