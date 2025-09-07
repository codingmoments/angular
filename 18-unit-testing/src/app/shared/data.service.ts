export class DataService {
  getDetails() {
    const resultPromise = new Promise<string>( ( resolve, reject ) => {
      setTimeout( () => {
        resolve( 'Data' );
      }, 2000 );
    } );
    return resultPromise;
  }
}