import React from 'react'

export default function Tag({children}) {
    return (
        <div style={tagStyle}>
            {children}
        </div>
    )
}


const tagStyle = {
    display: 'inline-flex',
    borderRadius: '5px',
    backgroundColor: '#212121',
    padding: '2px 5px',
    color: '#D9CAB3',
    marginRight: '6px',
    marginBottom: '6px',
}