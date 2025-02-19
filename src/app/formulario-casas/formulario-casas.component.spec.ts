import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCasasComponent } from './formulario-casas.component';

describe('FormularioCasasComponent', () => {
  let component: FormularioCasasComponent;
  let fixture: ComponentFixture<FormularioCasasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCasasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCasasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
