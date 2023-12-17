import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF, { CellConfig } from 'jspdf';
import { DateFilter } from 'src/app/layout/models/DateFilter.enum';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  /**
   *
   * @param text to be parsed to number
   * @returns the number representation for the given text
   */
  parseToNum(text: string): number {
    if (isNaN(+text)) return 0;
    return Number(text);
  }

  /**
   *
   * @param filter of type @enum DateFilter
   * @returns a date to start @interface Date - and the end date is today
   */
  getStartDate(filter: DateFilter): Date {
    let now = new Date();
    let start = new Date(0);
    switch (filter) {
      case DateFilter.ThisWeek:
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case DateFilter.ThisMonth:
        start = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case DateFilter.ThisYear:
        start = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      default:
        start = new Date(0);
        break;
    }

    return start;
  }

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
