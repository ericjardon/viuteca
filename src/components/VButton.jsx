import React from 'react'
import {vbutton, primaryBtn, secondaryBtn, tertiaryBtn, blackBtn} from './styles/VButton.module.scss'

export default function VButton({color, className, children, onClick}) {
  let colorStyle = primaryBtn;

  if (color && color != 'primary') {
    if (color == 'secondary') {
      colorStyle = secondaryBtn;
    } else if (color == 'tertiary') {
      colorStyle = tertiaryBtn;
    } else {
      colorStyle = blackBtn;
    }
  }
  
  if (onClick) {
    return (
      <button onClick={onClick} className={`${vbutton} ${colorStyle} ${className}`}>{children}</button>
    )
  }
  else {
    return (
      <button className={`${vbutton} ${colorStyle} ${className}`}>{children}</button>
    )
  }

}
