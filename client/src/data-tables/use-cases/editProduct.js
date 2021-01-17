import { onEditProduct } from "../framework/actions"

// const url = 'https://safe-wildwood-02569.herokuapp.com/'
const url = 'http://localhost:8000/'

export const EditProductDetails = (dispatch) => async (
    editedProduct
) => {
    const response = await fetch(`${url}edit-product`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct)
    }) 

    //need to await on parsing response to javascript objects from json
    const result = await response.json()

    //double check what false result is
    if (result == null) {
        alert("There was an error creating your product")
    } else {
        //pass into our action as a payload and we dispatch it
        return dispatch(onEditProduct(result.updatedProduct))

    }        

}

export default EditProductDetails