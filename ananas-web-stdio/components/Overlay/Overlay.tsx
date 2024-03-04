import React from 'react';
import './Overlay.scss';

type OverlayProps = { 
    isOpen: boolean;
    toggle: () => void;
}

function Overlay({ isOpen, toggle }: OverlayProps) {
    return isOpen ? <div className="overlay" onClick={toggle}></div> : null;
}

export default Overlay;
