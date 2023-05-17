import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog'
import { jpCliente } from 'src/app/models/jpCliente';
import { jpClienteService } from 'src/app/services/jp-cliente.service';
import { DialogoComponent } from './diagolo/diagolo.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit{

  lista: jpCliente[] = []
  dataSource: MatTableDataSource<jpCliente> = new MatTableDataSource();
  idMayor: number = 0
  displayedColumns: string[] = ['id', 'jpname','jpaction1', 'jpaction2'];
  @ViewChild(MatPaginator,{ static:true }) paginator!: MatPaginator;

  constructor(private aS: jpClienteService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.aS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
    })

    this.aS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
    })

    this.aS.getConfirmDelete().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
    })

  }

  confirm(id: number) {
    this.idMayor = id;
    this.dialog.open(DialogoComponent);
  }
  eliminar(id: number) {
    this.aS.delete(id).subscribe(() => {
      this.aS.list().subscribe(data => {
        this.aS.setList(data);
      })
    })
  }

}
