import {onEditMaterial} from "../framework/actions"

// const url = 'https://safe-wildwood-02569.herokuapp.com/'
const url = 'http://localhost:8000/'

//This is a usecase for getting the list of sales
export const EditMaterial = (dispatch) => async(
    materialEdit,
) => {

    // first we call a fetch request to update our backend because the backend is the source of truth for our global state
    const response = await fetch(`${url}edit-material`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(materialEdit)
    })
    //need to await on parsing response to javascript objects from json
    const success = await response.json()
    
    //pass into our action as a payload and we dispatch it
    return dispatch(onEditMaterial(success))
}

export default EditMaterial