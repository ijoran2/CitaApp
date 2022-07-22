import { Component,  OnInit } from '@angular/core';
import { faAdd, faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import { formulario } from '../models/formulario';
import{CitaDTO} from '../models/cita-dto';
import{ WebApiCrudService} from '../services/web-api-crud.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html'
})
export class CrudComponent implements OnInit {
  public faAdd = faAdd;
  public faEdit = faEdit;
  public faTrash = faTrash;
  public Citas : CitaDTO[] = [];
  public formulario: formulario = new formulario();
  public filtrarTabla: any = '';
  
 
  constructor(private servicio : WebApiCrudService) { 
 
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(){
    this.servicio.getCitas().subscribe( Citas =>
      this.Citas = Citas
     );
  }

  borrar(id:number){

    swal.fire({
      title: 'Está seguro?',
      text: `¿Desea eliminar el producto?`,
      showCancelButton: true,
      buttonsStyling: true,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.servicio.borrarCita(id).subscribe(
          response => {
            this.cargarProductos();
            swal.fire(
              'Producto Eliminado!',
              `Producto eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    });
    
  }

}
