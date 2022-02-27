import React, {useState} from 'react'
import {tagStyle} from './styles/Tag.module.scss'

export default function Tag({children, deleteSelf, editMode}) {
    return (
        <div className={tagStyle} onClick={deleteSelf}>
            {children}
            {editMode && ' ⨯'}
        </div>
    )
}


