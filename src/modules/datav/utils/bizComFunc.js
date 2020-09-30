function windowResize(that) {
    that.$nextTick(()=>{
        // 兼容IE
        if (document.createEvent) {
            const event = document.createEvent("HTMLEvents");
            event.initEvent("resize", true, true);
            window.dispatchEvent(event);
        } else if (document.createEventObject) {
            window.fireEvent("onresize");
        }
    });
}

export default {
    windowResize
}