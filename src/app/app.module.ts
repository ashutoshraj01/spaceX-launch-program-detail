import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import {TransferHttpCacheModule} from '@nguniversal/common';
import { HeaderComponent } from './components/header/header.component';
import { FiltersComponent } from './components/filters/filters.component';
import { FooterComponent } from './components/footer/footer.component';
import { LaunchListComponent } from './components/launch-list/launch-list.component';
import { SpaceXLaunchService } from './services/spaceX-launch-program.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EventService } from './services/event.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FiltersComponent,
    FooterComponent,
    LaunchListComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot([
     // { path: '', component: HomeComponent, pathMatch: 'full'},
    ]),
    TransferHttpCacheModule,
  ],
  providers: [SpaceXLaunchService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
