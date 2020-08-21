import {
    ENABLE_ACTIVE,
    DISABLE_ACTIVE,
    ENABLE_ASPECT,
    DISABLE_ASPECT,
    ENABLE_DRAGGABLE,
    DISABLE_DRAGGABLE,
    ENABLE_RESIZABLE,
    DISABLE_RESIZABLE,
    ENABLE_PARENT_LIMITATION,
    DISABLE_PARENT_LIMITATION,
    ENABLE_SNAP_TO_GRID,
    DISABLE_SNAP_TO_GRID,
    CHANGE_ZINDEX,
    ENABLE_BOTH_AXIS,
    ENABLE_X_AXIS,
    ENABLE_Y_AXIS,
    ENABLE_NONE_AXIS,
    CHANGE_HEIGHT,
    CHANGE_LEFT,
    CHANGE_MINH,
    CHANGE_MINW,
    CHANGE_TOP,
    CHANGE_WIDTH
} from './mutation-types';

export default {
    [ENABLE_ACTIVE](state, id) {
        state.datavComps[id].active = true;
    },
    [DISABLE_ACTIVE](state, id) {
        state.datavComps[id].active = false;
    },

    [ENABLE_ASPECT](state, id) {
        state.datavComps[id].aspectRatio = true;
    },
    [DISABLE_ASPECT](state, id) {
        state.datavComps[id].aspectRatio = false;
    },

    [ENABLE_DRAGGABLE](state, id) {
        state.datavComps[id].draggable = true;
    },
    [DISABLE_DRAGGABLE](state, id) {
        state.datavComps[id].draggable = false;
    },

    [ENABLE_RESIZABLE](state, id) {
        state.datavComps[id].resizable = true;
    },
    [DISABLE_RESIZABLE](state, id) {
        state.datavComps[id].resizable = false;
    },

    [ENABLE_SNAP_TO_GRID](state, id) {
        state.datavComps[id].snapToGrid = true;
    },
    [DISABLE_SNAP_TO_GRID](state, id) {
        state.datavComps[id].snapToGrid = false;
    },

    [ENABLE_BOTH_AXIS](state, id) {
        state.datavComps[id].axis = 'both';
    },
    [ENABLE_NONE_AXIS](state, id) {
        state.datavComps[id].axis = 'none';
    },
    [ENABLE_X_AXIS](state, id) {
        state.datavComps[id].axis = 'x';
    },
    [ENABLE_Y_AXIS](state, id) {
        state.datavComps[id].axis = 'y';
    },

    [ENABLE_PARENT_LIMITATION](state, id) {
        state.datavComps[id].parentLim = true;
    },
    [DISABLE_PARENT_LIMITATION](state, id) {
        state.datavComps[id].parentLim = false;
    },

    [CHANGE_ZINDEX](state, payload) {
        state.datavComps[payload.id].zIndex = payload.zIndex;
    },

    [CHANGE_HEIGHT](state, payload) {
        state.datavComps[payload.id].height = payload.height;
    },

    [CHANGE_WIDTH](state, payload) {
        state.datavComps[payload.id].width = payload.width;
    },

    [CHANGE_TOP](state, payload) {
        state.datavComps[payload.id].top = payload.top;
    },

    [CHANGE_LEFT](state, payload) {
        state.datavComps[payload.id].left = payload.left;
    },

    [CHANGE_MINH](state, payload) {

        state.datavComps[payload.id].minh = payload.minh;
    },

    [CHANGE_MINW](state, payload) {
        state.datavComps[payload.id].minw = payload.minw;
    }
};