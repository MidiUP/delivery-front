import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { addressService } from 'src/app/enderecos/address.service';

export interface AddressDelete{
  enderecoId: number;
}

@Component({
  selector: 'app-dialog-delete-endereco',
  templateUrl: './dialog-delete-endereco.component.html',
  styleUrls: ['./dialog-delete-endereco.component.css']
})
export class DialogDeleteEnderecoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDeleteEnderecoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddressDelete, private addressService: addressService) { }

  ngOnInit(): void {
  }

  delete(){
    this.addressService.deleteAddress(this.data.enderecoId)
      .subscribe(
        (res => window.location.reload()),
        (err => console.log(err))
      )
  }
}
