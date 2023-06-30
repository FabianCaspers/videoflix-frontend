import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup, FormBuilder} from '@angular/forms';
import { Title,Meta } from '@angular/platform-browser';
import { MoviesService } from 'src/app/services/movies.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(
    private service: MoviesService,
    private title: Title,
    private meta: Meta) {
    this.title.setTitle('Search movies - showtime');
    this.meta.updateTag({name:'description',content:'search here movies like avatar,war etc'});
   }

  ngOnInit(): void {
  }

  searchResult:any;
  searchForm = new FormGroup({
    'movieName':new FormControl(null)
  });

  submitForm() {
      this.service.getSearchMovie(this.searchForm.value).subscribe((result)=>{
          this.searchResult = result.results;
      });
  }
}
