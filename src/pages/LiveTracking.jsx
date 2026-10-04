import React, { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, ZoomControl, LayersControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Truck, Pause, Play, Navigation, Zap, Battery, Fuel, Gauge, Clock, MapPin, Activity, ShieldAlert } from "lucide-react";

/* ---------------- PRO VEHICLE ICON (Cyber Glow) ---------------- */
const createVehicleIcon = (color, isSelected) => new L.DivIcon({
  className: "custom-v-icon",
  html: `<div style="transform: rotate(45deg); background: ${color}; padding: 10px; border-radius: 12px; border: 3px solid white; box-shadow: ${isSelected ? `0 0 30px ${color}` : `0 10px 20px rgba(0,0,0,0.4)`}; transition: all 0.3s ease;">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>
         </div>`,
  iconSize: [44, 44],
});

/* ---------------- SMART MAP CONTROLLER ---------------- */
function MapController({ position, enabled }) {
  const map = useMap();
  useEffect(() => {
    if (enabled && position) {
      map.flyTo(position, 15, { animate: true, duration: 1.5 });
    }
  }, [position, enabled, map]);
  return null;
}

/* ---------------- NCR LIVE FLEET DATA ---------------- */
const employeesData = [
  { id: 1, name: "Rahul Sharma", area: "Noida Sec 62", fuel: "82%", speed: "65 km/h", status: "Moving", color: "#6366f1", battery: "95%" },
  { id: 2, name: "Vikram Singh", area: "Cyber Hub, GGM", fuel: "45%", speed: "42 km/h", status: "Slow Traffic", color: "#f59e0b", battery: "70%" },
  { id: 3, name: "Ramesh Kumar", area: "Indirapuram, GZB", fuel: "12%", speed: "0 km/h", status: "Emergency/Low Fuel", color: "#ef4444", battery: "25%" },
];

/* ---------------- DYNAMIC NCR ROUTES ---------------- */
const routes = {
  "Rahul Sharma": [[28.625, 77.37], [28.628, 77.375], [28.632, 77.38], [28.635, 77.385], [28.640, 77.39]],
  "Vikram Singh": [[28.495, 77.09], [28.490, 77.085], [28.485, 77.08], [28.480, 77.075], [28.470, 77.06]],
  "Ramesh Kumar": [[28.635, 77.34], [28.638, 77.345], [28.642, 77.35], [28.648, 77.355], [28.652, 77.36]],
};

