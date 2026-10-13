import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProductDetails } from './product-details';

describe('ProductDetails', () => {
  let fixture: ComponentFixture<ProductDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetails],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetails);
  });

  it('shows the product with the id from the URL', async () => {
    fixture.componentRef.setInput('id', '2');
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Smartphone');
  });

  it('shows a message when the product does not exist', async () => {
    fixture.componentRef.setInput('id', '99');
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('this product does not exist');
  });
});
