import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Mic, MicOff, Video, VideoOff, Send, RefreshCw } from "lucide-react";

const ICE_SERVERS = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

export default function VideoChat() {
  const myVideo = useRef(null);
  const strangerVideo = useRef(null);
  const socketRef = useRef(null);
  const peerRef = useRef(null);
  const streamRef = useRef(null);
  const roomIdRef = useRef(null);
  const typeRef = useRef(null);
  const chatEndRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [camOn, setCamOn] = useState(true);
  const [micOn, setMicOn] = useState(true);

  useEffect(() => {
    const init = async () => {
      // 1. Pehle Camera On karo (Fixes getTracks error)
      await initMedia();

      socketRef.current = io("http://localhost:5000", {
        auth: { token: localStorage.getItem("token") }
      });

      socketRef.current.emit("start", (t) => { typeRef.current = t; });

      socketRef.current.on("roomid", id => { roomIdRef.current = id; });

      socketRef.current.on("remote-socket", () => {
        createPeer();
        setLoading(false);
      });

      socketRef.current.on("sdp:reply", async ({ sdp }) => {
        await peerRef.current?.setRemoteDescription(new RTCSessionDescription(sdp));
        if (peerRef.current?.signalingState === "have-remote-offer") {
          const answer = await peerRef.current.createAnswer();
          await peerRef.current.setLocalDescription(answer);
          socketRef.current.emit("sdp:send", { sdp: answer });
        }
      });

      socketRef.current.on("ice:reply", ({ candidate }) => {
        candidate && peerRef.current?.addIceCandidate(new RTCIceCandidate(candidate));
      });

      socketRef.current.on("get-message", (data) => {
        setMessages(prev => [...prev, { from: "Stranger", text: data.text, time: data.time }]);
      });
    };

    init();
    return cleanup;
  }, []);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const initMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (myVideo.current) myVideo.current.srcObject = stream;
    } catch (e) { alert("Camera access required!"); }
  };

  const createPeer = () => {
    if (peerRef.current || !streamRef.current) return;
    const peer = new RTCPeerConnection(ICE_SERVERS);
    peerRef.current = peer;

    streamRef.current.getTracks().forEach(t => peer.addTrack(t, streamRef.current));
    peer.ontrack = e => { if (strangerVideo.current) strangerVideo.current.srcObject = e.streams[0]; };
    peer.onicecandidate = e => e.candidate && socketRef.current.emit("ice:send", { candidate: e.candidate });
    
    peer.onnegotiationneeded = async () => {
      if (typeRef.current !== "p1") return;
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      socketRef.current.emit("sdp:send", { sdp: offer });
    };
  };

  const sendMessage = (e) => {
    if (e) e.preventDefault();
    if (!message.trim() || !roomIdRef.current) return;

    socketRef.current.emit("send-message", { text: message, roomId: roomIdRef.current });
    setMessages(prev => [...prev, { from: "You", text: message, time: new Date() }]);
    setMessage("");
  };

  const cleanup = () => {
    socketRef.current?.disconnect();
    peerRef.current?.close();
    streamRef.current?.getTracks().forEach(t => t.stop());
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0a0a0c] text-white overflow-hidden font-sans">
      {/* LEFT: VIDEO AREA */}
      <div className="relative flex-1 bg-black flex items-center justify-center">
        {loading ? (
          <div className="text-center animate-pulse">
            <RefreshCw className="w-12 h-12 mx-auto mb-4 animate-spin text-violet-500" />
            <p className="text-xl">Finding a Stranger...</p>
          </div>
        ) : (
          <video ref={strangerVideo} autoPlay playsInline className="w-full h-full object-cover" />
        )}

        {/* Local Preview */}
        <div className="absolute top-4 right-4 w-32 h-44 sm:w-48 sm:h-64 bg-gray-900 rounded-xl overflow-hidden border-2 border-violet-500 shadow-2xl">
          <video ref={myVideo} autoPlay muted playsInline className="w-full h-full object-cover scale-x-[-1]" />
        </div>

        {/* Controls */}
        <div className="absolute bottom-6 flex gap-4 bg-black/60 backdrop-blur-lg p-3 rounded-full border border-white/10">
          <button onClick={() => {
            const t = streamRef.current.getVideoTracks()[0]; t.enabled = !t.enabled; setCamOn(t.enabled);
          }} className={`p-3 rounded-full ${camOn ? "bg-white/10" : "bg-red-500"}`}>
            {camOn ? <Video size={20} /> : <VideoOff size={20} />}
          </button>
          <button onClick={() => {
            const t = streamRef.current.getAudioTracks()[0]; t.enabled = !t.enabled; setMicOn(t.enabled);
          }} className={`p-3 rounded-full ${micOn ? "bg-white/10" : "bg-red-500"}`}>
            {micOn ? <Mic size={20} /> : <MicOff size={20} />}
          </button>
          <button onClick={() => window.location.reload()} className="bg-violet-600 px-6 py-2 rounded-full font-bold hover:bg-violet-700 transition">Next</button>
        </div>
      </div>

      {/* RIGHT: CHAT AREA */}
      <div className="w-full md:w-[380px] flex flex-col bg-[#121216] border-l border-white/5">
        <div className="p-4 border-b border-white/5 font-bold text-violet-400">Stranger Chat</div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.from === "You" ? "items-end" : "items-start"}`}>
              <div className={`px-4 py-2 rounded-2xl max-w-[90%] text-sm ${m.from === "You" ? "bg-violet-600 rounded-tr-none" : "bg-gray-800 rounded-tl-none"}`}>
                {m.text}
              </div>
              <span className="text-[10px] text-gray-500 mt-1">{new Date(m.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={sendMessage} className="p-4 bg-black/40 flex gap-2">
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500"
          />
          <button type="submit" className="p-2 bg-violet-600 rounded-lg hover:bg-violet-700"><Send size={20} /></button>
        </form>
      </div>
    </div>
  );
}