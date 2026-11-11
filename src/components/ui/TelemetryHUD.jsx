import React from 'react';
import {Activity,Layers,Cpu} from 'lucide-react';

export default function TelemetryHUD() {
  return <div className="telemetry" aria-label="Configurator status">
    <span><Activity size={13}/>INTERACTIVE</span><i/>
    <span><Layers size={13}/>3D SCENE</span><i/>
    <span><Cpu size={13}/>WEBGL</span>
  </div>;
}
