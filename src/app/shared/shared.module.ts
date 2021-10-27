import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonePipe } from './phone-pipe/phone.pipe';
import { CpfPipe } from './cpf-pipe/cpf.pipe';
import { OnlyNumbersDirective } from './only-numbers/only-numbers.directive';



@NgModule({
  declarations: [
    PhonePipe,
    CpfPipe,
    OnlyNumbersDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PhonePipe,
    CpfPipe,
    OnlyNumbersDirective
  ]
})
export class SharedModule { }
