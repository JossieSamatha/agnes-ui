export default {

    initStateData: (state, boardContent)=>{
        Object.keys(state).forEach((key)=>{
            state[key] = boardContent[key]
        })
    },

    // 配置当前选中组件数据
    setActiveComp: (state, compInfo)=> {
        Object.keys(state).forEach((key) => {
            state[key] = compInfo[key];
        });
    },

    // 重置组件配置数据
    resetCompOption: (state)=>{
        state.datavComps = [
            {
                compId: '',
                compPosition: {
                    width: 200,
                    height: 150,
                    positionX: 0,
                    positionY: 0,
                    draggable: true,
                    resizable: true,
                    axis: 'both',
                    aspectRatio: false,
                    zIndex: 0,
                },
                compOption: {
                    type: "",
                    icon: "",
                    compName: "",
                    label: "",
                    componentMeta: {}
                },
                active: false,
            }
        ]
    }
};