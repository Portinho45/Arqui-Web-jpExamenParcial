import { Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog'
import { jpCliente } from 'src/app/models/jpCliente';
import { jpClienteService } from 'src/app/services/jp-cliente.service';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-lista-completa',
  templateUrl: './lista-completa.component.html',
  styleUrls: ['./lista-completa.component.css']
})
export class ListaCompletaComponent implements OnInit{
  jpform: FormGroup = new FormGroup({});
  lista: jpCliente[] = []
  dataSource: MatTableDataSource<jpCliente> = new MatTableDataSource();
  idMayor: number = 0
  displayedColumns: string[] = ['id', 'jpname','jpbirthdate', 'jpgender', 'jpadress', 'jpphone', 'jpemail'];
  jpid: number = 0;
  ver: boolean = false;


  constructor(private aS: jpClienteService, private dialog: MatDialog, private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.jpform = new FormGroup({
      id: new FormControl(),
      jpname: new FormControl(),
      jpbirthdate: new FormControl(),
      jpadress: new FormControl(),
      jpphone: new FormControl(),
      jpemail: new FormControl()
    });

    this.route.params.subscribe((data: Params) => {
      this.jpid = data['id'];
      this.ver = data['id'] != null;
      this.init();
    })
  }

  init() {
    if (this.ver) {
      this.aS.listId(this.jpid).subscribe(data => {
        this.jpform = new FormGroup({
          id: new FormControl(data.id),
          jpname: new FormControl(data.jpname),
          jpbirthdate: new FormControl(data.jpbirthdate),
          jpadress: new FormControl(data.jpadress),
          jpphone: new FormControl(data.jpphone),
          jpemail: new FormControl(data.jpemail),

        })
      })
    }
  }


}
