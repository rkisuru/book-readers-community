import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnedBooksComponent } from './return-books.component';

describe('ReturnBooksComponent', () => {
  let component: ReturnedBooksComponent;
  let fixture: ComponentFixture<ReturnedBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReturnedBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
