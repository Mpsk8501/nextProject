import {FormControl, InputLabel, MenuItem, Select,} from '@material-ui/core'
import classes from './changeStyle.module.scss'
import React from 'react'

export default function SelectAuto({value, handleChange, itemList, label}) {
  return <FormControl className={classes.formControl} variant="outlined">
  <InputLabel id={`select${label}`}>{label}</InputLabel>
    <Select
      placeholder={label}
      labelId={`select${label}`}
      id={`select${label}`}
      value={value}
      onChange={handleChange}
      label={label}
    >
      {
        itemList.map((item, index)=>{
          //console.log(item)
          return <MenuItem key={index}  value={item}><span className={classes.span}>{item}</span></MenuItem>
        })
      }
  </Select>
  </FormControl>
}