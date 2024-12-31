import { configureStore } from "@reduxjs/toolkit";
import editorSlice from "../slices/editor";
import filesSlice  from "../slices/files";
import membersSlice from "../slices/members";

const collabStore = configureStore({
    reducer : {
        editor : editorSlice,
        files : filesSlice,
        members : membersSlice,
    }
    
});

export default collabStore;