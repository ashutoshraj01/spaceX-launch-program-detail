import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LaunchListComponent } from './launch-list.component';
import 'jasmine';
import {SpaceXLaunchService} from '../../../app/services/spaceX-launch-program.service';
import { of } from 'rxjs/observable/of';

describe('FooterComponent', () => {
  let component: LaunchListComponent;
  let fixture: ComponentFixture<LaunchListComponent>;
  const spaceXLaunchService = jasmine.createSpyObj('SpaceXLaunchService', [
    'getSpaceXLaunchData',
    'getSpaceXLaunchYearDataUsingFilters',
    'getSpaceXLaunchDataUsingFilters',
    'getSpaceXLandingDataUsingFilters'
  ]);


  const spaceXLaunchSpy = spaceXLaunchService.getSpaceXLaunchData.and.returnValue(
    of([])
  );


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LaunchListComponent],
      providers: [
        { provide: SpaceXLaunchService, useValue: spaceXLaunchService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should be called', () => {
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('Should test is getSpaceXLaunchData function called', () => {
    const filterResponse = [];
    spaceXLaunchService.getSpaceXLaunchData.and.returnValue(
      of(filterResponse)
    );
    component.ngOnInit();
    expect(spaceXLaunchService.getSpaceXLaunchData).toHaveBeenCalled();
  });
});