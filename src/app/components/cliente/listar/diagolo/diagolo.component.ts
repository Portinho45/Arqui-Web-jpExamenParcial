import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { jpClienteService } from 'src/app/services/jp-cliente.service';

@Component({
  selector: 'app-diagolo',
  templateUrl: './diagolo.component.html',
  styleUrls: ['./diagolo.component.css']
})
export class DialogoComponent implements OnInit {
  constructor(private aS: jpClienteService,
    private dialogRef: MatDialogRef<DialogoComponent>) { }
  ngOnInit(): void {}
    confirmar(estado: boolean){
      this.aS.setConfirmDelete(estado);
      this.dialogRef.close();
    }

}
