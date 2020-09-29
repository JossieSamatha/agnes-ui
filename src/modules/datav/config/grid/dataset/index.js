import grid_api_topset_item from "./grid-api-topset-item.js";
import grid_dataset_item from "./grid-dataset-item.js";
import grid_excel from "./grid-excel.js";
import grid_table_name from "./grid-table-name.js";
import grid_view_name from "./grid-view-name.js";
import grid_dataset_db from "./grid-dataset-db.js"
import grid_dataset_file from "./grid-dataset-file.js"
import grid_dataset_ext from "./grid-dataset-ext.js"

const Loading = {
    load: function(Gfui) {
        Gfui.grid("grid-dataset-item", grid_dataset_item);
        Gfui.grid("grid-api-topset-item", grid_api_topset_item);
        Gfui.grid("grid-excel", grid_excel);
        Gfui.grid("grid-table-name", grid_table_name);
        Gfui.grid("grid-view-name", grid_view_name);
        Gfui.grid("grid-dataset-db", grid_dataset_db);
        Gfui.grid("grid-dataset-file", grid_dataset_file);
        Gfui.grid("grid-dataset-ext", grid_dataset_ext);
    }
};

export default Loading;


