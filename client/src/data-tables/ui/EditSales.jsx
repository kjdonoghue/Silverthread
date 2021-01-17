import { useState } from 'react'
import { connect } from 'react-redux'
import { EditSale } from '../use-cases/editSale'
import './EditSales.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import SaveIcon from "@material-ui/icons/Save"
import Checkbox from '@material-ui/core/Checkbox'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


const EditSales = (props, { onEditSale }) => {
    const classes = useStyles();
    const [checked, setChecked] = useState(props.saleData.sold_PTM)
    const [originalSalesData, setOriginalSalesData] = useState(props.saleData)
    const [updatedSalesData, setUpdatedSalesData] = useState(props.saleData)
   
    const handleOnChange = (e) => {
        setUpdatedSalesData({
            ...updatedSalesData,
            [e.target.name]: e.target.value,            
        })
    }

    const handleDateChange = (date) => {
        setUpdatedSalesData({
            ...updatedSalesData,
            createdAt: date
        })
    };

    const handleCheckChange = (event) => {
        setChecked(event.target.checked);

        if (event.target.checked === true) {
            setUpdatedSalesData({
                ...updatedSalesData,
                'sold_PTM': true,
                'sold_to': 'Painted Tree Marketplace'
            })
        } else if (event.target.checked === false) {
            setUpdatedSalesData({
                ...updatedSalesData,
                'sold_PTM': false,
                'sold_to': ''
            })
        }
    };

    const handleOnClick = (data, originalData) => {
        //check to make sure these fields are numbers
        const quantity = +data.quantity
        const price_per_unit = +data.price_per_unit
        const total_price = +data.total_price
        const discount = +data.discount
        const shipping = +data.shipping

        if (data.product_name == '') {
            alert('Please enter the name of the product you sold')
        } else if (data.product_category == '') {
            alert('Please enter the category of the product you sold')
        } else if (quantity == '' || isNaN(quantity)) {
            alert('Please enter the quantity sold')
        } else if (price_per_unit == '' || isNaN(price_per_unit)) {
            alert('Please enter the price per unit in the format X.XX')
        } else if (total_price == '' || isNaN(total_price)) {
            alert('Please enter the total price in the format X.XX')
        } else if (data.sold_to == '') {
            alert('Please enter the name of the buyer')
        } else if (isNaN(discount)) {
            alert('Please enter a number in the discount field')            
        } else if (isNaN(shipping)) {
            alert("Please enter a number in the shipping field")
        } else {           
            let saleData = {updated: data, original: originalData}
            
            props.onEditSale(saleData)
            props.closeEditModal()
        }
    }

    return (
        <div className='editSalesContainer'>
            <h2>Edit Sale</h2>
            <div>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='product_number' value={updatedSalesData.product_number} onChange={handleOnChange} id="outlined-basic" label="Product Number" variant="outlined" />
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='product_name' value={updatedSalesData.product_name} onChange={handleOnChange} id="outlined-basic" label="Product Name" variant="outlined" />
                </form>
                <div>
                    <label> Sold At Painted Tree MarketPlace
                    <Checkbox
                            checked={checked}
                            onChange={handleCheckChange}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        /></label>
                </div>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='quantity' value={updatedSalesData.quantity} onChange={handleOnChange} id="outlined-basic" label="Quantity" variant="outlined" />
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='price_per_unit' value={updatedSalesData.price_per_unit} onChange={handleOnChange} id="outlined-basic" label="Price Per Unit" variant="outlined" />
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='discount' value={updatedSalesData.discount} onChange={handleOnChange} id="outlined-basic" label="Discount" variant="outlined" />
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='tax' value={updatedSalesData.tax} onChange={handleOnChange} id="outlined-basic" label="Total Tax Amount" variant="outlined" />
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='shipping' value={updatedSalesData.shipping} onChange={handleOnChange} id="outlined-basic" label="Shipping Amount" variant="outlined" />
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='total_price' value={updatedSalesData.total_price} onChange={handleOnChange} id="outlined-basic" label="Total Sales Price" variant="outlined" />
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='product_category' value={updatedSalesData.product_category} onChange={handleOnChange} id="outlined-basic" label="Category" variant="outlined" />
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='sold_to' value={updatedSalesData.sold_to} onChange={handleOnChange} id="outlined-basic" label="Purchased By" variant="outlined" />
                </form>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        name="createdAt"
                        id="date-picker-dialog"
                        label="Sales Date"
                        format="MM/dd/yyyy"
                        value={updatedSalesData.createdAt}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        fullWidth
                    />
                </MuiPickersUtilsProvider>
            </div>
            <div>
                <Button onClick={() => handleOnClick(updatedSalesData, originalSalesData)} fullWidth startIcon={<SaveIcon />} variant="contained" color="secondary">
                    Save
                </Button>

            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => ({
    onEditSale: EditSale(dispatch),

})
export default connect(null, mapDispatchToProps)(EditSales)