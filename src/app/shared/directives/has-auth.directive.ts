import { TokenStorageService } from '../../core/services/auth/token-storage.service';
import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appHasAuth]'
})
export class HasAuthDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private TokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    const isAuthenticated = this.TokenStorage.isAuthenticated();
    if (isAuthenticated) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
