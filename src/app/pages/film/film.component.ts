import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, forkJoin, tap } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-films',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
})
export class FilmComponent {
  loading = false;
  data: any = {};
  dataBoxOffice: any = {};
  dataSimilars: any = {};
  dataVideos: any = {};
  dataReviews: any = {};
  id!: number;
  routeSub: any;

  @ViewChild('sayHelloTemplate', { read: TemplateRef })
  sayHelloTemplate!: TemplateRef<any>;

  constructor(private api: ApiService, private route: ActivatedRoute) {}
  getInfoFilms(): any {
    this.loading = true;

    const getFilms$ = this.api.getFilm(this.id).pipe(
      tap((cinema: any) => {
        this.data = cinema;
      })
    );

    const getBoxOffice$ = this.api.getBoxOffice(this.id).pipe(
      tap((dataBoxOffice: any) => {
        this.dataBoxOffice = dataBoxOffice;
      })
    );

    const getSimilars$ = this.api.getSimilars(this.id).pipe(
      tap((dataSimilars: any) => {
        this.dataSimilars = dataSimilars;
      })
    );

    const getFacts$ = this.api.getVideos(this.id).pipe(
      tap((dataVideos: any) => {
        this.dataVideos = dataVideos.items.filter((video: any) => {
          return video.site === 'YOUTUBE';
        });
      })
    );

    const getReviews$ = this.api.getReviews(this.id).pipe(
      tap((dataInfoReviews: any) => {
        this.dataReviews = dataInfoReviews;
      })
    );

    const requests: any = [
      getFilms$,
      getBoxOffice$,
      getSimilars$,
      getFacts$,
      getReviews$,
    ];

    forkJoin(requests)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }

  searchYoutube() {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      console.log(params);
      console.log(params['id']);
      this.id = +params['id'];
      this.getInfoFilms();
    });

    // console.log(this.route.snapshot)
    console.log(this.dataVideos);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
