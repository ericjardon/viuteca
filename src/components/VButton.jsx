import React from 'react'
import {vbutton, primaryBtn, secondaryBtn} from './styles/VButton.module.scss'

export default function VButton({color, className, children}) {
  let colorStyle = primaryBtn;

  if (!color || color != 'primary') {
    colorStyle = secondaryBtn;
  }

  return (
    <button className={`${vbutton} ${colorStyle} ${className}`}>{children}</button>
  )
}