export default function LiveTracking() {
  const [selectedEmployee, setSelectedEmployee] = useState("Rahul Sharma");
  const [isRunning, setIsRunning] = useState(true);
  const [autoFollow, setAutoFollow] = useState(true);
  const [indices, setIndices] = useState({ "Rahul Sharma": 0, "Vikram Singh": 0, "Ramesh Kumar": 0 });
  const [telemetry, setTelemetry] = useState({ speed: 0, distance: 12.4 });

  // Movement Simulation Engine
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setIndices(prev => {
        const next = { ...prev };
        Object.keys(routes).forEach(name => {
          if (prev[name] < routes[name].length - 1) next[name] = prev[name] + 1;
        });
        setTelemetry(t => ({ speed: Math.floor(Math.random() * 20) + 40, distance: t.distance + 0.1 }));
        return next;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [isRunning]);

  const activeDriver = useMemo(() => employeesData.find(e => e.name === selectedEmployee), [selectedEmployee]);

  return (
    <div className="flex h-screen bg-[#020617] text-slate-100 font-sans overflow-hidden">
      
      {/* ---------------- LEFT SIDEBAR: ENTERPRISE INTEL ---------------- */}
      <aside className="w-[420px] flex flex-col bg-slate-900/80 backdrop-blur-3xl border-r border-white/10 z-50 shadow-2xl">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-4 bg-indigo-600 rounded-[1.5rem] shadow-xl shadow-indigo-500/40"><Truck size={28} className="text-white"/></div>
              <div>
                <h1 className="text-2xl font-black italic tracking-tighter uppercase leading-none">NCR<span className="text-indigo-500">OPS</span></h1>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Delhi-NCR Live Fleet</p>
              </div>
            </div>
            <Activity className="text-emerald-500 animate-pulse" size={20}/>
          </div>
          
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5 flex items-center justify-between shadow-inner">
             <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Fleet</span>
                <span className="text-xl font-black text-indigo-400">03 <small className="text-xs text-slate-500">Vehicles</small></span>
             </div>
             <div className="w-px h-8 bg-white/10"/>
             <div className="flex flex-col text-right">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Status</span>
                <span className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1"><ShieldAlert size={12}/> Secure</span>
             </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
          {employeesData.map((emp) => (
            <div 
              key={emp.id}
              onClick={() => { setSelectedEmployee(emp.name); setAutoFollow(true); }}
              className={`p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer group hover:scale-[1.02] ${
                selectedEmployee === emp.name ? 'bg-indigo-600 border-indigo-400 shadow-2xl' : 'bg-slate-800/40 border-white/5 hover:bg-slate-800'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                  <h3 className="font-black text-lg tracking-tight uppercase italic">{emp.name}</h3>
                  <div className="flex items-center gap-1 text-[10px] font-black text-indigo-300 uppercase tracking-widest mt-1">
                    <MapPin size={12}/> {emp.area}
                  </div>
                </div>
                <div className={`p-2 rounded-full border-2 border-white/20 ${emp.id === 3 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-black/30 p-2 rounded-xl text-center border border-white/5">
                  <Fuel size={12} className="mx-auto mb-1 text-amber-400"/>
                  <span className="text-[10px] font-black">{emp.fuel}</span>
                </div>
                <div className="bg-black/30 p-2 rounded-xl text-center border border-white/5">
                  <Battery size={12} className="mx-auto mb-1 text-emerald-400"/>
                  <span className="text-[10px] font-black">{emp.battery}</span>
                </div>
                <div className="bg-black/30 p-2 rounded-xl text-center border border-white/5">
                  <Gauge size={12} className="mx-auto mb-1 text-indigo-400"/>
                  <span className="text-[10px] font-black">{emp.speed}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* ---------------- MAIN VIEW: MAP HUB ---------------- */}
      <main className="flex-1 relative">
        
        {/* TOP HUD WIDGETS */}
        <div className="absolute top-8 left-8 right-8 z-[1000] flex justify-between items-start pointer-events-none">
          <div className="flex gap-4 pointer-events-auto">
            <div className="bg-slate-900/90 backdrop-blur-2xl border border-indigo-500/30 p-6 rounded-[2.5rem] flex items-center gap-10 shadow-2xl">
              <div className="flex flex-col text-center">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Live Speed</p>
                <p className="text-3xl font-black text-indigo-400 leading-none">{telemetry.speed} <small className="text-xs">km/h</small></p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="flex flex-col">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Trip Distance</p>
                <p className="text-lg font-black text-white uppercase italic tracking-tighter leading-none">{telemetry.distance.toFixed(1)} km</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pointer-events-auto">
            <button onClick={() => setIsRunning(!isRunning)} className="bg-slate-900/80 backdrop-blur-md border border-white/10 px-8 py-5 rounded-3xl flex items-center gap-3 font-black text-xs hover:bg-indigo-600 transition-all shadow-2xl active:scale-95">
              {isRunning ? <Pause size={20} fill="currentColor"/> : <Play size={20} fill="currentColor"/>} {isRunning ? "FREEZE" : "RESUME"}
            </button>
            <button onClick={() => setAutoFollow(!autoFollow)} className={`px-8 py-5 rounded-3xl flex items-center gap-3 font-black text-xs transition-all shadow-2xl active:scale-95 ${autoFollow ? 'bg-indigo-600 text-white shadow-indigo-500/50' : 'bg-slate-900 border border-white/10 text-slate-400'}`}>
              <Navigation size={20} className={autoFollow ? "animate-bounce" : ""}/> {autoFollow ? "FOLLOWING" : "MANUAL"}
            </button>
          </div>
        </div>

        {/* ---------------- MAP CONTAINER ---------------- */}
        <div className="h-full w-full">
          <MapContainer
            center={[28.6139, 77.209]}
            zoom={11}
            className="h-full w-full grayscale-[0.2] contrast-[1.1]"
            zoomControl={false}
          >
            <LayersControl position="bottomright">
              <LayersControl.BaseLayer checked name="NCR Dark (Night View)">
                <TileLayer url="https://{s}://{z}/{x}/{y}{r}.png" />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Landmark View (Satellite)">
                <TileLayer url="https://server.arcgisonline.com{z}/{y}/{x}" />
              </LayersControl.BaseLayer>
              <LayersControl.Overlay name="NCR Street Details">
                 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" opacity={0.3} />
              </LayersControl.Overlay>
              <LayersControl.Overlay checked name="Traffic Logic (Live Simulation)">
                 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" opacity={0.5} />
              </LayersControl.Overlay>
            </LayersControl>

            <ZoomControl position="bottomright" />
            <MapController position={routes[selectedEmployee][indices[selectedEmployee]]} enabled={autoFollow} />

            {Object.keys(routes).map(name => {
              const pos = routes[name][indices[name]];
              const emp = employeesData.find(e => e.name === name);
              const isSelected = selectedEmployee === name;

              return (
                <React.Fragment key={name}>
                  {/* Vehicle Marker */}
                  <Marker position={pos} icon={createVehicleIcon(emp.color, isSelected)}>
                    <Popup className="custom-popup">
                      <div className="p-4 text-slate-900 min-w-[200px]">
                        <div className="flex justify-between items-center mb-3">
                           <p className="text-xl font-black uppercase italic tracking-tighter text-indigo-700">{name}</p>
                           <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${emp.status === 'Moving' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{emp.status}</span>
                        </div>
                        <div className="space-y-2 border-t pt-3">
                           <div className="flex justify-between items-center text-[10px] uppercase font-black text-slate-500">
                              <span>Fuel Level</span>
                              <span className="text-amber-600">{emp.fuel}</span>
                           </div>
                           <div className="flex justify-between items-center text-[10px] uppercase font-black text-slate-500">
                              <span>Location</span>
                              <span className="text-indigo-600">{emp.area}</span>
                           </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                  {/* Route Polyline with Dynamic Weight */}
                  <Polyline 
                    positions={routes[name]} 
                    color={emp.color} 
                    weight={isSelected ? 10 : 3} 
                    opacity={isSelected ? 1 : 0.2}
                    dashArray={isSelected ? "" : "10, 10"}
                  />
                </React.Fragment>
              );
            })}
          </MapContainer>
        </div>
      </main>
    </div>
  );
}
