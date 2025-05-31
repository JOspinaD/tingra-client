import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { UsuarioService } from './../../core/services/usuario.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Usuario } from '@app/shared/interfaces/usuario';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-usuarios',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    FloatLabelModule,
    InputTextModule,
  ],
  providers: [MessageService],
  templateUrl: './usuarios.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuariosComponent implements OnInit {
  visible: boolean = false;
  usuarios: Usuario[] = [];
  usuarioForm: FormGroup;
  editing: boolean = false;
  selectedUsuarioId: string | null = null;

  constructor(
    private UsuarioService: UsuarioService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private cdRef: ChangeDetectorRef
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      hashContraseña: ['', Validators.required],
      direccion: [''],
      telefono: [''],
    });
  }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.UsuarioService.getAllUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cdRef.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar los usuarios', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los usuarios',
        });
      },
    });
  }

  showDialog() {
    this.resetForm();
    this.visible = true;
  }

  crearUsuario(): void {
    if (this.usuarioForm.invalid) return;

    const usuario: Usuario = this.usuarioForm.value;

    if (this.editing && this.selectedUsuarioId) {
      this.UsuarioService.update(this.selectedUsuarioId, usuario).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Usuario actualizado correctamente',
          });
          this.loadUsuarios();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al actualizar el usuario', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar el usuario',
          });
        },
      });
    } else {
      this.UsuarioService.create(usuario).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Usuario creado correctamente',
          });
          this.loadUsuarios();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al crear el usuario', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear el usuario',
          });
        },
      });
    }
  }

  editarUsuario(usuario: Usuario): void {
    this.editing = true;
    this.selectedUsuarioId = usuario.id;
    this.visible = true;
    this.usuarioForm.patchValue({
      nombre: usuario.nombre,
      correo: usuario.correo,
      hashContraseña: usuario.hashContraseña,
      direccion: usuario.direccion,
      telefono: usuario.telefono,
    });
  }

  eliminarUsuario(usuarioId: string): void {
    this.UsuarioService.delete(usuarioId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Usuario eliminado correctamente',
        });
        this.loadUsuarios();
      },
      error: (error) => {
        console.error('Error al eliminar el usuario', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el usuario',
        });
      },
    });
  }

  resetForm(): void {
    this.usuarioForm.reset();
    this.editing = false;
    this.selectedUsuarioId = null;
    this.visible = false;
  }
}
