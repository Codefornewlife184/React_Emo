export const services = [
  {
    id: 1,
    title: 'İç Mekan Boyama',
    description: 'Profesyonel iç mekan boyama ve dekorasyon hizmetleri ile evinize ve ofisinize modern, ferah bir görünüm kazandırın.',
    icon: '/icons/icon-8.png',
    image: '/carousel/carousel-ic-cephe-min.webp',
    slug: 'ic-mekan-boyama',
  },
  {
    id: 2,
    title: 'Dış Cephe Boyama',
    description: 'Zorlu hava koşullarına karşı uzun ömürlü dış cephe boyası ile binanızı koruyun ve değerini artırın.',
    icon: '/icons/icon-10.png',
    image: '/carousel/carousel-dis-cephe-min.webp',
    slug: 'dis-cephe-boyama',
  },
  {
    id: 3,
    title: 'Ahşap Tamiri ve Boyama',
    description: 'Houtrotreparatie (ahşap çürüğü onarımı), epoksi dolgu ve kaliteli ahşap boyama hizmetleri.',
    icon: '/icons/icon-9.png',
    image: '/carousel/carousel-ahsap-min.webp',
    slug: 'ahsap-tamiri-ve-boyama',
  },
  {
    id: 4,
    title: 'Latex Boyama',
    description: 'Yüksek kaliteli lateks (plastik) boya ile duvar ve tavanlarda pürüzsüz, iz bırakmayan yüzeyler.',
    icon: '/icons/icon-6.png',
    image: '/carousel/carousel-lateks-min.webp',
    slug: 'lateks-boyama',
  },
  {
    id: 5,
    title: 'Duvar Kağıdı & Renovlies',
    description: 'Profesyonel duvar kağıdı, Renovlies (duvar düzleştirici kaplama) ve cam elyaf kağıt uygulamaları.',
    icon: '/icons/icon-5.png',
    image: '/carousel/carousel-duvar-kagidi-min.webp',
    slug: 'duvar-kagidi',
  },
]

