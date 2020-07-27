import ServiceRespConf from "./service-resp-conf";

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-service-conf-list', ServiceRespConf);
    }
};

export default Loading;
