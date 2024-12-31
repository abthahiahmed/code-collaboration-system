const { createSlice } = require("@reduxjs/toolkit");

export const filesSlice = createSlice({
    name : "filesSlice",
    initialState : {
        value : [],
    },
    reducers : {
        setFiles : (state, data) =>{
            state.value = data.payload;
            // console.log(data);
        },
        setFileContent : (state, data)=>{
            state.value[data.payload.index].content = data.payload.code;
        }
    }
});

export default filesSlice.reducer;
export const {setFiles, setFileContent} = filesSlice.actions;