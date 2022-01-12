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
    backgroundColor: '#212121',
    padding: '2px 5px',
    color: '#e7e7e7',
    marginRight: '6px',
    marginBottom: '6px',
    position:'relative',
    cursor: 'pointer',
}