export const servicePageData = {
  'ic-mekan-boyama': {
    pageHeaderTitle: 'İç Mekan Boyama',
    hero: {
      title: 'İç Mekan Boyama & Tadilat',
      subtitle:
        'Profesyonel boya ve dekorasyon hizmetlerimizle iç mekanlarınıza ferah, modern ve estetik bir dokunuş katın.',
      intro:
        "Evinizi veya ofisinizi yenilemek mi istiyorsunuz? Emo; duvarlarınız, tavanlarınız, kapılarınız ve pencereleriniz için en yüksek kalitede boya ve yüzey bitirme hizmeti sunar. Kusursuz ve uzun ömürlü bir sonuç için usta işçiliği birinci sınıf malzemelerle birleştiriyoruz.",
      features: [
        {
          icon: 'fa-brush',
          title: 'Pürüzsüz ve Eşit Kaplama',
          desc: 'Tüm yüzeylerde kusursuz, iz bırakmayan sonuç.',
        },
        {
          icon: 'fa-leaf',
          title: 'Kokusuz ve Hızlı Kuruyan Boya',
          desc: 'Uygulama sırasında günlük yaşamınıza minimum müdahale.',
        },
        {
          icon: 'fa-cogs',
          title: 'Detaylı Yüzey Hazırlığı',
          desc: 'Çatlakların, deliklerin ve pürüzlerin zımpara ve macunla giderilmesi.',
        },
        {
          icon: 'fa-palette',
          title: 'Özel Renk Danışmanlığı',
          desc: 'Mekanınıza ve ışık açınıza en uygun renk kombinasyonlarının seçimi.',
        },
      ],
    },
    cardsTitle: 'Komple iç mekan boyama & dekoratif çözümler',
    cards: [
      {
        icon: 'fa-home',
        title: 'Duvar & Tavan Boyama',
        desc: 'Kaliteli plastik ve silinebilir latex boyalar ile duvar ve tavanlarınızda pürüzsüz kaplama.',
      },
      {
        icon: 'fa-door-closed',
        title: 'Kapı, Pencere & Ahşap Aksam Bakımı',
        desc: 'Ahşap yüzeylerin zımparalanması, astarlanması ve uzun ömürlü vernik/boya ile kaplanması.',
      },
      {
        icon: 'fa-spray-can',
        title: 'Airless Sprey Boya Uygulaması',
        desc: 'Geniş alanlar, duvarlar ve tavanlar için pürüzsüz, hızlı ve iz bırakmayan sprey boya tekniği.',
      },
      {
        icon: 'fa-hammer',
        title: 'Ahşap Onarımı & Yüzey Yenileme',
        desc: 'Boya öncesinde hasarlı ahşapların, çatlakların ve deforme olmuş alanların profesyonelce onarılması.',
      },
      {
        icon: 'fa-scroll',
        title: 'Duvar Kağıdı & Renovlies Kaplama',
        desc: 'Duvar kağıdı, Renovlies (duvar düzleştirici kaplama) ve dekoratif duvar paneli uygulamaları.',
      },
      {
        icon: 'fa-lightbulb',
        title: 'Renk & İç Mimari Danışmanlığı',
        desc: 'Işık alımı, mobilya uyumu ve mekan ölçülerine göre profesyonel renk tavsiyeleri.',
      },
    ],
    processTitle: 'İç mekan boyama sürecimiz',
    process: [
      {
        step: '01',
        title: 'Keşif & Yüzey Analizi',
        desc: "Yüzeylerin nem ve yıpranma durumunun incelenmesi, doğru astar ve boya türünün belirlenmesi.",
      },
      {
        step: '02',
        title: 'Hazırlık & Maskeleme',
        desc: "Eşyalarınızın ve zeminlerinizin özenle koruma altına alınması; duvar ve ahşapların zımparalanıp dolgulanması.",
      },
      {
        step: '03',
        title: 'Astarlama & Profesyonel Boyama',
        desc: "Yüksek tutuculuk sağlayan astar uygulamasının ardından kaliteli boya ile çok katlı uygulama yapılması.",
      },
      {
        step: '04',
        title: 'Son Kontrol & Temiz Teslimat',
        desc: "İşin birlikte detaylıca kontrol edilmesi, koruma malzemelerinin kaldırılması ve mekanın temiz şekilde teslim edilmesi.",
      },
    ],
  },

  'dis-cephe-boyama': {
    pageHeaderTitle: 'Dış Cephe Boyama',
    hero: {
      title: 'Dış Mekan Boyama ve Cephe Bakımı',
      subtitle:
        "Evinizi veya binanızı zorlu hava koşullarına karşı uzun ömürlü dış mekan boyasıyla koruyun.",
      intro:
        'Kaliteli dış mekan boyası evinizin değerini korumak için hayati önem taşır. Emo; pencerelerinizi, kapılarınızı, cephelerinizi ve çatı kenarlarınızı nem, UV ışınları ve ahşap çürümesine karşı korur.',
      features: [
        { icon: 'fa-shield-alt', title: 'Maksimum Koruma', desc: 'Yağmura, rüzgara ve UV ışınlarına karşı dayanıklı.' },
        { icon: 'fa-toolbox', title: 'Ahşap Çürümesi Tamiri', desc: 'Hasarlı ahşapların profesyonelce onarılması.' },
        { icon: 'fa-award', title: 'Uzun Ömürlü Kalite', desc: 'Yıllar boyu süren parlaklık ve koruma.' },
        { icon: 'fa-search', title: 'Detaylı İnceleme', desc: 'İş öncesi ahşap ve cephe durum kontrolü.' },
      ],
    },
    cardsTitle: 'Dış cephe koruma & bakım hizmetleri',
    cards: [
      { icon: 'fa-window-restore', title: 'Dış Pencere ve Kapılar', desc: 'Hava koşullarına dayanıklı boyalarla zımparalama, astarlama ve boyama.' },
      { icon: 'fa-plus-square', title: 'Ahşap Çürümesi Onarımı', desc: 'Çürüyen kısımların temizlenmesi, epoksi ile dolgusu veya ahşabın yenilenmesi.' },
      { icon: 'fa-building', title: 'Dış Cephe ve Duvar Boyama', desc: 'Nefes alabilen ve su geçirmeyen dış cephe boyası uygulamaları.' },
      { icon: 'fa-warehouse', title: 'Çatı Kenarları ve Oluklar', desc: 'Ahşap çatı kenarları ve saçakların bakımı ve boyanması.' },
      { icon: 'fa-tree', title: 'Bahçe Kulübesi, Veranda, Çitler', desc: 'Ahşap dış yapıların ahşap koruyucu ve cilalarla kaplanması.' },
      { icon: 'fa-calendar-check', title: 'Periyodik Bakım', desc: 'İleride oluşabilecek yüksek maliyetli hasarları önlemek için düzenli kontrol ve önleyici bakım.' },
    ],
    processTitle: 'Dış cephe boyama sürecimiz',
    process: [
      { step: '01', title: 'İnceleme ve Temizlik', desc: 'Ahşap ve cephe durumunun incelenmesi, yüksek basınçlı yıkama ve yüzeyin yağdan arındırılması.' },
      { step: '02', title: 'Ahşap Onarımı ve Zımpara', desc: 'Çürüklerin epoksi ile onarılması, yüzeyin tamamen zımparalanarak pürüzsüzleştirilmesi.' },
      { step: '03', title: 'Astar ve Dış Cephe Boyası', desc: 'Nem dengeleyici astar uygulaması ve ardından dayanıklı dış cephe boyası katları.' },
      { step: '04', title: 'Teslimat ve Garanti', desc: 'Son kontrolün yapılması ve yapılan işe ait garanti belgesinin sunulması.' },
    ],
  },

  'bakim-boyama': {
    pageHeaderTitle: 'Bakım Boyama & MJOP',
    hero: {
      title: 'Çok Yıllık Bakım Planı (MJOP) ve Bakım Boyama',
      subtitle:
        'Önlemek, onarmaktan iyidir. Gayrimenkulünüzün değerini planlı bakımla koruyun.',
      intro:
        "Dört yılda bir rötuş yapılan boya, yalnızca hasar görünür hale geldiğinde müdahale edilen boyaya göre çok daha uzun süre dayanır. Ahşap çürümesi, çatlaklar ve soyulmalar binlerce avroya mal olabilirken, zamanında yapılan bakım bunun küçük bir kısmına mal olur. Eviniz, iş yeriniz veya apartman yönetiminiz (VvE) için çok yıllık bir bakım planı (MJOP) hazırlıyoruz.",
      features: [
        { icon: 'fa-coins', title: 'Uzun Vadeli Tasarruf', desc: 'Büyük onarım maliyetlerini önleyerek yıllık bütçe planlaması.' },
        { icon: 'fa-file-alt', title: 'Şeffaf Raporlama', desc: 'Yıllık maliyet, uygulama alanı ve önerileri içeren detaylı doküman.' },
        { icon: 'fa-users-cog', title: 'VvE Uyumlu Çalışma', desc: 'Site yöneticileri ve apartman kurulları ile koordineli proje yürütümü.' },
        { icon: 'fa-clipboard-list', title: 'NEN 2767 Standart', desc: 'Hollanda standartlarına uygun durum tespiti ve puanlama.' },
      ],
    },
    cardsTitle: 'Planlı bakım ve önleyici boyama hizmetleri',
    cards: [
      { icon: 'fa-paint-roller', title: 'Bakım Hizmetleri', desc: 'Tek bir incelemeden 80 daireli sitelerin tüm bakım boyama süreçlerinin yönetimine kadar.' },
      { icon: 'fa-sitemap', title: 'Çok Yıllık Bakım Planı (MJOP)', desc: 'Yıl, alan, malzeme ve maliyet içeren, bütçeniz için hazır detaylı plan.' },
      { icon: 'fa-clipboard-check', title: 'Durum Tespiti (NEN 2767)', desc: 'NEN 2767 standardına göre yüzey değerlendirmesi, puanlama ve öneri raporu.' },
      { icon: 'fa-city', title: 'Site Yönetimi (VvE) Boyama', desc: 'Yönetim Kurulu koordinasyonu, genel kurul sunumları ve sakinlerle net iletişim.' },
      { icon: 'fa-hard-hat', title: 'Önleyici Boyama', desc: 'Büyük hasarlar oluşmadan yapılan küçük onarımlarla uzun vadeli tasarruf.' },
      { icon: 'fa-vial', title: 'Ahşap Çürümesini Önleme', desc: 'Riskli alanların epoksi ile önleyici koruma altına alınması.' },
    ],
    processTitle: 'Çok Yıllık Bakım Planı Nasıl Oluşturulur?',
    process: [
      { step: '01', title: 'Tam Kayıt', desc: 'İç/dış tüm yüzeylerin ve kritik detayların ölçülmesi ve fotoğraflanması.' },
      { step: '02', title: 'Durum Tespiti', desc: 'NEN 2767\'ye göre 1-6 arası durum puanı atanması ve müdahale önceliklerinin belirlenmesi.' },
      { step: '03', title: 'Planlama ve Bütçe', desc: 'Faaliyetler, maliyetler ve uygulama yıllarını içeren PDF/Excel formatında plan hazırlığı.' },
      { step: '04', title: 'Uygulama ve İzleme', desc: 'Yıllık denetimler ile planın güncel tutulması ve mülk değerinin korunması.' },
    ],
  },

  'ahsap-tamiri-ve-boyama': {
    pageHeaderTitle: 'Ahşap Tamiri ve Boyama',
    hero: {
      title: 'Ahşap Onarımı & Ahşap Boyama (Houtrotreparatie)',
      subtitle:
        'Pencere çerçeveleri, kapılar ve ahşap cephe elemanlarınız için uzun ömürlü onarım ve profesyonel koruma.',
      intro:
        "Ahşap çürümesi (houtrot), evinizin ahşap bölümleri için en büyük tehditlerden biridir. İçeri sızan nemden kaynaklanır ve fark edilmeden büyük hasarlara yol açabilir. Çerçeveleri tamamen değiştirmek çok masraflıdır, ancak çoğu zaman buna gerek kalmaz. Emo, profesyonel ahşap çürümesi onarımı ve kaliteli ahşap boyamada uzmandır. Çürüyen kısmı sağlam ahşaba kadar temizliyor, dayanıklı epoksi reçine veya parça değişimi ile onarıyoruz. Ardından dış etkenlere karşı yıllarca koruyan yüksek kaliteli boya sistemiyle kaplıyoruz.",
      features: [
        { icon: 'fa-wallet', title: 'Köpüş Tasarruflu', desc: 'Tamamen değiştirmek yerine onarım yapmak %60\'a varan tasarruf sağlar.' },
        { icon: 'fa-flask', title: 'Dayanıklı Epoksi Teknolojisi', desc: 'Ahşapla birlikte hareket eden, sürekli esnek ve uzun ömürlü onarım.' },
        { icon: 'fa-cloud-sun-rain', title: 'Hava Koşullarına Dayanıklı', desc: 'Yüksek kaliteli dış cephe vernik ve boyaları ile maksimum ömür.' },
        { icon: 'fa-stamp', title: 'Garantili Çözüm', desc: 'Tüm ahşap onarım ve boyama işlerimizde yazılı garanti.' },
      ],
    },
    cardsTitle: 'Profesyonel ahşap onarım & boyama hizmetleri',
    cards: [
      { icon: 'fa-search-plus', title: 'Ahşap Çürümesi Tespiti', desc: 'Alt pervazlar, birleşim noktaları ve köşelerin çürümeye karşı detaylı kontrolü.' },
      { icon: 'fa-flask', title: 'Epoksi ile Ahşap Onarımı', desc: 'Çürük ahşabın oyulması ve 2 bileşenli güçlü epoksi dolgu ile sağlamlaştırılması.' },
      { icon: 'fa-screwdriver', title: 'Kısmi Ahşap Değişimi', desc: 'Çürümenin çok derin olduğu durumlarda hasarlı parçanın kesilerek yeni sert ahşap ile değiştirilmesi.' },
      { icon: 'fa-sandwich', title: 'Detaylı Zımpara ve Hazırlık', desc: 'Tozsuz zımparalama, yağdan arındırma ve nem dengeleyici astar uygulaması.' },
      { icon: 'fa-door-open', title: 'Pencere & Kapı Boyama', desc: 'Parlak veya yarı mat dış cephe ahşap boyasıyla çok katlı koruyucu uygulama.' },
      { icon: 'fa-seal', title: 'Önleyici Ahşap Koruma', desc: 'Nem sızmasını önlemek için esnek cam macunları ve ek yerlerinin sızdırmazlık ile kapatılması.' },
    ],
    processTitle: 'Ahşap Onarım Adımlarımız',
    process: [
      { step: '01', title: 'İnceleme ve Temizlik', desc: 'Ahşabın incelenmesi ve çürümüş yumuşak kısımların sağlam ahşaba ulaşılana kadar temizlenmesi.' },
      { step: '02', title: 'Frezeleme ve Kurutma', desc: 'Temizlenen alanın frezelenmesi ve optimum yapışma için ahşaptaki nem oranının ölçülmesi.' },
      { step: '03', title: 'Epoksi Onarım veya Parça Değişimi', desc: 'Yüzeyin epoksi astarla işlenip 2 bileşenli epoksi ile doldurulması veya yeni ahşap parça eklenmesi.' },
      { step: '04', title: 'Zımpara, Astar ve Boya', desc: 'Kuruyan yüzeyin pürüzsüzce zımparalanması, astarlanması ve hava koşullarına dayanıklı boya ile tamamlanması.' },
    ],
  },

  'lateks-boyama': {
    pageHeaderTitle: 'Lateks Boyama',
    hero: {
      title: 'Lateks (Plastik) Boyama & Duvar Kaplama',
      subtitle:
        'Duvar ve tavanlarınız için yüksek kaliteli lateks boya ile pürüzsüz, iz bırakmayan ve uzun ömürlü yüzeyler.',
      intro:
        "Duvar ve tavanlarınıza taze, modern bir görünüm kazandırmak mı istiyorsunuz? Emo, birinci sınıf lateks (su bazlı/plastik) boyalarla profesyonel rulo ve fırça işçiliğinde uzmandır. Yeni bina, tadilat projesi veya ofis fark etmeksizin; uzman ekibimizle pürüzsüz ve iz bırakmayan bir sonuç garanti ediyoruz. Hazırlık sürecine ve eşyalarınızın korunmasına maksimum özen gösteriyoruz. Silinebilir ve yüksek kapatıcılığa sahip lateks boyalar kullanarak duvarlarınızın ve tavanlarınızın yıllarca temiz ve bakımlı kalmasını sağlıyoruz.",
      features: [
        { icon: 'fa-broom', title: 'Pürüzsüz ve İzsiz Sonuç', desc: 'Kaliteli rulolar ve profesyonel teknik ile iz bırakmayan kaplama.' },
        { icon: 'fa-shield-virus', title: 'Silinebilir Yüksek Kalite', desc: 'Leke ve kirleri kolayca silinebilen, hijyenik yüzey.' },
        { icon: 'fa-fill-drip', title: 'Yüksek Kapatıcılık', desc: 'Tek katta bile eski renkleri tamamen kaplayan, opak boyalar.' },
        { icon: 'fa-cubes', title: 'Çeşitli Renk & Parlaklık', desc: 'RAL kodunda mat, yarı mat, ipeksi ve silinebilir lateks seçenekleri.' },
      ],
    },
    cardsTitle: 'İç mekan lateks ve plastik boyama çözümleri',
    cards: [
      { icon: 'fa-roller', title: 'Rulo ve Fırça Boyama', desc: 'İç mekan duvarlarınızda eşit ve kapatıcı bir katman için kaliteli rulolarla usta işçilik.' },
      { icon: 'fa-square', title: 'Tavan Boyama', desc: 'Işık yansımalarında rulo izlerinin görünmesini engelleyen özel tavan uygulaması.' },
      { icon: 'fa-layer-group', title: 'Yeni Bina & Tadilat', desc: 'Sıva veya alçı sonrası boyaya hazır hale getirilmiş duvarların profesyonel kaplanması.' },
      { icon: 'fa-swatchbook', title: 'Renk & Parlaklık Seçenekleri', desc: 'İstenilen RAL kodunda mat, yarı mat veya yüksek silinebilirliğe sahip lateks boya seçenekleri.' },
      { icon: 'fa-trowel', title: 'Detaylı Ön Hazırlık', desc: 'Vida deliklerinin ve çatlakların kapatılması, zımparalanması ve emici duvarlara astar sürülmesi.' },
      { icon: 'fa-user-tie', title: 'Kişiye Özel Renk Danışmanlığı', desc: 'Mekanın ışık alma durumuna göre en uygun lateks boya ve renk kombinasyonu tavsiyeleri.' },
    ],
    processTitle: 'Rulo ile Lateks Uygulama Adımları',
    process: [
      { step: '01', title: 'Maskeleme ve Koruma', desc: 'Zeminler, pencereler, prizler ve eşyalar profesyonel koruyucu naylon ve bantlarla özenle kaplanır.' },
      { step: '02', title: 'Hazırlık ve Astarlama', desc: 'Delik ve çatlaklar kapatılıp zımparalanır. Emici duvarlara yapışmayı artıran astar sürülür.' },
      { step: '03', title: 'Profesyonel Rulo Uygulaması', desc: 'Lateks boya, kaliteli rulolarla iz bırakmayacak şekilde çok katlı olarak uygulanır.' },
      { step: '04', title: 'Temizlik ve Teslimat', desc: 'Koruma malzemeleri sökülür, kalite kontrolü yapılır ve mekan temiz şekilde teslim edilir.' },
    ],
  },

  'duvar-kagidi': {
    pageHeaderTitle: 'Duvar Kağıdı & Renovlies',
    hero: {
      title: 'Duvar Kağıdı & Duvar Kaplama (Renovlies)',
      subtitle:
        'İç mekanlarınıza şık, modern ve pürüzsüz bir hava katmak için profesyonel duvar kağıdı uygulamaları.',
      intro:
        "Duvarlarınıza benzersiz bir desen, lüks bir doku veya pürüzsüz bir sıva görünümü mü kazandırmak istiyorsunuz? Emo, her türlü duvar kağıdı uygulamasında uzmandır. Özel tasarım desenli duvar kağıtlarından, Hollanda'da çok tercih edilen Renovlies (fiber/elastik duvar kaplaması) ve cam elyaf kağıtlara kadar eksiksiz hizmet sunuyoruz. Renovlies duvar kağıdı, geleneksel sıva/alçı işçiliğine kıyasla harika ve ekonomik bir alternatiftir; özellikle sıfır binalar ve tadilatlar için mükemmeldir. Duvarlarınızı çatlamalara karşı korur ve üzerine doğrudan boya atılabilen pürüzsüz, ek yersiz bir zemin oluşturur.",
      features: [
        { icon: 'fa-th-large', title: 'Pürüzsüz Sıva Görünümü', desc: 'Renovlies & cam elyaf ile sıva tadında tamamen düz zemin.' },
        { icon: 'fa-magic', title: 'Çatlak Kapatıcı', desc: 'Duvar çatlaklarını gizleyen, esnek ve dayanıklı kaplama.' },
        { icon: 'fa-paint-brush', title: 'Üzeri Boyanabilir', desc: 'İstediğiniz renk ile üzeri boyanır ve yenilenebilir.' },
        { icon: 'fa-images', title: 'Desenli & Foto Kağıt', desc: 'Dekoratif desenler veya özel baskılı foto duvar seçenekleri.' },
      ],
    },
    cardsTitle: 'Profesyonel duvar kaplama & duvar kağıt uygulamaları',
    cards: [
      { icon: 'fa-box', title: 'Renovlies ve Cam Elyaf Kağıt', desc: 'Sıva görünümü veren, çatlak kapatıcı ve son derece dayanıklı duvar kaplama uygulaması.' },
      { icon: 'fa-gem', title: 'Dekoratif & Desenli Kağıt', desc: 'Karmaşık desenli, motifli veya dokulu duvar kağıtlarının hizalı ve hassas şekilde uygulanması.' },
      { icon: 'fa-camera-retro', title: 'Foto Duvar & Airtex', desc: 'Ev veya ofislerde tek parça, dev boyutlu fotoğraf duvarlarının uygulanması.' },
      { icon: 'fa-hand-sparkles', title: 'Eski Kağıt Sökümü', desc: 'Eski duvar kağıtlarının profesyonelce sökülmesi, tutkal artıklarının temizlenmesi ve zımparalanması.' },
      { icon: 'fa-fill', title: 'Kağıt Üzeri Lateks Boyama', desc: 'Uygulanan Renovlies veya cam elyaf kağıtların istenen renkte lateks boya ile boyanması.' },
      { icon: 'fa-tint', title: 'Astar ve Yüzey Hazırlığı', desc: 'Duvar kağıdı tutkalının mükemmel yapışması için duvarların astarlanması ve pürüzsüzleştirilmesi.' },
    ],
    processTitle: 'Duvar Kağıdı Uygulama Adımları',
    process: [
      { step: '01', title: 'İnceleme ve Hazırlık', desc: 'Eski kağıtlar sökülür, delik ve çatlaklar kapatılıp duvarlar zımparalanır.' },
      { step: '02', title: 'Astarlama', desc: 'Tutkalın aşırı emilmesini ve kağıdın kabarmasını önlemek için duvara astar uygulanır.' },
      { step: '03', title: 'Profesyonel Kaplama', desc: 'Kağıtlar milimetrik hassasiyetle yapıştırılır; desenler çakıştırılır ve birleşim yerleri görünmez hale getirilir.' },
      { step: '04', title: 'Bitiriş ve Teslimat', desc: 'Süpürgelik ve pencere kenarları düzeltilir, talep edilirse doğrudan boyanarak temiz şekilde teslim edilir.' },
    ],
  },
}

