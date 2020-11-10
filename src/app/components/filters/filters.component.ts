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
  launchStatus:any;
  landStatus:any


  constructor(
    private eventService: EventService,
    private spaceXLaunchService: SpaceXLaunchService
    ) { }

  ngOnInit() {
  } 


  setSelectedStatus(){
    this.launchStatus= this.selectedLaunch == '' ? 'True' : this.selectedLaunch;
    this.landStatus = this.selectedLanding == '' ? 'True' : this.selectedLanding;
    this.launchStatus = this.launchStatus == 'True' ? true : false;
    this.landStatus = this.landStatus == 'True' ? true : false;
  }

  filterData(year) {
    this.selectedYear = this.selectedYear == year ? '': year ;
    if(this.selectedYear == ''){
       if(this.launchStatus !== '' && this.landStatus !== ''){
        this.getLandingData();
       }
       else if(this.launchStatus !== ''){
        this.getLaunchData();
      }else{
        this.getLandingData();
      }
    }
    else if(this.checkFilterStatus()){
      this.setSelectedStatus();
      this.getMultiFilterData(this.selectedYear,this.launchStatus,this.landStatus);
    }else{
    this.getFilterYearData(year);
    }
  }

  filterLaunchData(selectedLaunch) {
    this.selectedLaunch = this.selectedLaunch == selectedLaunch ? '': selectedLaunch ;
    if(this.selectedLaunch == ''){
      this.setSelectedStatus();
      this.getMultiFilterData(this.selectedYear,this.launchStatus,this.landStatus);
    }
    else if(this.checkFilterStatus()){
      this.setSelectedStatus();
      this.getMultiFilterData(this.selectedYear,this.launchStatus,this.landStatus);
    }else{
      this.getLaunchData();
    }
  }

  filterLandingData(selectedLanding) {
   this.selectedLanding = this.selectedLanding == selectedLanding ? '': selectedLanding ;
   if(this.checkFilterStatus()){
    this.setSelectedStatus();
    this.getMultiFilterData(this.selectedYear,this.launchStatus,this.landStatus);
  }else{
    this.getLandingData();
   }
  }


  checkFilterStatus(){
    if((this.selectedYear && this.selectedLaunch) || (this.selectedYear && this.selectedLanding) ||(this.selectedYear && this.selectedLaunch && this.selectedLanding)){
      return true;
    }
   return false;
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
    this.setSelectedStatus();
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

  getLandingData() {
    this.setSelectedStatus();
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

 
  getMultiFilterData(year,launch_success=true,land_success=true){
    this.spaceXLaunchService.getSpaceXDataUsingMultipleFilters(year, launch_success,land_success)
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

  getHomeData(){
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
