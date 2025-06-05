import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from '@app/core/services/empresa.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { Toast } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-informacion',
  imports: [
    CardModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    CalendarModule,
    Toast,
    ProgressSpinnerModule,
    InputTextModule,
    CheckboxModule
  ],
  templateUrl: './informacion.component.html',
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformacionComponent implements OnInit {
  empresaForm: FormGroup;
  loading: boolean = true;
  empresaId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.empresaForm = this.fb.group({
      nombre: [''],
      direccion: [''],
      telefono: [null],
      email: [''],
      propietario: [''],
      fechaCreacion: [null],
      servicios: [''],
      redesSociales: [''],
      perteneceRedEmprendedores: [false],
      redEmprendedoresConfirmada: [false],
      aspectosMejorar: [''],
      capacitadores: [''],
      fechaLlamada: [null],
      observaciones: [''],
      disponibilidad: [''],
      capacitacionRecibida: [false],
    });
  }

  ngOnInit(): void {
    this.empresaId = this.route.snapshot.paramMap.get('id');
    if (this.empresaId) {
      this.loadEmpresa();
    } else {
      this.loading = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se encontró el ID de la empresa',
      });
    }
  }

  loadEmpresa(): void {
    this.empresaService.getById(this.empresaId!).subscribe({
      next: (empresa) => {
        this.empresaForm.patchValue({
          ...empresa,
          fechaCreacion: empresa.fechaCreacion
            ? new Date(empresa.fechaCreacion)
            : null,
          fechaLlamada: empresa.fechaLlamada
            ? new Date(empresa.fechaLlamada)
            : null,
        });
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la información de la empresa',
        });
      },
    });
  }

  guardarInformacion(): void {
    if (this.empresaForm.invalid || !this.empresaId) return;

    this.loading = true;
    const empresaData = this.empresaForm.value;

    this.empresaService.updateEmpresa(this.empresaId, empresaData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Información de la empresa actualizada correctamente',
        });
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar la información de la empresa',
        });
        this.loading = false;
      },
    });
  }
}
