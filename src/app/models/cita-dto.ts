export class CitaDTO {

      Id:number=0;  
      Fecha : string = "";
      Estado : string = ""; 
      filtro :string = "";
    constructor(
      Id:number, Fecha: string,Estado: string
      ){
      this.Id = Id;
      this.Fecha = Fecha;
      this.Estado = Estado;
    }
    
}
