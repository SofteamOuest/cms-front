import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TrainingsService } from '../service/trainings.service';
import { Observable } from 'rxjs';
import { Training } from '../bean/training';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit, OnDestroy {
  dataSource: any;
  displayedColumns = ['title', 'resume','delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingsService: TrainingsService,private router: Router) {

  }

  ngOnInit() {
    this.dataSource = new TrainingDataSource(this.trainingsService);
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
  }

  navigate(id:Number):void{
    this.router.navigate(['trainings/detailTraining',id])
  }
}

export class TrainingDataSource extends DataSource<any>{

  constructor(private trainingsService: TrainingsService) {
    super();
  }

  connect(): Observable<Training[]> {
    return this.trainingsService.getTrainings();
  }
  disconnect() { }
}
