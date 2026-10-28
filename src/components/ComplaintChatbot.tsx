"use client"
import {useState, useRef, useEffect} from "react"

export default function ComplaintChatbot(){
const [open,setOpen]=useState(false)
const [msgs,setMsgs]=useState([{from:"bot", text:"Namaste! I am AICTE Sahayak. Ask PG-104, Fee, Trust, Ghost"}])
const [input,setInput]=useState("")
const [listening,setListening]=useState(false)
const endRef=useRef<HTMLDivElement>(null)

useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"})},[msgs])

const getReply=(q:string)=>{
const l=q.toLowerCase()
if(l.includes("104")||l.includes("pg")) return "🔴 PG-104 Status: Ghost 87% match with RB-208 | Same Door No.10 Koramangala | Same Trust TR-56001 ABC Trust | Pincode 560034 | Name 82% similar | Health 35/100 RED | Overdue 12 days | Fee excess ₹40k"
if(l.includes("fee")||l.includes("1.2")||l.includes("80k")) return "💰 Fee Anomaly: Approved ₹80k, Charged ₹1.2L = 50% Excess ₹40k | Receipt No.1234 | OCR 94% | Student Rajesh | ABC College | Status FLAGGED"
if(l.includes("trust")||l.includes("abc")) return "🏢 Trust TR-56001 ABC Educational Trust runs 3 colleges: ABC College Door No.10 Koramangala, XYZ Institute Door No.10 Koramangala (Ghost 87%), PQR College MG Road | Bureau Hopping PG-104 + RB-208"
if(l.includes("ghost")||l.includes("87")) return "🔴 Ghost 87%: Same Door No.10 Koramangala 100% + Name 82% Levenshtein + Same Trust ABC 100% + Same Pincode 560034 100% | Match PG-104 vs RB-208 | Cross-Bureau Deduplication"
if(l.includes("health")||l.includes("35")) return "🚨 Health 35/100 RED Critical | 2 Overdue + 1 Ghost 87% + Fee ₹40k excess | Priority 75/100 | Immediate action"
if(l.includes("sms")) return "📱 SMS: NIC Gateway Ready DLT 120716XXXX Masked XXXX-XX10 Consent C-104 Hash chain in Audit Trail"
if(q.match(/[\u0C80-\u0CFF]/)) return "🔴 PG-104 ಸ್ಥಿತಿ: ಘೋಸ್ಟ್ 87% RB-208 ಜೊತೆ | ಒಂದೇ ಬಾಗಿಲು ನಂ.10 ಕೋರಮಂಗಲ | ಒಂದೇ ಟ್ರಸ್ಟ್ TR-56001 | ಆರೋಗ್ಯ 35/100 ಕೆಂಪು | ಶುಲ್ಕ ₹40k ಹೆಚ್ಚುವರಿ"
return "I know PG-104 status, Fee ₹80k vs ₹1.2L, Trust TR-56001, Ghost 87% Door No.10, Health 35/100, Coordination Dossier, SMS alerts. Click quick buttons or speak Kannada"
}

const send=(t:string=input)=>{if(!t.trim())return;setMsgs(m=>[...m,{from:"user",text:t}]);setInput("");setTimeout(()=>{setMsgs(m=>[...m,{from:"bot",text:getReply(t)}])},400)}

const listen=()=>{
const SR=(window as any).webkitSpeechRecognition||(window as any).SpeechRecognition
if(!SR){alert("Mic not supported");return}
const r=new SR();r.lang="kn-IN";r.onstart=()=>setListening(true);r.onend=()=>setListening(false);r.onresult=(e:any)=>{const txt=e.results[0][0].transcript;setInput(txt);send(txt)};r.start()
}

return(<>
<button onClick={()=>setOpen(!open)} className="no-print fixed bottom-5 right-5 w-14 h-14 bg-[#0f172a] text-white rounded-full shadow-2xl flex items-center justify-center text-2xl z-[9999] hover:bg-black transition-all">💬</button>
{open&&<div className="no-print fixed bottom-20 right-5 w-[360px] max-w-[90vw] h-[480px] bg-white rounded-2xl shadow-2xl border border-gray-300 flex flex-col z-[9999]">
<div className="bg-[#0f172a] text-white p-3 rounded-t-2xl flex justify-between items-center"><span className="font-bold text-sm">AICTE Sahayak {listening&&"🎤 Listening..."}</span><button onClick={()=>setOpen(false)} className="text-white hover:text-gray-300 font-bold px-1">✕</button></div>
<div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">{msgs.map((m,i)=><div key={i} className={`p-2.5 rounded-xl text-[13px] ${m.from==="bot"?"bg-white border text-gray-800":"bg-[#0f172a] text-white ml-8"}`}>{m.text}</div>)}<div ref={endRef}/></div>
<div className="p-2 border-t bg-white rounded-b-2xl">
<div className="flex gap-1 mb-2 overflow-x-auto">{["PG-104 status","Fee 1.2L","Trust ABC","Ghost 87%"].map(b=><button key={b} onClick={()=>send(b)} className="text-[11px] bg-gray-100 hover:bg-gray-200 border px-2 py-1 rounded-full whitespace-nowrap">{b}</button>)}</div>
<div className="flex gap-2"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask PG-104, Fee..." className="flex-1 border rounded-full px-3 py-2 text-sm"/><button onClick={listen} className={`w-9 h-9 rounded-full flex items-center justify-center ${listening?"bg-red-500 animate-pulse text-white":"bg-gray-100 hover:bg-gray-200"}`}>🎤</button><button onClick={()=>send()} className="w-9 h-9 bg-[#0f172a] hover:bg-black text-white rounded-full flex items-center justify-center">➤</button></div>
</div></div>}
</>)
}
