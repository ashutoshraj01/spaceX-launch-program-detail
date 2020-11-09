import { Component, Inject, OnInit } from '@angular/core';
import {SpaceXLaunchService} from '../../../app/services/spaceX-launch-program.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { EventService } from '../../services/event.service';


@Component({
  selector: 'app-launch-list',
  templateUrl: './launch-list.component.html',
  styleUrls: ['./launch-list.component.css'],
})
export class LaunchListComponent implements OnInit {
  data: any;
  scrWidth: any = 655;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private spaceXLaunchService: SpaceXLaunchService,
    private eventService: EventService
    ) {

  }



  ngOnInit() {
    this.eventService.on<any>().subscribe(
      data => {
        this.data = data;
      }
    );



    if (isPlatformBrowser(this.platformId)) {
      this.scrWidth = window.innerWidth;
   }
    this.spaceXLaunchService.getSpaceXLaunchData()
    .subscribe(
      res => {
        if (res) {
             this.data = res;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
