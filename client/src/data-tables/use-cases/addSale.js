import { onAddSale } from "../framework/actions"
import { Popover } from '@material-ui/core';

// const url = 'https://safe-wildwood-02569.herokuapp.com/'
const url = 'http://localhost:8000/'

//This is a usecase for getting the list of sales
export const AddSale = (dispatch) => async (fields) => {     
   try {
     
      const response = await fetch(`${url}sales/addNewSale`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(fields),
      })

      //need to await on parsing response to javascript objects from json
      const success = await response.json()
  
      //pass into our action as a payload and we dispatch it
      return dispatch(onAddSale(success))
   } catch (e) {
      console.log("CAUGHT ERROR IN PROMISE")
   }
}

export default AddSale
