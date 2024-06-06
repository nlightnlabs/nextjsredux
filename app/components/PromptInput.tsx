"use client";
import React, { useState, useEffect, useRef } from "react";
import Svg from "./Svg";
import * as nlightnApi from "../apis/nlightn";
import {useRouter} from 'next/navigation'
import { preSscreen } from "../utils/gpt";

interface PropTypes {
  returnResponse: (arg:any)=>void;
}
const MainTextPrompt = ({returnResponse}:PropTypes) => {

  const [textPrompt, setTextPrompt] = useState<string>("");
  const [response, setResponse] = useState("")

  const [hoveredItem, setHoveredItem] = useState<string>("");
  const [transcription, setTranscription] = useState<string>("");
  const [display, setDisplay] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [blobURL, setBlobURL] = useState<string>("");

  const soundWaveCanvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<any[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);

  const initializeAudioContext = async () => {
    audioContextRef.current = new AudioContext();
    analyserRef.current = audioContextRef.current.createAnalyser();
    dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
    canvasContextRef.current = soundWaveCanvasRef.current?.getContext("2d") || null;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioSource = audioContextRef.current.createMediaStreamSource(stream);
      audioSource.connect(analyserRef.current);
      draw();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  useEffect(() => {
    if (display) {
      initializeAudioContext();
    } else {
      cleanupAudioContext();
    }
  }, [display]);

  const cleanupAudioContext = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const draw = () => {
    if (!canvasContextRef.current || !soundWaveCanvasRef.current || !analyserRef.current || !dataArrayRef.current) return;

    const WIDTH = soundWaveCanvasRef.current.offsetWidth;
    const HEIGHT = soundWaveCanvasRef.current.offsetHeight;

    analyserRef.current.getByteTimeDomainData(dataArrayRef.current);

    canvasContextRef.current.clearRect(0, 0, WIDTH, HEIGHT);
    canvasContextRef.current.lineWidth = 4;
    canvasContextRef.current.strokeStyle = "rgba(0, 225, 0, 0.5)";
    canvasContextRef.current.beginPath();

    const sliceWidth = (WIDTH * 1.0) / analyserRef.current.frequencyBinCount;
    let x = 0;

    for (let i = 0; i < analyserRef.current.frequencyBinCount; i++) {
      const v = dataArrayRef.current[i] / 128.0;
      const y = (v * HEIGHT) / 2;

      if (i === 0) {
        canvasContextRef.current.moveTo(x, y);
      } else {
        canvasContextRef.current.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasContextRef.current.lineTo(WIDTH, HEIGHT / 2);
    canvasContextRef.current.stroke();

    requestAnimationFrame(draw);
  };

  const startRecording = async () => {
    setDisplay(true);
    setTextPrompt("");

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error('getUserMedia is not supported in this browser');
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunks.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      console.log("stopped")
      const audioBlob = new Blob(chunks.current, { type: 'audio/wav' });
      setAudioBlob(audioBlob);
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    setDisplay(false);

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    setTimeout(() => {
      transcribeToText();
    }, 200);
  };

  const transcribeToText = async () => {
    const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
    const blobURL = URL.createObjectURL(audioBlob);
    setBlobURL(blobURL);
    if (audioBlob) {
      const response = await nlightnApi.convertAudioToText(audioBlob);
      setTextPrompt(response);
    } else {
      console.error("No audioBlob available");
    }
  };

  const handleRecordingClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleSubmit = async ()=>{
    const response = await preSscreen(textPrompt)
    console.log(response)
    if(response.length>0){
      setResponse(response)
      returnResponse({textPrompt,response})
    }
  }

  return (
    <div>
      <div style={{ transition: "0.5s" }} className={`flex p-3 w-[500px] ${response.length>0? "mt-[10px]" : "mt-[50%]"}`}>

        <div className="flex w-full border rounded-lg ">
          <input
            id="text_prompt"
            name="text_prompt"
            type="text"
            value={textPrompt}
            onChange={(e) => setTextPrompt(e.target.value)}
            placeholder="What do you need?"
            className="flex w-full text-[16px] text-blue-500 outline-none border-none"
          />
        
        {textPrompt &&
            <div
              id="SendIcon"
              onMouseOver={() => setHoveredItem("SendIcon")}
              onMouseLeave={() => setHoveredItem("")}
              onClick={handleSubmit}
              className="flex ms-2 p-1 cursor-pointer items-center fade-in me-3"
              style={{"transition": "0.5s"}}
            >
            <Svg
                iconName={"SendIcon"}
                fillColor={hoveredItem ==="SendIcon" ? "blue": "lightgray"}
                fillOpacity="1"
                height="25px"
                width="25px"
            />
            </div>
        }

        </div>
        
        <div
          id="RecordingIcon"
          onClick={handleRecordingClick}
          className="flex p-1 cursor-pointer border rounded-md ms-2 fade-in"
          style={{"transition": "0.5s"}}
        >
          <Svg
            iconName={isRecording ? "StopRecordingIcon" : "MicrophoneIcon"}
            fillColor={isRecording ? "rgba(200,0,0,1)" : "lightgray"}
            fillOpacity="1"
            height="40px"
            width="40px"
          />
        </div>


        {display && (
          <div className="flex justify-center m-2 p-2" style={{ overflow: "hidden", transition: "0.5s" }}>
            <canvas ref={soundWaveCanvasRef} height={50} width={50} style={{ color: "gray" }}>
              <div className="w-full"></div>
            </canvas>
          </div>
        )}
      </div>

        {isRecording && <div className="flex w-full text-red-500">Recording...please make sure your mic is on</div>}

      </div>
  );
};

export default MainTextPrompt;
