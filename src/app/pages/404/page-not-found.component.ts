import { Component } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
	selector: 'page-not-found',
	templateUrl: './page-not-found.component.html',
})

export class PageNotFoundComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute){
  }

}
