class GridApi {
    getGridConfig() {
        return {};
    }

    getUserState(gridNo) {
        const key = `grid-state.${gridNo}`;
        const state = localStorage.getItem(key);
        return {data: {confValue: state}};
    }

    saveUserState(gridNo, state) {
        const key = `grid-state.${gridNo}`;
        localStorage.setItem(key, state);
        //return request.post(`${this.apiBaseUrl}/user/save`, state);
    }
}

export default new GridApi();
