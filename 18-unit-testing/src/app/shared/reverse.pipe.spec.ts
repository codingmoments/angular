import { ReversePipe } from "./reverse.pipe";

describe( 'ReversePipe', () => {

  it( 'should reverse', () => {
    let reversePipe = new ReversePipe();
    expect( reversePipe.transform( 'hello!' ) ).toEqual( '!olleh' );
  } );

} );