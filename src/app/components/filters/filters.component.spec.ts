import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltersComponent } from './filters.component';
import 'jasmine';
import {SpaceXLaunchService} from '../../../app/services/spaceX-launch-program.service';
import { of } from 'rxjs/observable/of';

describe('FooterComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  const spaceXLaunchService = jasmine.createSpyObj('SpaceXLaunchService', [
    'getSpaceXLaunchData',
    'getSpaceXLaunchYearDataUsingFilters',
    'getSpaceXLaunchDataUsingFilters',
    'getSpaceXLandingDataUsingFilters'
  ]);


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FiltersComponent],
      providers: [
        { provide: SpaceXLaunchService, useValue: spaceXLaunchService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have heading as 'Filters'`, async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Filters');
  }));
  
  it('filterLandingData should call getLandingData', () => {
    spyOn(component, 'filterLandingData');
     component.filterLandingData({},'');
    expect(component.getLandingData).toHaveBeenCalled();
  });

  it('filterLaunchData should call getLaunchData', () => {
    spyOn(component, 'filterLaunchData');
     component.filterLaunchData({},'');
    expect(component.getLaunchData).toHaveBeenCalled();
  });


  it('filterData should call getLandingData', () => {
    spyOn(component, 'filterData');
     component.filterData({},'');
    expect(component.getFilterYearData).toHaveBeenCalled();
  });

  it('Should test is getSpaceXLaunchData function called', () => {
    const filterResponse = [];
    spaceXLaunchService.getSpaceXLaunchData.and.returnValue(
      of(filterResponse)
    );
    component.getLandingData({});
    expect(spaceXLaunchService.getSpaceXLaunchData).toHaveBeenCalled();
  });
});