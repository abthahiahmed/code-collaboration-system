const { createSlice } = require("@reduxjs/toolkit");

export const membersSlice = createSlice({
    name : "membersSlice",
    initialState : {
        value : [],
    },
    reducers : {
        setPeerId : (state, data) =>{
            state.value = data.payload;
            // console.log(data);
        },
    }
});

export default membersSlice.reducer;
export const {setMembers} = membersSlice.actions;