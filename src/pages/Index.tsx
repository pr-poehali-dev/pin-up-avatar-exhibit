import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ArtworkItem {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  category: string;
}

const Index = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeSection, setActiveSection] = useState('gallery');
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkItem | null>(null);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const artworks: ArtworkItem[] = [
    {
      id: 1,
      title: 'Военная Романтика',
      artist: 'Мария Иванова',
      imageUrl: 'https://cdn.poehali.dev/files/841e39da-4b49-4ea2-95b9-f3a397172c3f.jpg',
      category: 'Классика'
    },
    {
      id: 2,
      title: 'Victory Girl',
      artist: 'Анна Петрова',
      imageUrl: 'https://cdn.poehali.dev/files/d0d21b37-fa18-40e8-bcae-2caecd3e18a7.jpg',
      category: 'Портрет'
    },
    {
      id: 3,
      title: 'Военный Триптих',
      artist: 'Елена Сидорова',
      imageUrl: 'https://cdn.poehali.dev/files/dc58fdb0-1243-4e13-a910-5dc70f67b1bb.png',
      category: 'Винтаж'
    },
    {
      id: 4,
      title: 'Художественная Коллекция',
      artist: 'Ольга Смирнова',
      imageUrl: 'https://cdn.poehali.dev/files/69a55bc3-e346-4536-8e59-4cdc8df1fa2d.png',
      category: 'Классика'
    },
    {
      id: 5,
      title: 'Ретро Красотка',
      artist: 'Татьяна Волкова',
      imageUrl: 'https://cdn.poehali.dev/files/0fbc411a-7f25-44c0-bed6-e83fefd71207.jpg',
      category: 'Портрет'
    },
    {
      id: 6,
      title: 'Винтажные Героини',
      artist: 'Вера Новикова',
      imageUrl: 'https://cdn.poehali.dev/files/51af4dbd-0486-423b-bdbf-7b9cea75f11a.jpg',
      category: 'Винтаж'
    }
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const navigateArtwork = (direction: 'prev' | 'next') => {
    if (!selectedArtwork) return;
    const currentIndex = artworks.findIndex(art => art.id === selectedArtwork.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : artworks.length - 1;
    } else {
      newIndex = currentIndex < artworks.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedArtwork(artworks[newIndex]);
  };

  const artists = [
    { name: 'Мария Иванова', specialty: 'Классический пин-ап', works: 45 },
    { name: 'Анна Петрова', specialty: 'Портреты', works: 32 },
    { name: 'Елена Сидорова', specialty: 'Винтажная фотография', works: 28 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5DEB3] to-[#D4A574]">
      <header className="bg-[#8B4513] text-[#F5DEB3] shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold tracking-wide">Vintage Pin-Up Gallery</h1>
            <nav className="hidden md:flex gap-6">
              {['gallery', 'avatars', 'shop', 'videos', 'artists', 'about', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`text-lg font-medium hover:text-[#CD5C5C] transition-colors ${
                    activeSection === section ? 'text-[#CD5C5C] border-b-2 border-[#CD5C5C]' : ''
                  }`}
                >
                  {section === 'gallery' && 'Галерея'}
                  {section === 'avatars' && 'Аватары'}
                  {section === 'shop' && 'Магазин'}
                  {section === 'videos' && 'Видео'}
                  {section === 'artists' && 'Художники'}
                  {section === 'about' && 'О выставке'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </nav>
            <Button variant="outline" className="bg-[#CD5C5C] text-white border-none hover:bg-[#B85050]">
              <Icon name="Heart" size={20} className="mr-2" />
              Избранное ({favorites.length})
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'gallery' && (
          <section className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-[#8B4513] mb-4">Коллекция Пин-ап Искусства</h2>
              <p className="text-xl text-[#2F4F4F] max-w-2xl mx-auto">
                Окунитесь в атмосферу 50-х годов с нашей уникальной коллекцией винтажного искусства
              </p>
            </div>

            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="bg-[#8B4513]/20">
                <TabsTrigger value="all">Все работы</TabsTrigger>
                <TabsTrigger value="classic">Классика</TabsTrigger>
                <TabsTrigger value="portrait">Портрет</TabsTrigger>
                <TabsTrigger value="vintage">Винтаж</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {artworks.map((artwork) => (
                    <Card
                      key={artwork.id}
                      className="group overflow-hidden hover-scale bg-[#F5DEB3] border-[#8B4513]/30 shadow-xl"
                    >
                      <div className="relative overflow-hidden cursor-pointer" onClick={() => setSelectedArtwork(artwork)}>
                        <img
                          src={artwork.imageUrl}
                          alt={artwork.title}
                          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <button
                          onClick={() => toggleFavorite(artwork.id)}
                          className="absolute top-4 right-4 bg-white/90 p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
                        >
                          <Icon
                            name="Heart"
                            size={24}
                            className={favorites.includes(artwork.id) ? 'fill-[#CD5C5C] text-[#CD5C5C]' : 'text-[#8B4513]'}
                          />
                        </button>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-2xl font-bold text-[#8B4513] mb-1">{artwork.title}</h3>
                            <p className="text-[#2F4F4F]">by {artwork.artist}</p>
                          </div>
                          <Badge className="bg-[#CD5C5C] text-white">{artwork.category}</Badge>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" className="flex-1 bg-[#8B4513] hover:bg-[#6B3410]">
                            <Icon name="ShoppingCart" size={16} className="mr-2" />
                            Купить
                          </Button>
                          <Button size="sm" variant="outline" className="border-[#8B4513] text-[#8B4513]">
                            <Icon name="Info" size={16} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </section>
        )}

        {activeSection === 'avatars' && (
          <section className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-[#8B4513] mb-4">Видео Аватары</h2>
              <p className="text-xl text-[#2F4F4F] max-w-2xl mx-auto">
                Оживите ваш профиль с нашими уникальными видео аватарами в стиле пин-ап
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artworks.slice(0, 3).map((artwork, index) => (
                <Card key={artwork.id} className="bg-[#F5DEB3] border-[#8B4513]/30 shadow-xl hover-scale">
                  <CardContent className="p-6">
                    <div className="relative mb-4 rounded-lg overflow-hidden bg-black">
                      {playingVideo === artwork.id ? (
                        <video
                          className="w-full h-64 object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                        >
                          <source src={`https://cdn.poehali.dev/public/placeholder-video.mp4`} type="video/mp4" />
                          <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-64 object-cover" />
                        </video>
                      ) : (
                        <>
                          <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-64 object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <button 
                              onClick={() => setPlayingVideo(artwork.id)}
                              className="bg-[#CD5C5C] text-white p-6 rounded-full hover:scale-110 transition-transform shadow-lg"
                            >
                              <Icon name="Play" size={32} />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-[#8B4513] mb-2">{artwork.title} Avatar</h3>
                    <p className="text-[#2F4F4F] mb-4">Анимированный видео портрет</p>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => setPlayingVideo(playingVideo === artwork.id ? null : artwork.id)}
                        className="flex-1 bg-[#CD5C5C] hover:bg-[#B85050] text-white"
                      >
                        <Icon name={playingVideo === artwork.id ? "Pause" : "Play"} size={18} className="mr-2" />
                        {playingVideo === artwork.id ? 'Пауза' : 'Смотреть'}
                      </Button>
                      <Button className="flex-1 bg-[#8B4513] hover:bg-[#6B3410] text-white">
                        <Icon name="Download" size={18} className="mr-2" />
                        Скачать
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-16">
              <h3 className="text-3xl font-bold text-[#8B4513] mb-8 text-center">Демо Видео Аватары</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-[#F5DEB3] border-[#8B4513]/30 shadow-xl">
                  <CardContent className="p-6">
                    <div className="relative rounded-lg overflow-hidden mb-4 bg-black aspect-video">
                      <video
                        className="w-full h-full object-cover"
                        controls
                        poster={artworks[0].imageUrl}
                      >
                        <source src="/videos/Hailuo_Video_girl starts to smile and gives_443121498038476802.mp4" type="video/mp4" />
                        Ваш браузер не поддерживает видео.
                      </video>
                    </div>
                    <h4 className="text-xl font-bold text-[#8B4513] mb-2">Винтажная красавица оживает</h4>
                    <p className="text-[#2F4F4F] mb-4">Профессиональная анимация в винтажном стиле</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#F5DEB3] border-[#8B4513]/30 shadow-xl">
                  <CardContent className="p-6">
                    <div className="relative rounded-lg overflow-hidden mb-4 bg-black aspect-video">
                      <video
                        className="w-full h-full object-cover"
                        controls
                        poster={artworks[1].imageUrl}
                      >
                        <source src="/videos/Hailuo_Video_girl stands up, reloads machin_443527782776745990.mp4" type="video/mp4" />
                        Ваш браузер не поддерживает видео.
                      </video>
                    </div>
                    <h4 className="text-xl font-bold text-[#8B4513] mb-2">Боевая красавица в действии</h4>
                    <p className="text-[#2F4F4F] mb-4">Динамичная анимация винтажного персонажа</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'artists' && (
          <section className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-[#8B4513] mb-4">Наши Художники</h2>
              <p className="text-xl text-[#2F4F4F] max-w-2xl mx-auto">
                Талантливые мастера винтажного искусства
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {artists.map((artist, index) => (
                <Card key={index} className="bg-[#F5DEB3] border-[#8B4513]/30 shadow-xl hover-scale">
                  <CardContent className="p-8 text-center">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-[#CD5C5C] flex items-center justify-center">
                      <Icon name="Palette" size={48} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#8B4513] mb-2">{artist.name}</h3>
                    <p className="text-[#2F4F4F] mb-1">{artist.specialty}</p>
                    <p className="text-sm text-[#2F4F4F]/70 mb-4">{artist.works} работ в коллекции</p>
                    <Button variant="outline" className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white">
                      Все работы автора
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="animate-fade-in max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-[#8B4513] mb-4">О Выставке</h2>
            </div>
            <Card className="bg-[#F5DEB3] border-[#8B4513]/30 shadow-xl">
              <CardContent className="p-12">
                <p className="text-xl text-[#2F4F4F] leading-relaxed mb-6">
                  Добро пожаловать в мир винтажной красоты и элегантности! Наша галерея представляет уникальную
                  коллекцию пин-ап искусства, вдохновленную золотой эрой 1950-х годов.
                </p>
                <p className="text-xl text-[#2F4F4F] leading-relaxed mb-6">
                  Мы объединили классическое искусство с современными технологиями, создав интерактивные
                  видео аватары, которые оживляют винтажные портреты.
                </p>
                <div className="grid grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#CD5C5C] mb-2">150+</div>
                    <div className="text-[#2F4F4F]">Работ в коллекции</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#CD5C5C] mb-2">25</div>
                    <div className="text-[#2F4F4F]">Талантливых художников</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#CD5C5C] mb-2">50+</div>
                    <div className="text-[#2F4F4F]">Видео аватаров</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {activeSection === 'contacts' && (
          <section className="animate-fade-in max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-[#8B4513] mb-4">Контакты</h2>
            </div>
            <Card className="bg-[#F5DEB3] border-[#8B4513]/30 shadow-xl">
              <CardContent className="p-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#CD5C5C] p-4 rounded-full">
                      <Icon name="Mail" size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#8B4513]">Email</div>
                      <div className="text-[#2F4F4F]">gallery@vintage-pinup.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-[#CD5C5C] p-4 rounded-full">
                      <Icon name="Phone" size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#8B4513]">Телефон</div>
                      <div className="text-[#2F4F4F]">+7 (495) 123-45-67</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-[#CD5C5C] p-4 rounded-full">
                      <Icon name="MapPin" size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#8B4513]">Адрес</div>
                      <div className="text-[#2F4F4F]">Москва, ул. Винтажная, 50</div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-[#8B4513]/20">
                  <div className="flex justify-center gap-4">
                    <Button size="icon" variant="outline" className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white">
                      <Icon name="Instagram" size={20} />
                    </Button>
                    <Button size="icon" variant="outline" className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white">
                      <Icon name="Facebook" size={20} />
                    </Button>
                    <Button size="icon" variant="outline" className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white">
                      <Icon name="Twitter" size={20} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {activeSection === 'shop' && (
          <section className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-[#8B4513] mb-4">Магазин</h2>
              <p className="text-xl text-[#2F4F4F] max-w-2xl mx-auto">
                Приобретите уникальные произведения искусства для вашей коллекции
              </p>
            </div>
            <div className="text-center py-20">
              <Icon name="ShoppingBag" size={64} className="mx-auto text-[#8B4513] mb-4" />
              <p className="text-2xl text-[#2F4F4F]">Магазин скоро откроется</p>
            </div>
          </section>
        )}

        {activeSection === 'videos' && (
          <section className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-[#8B4513] mb-4">Видео</h2>
              <p className="text-xl text-[#2F4F4F] max-w-2xl mx-auto">
                Видео обзоры и истории создания наших работ
              </p>
            </div>
            <div className="text-center py-20">
              <Icon name="Video" size={64} className="mx-auto text-[#8B4513] mb-4" />
              <p className="text-2xl text-[#2F4F4F]">Видео контент в разработке</p>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-[#8B4513] text-[#F5DEB3] mt-20 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl mb-4">© 2024 Vintage Pin-Up Gallery. Все права защищены.</p>
          <p className="text-sm opacity-80">Искусство, вдохновленное золотой эрой 50-х годов</p>
        </div>
      </footer>

      <Dialog open={!!selectedArtwork} onOpenChange={() => setSelectedArtwork(null)}>
        <DialogContent className="max-w-5xl bg-[#F5DEB3] border-[#8B4513]">
          {selectedArtwork && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-[#8B4513] mb-2">
                  {selectedArtwork.title}
                </DialogTitle>
                <div className="flex items-center gap-4 text-[#2F4F4F]">
                  <p className="text-lg">by {selectedArtwork.artist}</p>
                  <Badge className="bg-[#CD5C5C] text-white">{selectedArtwork.category}</Badge>
                </div>
              </DialogHeader>
              <div className="mt-4 relative group">
                <img
                  src={selectedArtwork.imageUrl}
                  alt={selectedArtwork.title}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                />
                <Button
                  onClick={() => navigateArtwork('prev')}
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#8B4513]/80 hover:bg-[#8B4513] text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Icon name="ChevronLeft" size={32} />
                </Button>
                <Button
                  onClick={() => navigateArtwork('next')}
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#8B4513]/80 hover:bg-[#8B4513] text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Icon name="ChevronRight" size={32} />
                </Button>
              </div>
              <div className="flex gap-4 mt-6">
                <Button
                  onClick={() => toggleFavorite(selectedArtwork.id)}
                  className="flex-1 bg-[#CD5C5C] hover:bg-[#B85050] text-white"
                >
                  <Icon
                    name="Heart"
                    size={20}
                    className={`mr-2 ${favorites.includes(selectedArtwork.id) ? 'fill-white' : ''}`}
                  />
                  {favorites.includes(selectedArtwork.id) ? 'В избранном' : 'Добавить в избранное'}
                </Button>
                <Button className="flex-1 bg-[#8B4513] hover:bg-[#6B3410] text-white">
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  Купить работу
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;