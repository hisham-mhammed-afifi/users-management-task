import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

  randomNumber(): number {
    return Math.floor(Math.random() * 9) + 1;
  }
}
