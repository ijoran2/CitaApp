import { Component, OnInit } from '@angular/core';
import { faSave, faArrowRotateLeft, faEraser} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import{ WebApiCrudService} from '../services/web-api-crud.service';
import swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  id:number = 0;
  public faSave = faSave;
  public faArrowRotateLeft = faArrowRotateLeft;
  public faEraser = faEraser;
  public form:FormGroup;
  public seHizoSubmit = false;
  constructor(
      private formBuilder: FormBuilder, 
      private servicio : WebApiCrudService,
     private router: Router,
     private activatedRoute: ActivatedRoute) { 
    this.form = formBuilder.group({
      nombre: [null, [Validators.required, Validators.maxLength(250)]],
      precio: ['' ,  [Validators.required, Validators.pattern("^[0-9]*(\.[0-9]{0,2})?$")]],
      cantidad: [null,[Validators.required, Validators.pattern("^[0-9]*$")]],
      categoria: ['',  Validators.required],
      existenciaMinima: ['',[Validators.required, Validators.pattern("^[0-9]*$")]],
      imagen: [''],
    });
  }

  ngOnInit(): void {
    
    this.cargarDatos();
  }

  cargarDatos(){
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if(this.id){
        this.servicio.getCitaPorId(this.id).subscribe( Cita=>{
          this.form.controls['nombre'].setValue(Cita.Fecha);
          this.form.controls['precio'].setValue(Cita.Estado);

        });
      }
    })
  }

  public get ControlesFormularios() {
    return this.form.controls;
  }

 
  Guardar(){
    this.seHizoSubmit = true;
    if (this.form.valid) {
      this.servicio.editarCita(this.id,this.form.value.Fecha,
        this.form.value.Estado).subscribe( cita=>{
          this.router.navigate(['/Cita'])
          swal.fire('Cita Modificado', "Se ha modificado con éxito", 'success');
      });

    }
  }
}
