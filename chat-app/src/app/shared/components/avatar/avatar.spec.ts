import { TestBed } from '@angular/core/testing';
import { Avatar } from './avatar';

describe('Avatar', () => {
  it('muestra las iniciales y el color indicado', async () => {
    const fixture = TestBed.createComponent(Avatar);
    // setInput simula lo que el componente padre le enviaría.
    fixture.componentRef.setInput('initials', 'AT');
    fixture.componentRef.setInput('color', 3);
    fixture.componentRef.setInput('online', true);
    await fixture.whenStable();

    const span = (fixture.nativeElement as HTMLElement).querySelector('.avatar');
    expect(span?.textContent).toContain('AT');
    expect(span?.classList).toContain('avatar--3');
    expect(span?.querySelector('.avatar__status')).not.toBeNull();
  });
});
