import { Component, OnInit } from '@angular/core';
import { faSave, faArrowRotateLeft, faEraser} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import{ListaCategorias} from '../models/lista-categorias';
import{ WebApiCrudService} from '../services/web-api-crud.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {
  public faSave = faSave;
  public faArrowRotateLeft = faArrowRotateLeft;
  public faEraser = faEraser;
  public form:FormGroup;
  public seHizoSubmit = false;

  constructor(private formBuilder: FormBuilder, private servicio : WebApiCrudService) { 
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

    ;

  }

  public get ControlesFormularios() {
    return this.form.controls;
  }

  Limpiar(){
    this.form.reset();
  }

  Guardar(){
    this.seHizoSubmit = true;
    if (this.form.valid) {
      this.servicio.guardaCita(this.form.value.Fecha,this.form.value.Estado,
         ).subscribe( cita=>{
          swal.fire('cita Creado', "Se ha creado con éxito", 'success');
          this.seHizoSubmit = false;
          this.form.reset();
      });

    }
  }

}
