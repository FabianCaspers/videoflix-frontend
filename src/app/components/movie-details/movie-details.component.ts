import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title,Meta } from '@angular/platform-browser';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  constructor(
    private service: MoviesService,
    private router: ActivatedRoute,
    private title: Title,
    private meta: Meta) { }
  getMovieDetailResult:any;
  getMovieVideoResult:any;
  getMovieCastResult:any;
  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    this.getMovie(getParamId);
    this.getVideo(getParamId);
    this.getMovieCast(getParamId);
  }

  playTrailer(): void {
    const trailerLink = document.getElementById('watch-trailer-link') as HTMLAnchorElement;
    const trailerIframe = document.getElementById('trailer-iframe') as HTMLIFrameElement;

    // Setzen Sie die Quelle des iframe auf den Trailer-Link
    trailerIframe.src = trailerLink.href;

    // Verstecken Sie den Link und zeigen Sie den Div-Container mit dem Trailer an
    trailerLink.style.display = 'none';
    trailerIframe.style.display = 'block';
  }
  


  getMovie(id:any){
    this.service.getMovieDetails(id).subscribe(async(result)=>{
        this.getMovieDetailResult = await result;

        // updatetags
        this.title.setTitle(`${this.getMovieDetailResult.original_title} | ${this.getMovieDetailResult.tagline}`);
        this.meta.updateTag({name:'title',content:this.getMovieDetailResult.original_title});
        this.meta.updateTag({name:'description',content:this.getMovieDetailResult.overview});
    });
  }

  getVideo(id:any) {
    this.service.getMovieVideo(id).subscribe((result)=>{
        result.results.forEach((element:any) => {
            if(element.type=="Trailer")
            {
              this.getMovieVideoResult = element.key;
            }
        });

    });
  }

  getMovieCast(id:any) {
    this.service.getMovieCast(id).subscribe((result)=>{
      this.getMovieCastResult = result.cast;
    });
  }
}
