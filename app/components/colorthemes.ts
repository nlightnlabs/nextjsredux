import { Object } from "@/app/types"

export const colorThemes:Object[] = [
    {id: 1, name: "black", menuColor: "linear-gradient(180deg,black, gray)", iconColor: "white", labelColor: "white", hoverColor: "lightgray", iconHoverColor: "gray", labelHoverColor: "gray"},
    {id: 2, name: "white", menuColor: "white", iconColor: "rgb(200,200,200)", labelColor: "rgb(200,200,200)", hoverColor: "rgb(200,200,200)", iconHoverColor: "gray", labelHoverColor: "gray"},
    {id: 3, name: "nlightn labs", menuColor: "linear-gradient(180deg,rgb(0,100,225),rgb(0,200,225))", iconColor: "white", labelColor: "white", hoverColor: "rgba(255,255,255,0.75)", iconHoverColor: "rgb(0,100,200)", labelHoverColor: "rgb(0,100,200)"},
    {id: 4, name: "records depot", menuColor: "linear-gradient(180deg,rgb(150,100,75),rgb(200,200,225))", iconColor: "white", labelColor: "white", hoverColor: "rgba(255,255,255,0.5)", iconHoverColor: "brown", labelHoverColor: "brown"}
  ]