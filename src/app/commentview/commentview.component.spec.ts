import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentviewComponent } from './commentview.component';

describe('CommentviewComponent', () => {
  let component: CommentviewComponent;
  let fixture: ComponentFixture<CommentviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
