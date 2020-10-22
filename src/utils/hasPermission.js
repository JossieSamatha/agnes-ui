import store from '@hex/ares-ui/src/store/modules/user';

function hasPermission(resId) {
    const btnPermissionList = store.state.btnPermission || [];
    return btnPermissionList.includes(resId);
}

export default {
    hasPermission
}
