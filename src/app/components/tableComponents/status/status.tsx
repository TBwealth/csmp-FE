export class MyColor {
  private red = 0;
  private blue = 0;
  private green = 0;
  private alpha = 1;
  public constructor(red:any, green:any, blue:any, alpha = 1) {
      this.red = red;
      this.blue = blue;
      this.green = green;
      this.alpha = alpha;
  }

  public getColorString(opacity:any) {
      this.alpha = opacity;
      return `RGBA(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
  }
}

export interface IStatus {
  getStatusLabel(): string;
  getStatusColor(): MyColor;
}


export interface INamedStatus {
  getNamedStatusLabel(): string;
  getNamedStatusColor(): MyColor;
}

type Props = {
  data: any,
  name?: string,
}

export const TableStatus = ({ data = {}, name = "" }: Props) => {
 const getColor = () => {
    return data?.getStatusColor();
  }
 const getLabel = () =>{
    return data?.getStatusLabel();
  }
  return (
    <>
    <div style={{backgroundColor:getColor().getColorString(0.1), color:getColor().getColorString(1),padding: "10px",width: "max-content",borderRadius:"5px"}}>{getLabel()}</div>

    </>
  )
}

export const NamedStatusComponent = ({ data = {}, name = "" }: Props) => {
  const getColor = () => {
    return data.getNamedStatusColor();
  }
 const getLabel = () => {
    return data.getNamedStatusLabel();
  }
  return (
    <>
<div style={{color:getColor().getColorString(1),padding: "10px",width: "max-content",borderRadius:"5px"}}>{getLabel()}</div>    
    </>
  )
}