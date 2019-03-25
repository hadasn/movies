import { Component, OnInit, Inject } from '@angular/core';
import { MoviesService } from '../movies.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';



@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {


 searchForm  : FormGroup;
 submitted : boolean = false;
 term : string;
 movies : any;
 error: boolean = false;
 errorMsg : string;

  constructor(private moviesService: MoviesService, private formBuilder: FormBuilder, private dialog: MatDialog) { 
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
           this.movies = res;
           this.movies = this.movies.Search;
        });
    }
    else{
     this.error = true;
     this.errorMsg = "Must be at least 3 characters long."
        return;
    }
  }

  ngOnInit() {
     this.moviesService.getMovies().subscribe((res) => {
        this.movies = res.Search;
     });
  }

/*
  openDialog(movie) : void{
     const dialogRef = this.dialog.open(MovieDetailsComponent);
  }
  */
  
}




