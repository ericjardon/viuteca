import React, {useState} from 'react'

export default function Tag({children, deleteSelf, editMode}) {
    return (
        <div style={tagStyle} onClick={deleteSelf}>
            {children}
            {editMode && ' ⨯'}
        </div>
    )
}


const tagStyle = {
    display: 'inline-flex',
    borderRadius: '5px',
    backgroundColor: '#f45d48',// $coolcoral;
    padding: '2px 5px',
    color: '#fffffe',  // $white
    marginRight: '6px',
    marginBottom: '6px',
    position:'relative',
    cursor: 'pointer',
}