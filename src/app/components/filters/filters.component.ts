import { Component, OnInit } from '@angular/core';
import {SpaceXLaunchService} from '../../../app/services/spaceX-launch-program.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'], })
export class FiltersComponent implements OnInit {
  launchYears = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];
  successfulLanding = ['True', 'False'];
  successfulLaunch = ['True', 'False'];
  selectedLaunch = '';
  selectedYear: '';
  selectedLanding = '';
  data: any;


  constructor(
    private eventService: EventService,
    private spaceXLaunchService: SpaceXLaunchService
    ) { }


  ngOnInit() {

  }


  getFilterYearData(launchYear) {
    this.spaceXLaunchService.getSpaceXLaunchYearDataUsingFilters(launchYear)
    .subscribe(
      res => {
        if (res) {
             this.data = res;
             this.eventService.emit<any>(this.data);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getLaunchData(data) {
    this.spaceXLaunchService.getSpaceXLaunchDataUsingFilters(data)
    .subscribe(
      res => {
        if (res) {
             this.data = res;
             this.eventService.emit<any>(this.data);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getLandingData(data) {
    this.spaceXLaunchService.getSpaceXLandingDataUsingFilters(data)
    .subscribe(
      res => {
        if (res) {
             this.data = res;
             this.eventService.emit<any>(this.data);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  filterData(event: any, year) {
    this.selectedYear = year;
    this.selectedLanding = '';
    this.selectedLaunch = '';
    this.getFilterYearData(year);
  }

  filterLaunchData(event, data) {
    this.selectedYear = '';
    this.selectedLanding = '';
    this.selectedLaunch = data;
      data = data === 'True' ? 'true' : 'false';
      this.getLaunchData(data);
  }

  filterLandingData(event, data) {
   this.selectedLanding = data;
   this.selectedYear = '';
   this.selectedLaunch = '';
      data = data === 'True' ? 'true' : 'false';
      this.getLandingData(data);
  }


}
