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

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Float32Array[]>([]);

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
      mediaStreamRef.current = stream;
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
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
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
      await initializeAudioContext();
      audioChunksRef.current = [];
      setIsRecording(true);

      const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
      const audioSource = audioContextRef.current!.createMediaStreamSource(mediaStreamRef.current!);
      audioSource.connect(scriptProcessor);
      scriptProcessor.connect(audioContextRef.current!.destination);

      scriptProcessor.onaudioprocess = (event) => {
        audioChunksRef.current.push(event.inputBuffer.getChannelData(0).slice());
      };
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    setDisplay(false);

    if (audioContextRef.current) {
      audioContextRef.current.suspend();
      setIsRecording(false);
    }

    const audioBuffer = audioContextRef.current!.createBuffer(1, audioChunksRef.current.length * 4096, audioContextRef.current!.sampleRate);
    const channelData = audioBuffer.getChannelData(0);
    let offset = 0;

    audioChunksRef.current.forEach(chunk => {
      channelData.set(chunk, offset);
      offset += chunk.length;
    });

    audioContextRef.current!.decodeAudioData(audioBuffer, (buffer) => {
      const wavBlob = bufferToWav(buffer);
      setAudioBlob(wavBlob);
      const blobURL = URL.createObjectURL(wavBlob);
      setBlobURL(blobURL);
      transcribeToText(wavBlob);
    });
  };

  const bufferToWav = (buffer: AudioBuffer) => {
    const numOfChan = buffer.numberOfChannels,
      length = buffer.length * numOfChan * 2 + 44,
      bufferArray = new ArrayBuffer(length),
      view = new DataView(bufferArray),
      channels = [],
      sampleRate = buffer.sampleRate;

    let offset = 0,
      pos = 0;

    // write WAV header
    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8); // file length - 8
    setUint32(0x45564157); // "WAVE"

    setUint32(0x20746d66); // "fmt " chunk
    setUint32(16); // length = 16
    setUint16(1); // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(sampleRate);
    setUint32(sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2); // block-align
    setUint16(16); // 16-bit (hardcoded in this demo)

    setUint32(0x61746164); // "data" - chunk
    setUint32(length - pos - 4); // chunk length

    // write interleaved data
    for (let i = 0; i < buffer.numberOfChannels; i++)
      channels.push(buffer.getChannelData(i));

    while (pos < length) {
      for (let i = 0; i < numOfChan; i++) {
        let sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
        sample = sample < 0 ? sample * 0x8000 : sample * 0x7fff; // scale to 16-bit
        view.setInt16(pos, sample, true); // write 16-bit sample
        pos += 2;
      }
      offset++;
    }

    return new Blob([view], { type: "audio/wav" });

    function setUint16(data: number) {
      view.setUint16(pos, data, true);
      pos += 2;
    }

    function setUint32(data: number) {
      view.setUint32(pos, data, true);
      pos += 4;
    }
  };

  const transcribeToText = async (audioBlob: Blob) => {
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
      <div style={style} className="flex w-full md:w-1/2 items-center h-[75px] p-2">
        <div
          id="icon"
          onMouseOver={() => setHoveredItem(true)}
          onMouseLeave={() => setHoveredItem(false)}
          onClick={() => {
            isRecording ? stopRecording() : startRecording();
          }}
        >
          <Svg
            iconName={isRecording ? "StopIcon" : "MicrophoneIcon"}
            fillColor={hoveredItem ? "rgb(200,225,255)" : "lightgray"}
            fillOpacity="1"
            height="50px"
            width="50px"
          />
        </div>

        <input
          id="text_prompt"
          placeholder="Type prompt here"
          className="w-full p-3 text-xl font-sans text-black"
          onChange={(e) => {
            setTextPrompt(e.target.value);
          }}
          value={textPrompt}
        />
      </div>

      <div className="flex flex-col">
        <button
          onClick={async () => {
            setTranscription("Transcribing...");
            const text = await nlightnApi.convertText(textPrompt);
            setTranscription(text);
          }}
          className="p-2 mt-3 text-white bg-blue-600"
        >
          Submit
        </button>

        <div className="w-full md:w-1/2 border-2 border-gray-400 p-2 mt-4">
          <div className="text-md">{transcription}</div>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-[100px] mt-4">
        <canvas ref={soundWaveCanvasRef} className="w-full h-full"></canvas>
      </div>

      {blobURL && (
        <div>
          <audio controls src={blobURL}></audio>
        </div>
      )}
    </div>
  );
};

export default MainTextPrompt;

