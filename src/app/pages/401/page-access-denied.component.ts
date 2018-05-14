import { Component } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
	selector: 'page-access-denied',
	templateUrl: './page-access-denied.component.html',
})

export class PageAccessDeniedComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute){
  }

}
