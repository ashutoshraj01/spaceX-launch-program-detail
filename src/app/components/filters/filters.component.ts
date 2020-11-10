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
  launchStatus: any;
  landStatus: any;


  constructor(
    private eventService: EventService,
    private spaceXLaunchService: SpaceXLaunchService
    ) { }

  ngOnInit() {}

  getSelectedFilterData(){
    this.setSelectedStatus();
    // none of the filters selected
   if((this.selectedYear == '' || this.selectedYear == undefined) && this.selectedLanding == '' && this.selectedLaunch == ''){
     this.getHomeData();
   } // All of the filters selected
   else if((this.selectedYear != '' || this.selectedYear != undefined) && this.selectedLanding != '' && this.selectedLaunch != ''){
     this.getMultiFilterData(this.selectedYear,this.launchStatus,this.landStatus);
   } // Only Year is selected 
   else if(this.selectedYear && (this.selectedLanding == '' && this.selectedLaunch == '')){
     this.getFilterYearData(this.selectedYear);
   }// Only Launch is selected
   else if(this.selectedLaunch && (this.selectedLanding == '' && (this.selectedYear =='' || this.selectedYear == undefined))){
    this.getLaunchData();
   }// Only Landing is selected
   else if(this.selectedLanding && (this.selectedLaunch == '' && (this.selectedYear =='' || this.selectedYear == undefined))){
    this.getLaunchAndLandingData();
   }// Year and Launch is selected
   else if((this.selectedYear && this.selectedLaunch) && this.selectedLanding ==  ''){
     this.getMultiFilterData(this.selectedYear, this.launchStatus);
   } // Year and Land is selected
   else if((this.selectedYear && this.selectedLanding) && this.selectedLaunch ==  ''){
    this.getMultiFilterData(this.selectedYear,this.launchStatus,this.landStatus);
  }// Land and Launch is selected
  else if((this.selectedLanding && this.selectedLaunch) && (this.selectedYear =='' || this.selectedYear == undefined)){
    this.getLaunchAndLandingData();
  } 
    
  }

  setSelectedStatus() {
    this.launchStatus = this.selectedLaunch == '' ? 'True' : this.selectedLaunch;
    this.landStatus = this.selectedLanding == '' ? 'True' : this.selectedLanding;
    this.launchStatus = this.launchStatus == 'True' ? true : false;
    this.landStatus = this.landStatus == 'True' ? true : false;
  }

  filterData(year) {
    this.selectedYear = this.selectedYear == year ? '' : year ;
   this.getSelectedFilterData();
  }

  filterLaunchData(selectedLaunch) {
    this.selectedLaunch = this.selectedLaunch == selectedLaunch ? '' : selectedLaunch ;
    this.getSelectedFilterData();
  }

  filterLandingData(selectedLanding) {
   this.selectedLanding = this.selectedLanding == selectedLanding ? '' : selectedLanding ;
   this.getSelectedFilterData();
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

  getLaunchData() {
    this.spaceXLaunchService.getSpaceXLaunchDataUsingFilters(this.launchStatus)
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

  getLaunchAndLandingData() {
    this.spaceXLaunchService.getSpaceXDataUsingFilters(this.launchStatus,
      this.landStatus)
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


  getMultiFilterData(year, launch_success= true, land_success= true) {
    this.spaceXLaunchService.getSpaceXDataUsingMultipleFilters(year, launch_success, land_success)
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

  getHomeData() {
    this.spaceXLaunchService.getSpaceXLaunchData()
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
}
