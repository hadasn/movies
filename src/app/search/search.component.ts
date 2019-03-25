import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

 searchForm  : FormGroup;
 submitted : boolean = false;
 term : string;
 movies : any;
 error: boolean = false;
 errorMsg : string;

  constructor(private moviesService: MoviesService, private formBuilder: FormBuilder) {

  this.searchForm = this.formBuilder.group({
      searchInput: ['', [Validators.required, Validators.minLength(3)]]
   });
 }

  get f() { 
    return this.searchForm.controls; 
  }

  doSearch(searchForm: FormGroup) {
    this.submitted = true;
    if (this.searchForm.valid) { 
         this.term = (this.searchForm.value.searchInput).trim();
          this.moviesService.getMoviesByName(this.term).subscribe((res) => {
           this.moviesService.movies = res;
           console.log(res);
        });
    }
    else{
     this.error = true;
     this.errorMsg = "Must be at least 3 characters long."
        return;
    }
  }
    

}
