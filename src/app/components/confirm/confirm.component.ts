import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-confirm',
  template: '',
  styles: []
})
export class ConfirmComponent implements OnInit {
  
  backendUrl = 'http://localhost:8000/authentication/confirm';

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const uid = this.route.snapshot.queryParamMap.get('uid');
    const token = this.route.snapshot.queryParamMap.get('token');

    this.http.get(`${this.backendUrl}/${uid}/${token}/`).subscribe(
      (response) => {
        console.log("Confirmation response: ", response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error("Error during confirmation: ", error);
      }
    );
  }
}
