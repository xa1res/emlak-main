import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class BlogComponent {
  blogPosts = [
    {
      slug: 'degerleme-hizmeti',
      author: 'admin',
      date: 'Nisan 30, 2025',
      title: 'Değerleme Hizmeti',
      image: 'https://www.hepsiemlak.com/emlak-yasam/wp-content/uploads/2018/09/ev-satisi-icin-ilan-aciklamasina-neler-yazilmalidir-4.jpg',
      snippet: 'Gayrimenkul yatırımları, önemli finansal kararlar almayı gerektiren uzun vadeli yatırımlardır. Yatırımcıların veya satıcıların mülklerinin gerçek'
    },
    {
      slug: 'gelecegi-planlama',
      author: 'admin',
      date: 'Nisan 30, 2025',
      title: 'Geleceği Planlama',
      image: 'https://www.speakeragency.com.tr/media/2qpixzbk/yatirim-arac-lari.jpg',
      snippet: 'Geleceği planlamak, yalnızca kısa vadeli hedeflere ulaşmaktan çok daha fazlasıdır. İster bireysel, ister kurumsal düzeyde'
    },
    {
      slug: 'yatirim-danismanligi',
      author: 'admin',
      date: 'Nisan 30, 2025',
      title: 'Yatırım Danışmanlığı',
      image: 'https://www.turkiyefinansala.com/tr-tr/ala-hayat-blog/PublishingImages/yatirimaraci-blog-v1.png',
      snippet: 'Yatırım, doğru yapıldığında geleceği güvence altına almanın en etkili yollarından biridir. Ancak her yatırım fırsatı,'
    },
    {
      slug: 'gayrimenkul-gelecegi-planlama',
      author: 'admin',
      date: 'Nisan 30, 2025',
      title: 'Gayrimenkul Geleceği Planlama',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz0flIZyJrdaz0V_FReWz8jcn71htsdqqQrQ&s',
      snippet: 'Gayrimenkul, geçmişten bugüne en güvenilir yatırım araçlarından biri olmuştur. Ancak artık yalnızca “taşınmaz sahibi olmak”'
    },
    {
      slug: 'gayrimenkul-kiralama',
      author: 'admin',
      date: 'Nisan 30, 2025',
      title: 'Gayrimenkul Kiralama',
      image: 'https://www.katilimevim.com.tr/wp-content/uploads/shutterstock_11416447557-min-580x350.jpg',
      snippet: 'Gayrimenkul kiralama, hem mülk sahibi hem de kiracı açısından dikkatli yönetilmesi gereken önemli bir süreçtir.'
    },
    {
      slug: 'gayrimenkul-alim-satim',
      author: 'admin',
      date: 'Nisan 30, 2025',
      title: 'Gayrimenkul Alım Satım',
      image: 'https://media.istockphoto.com/id/1409298953/tr/foto%C4%9Fraf/real-estate-agents-shake-hands-after-the-signing-of-the-contract-agreement-is-complete.jpg?s=612x612&w=0&k=20&c=M3fmkbnEOnFlAqZsuDE-W4bfMqvtsF4oPrAsR2ID96s=',
      snippet: 'Gayrimenkul alım satımı, yüksek bütçeli ve uzun vadeli kararlar gerektirdiği için ciddi bir bilgi ve'
    },
    {
      slug: 'ankara-guvenilir-en-iyi-emlakci',
      author: 'admin',
      date: 'Nisan 26, 2025',
      title: 'Ankara Güvenilir En İyi Emlakçı',
      image: '/assets/pentanestlogo.png',
      snippet: 'Emlak alım-satımı ciddi bir yatırımdır. Bu yüzden çalıştığınız emlakçının sadece satış odaklı değil, tamamen…'
    },
    {
      slug: 'ankara-en-iyi-emlakci',
      author: 'admin',
      date: 'Nisan 26, 2025',
      title: 'Ankara En İyi Emlakçı',
      image: '/assets/pentanestlogo.png',
      snippet: 'Gayrimenkul alım satımı, doğru bilgi ve deneyim gerektiren önemli bir süreçtir. Özellikle Ankara gibi…'
    },
    {
      slug: 'cankaya-en-iyi-emlakci',
      author: 'admin',
      date: 'Nisan 26, 2025',
      title: 'Çankaya En İyi Emlakçı',
      image: '/assets/pentanestlogo.png',
      snippet: 'Emlak sektöründe güvenilir bir isim arıyorsanız, bölgeyi yakından tanıyan ve profesyonel yaklaşımı ile öne…'
    },
    {
      slug: 'ankara-en-iyi-gayrimenkul-ofisi',
      author: 'admin',
      date: 'Nisan 26, 2025',
      title: 'Ankara En İyi Gayrimenkul Ofisi',
      image: '/assets/pentanestlogo.png',
      snippet: 'Ankara, Türkiye’nin başkenti olmanın ötesinde, her geçen gün büyüyen ve gelişen bir gayrimenkul piyasasına sahip.'
    }
  ];
}