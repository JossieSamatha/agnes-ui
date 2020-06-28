import Vue from 'vue';

const vue = Vue.prototype;

function showWarning(msg, title = "提示") {
    vue.$msgbox({
        type: "warning",
        title: title,
        message: msg
    }).catch(() => {
    });
}

function showError(reason, title = "错误") {
    const msg = reason.message ? reason.message : reason;

    vue.$msgbox({
        type: "error",
        title: title,
        message: msg
    }).catch(() => {
    });
}

function showInfo(msg, title = "消息") {
    vue.$msgbox({
        type: "info",
        title: title,
        message: msg
    }).catch(() => {
    });
}

function showNotify(msg, title = "", type = "success") {
    vue.$notify({
        type: type,
        title: title,
        message: msg
    });
}

function showMessage(msg, title = "", type = "success") {
    vue.$message({
        type: type,
        title: title,
        message: msg
    });
}

function alertMsg(msg, title) {
    vue.$alert(msg, title, {
        type: "warning"
    });
}

async function ask(msg) {
    try {
        await vue.$confirm(msg, "提示");
        return true;
    } catch {
        return false;
    }
}

export default {
    error: showError,
    msg: showMessage,
    warning: showWarning,
    info: showInfo,
    notify: showNotify,
    ask: ask,
    alert: alertMsg,
}
