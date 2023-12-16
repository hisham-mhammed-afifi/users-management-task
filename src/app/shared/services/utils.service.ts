import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF, { CellConfig } from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  /**
   *
   * @param element HTML element to be exported
   * @param fileWidth
   * @param fileName
   */
  exportPDF(
    element: HTMLElement,
    fileWidth = 212,
    fileName = Date.now().toString()
  ): void {
    html2canvas(element).then((canvas) => {
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const image = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(image, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(fileName + '.pdf');
    });
  }

  /**
   *
   * @param data the data you want to be printed as a table
   * @param headers is Array of strings - represent the column titles
   * @param fileName the printed file name
   */
  exportTablePDF(
    data: Record<string, string>[],
    headers: string[],
    fileName = Date.now().toString()
  ) {
    const PDF = new jsPDF({ putOnlyUsedFonts: true, orientation: 'p' });
    PDF.table(4, 1, data, this.createHeaders(headers), {
      autoSize: true,
      headerBackgroundColor: '#FB923C',
      headerTextColor: '#FFFFFF',
      fontSize: 11,
    });
    PDF.save(fileName + '.pdf');
  }

  private createHeaders(keys: string[]): CellConfig[] {
    var result: CellConfig[] = [];
    for (var i = 0; i < keys.length; i += 1) {
      result.push({
        name: keys[i],
        prompt: keys[i],
        align: 'center',
        padding: 0,
        width: 75,
      });
    }
    return result;
  }

  stringifyObjectValues(object: Record<string, any>): Record<string, string> {
    for (const key in object) {
      object[key] = object[key] + '';
    }
    return object;
  }

  randomNumber(): number {
    return Math.floor(Math.random() * 9) + 1;
  }
}
