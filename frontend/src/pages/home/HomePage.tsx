import Slider from '../../components/Slider';

const sliders = [
  { type: 'popular', title: '인기작' },
  { type: 'now_playing', title: '현재 상영작' },
  { type: 'top_rated', title: '최고 평점작' },
  { type: 'upcoming', title: '개봉 예정작' },
];

const HomePage = () => {
  return (
    <div className='container mx-auto'>
      {sliders.map((slider) => (
        <Slider key={slider.type} type={slider.type} title={slider.title} />
      ))}
    </div>
  );
};

export default HomePage;
