export default {
    getActive: state => {
        for (let i = 0, l = state.datavComps.length; i < l; i++) {
            let rect = state.datavComps[i];

            if (rect.active) {
                return i;
            }
        }
        return null;
    }
}