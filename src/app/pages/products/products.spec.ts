import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Products } from './products';

describe('Products', () => {
  let fixture: ComponentFixture<Products>;

  function shownProducts(): string[] {
    const titles: NodeListOf<HTMLElement> =
      fixture.nativeElement.querySelectorAll('app-product-card h2');
    return Array.from(titles, (title) => title.textContent?.trim() ?? '');
  }

  async function search(text: string): Promise<void> {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = text;
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Products],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Products);
    await fixture.whenStable();
  });

  it('shows all products', () => {
    expect(shownProducts()).toEqual(['Laptop', 'Smartphone', 'Headphones']);
  });

  it('filters the list while typing', async () => {
    await search('lap');

    expect(shownProducts()).toEqual(['Laptop']);
  });

  it('shows a message when nothing matches', async () => {
    await search('tablet');

    expect(shownProducts()).toEqual([]);
    expect(fixture.nativeElement.textContent).toContain('No products found for "tablet"');
  });
});
