import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostmainComponent } from './postmain.component';

describe('PostmainComponent', () => {
  let component: PostmainComponent;
  let fixture: ComponentFixture<PostmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostmainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
