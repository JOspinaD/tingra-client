import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EmpresaService } from '@app/core/services/empresa.service';
import { Empresa } from '@app/shared/interfaces/empresa';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-empresas',
  imports: [
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    FloatLabelModule,
    Toast,
    CardModule,
    CommonModule,
    InputTextModule,
  ],
  templateUrl: './empresas.component.html',
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpresasComponent implements OnInit {
  visible: boolean = false;
  empresas: Empresa[] = [];
  empresaForm: FormGroup;
  editing: boolean = false;
  SelectedEmpresaId: string | null = null;
  constructor(
    private empresaService: EmpresaService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {
this.empresaForm = this.fb.group({
  nombre: ['', Validators.required],
  direccion: ['', Validators.required],
  telefono: [null, Validators.required],
  email: ['', [Validators.required, Validators.email]],
});
  }

  ngOnInit(): void {
    this.loadEmpresas();
  }

  loadEmpresas(): void {
    this.empresaService.getAllEmpresas().subscribe({
      next: (empresas) => {
        this.empresas = empresas;
        this.cdRef.detectChanges();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las empresas.',
        });
      },
    });
  }

  showDialog(): void {
    this.resetForm();
    this.visible = true;
  }

  resetForm(): void {
    this.empresaForm.reset();
    this.editing = false;
    this.SelectedEmpresaId = null;
    this.visible = true;
  }

  crearEmpresa(): void {
    if (this.empresaForm.invalid) return;

    const empresa: Empresa = this.empresaForm.value;

    if (this.editing && this.SelectedEmpresaId) {
      this.empresaService
        .updateEmpresa(this.SelectedEmpresaId, empresa)
        .subscribe({
          next: (updatedEmpresa) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Empresa actualizada correctamente.',
            });
            this.loadEmpresas();
            this.visible = false;
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo actualizar la empresa.',
            });
          },
        });
    } else {
      this.empresaService.createEmpresa(empresa).subscribe({
        next: (newEmpresa) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Empresa creada correctamente.',
          });
          this.loadEmpresas();
          this.visible = false;
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear la empresa.',
          });
        },
      });
    }
  }

  editarEmpresa(empresa: Empresa): void {
    this.editing = true;
    this.SelectedEmpresaId = empresa.id;
    this.empresaForm.patchValue({
      nombre: empresa.nombre,
      direccion: empresa.direccion,
      telefono: empresa.telefono,
      email: empresa.email,
    });
    this.visible = true;
  }

  eliminarEmpresa(empresa: Empresa): void {
    this.empresaService.deleteEmpresa(empresa.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Empresa eliminada correctamente.',
        });
        this.loadEmpresas();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la empresa.',
        });
      },
    });
  }

  verDetalleEmpresa(empresaId: string): void {
  this.router.navigate(['/informacion-empresa', empresaId]);
}
}
