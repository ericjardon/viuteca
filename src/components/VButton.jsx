import React, { useState } from 'react'
import { vbutton, primaryBtn, secondaryBtn, tertiaryBtn, blackBtn } from './styles/VButton.module.scss'

export default function VButton({ color, className, children, onClick, border }) {
  let colorStyle = primaryBtn;
  let customStyle = null;
  let hoverStyle = null;

  const [hover, setHover] = useState(true);

  if (color && color != 'primary') {
    if (color == 'secondary') {
      colorStyle = secondaryBtn;
    } else if (color == 'tertiary') {
      colorStyle = tertiaryBtn;
    } else if (color == 'black') {
      colorStyle = blackBtn;
    } else {
      colorStyle = ''
      if (hover) {
        customStyle = {
          backgroundColor: '#' + color,
          borderColor: '#' + (border || color),
        };
      } else {
        customStyle = {
          backgroundColor: '#' + LightenDarkenColor(color, -20),
          borderColor: '#' + LightenDarkenColor((border || color), -20),
        }
      }

    }
  }

  if (onClick) {
    return (customStyle ?

      <button onClick={onClick}
        className={`${vbutton} ${className}`}
        style={customStyle}
        onMouseEnter={() => setHover(false)}
        onMouseLeave={() => setHover(true)}
      >
        {children}
      </button>
      :
      <button onClick={onClick}
        className={`${vbutton} ${colorStyle} ${className}`}>
        {children}
      </button>
    )
  }
  else {
    return (customStyle ?
      <button className={`${vbutton} ${className}`}
        style={customStyle}
        onMouseEnter={() => setHover(false)}
        onMouseLeave={() => setHover(true)}
      >
        {children}
      </button>
      :
      <button className={`${vbutton} ${colorStyle} ${className}`}
      >
        {children}
      </button>
    )
  }

}

const LightenDarkenColor = (col, amt) => {
  let num = parseInt(col, 16);
  let r = (num >> 16) + amt;
  let b = ((num >> 8) & 0x00FF) + amt;
  let g = (num & 0x0000FF) + amt;
  let newColor = g | (b << 8) | (r << 16);
  return newColor.toString(16);
}
