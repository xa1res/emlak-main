import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component'; // FooterComponent yolu düzeltildi
import { datas } from '../../../../public/assets/datas/generic-datas/data'; // datas yolu düzeltildi

// Ilan ve Danisman arayüzlerini tanımlayın
interface Ilan {
  id: string;
  imageURL: string;
  title: string;
  price: number;
  location: string;
  emlakci: string;
  durum: string;
  konumLinki?: string;
  aciklama?: string;
  m2: number;
  odaSayisi: string;
  ilanTarihi?: string;
  emlakTipi?: string;
  binaYasi?: number | null; // Arsa için null olabilir
  bulunduguKat?: string | null;
  katSayisi?: number | null;
  isitma?: string | null;
  banyoSayisi?: string | null;
  mutfakTipi?: string | null;
  balkon?: string;
  asansor?: string;
  otopark?: string;
  esyali?: string;
  kullanimDurumu?: string;
  siteIcerisinde?: string;
  krediyeUygun?: string;
  tapuDurumu?: string;
  kimden?: string;
  takas?: string;
}

interface Danisman {
  foto: string;
  url: string;
  isim: string;
  hakkimda: string;
  telefon: string;
  mail: string;
  instagram?: string;
  whatsapp?: string;
  endeksa?: string;
  properties: Ilan[];
}

@Component({
  selector: 'app-ilan-detay',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    RouterLink,
    CurrencyPipe,
    FooterComponent
  ],
  templateUrl: './ilan-detay.html',
  styleUrl: './ilan-detay.css'
})
export class IlanDetayComponent implements OnInit {
  ilan: Ilan | undefined;
  danisman: Danisman | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const ilanId = params.get('id');
      if (ilanId) {
        for (const danismanData of datas) {
          const foundIlan = danismanData.properties.find((p: Ilan) => p.id === ilanId);
          if (foundIlan) {
            this.ilan = foundIlan as Ilan;
            this.danisman = danismanData as Danisman;
            break;
          }
        }
      }
    });
  }

  get aciklamaSatirlari(): string[] {
    return this.ilan?.aciklama
      ? this.ilan.aciklama.split('\n').filter((line: string) => line.trim())
      : [];
  }

  // Bu helper fonksiyonlar artık kullanılmıyor, ngOnInit içinde birleştirildi.
  // İsterseniz silebilirsiniz.
  private findIlanById(id: string): Ilan | undefined {
    for (const data of datas) {
      const ilan = data.properties.find((p: Ilan) => p.id === id);
      if (ilan) {
        return ilan;
      }
    }
    return undefined;
  }

  private findDanismanByIlan(ilan: Ilan): Danisman | undefined {
    // Burada ilan.emlakci ile datas dizisindeki danışmanı bulmalısınız.
    // Eğer danışmanın ID'si olsaydı daha kolay olurdu.
    return datas.find((d: Danisman) => d.isim === ilan.emlakci);
  }
}