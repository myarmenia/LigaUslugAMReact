import { createSlice } from '@reduxjs/toolkit';
const initialState ={
   data: {},
}
const FilterhWorks = createSlice({
   name: 'serchWorks',
   initialState,
   reducers:{
      setDataSearch(state, action){
         return {
            ...state,
            data: action.payload
         } 
      }
   }
})
export const {setDataSearch} = FilterhWorks.actions
export default FilterhWorks.reducer