export const facts = [
  {
    id: 1,
    title: 'Usta İşçilik',
    description: 'Yıllara dayanan Hollanda pazar tecrübesi ile kusursuz boya ve yüzey hazırlığı.',
    icon: '/icons/icon-2.png',
  },
  {
    id: 2,
    title: '1. Sınıf Malzeme',
    description: 'Sadece tanınmış, uzun ömürlü ve garantili boya, macun ve epoksi ürünleri kullanıyoruz.',
    icon: '/icons/icon-3.png',
  },
  {
    id: 3,
    title: 'Garantili Teslimat',
    description: 'Yapılan her işte yazılı garanti ve müşteri memnuniyeti önceliğimizdir.',
    icon: '/icons/icon-4.png',
  },
]

export const features = [
  {
    id: 1,
    title: 'Ücretsiz Keşif',
    description: 'İhtiyacınıza göre yerinde inceleme, ölçüm ve detaylı fiyat teklifi.',
    icon: '/icons/icon-2.png',
  },
  {
    id: 2,
    title: 'Renk & Stil Danışmanlığı',
    description: 'Mekanınıza ve kullanım amacınıza göre özel renk ve malzeme önerileri.',
    icon: '/icons/icon-3.png',
  },
  {
    id: 3,
    title: 'Planlı ve Temiz Çalışma',
    description: 'Eşyalar ve zeminler özenle korunur, iş sonrası mekan temiz teslim edilir.',
    icon: '/icons/icon-4.png',
  },
]

