"use client";

import React, { useState, useEffect, forwardRef, useRef } from 'react';
import * as iconsApi from '../apis/icons';
import { formatDateInput } from '../functions/formatValue';

type MultiInputProps = {
  list?: string[];
  label?: string;
  type?: string;
  id?: string;
  name?: string;
  onChange: (e: { target: { value: string } }) => void;
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  onHover?: (e: React.MouseEvent<HTMLElement>) => void;
  valueColor?: string;
  labelColor?: string;
  optionColor?: string;
  valueSize?: number;
  labelSize?: number;
  optionSize?: number;
  valueWeight?: React.CSSProperties['fontWeight'];
  labelWeight?: React.CSSProperties['fontWeight'];
  optionWeight?: React.CSSProperties['fontWeight'];
  layout?: string;
  border?: string;
  valueFill?: string;
  labelFill?: string;
  padding?: number;
  rounded?: string;
  readonly?: boolean;
  disabled?: boolean;
  required?: boolean;
  showLookupValue?: boolean;
  width?: string;
  height?: string;
  dropDownFill?: string;
  allowAddData?: boolean;
  marginTop?: number;
  marginBottom?: number;
  value?: string;
};

const MultiInput = (props:MultiInputProps) => {


  const list = props.list || [];
  const label = props.label || "";
  const type = props.type || "text";
  const id = props.id || "";
  const name = props.name || "";
  const onChange = props.onChange;
  const onBlur = props.onBlur;
  const onHover = props.onHover
  const labelColor = props.labelColor;
  const optionColor = props.optionColor;
  const valueSize = props.valueSize;
  const labelSize = props.optionSize;
  const valueWeight = props.valueWeight;
  const labelWeight = props.labelWeight
  const optionWeight = props.optionWeight
  const layout = props.layout
  const border = props.layout
  const initialValueColor = props.valueColor
  const padding = props.padding
  const rounded = props.rounded
  const readonly =props.readonly
  const disabled = props.disabled
  const required = props.required 
  const showLookupValue = props.showLookupValue || false
  const width = props.width
  const height = props.height
  const dropDownFill = props.dropDownFill
  const allowAddData = props.allowAddData
  const marginTop = props.marginTop
  const marginBottom = props.marginBottom

  const [valueColor, setValueColor] = useState(props.valueColor)
  const [labelFill, setLabelFill] = useState("rgb(0,100,225)")
  const [valueFill, setValueFill] = useState(props.valueFill)

  
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [dropDownDisplay, setDropDownDisplay] = useState("none");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [formClassList, setFormClassList] = useState("relative w-full");

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (list && list.length > 0 && value !== "" && value !== null) {
      setSelectedIndex(list.indexOf(props.value || ""));
    }
  }, [list]);

  useEffect(() => {
    if (readonly || disabled) {
      setValueColor("black");
      setLabelFill("white");
    } else {
      setValueColor(initialValueColor);
    }

    if (label && label !== "") {
      setFormClassList("relative w-full");
    } else {
      setFormClassList("relative w-full");
    }
  }, [readonly, disabled, label]);

  useEffect(() => {
    setValue(props.value || "");
  }, [props.value]);

  const containerstyle: React.CSSProperties = {
    display: layout === "stacked" ? "block" : "flex",
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    minHeight: height,
    marginTop: marginTop || 0,
    marginBottom: marginTop || 10
  };

  const inputStyle: React.CSSProperties = {
    fontSize: valueSize || 14,
    fontWeight: valueWeight || "normal",
    color: valueColor || "rgb(0,100,225)",
    backgroundColor: valueFill || "white",
    outline: "none",
    width: width || "100%",
    border: border || "1px solid rgb(235,235,235)",
    padding: padding || undefined,
  };

  const textAreaStyle: React.CSSProperties = {
    cursor: "pointer",
    fontSize: valueSize || 14,
    fontWeight: valueWeight || "normal",
    color: valueColor || "#5B9BD5",
    backgroundColor: valueFill || "white",
    outline: "none",
    width: width || "100%",
    minHeight: 100,
    border: border || "1px solid rgb(235,235,235)",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: labelSize || inputStyle.fontSize,
    fontWeight: labelWeight || "normal",
    color: labelColor || "gray",
  };

  const dropDownStyle: React.CSSProperties = {
    display: dropDownDisplay,
    position: "absolute",
    top: `${inputRef.current?.offsetHeight}px`,
    left: `${inputRef.current?.offsetLeft}px`,
    width: "100%",
    maxHeight: 200,
    overflowY: "auto",
    overflowX: "hidden",
    padding: padding || 5,
    backgroundColor: dropDownFill || "rgba(255,255,255,0.95)",
    boxShadow: "5px 5px 5px lightgray",
    border: "1px solid lightgray",
    borderRadius: "0px 0px 5px 10px",
    color: valueColor || "#5B9BD5",
    zIndex: 99999,
  };

  const optionsStyle: React.CSSProperties = {
    display: "block",
    width: "100%",
    cursor: "pointer",
    fontSize: inputStyle.fontSize,
    fontWeight: optionWeight || "normal",
    padding: padding || 5,
    color: optionColor || "black",
    backgroundColor: "white" || "rgb(255,255,255,0)",
  };

  const handleOptionClick = (e: React.MouseEvent<HTMLElement>) => {
    const selectedIndex = parseInt(e.currentTarget.id, 10);
    const selectedValue = list[selectedIndex];

    setValue(selectedValue);
    setSelectedIndex(selectedIndex);
    setOptions(list);

    setDropDownDisplay("none");
    updateStates(selectedValue);
  };

  const handleOptionHover = (event: React.MouseEvent<HTMLElement>) => {
    if (event.type === "mouseover") {
      event.currentTarget.style.backgroundColor = "rgb(235,245,255)";
      event.currentTarget.style.fontWeight = "bold";
      event.currentTarget.style.color = "#2C7BFF";
    } else {
      event.currentTarget.style.backgroundColor = optionsStyle.backgroundColor || "white";
      event.currentTarget.style.fontWeight = `${optionsStyle.fontWeight}px` || "normal";
      event.currentTarget.style.color = optionsStyle.color || "black";
    }
  };

  const handleDropDownToggle = () => {
    setDropDownDisplay("block");
  };

  const updateStates = (inputValue: string) => {
    const selectedIndex = list.indexOf(inputValue);
    setSelectedIndex(selectedIndex);
    updateParent(inputValue);
  };

  const updateParent = (inputValue: string) => {
    if (typeof onChange === "function") {
      onChange({ target: { value: inputValue } });
    }
  };

  const handleHover = (e: React.MouseEvent<HTMLElement>) => {
    if (e.type === "mouseleave") {
      setDropDownDisplay("none");
    }
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (list && list.length > 0) {
      setOptions(list);
      setDropDownDisplay("block");
      e.currentTarget.select();
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (list && list.length > 0) {
      setOptions(list.filter(item => item));
      setDropDownDisplay("block");
      e.currentTarget.select();
    }
  };

  const handleClick = () => {
    if (list && list.length > 0) {
      setOptions(list.filter(item => item));
      setDropDownDisplay("block");
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleInputChange = (inputText: string) => {
    setValue(inputText);

    if (list && list.length > 0) {
      if (inputText && inputText.length >= 1) {
        setOptions(list.filter(item => item.toLowerCase().includes(inputText.toLowerCase())));
      } else {
        setOptions(list.filter(item => item));
      }
    }
    updateStates(inputText);
  };

  const addIconStyle: React.CSSProperties = {
    maxHeight: 20,
    maxWidth: 20,
    cursor: "pointer",
  };

  const handleAddData = () => {
    // Add data handler logic here
  };

  const formatDate = (inputValue: string) => {
    const date = new Date(inputValue);
    const dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString();
  };

  return (
    <div ref={containerRef} className={`${formClassList}`}>
      {label && <label className="block text-gray-500 text-sm font-bold mb-2" style={labelStyle}>{label}</label>}
      <div className="relative">
        {type === "textarea" ? (
          <textarea
            className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ref={inputRef}
            id={id}
            name={name}
            value={value}
            style={textAreaStyle}
            onChange={(e) => handleInputChange(e.target.value)}
            onBlur={handleBlur}
            onClick={handleClick}
            onFocus={handleFocus}
            onDoubleClick={handleDoubleClick}
            onMouseLeave={handleHover}
            required={required}
            disabled={disabled}
            readOnly={readonly}
            placeholder="Please enter data"
          />
        ) : (
          <input
            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ref={inputRef}
            id={id}
            name={name}
            type={type}
            value={value}
            style={inputStyle}
            onChange={(e) => handleInputChange(e.target.value)}
            onBlur={handleBlur}
            onClick={handleClick}
            onFocus={handleFocus}
            onDoubleClick={handleDoubleClick}
            onMouseLeave={handleHover}
            required={required}
            disabled={disabled}
            readOnly={readonly}
            placeholder="Please enter data"
          />
        )}
        {allowAddData && <img className="absolute top-0 right-0 mt-3 mr-3 cursor-pointer" src="/path/to/add-icon.png" style={addIconStyle} onClick={handleAddData} alt="Add Data" />}
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg" style={dropDownStyle}>
          {options.map((item, index) => (
            <div
              key={index}
              id={index.toString()}
              className="cursor-pointer hover:bg-blue-100 px-4 py-2 text-gray-900"
              onClick={handleOptionClick}
              onMouseOver={handleOptionHover}
              onMouseOut={handleOptionHover}
              style={optionsStyle}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiInput;
