import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <h2>
      Developed By:
    </h2>
    <span class="developedBy">Ashutosh Raj</span>
  `,
  styles: [`
  *{
    text-align: center;
  }
  span{ display:block;
   padding-bottom:10px;
   }
   h2{
     margin-bottom:10px;
   }
  `]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
