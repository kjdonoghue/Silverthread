import TextField from "@material-ui/core/TextField"
import SaveIcon from "@material-ui/icons/Save"
import Button from "@material-ui/core/Button"
import { useState } from "react"
import { connect } from "react-redux"
import { AddMaterial } from "../use-cases/addMaterial"
import Autocomplete from '@material-ui/lab/Autocomplete';
import './AddSales.css'
import './EditSales.css'
import './AddMaterialModal.css'

const AddMaterials = ({ closeModal, onAddMaterial }) => {
   // putting empty fields object into local state
   const [fields, setFields] = useState({})
   const materialCategories = [{title: 'Beads'}, {title: 'Chains'}, {title: 'Findings'}, {title: 'Raw Metal'}, {title: 'Stone'}, {title: 'Misc'}, ]

   const setField = (evt) =>
      setFields({
         ...fields,
         [evt.target.name]: evt.target.value,
      })

   const handleAddMaterial = (material) => {
      let unit_price = +material.unit_price

      if (!material.material_name) {
         alert('Please enter the material name')
      } else if (!material.unit_price || isNaN(unit_price)) {
         alert('Price Per Unit must be a number')
      } else if (!material.unit === null) {
         alert('Please enter a unit of measure')
      } else if (!material.category) {
         alert('Please enter a category')    
      } else {
         onAddMaterial(material)
         closeModal()
      }

   }

   return (
      <div className="addMaterialTBContainer">
         <h2>Add Material</h2>

         <div className="inputContainer">
            <TextField
               className="outlined"
               label="Material Name"
               name="material_name"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
               fullWidth
            />
         </div>

         <div className="inputContainer">
            <TextField
               className="outlined"
               label="Unit"
               name="unit"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
               fullWidth
            />
         </div>

         <div className="inputContainer">
            <TextField
               className="outlined"
               label="Price Per Unit"
               name="unit_price"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
               fullWidth
            />
         </div>

         <div className="inputContainer">       
            <Autocomplete
               id="free-solo-demo"               
               freeSolo
               options={materialCategories.map((option) => option.title)}
               renderInput={(params) => (
                  <TextField {...params} name='category' onSelect={setField}  label="Category" margin="normal" variant="outlined" fullWidth InputLabelProps={{shrink: true,}}/>
               )} handleProductInput
            />
         </div>

         <div className="inputContainer">
            <TextField
               className="outlined"
               label="Vendor"
               name="vendor"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
            />
         </div>

         <div className="inputContainer">
            <TextField
               className="outlined"
               label="Product ID"
               name="vendor_material_id"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
               fullWidth
            />
         </div>
         <div>
            <Button
               onClick={() => handleAddMaterial(fields)}
               variant="contained"
               color="secondary"
               size="large"
               className="addSalesBtn"
               startIcon={<SaveIcon />}
               fullWidth
            >
               Save
               </Button>

         </div>
      </div >
   )
}

// CRUD operation
const mapDispatchToProps = (dispatch) => ({
   onAddMaterial: AddMaterial(dispatch)
})

export default connect(null, mapDispatchToProps)(AddMaterials)
