const { createSlice } = require("@reduxjs/toolkit");

export const editorSlice = createSlice({
    name : "editorSlice",
    initialState : {
        value : '',
        scroll : {x : 0, y : 0},
        language : '',
        activeFile : -1,
    },
    reducers : {
        setContent : (state, data) =>{
            state.value = data.payload;
            // console.log(data);
        },
        setScroll : (state, data) =>{
            state.scroll = data.payload;
            // console.log(data);
        },
        setLanguage : (state, data) => {
            state.language = data.payload;
            console.log(data);
        },
        setActiveFile : (state, data) =>{
            state.activeFile = data.payload;
            console.log('Inside of slice : ', data);
        }
    }
});

export default editorSlice.reducer;
export const {setContent, setScroll, setLanguage, setActiveFile} = editorSlice.actions;