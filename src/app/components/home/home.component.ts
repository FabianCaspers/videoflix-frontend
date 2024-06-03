import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Title, Meta } from '@angular/platform-browser';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Carousel } from 'bootstrap';
import { VideoService } from 'src/app/services/video-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private service: MoviesService, private title: Title, private meta: Meta, private videoService: VideoService) {
    this.title.setTitle('Home - showtime');
    this.meta.updateTag({ name: 'description', content: 'watch online movies' });

    this.mediaQueryList = window.matchMedia("(max-width: 990px)");
    this.mediaQueryListener = () => this.isSmallScreen = this.mediaQueryList.matches;
    this.mediaQueryList.addListener(this.mediaQueryListener);

  }

  bannerResult: any = [];
  trendingMovieResult: any = [];
  actionMovieResult: any = [];
  adventureMovieResult: any = [];
  animationMovieResult: any = [];
  comedyMovieResult: any = [];
  documentaryMovieResult: any = [];
  sciencefictionMovieResult: any = [];
  thrillerMovieResult: any = [];
  isSmallScreen: boolean;
  mediaQueryList: MediaQueryList;
  mediaQueryListener: () => void;
  currentIndex: number = 0;
  ownMovies: any = [];

  creatorMovies = [
    { video_url: '../../../assets/videos/24496-344562743_small.mp4' },
    { video_url: '../../../assets/videos/28052-367411298_small.mp4' },
    { video_url: '../../../assets/videos/202844-919000222_tiny.mp4' },
    { video_url: '../../../assets/videos/21551-319487844_tiny.mp4' },
    { video_url: '../../../assets/videos/32132-390688056_small.mp4' },
    { video_url: '../../../assets/videos/33871-398473585_tiny.mp4' },
  ];


  ngOnInit(): void {
    this.bannerData();
    this.trendingData();
    this.actionMovie();
    this.adventureMovie();
    this.comedyMovie();
    this.animationMovie();
    this.documentaryMovie();
    this.sciencefictionMovie();
    this.thrillerMovie();
    this.getOwnMovies();
    this.isSmallScreen = this.mediaQueryList.matches;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSmallScreen = event.target.innerWidth <= 990;
  }


  ngOnDestroy(): void {
    this.mediaQueryList.removeListener(this.mediaQueryListener);
  }

  onSlide(event: any) {
    let carousel: Carousel = event.target;
    this.currentIndex = carousel.getActiveIndex(); // Aktualisieren des aktuellen Index
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.bannerResult.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.bannerResult.length) % this.bannerResult.length;
  }

  getOwnMovies() {
    this.videoService.getVideos().subscribe((data) => {
      this.ownMovies = data;
    });
  }


  // bannerdata
  bannerData() {
    this.service.bannerApiData().subscribe((result) => {
      this.bannerResult = result.results;
    });
  }

  trendingData() {
    this.service.trendingMovieApiData().subscribe((result) => {
      this.trendingMovieResult = result.results;
    });
  }

  // action 
  actionMovie() {
    this.service.fetchActionMovies().subscribe((result) => {
      this.actionMovieResult = result.results;
    });
  }

  // adventure 
  adventureMovie() {
    this.service.fetchAdventureMovies().subscribe((result) => {
      this.adventureMovieResult = result.results;
    });
  }


  // animation 
  animationMovie() {
    this.service.fetchAnimationMovies().subscribe((result) => {
      this.animationMovieResult = result.results;
    });
  }


  // comedy 
  comedyMovie() {
    this.service.fetchComedyMovies().subscribe((result) => {
      this.comedyMovieResult = result.results;
    });
  }

  // documentary 
  documentaryMovie() {
    this.service.fetchDocumentaryMovies().subscribe((result) => {
      this.documentaryMovieResult = result.results;
    });
  }


  // science-fiction 
  sciencefictionMovie() {
    this.service.fetchScienceFictionMovies().subscribe((result) => {
      this.sciencefictionMovieResult = result.results;
    });
  }

  // thriller
  thrillerMovie() {
    this.service.fetchThrillerMovies().subscribe((result) => {
      this.thrillerMovieResult = result.results;
    });
  }

}
