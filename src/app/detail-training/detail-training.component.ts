import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TrainingsService } from '../service/trainings.service';
import { MarkdownService } from 'ngx-markdown';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-detail-training',
  templateUrl: './detail-training.component.html',
  styleUrls: ['./detail-training.component.css']
})
export class DetailTrainingComponent implements OnInit {

  public markdown;

  private sub:Observable<Blob>;

  show=true;

  constructor(private router: ActivatedRoute, private trainingsService: TrainingsService, private markdownService: MarkdownService) {

  }

  ngOnInit() {
    this.router.paramMap.pipe(
      switchMap( params => {
        let id = + params.get('trainingId');
        console.log(id)
        return this.trainingsService.getTraining(id)
      })).subscribe((file:Blob)=>{
        const reader = new FileReader();

        // This fires after the blob has been read/loaded.
        reader.addEventListener('loadend', (e) => {
          console.log(reader.result.toString());
         this.markdown=this.markdownService.compile(reader.result.toString());
         this.show=false;
        });
        reader.readAsText(file);
      })

  }

}
