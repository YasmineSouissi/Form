import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomePaneComponent } from './welcome-pane.component';

describe('WelcomePaneComponent', () => {
  let component: WelcomePaneComponent;
  let fixture: ComponentFixture<WelcomePaneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomePaneComponent]
    });
    fixture = TestBed.createComponent(WelcomePaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
