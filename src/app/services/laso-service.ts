import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LasoService {
  findSimilar(bazi: any): Promise<any[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { 
            laso_id: 'LS001', 
            tc1: 'Giáp', dc1: 'Tý', 
            tc2: 'Ất', dc2: 'Sửu', 
            tc3: 'Bính', dc3: 'Dần', 
            tc4: 'Đinh', dc4: 'Mão',
            last_modified: '2024-01-01'
          },
          { 
            laso_id: 'LS002', 
            tc1: 'Mậu', dc1: 'Thìn', 
            tc2: 'Kỷ', dc2: 'Tỵ', 
            tc3: 'Canh', dc3: 'Ngọ', 
            tc4: 'Tân', dc4: 'Mùi',
            last_modified: '2024-02-15'
          },
          { 
            laso_id: 'LS003', 
            tc1: 'Nhâm', dc1: 'Thân', 
            tc2: 'Quý', dc2: 'Dậu', 
            tc3: 'Giáp', dc3: 'Tuất', 
            tc4: 'Ất', dc4: 'Hợi',
            last_modified: '2024-03-20'
          },
          { 
            laso_id: 'LS004', 
            tc1: 'Bính', dc1: 'Tý', 
            tc2: 'Đinh', dc2: 'Sửu', 
            tc3: 'Mậu', dc3: 'Dần', 
            tc4: 'Kỷ', dc4: 'Mão',
            last_modified: '2024-04-10'
          },
          { 
            laso_id: 'LS005', 
            tc1: 'Canh', dc1: 'Thìn', 
            tc2: 'Tân', dc2: 'Tỵ', 
            tc3: 'Nhâm', dc3: 'Ngọ', 
            tc4: 'Quý', dc4: 'Mùi',
            last_modified: '2024-05-05'
          }
        ]);
      }, 500);
    });
  }
}