export const team = [
  {
    id: 1,
    name: 'Usta Boyacı',
    designation: 'İç & Dış Mekan Uzmanı',
    image: '/team-1.jpg',
  },
  {
    id: 2,
    name: 'Ahşap Onarım Uzmanı',
    designation: 'Houtrotreparatie Specialist',
    image: '/team-2.jpg',
  },
  {
    id: 3,
    name: 'Site Yöneticisi',
    designation: 'MJOP & VvE Sorumlusu',
    image: '/team-3.jpg',
  },
  {
    id: 4,
    name: 'Renk Danışmanı',
    designation: 'Interior Styling',
    image: '/team-4.jpg',
  },
]

export const projects = [
  {
    id: 1,
    title: '01. Tarihi Bina Cephe Yenilemesi',
    heading: '50+ Yıllık Binada Tam Dış Cephe Yenileme',
    description:
      'Tarihi dokunun korunması ile modern boya teknolojisini birleştiren projemiz; ahşap çürümesi onarımları, epoksi dolgular ve 10 yıl garantili dış cephe boyası ile tamamlandı.',
    features: ['Ahşap Çürüğü Onarımı', 'Dış Cephe Temizlik & Boyama', 'Periyodik Bakım Planı (MJOP)'],
    image: '/project-1.jpg',
  },
  {
    id: 2,
    title: '02. Lüks Villa İç Mekan',
    heading: 'Tam Tadilat İç Mekan Boyama Projesi',
    description:
      'Yüksek tavanlı geniş villa projesinde Airless sprey tekniği ile pürüzsüz tavan, Renovlies kaplama duvarlar ve özel renk kombinasyonları uygulandı.',
    features: ['Airless Sprey Tavan Boyama', 'Renovlies & Lateks Kaplama', 'Kişiye Özel Renk Danışmanlığı'],
    image: '/project-2.jpg',
  },
  {
    id: 3,
    title: '03. 80 Daireli Site VvE',
    heading: 'Apartman Topluluğu Çok Yıllık Bakım Planı',
    description:
      'NEN 2767 durum tespiti sonrası hazırlanan 6 yıllık MJOP ile sitenin tüm cephe, çatı ve ortak alan boyaları planlanarak uygulandı.',
    features: ['NEN 2767 Durum Tespiti', 'VvE Koordinasyonu ve Sunum', 'Üç Aşamalı Planlı Uygulama'],
    image: '/project-3.jpg',
  },
  {
    id: 4,
    title: '04. Ofis & İş Yeri Projesi',
    heading: '2000 m² Ofis Binası Komple Yenileme',
    description:
      'Ofis katlarında duvar kağıdı, lateks boya ve ahşap kapı yenileme projesi; iş süreçlerine minimum müdahale ile geceli dönüşümlü olarak tamamlandı.',
    features: ['Lateks & Duvar Kağıdı Uygulamaları', 'Planlı Gece Çalışması', 'Hızlı ve Temiz Teslimat'],
    image: '/project-4.jpg',
  },
]

