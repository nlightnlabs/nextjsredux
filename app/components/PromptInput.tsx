"use client";
import React, { useState, useEffect, useRef } from "react";
import Svg from "./Svg";
import * as nlightnApi from "../apis/nlightn";

const MainTextPrompt = () => {
  const [textPrompt, setTextPrompt] = useState<string>("");
  const [hoveredItem, setHoveredItem] = useState<boolean>(false);
  const [transcription, setTranscription] = useState<string>("");
  const [display, setDisplay] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [blobURL, setBlobURL] = useState<string>("");

  const audioPlayerRef = useRef<HTMLDivElement>(null);
  const soundWaveCanvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<any[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (display) {
      initializeAudioContext();
    } else {
      cleanupAudioContext();
    }
  }, [display]);


  const initializeAudioContext = async () => {
    audioContextRef.current = new AudioContext();
    analyserRef.current = audioContextRef.current.createAnalyser();
    dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
    canvasContextRef.current = soundWaveCanvasRef.current?.getContext("2d") || null;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioSource = audioContextRef.current.createMediaStreamSource(stream);
      audioSource.connect(analyserRef.current);
      audioPlayerRef.current!.srcObject = stream;
      draw();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

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
    setTranscription("");
    setAudioBlob(null);
    setBlobURL("");
    setDisplay(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        chunks.current.push(event.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
        setAudioBlob(audioBlob);
        const blobURL = URL.createObjectURL(audioBlob);
        setBlobURL(blobURL);
        setTimeout(() => {
          transcribeToText(audioBlob);
        }, 100);
        chunks.current = [];
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    setDisplay(false);

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      setTimeout(() => {
        transcribeToText();
      }, 100);

    }
    
  };

  const transcribeToText = async () => {
    console.log("transcribing")
      const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
      const blobURL = URL.createObjectURL(audioBlob);
      setBlobURL(blobURL);
      chunks.current = [];
    if (audioBlob) {
      const response = await nlightnApi.convertAudioToText(audioBlob);
      setTranscription(response);
    } else {
      console.error("No audioBlob available");
    }
  };

  const style = {
    transition: "0.5s",
  };


  return (
    <div className="flex flex-col w-full justify-center">

      <div style={style} className="flex w-full md:w-1/2 items-center h-[75px] p-3">
        <div
          id="icon"
          onMouseOver={() => setHoveredItem(true)}
          onMouseLeave={() => setHoveredItem(false)}
          onClick={() => {
            isRecording ? stopRecording() : startRecording();
          }}
          className="flex p-3"
        >
          <Svg
            iconName={isRecording ? "StopRecordingIcon" : "MicrophoneIcon"}
            fillColor={isRecording ? "rgba(200,0,0,1)" : "lightgray"}
            fillOpacity="1"
            height="50px"
            width="50px"
          />
        </div>

        <input
          id="text_prompt"
          name="text_prompt"
          type="text"
          value={textPrompt}
          onChange={(e) => setTextPrompt(e.target.value)}
          placeholder="What do you need?"
          className="flex w-full h-[100%] text-[20px] hover:text-blue-500 hover:bg-[rgba(200,235,255,.25)] hover:border-[rgba(200,235,255,1)]"
        />
      </div>

      {display && (
        <div className="flex flex-column p-3 mt-3" style={{ overflow: "hidden" }}>
          <canvas ref={soundWaveCanvasRef} height={100} width={300} style={{ color: "gray" }} />
          <div ref={audioPlayerRef}></div>
        </div>
      )}
    </div>
  );
};

export default MainTextPrompt;
