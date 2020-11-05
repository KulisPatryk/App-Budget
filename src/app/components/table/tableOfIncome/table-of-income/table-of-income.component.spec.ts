import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOfIncomeComponent } from './table-of-income.component';

describe('TableOfIncomeComponent', () => {
  let component: TableOfIncomeComponent;
  let fixture: ComponentFixture<TableOfIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableOfIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOfIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
