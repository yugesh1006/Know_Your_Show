import React from 'react'
import "../css/header.css"

const Header = () => {
    return (
        <div>
            <span className="header" onClick={()=>window.scroll(0,0)}>
                Know Your Show 🎥
            </span>
        </div>
    )
}

export default Header
