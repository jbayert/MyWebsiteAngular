import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerModuleRoutingModule } from './owner-module-routing.module';
import { OwnerModuleComponent } from './owner-module.component';

@NgModule({
  declarations: [
    OwnerModuleComponent
  ],
  imports: [
    CommonModule,
    OwnerModuleRoutingModule
  ]
})
export class OwnerModuleModule { }
