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
    const youtubeLink = `https://www.youtube.com/watch?v=${this.getMovieVideoResult}`;
    
    window.open(youtubeLink, '_blank');

    const trailerLink = document.getElementById('watch-trailer-link') as HTMLAnchorElement;
    trailerLink.style.display = 'none';
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