export const testimonials = [
  {
    id: 1,
    name: 'Appartementencomplex De Linde',
    profession: 'VvE Yönetimi',
    avatar: '/1.png',
    text:
      "Emo ile 6 yıllık çok yıllık bakım planı (MJOP) yaptık. Her yıl öngörülebilir bütçe, şeffaf raporlama ve temiz uygulama. Site sakinleri çok memnun.",
  },
  {
    id: 2,
    name: 'Van Der Berg Ailesi',
    profession: 'Apartman Sahibi',
    avatar: '/2.png',
    text:
      "Pencerelerimizin çerçevelerindeki ahşap çürümesini kısa sürede epoksi ile onardılar. 2 yıl oldu hiçbir sorun yaşamadık. İş sonrası temizlikleri de çok özeldi. Kesinlikle tavsiye ediyoruz!",
  },
  {
    id: 3,
    name: 'Jansen & Zn B.V.',
    profession: 'İş Yeri Sahibi',
    avatar: '/1.png',
    text:
      "Ofisimiz için Renovlies kaplama ve lateks boya uyguladılar. Duvarlar adeta sıva gibi pürüzsüz. Hem çalışanlarımız hem müşterilerimiz çok beğeniyor.",
  }
]

export const heroSlides = [
  {
    id: 1,
    image: '/carousel/carousel-ic-cephe-min.webp',
    title: 'İç Mekan Boyama – Ev & İş Yeri',
    description:
      'Konutlardan ofislere kadar ölçek fark etmeksizin, sıfır hata, temiz ve planlı iç mekan uygulamaları.',
    linkTo: '/service/ic-mekan-boyama',
  },
  {
    id: 2,
    image: '/carousel/carousel-dis-cephe-min.webp',
    title: 'Dış Cephe & Cephe Boyama Hizmetleri',
    description:
      'Hollanda iklimine dayanıklı, uzun ömürlü dış cephe boyaları ile binalarınızı ilk gün kadar bakımlı tutun.',
    linkTo: '/service/dis-cephe-boyama',
  },
  {
    id: 3,
    image: '/carousel/carousel-ahsap-min.webp',
    title: 'Profesyonel Ahşap Onarımı (Houtrotreparatie)',
    description:
      'Çürüyen ahşap pencere, kapı ve cephe elemanlarını yenilemek yerine epoksi ile onarın; %60 tasarruf sağlayın.',
    linkTo: '/service/ahsap-tamiri-ve-boyama',
  },
  {
    id: 4,
    image: '/carousel/carousel-duvar-kagidi-min.webp',
    title: 'Duvar Kağıdı & Renovlies Duvar Kaplama',
    description:
      'Desenli, tekstürlü veya düz renovlies ile mekanlarınıza kalıcı, hijyenik ve şık yüzeyler kazandırın.',
    linkTo: '/service/duvar-kagidi',
  },
  {
    id: 5,
    image: '/carousel/carousel-lateks-min.webp',
    title: 'Lateks / Saten Boya Uygulamaları',
    description:
      'Nefes alan, silinebilir ve uzun ömürlü lateks duvar boyaları ile yaşam alanlarınıza modern dokunuşlar.',
    linkTo: '/service/lateks-boyama',
  }
]
