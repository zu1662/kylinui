export interface SliderProps { modelValue?:number; min?:number; max?:number; step?:number; label?:string; showValue?:boolean; disabled?:boolean; }
export function clamp(value:number,min:number,max:number){return Math.min(max,Math.max(min,value))}
