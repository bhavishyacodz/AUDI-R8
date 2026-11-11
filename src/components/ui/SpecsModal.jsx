import React,{useEffect,useRef} from 'react';
import {X,Check,Zap,Gauge} from 'lucide-react';
import {SPECS} from '../../constants/configuratorData';

export default function SpecsModal({isOpen,onClose,selectedPaint,selectedWheel}) {
  const closeRef=useRef(null);
  useEffect(()=>{
    if(!isOpen)return;
    const previous=document.activeElement;
    closeRef.current?.focus();
    const onKeyDown=(event)=>{if(event.key==='Escape'){event.preventDefault();onClose();}};
    window.addEventListener('keydown',onKeyDown);
    return ()=>{
      window.removeEventListener('keydown',onKeyDown);
      if(previous instanceof HTMLElement)previous.focus();
    };
  },[isOpen,onClose]);
  if(!isOpen)return null;
  const trapFocus=(event)=>{
    if(event.key!=='Tab')return;
    const items=event.currentTarget.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),[tabindex]:not([tabindex="-1"])');
    if(!items.length)return;
    const first=items[0],last=items[items.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  };
  return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}>
    <section className="spec-modal" role="dialog" aria-modal="true" aria-labelledby="spec-title" onKeyDown={trapFocus}>
      <button ref={closeRef} className="icon-button modal-close" onClick={onClose} aria-label="Close specifications"><X/></button>
      <p className="eyebrow">Audi Sport · Build specification</p>
      <h2 id="spec-title">{SPECS.model}</h2>
      <div className="spec-highlights">
        <article><Zap/><small>POWER OUTPUT</small><strong>{SPECS.power}</strong></article>
        <article><Gauge/><small>ACCELERATION</small><strong>{SPECS.acceleration}</strong></article>
      </div>
      <dl>{[['Exterior finish',selectedPaint.name+' ('+selectedPaint.code+')'],['Wheel finish',selectedWheel.name],['Powertrain',SPECS.engine],['Torque',SPECS.torque],['Top speed',SPECS.topSpeed],['Transmission',SPECS.transmission]].map(([a,b])=><div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl>
      <button className="primary-button full-button" onClick={onClose}><Check size={16}/> Done</button>
      <p className="fine-print">Specifications are illustrative and should be verified for the selected model year and market.</p>
    </section>
  </div>;
}
