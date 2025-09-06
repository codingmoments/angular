import { ComponentFixture, TestBed } from '@angular/core/testing';

import { User } from './user';
import { UserService } from './user.service';

describe( 'User', () => {
  let component: User;
  let userService: UserService;
  let fixture: ComponentFixture<User>;

  beforeEach( async () => {
    await TestBed.configureTestingModule( {
      imports: [ User ]
    } )
      .compileComponents();

    fixture = TestBed.createComponent( User );
    component = fixture.componentInstance;
    userService = fixture.debugElement.injector.get( UserService );
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );

  it( 'should have the user name from the service ', () => {
    expect( userService.user.name ).toBe( component.user.name );
  } );

  it( 'should display the user name if logged in', () => {
    component.isLoggedIn = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect( compiled.querySelector( 'p' )?.textContent ).toContain( component.user.name );
  } );

    it( 'shouldn\'t display the user name if logged in', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect( compiled.querySelector( 'p' )?.textContent ).not.toContain( component.user.name );
  } );
} );
