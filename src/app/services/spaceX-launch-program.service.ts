import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
@Injectable()
export class SpaceXLaunchService {
    SPACEX_FIRST_TIME_LOAD_HOME_DATA;
    SPACEX_GET_DATA_USING_YEAR_FILTER;
  constructor(
    private httpClient: HttpClient
    ) {
    this.SPACEX_FIRST_TIME_LOAD_HOME_DATA = env.SPACEX_FIRST_TIME_LOAD_DATA;
  }


  getSpaceXLaunchData() {
      return this.httpClient.get(this.SPACEX_FIRST_TIME_LOAD_HOME_DATA);
  }

  getSpaceXLaunchYearDataUsingFilters(reqYear: Number) {
    return this.httpClient.get(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=${reqYear}`);
  }
 getSpaceXLaunchDataUsingFilters(launch_success) {
  return this.httpClient.get(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${launch_success}`);
 }

 getSpaceXDataUsingFilters(launch_success,land_success) {
  return this.httpClient.get(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${launch_success}&land_success=${land_success}`);
 }
 
 getSpaceXDataUsingMultipleFilters(year,launch_success, land_success) {
  return this.httpClient.get(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${launch_success}&land_success=${land_success}&launch_year=${year}`);
 }

}
