import { Component, OnInit } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  loading = false;
  top250: any = {};

  constructor(private api: ApiService) {}

  getTop() {
    this.loading = true;
    this.api
      .getTop()
      .pipe(
        tap((dataTop250) => {
          this.top250 = dataTop250;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.getTop();
  }
}
