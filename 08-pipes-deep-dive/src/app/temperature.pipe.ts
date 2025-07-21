import { Pipe, PipeTransform, input, output } from "@angular/core";

@Pipe( {
  name: 'temp',
  standalone: true
} )
export class TemperaturePipe implements PipeTransform {
  transform( value: string | number, inputType: 'C' | 'F', outputType?: 'C' | 'F' ): string {
    let val: number;
    if ( typeof value === 'string' ) {
      val = parseFloat( value );
    } else {
      val = value;
    }

    let outputTemp: number;
    if ( inputType === 'C' && outputType === 'F' ) {
      outputTemp = val * 1.8 + 32;
    } else if ( inputType === 'F' && outputType === 'C' ) {
      outputTemp = ( val - 32 ) / 1.8;
    } else {
      outputTemp = val;
    }

    let symbol: '°C' | '°F';
    if ( !outputType ) {
      symbol = inputType === 'C' ? '°C' : '°F';
    } else {
      symbol = outputType === 'C' ? '°C' : '°F';
    }

    return `${ outputTemp } ${ symbol }`;
  }
}