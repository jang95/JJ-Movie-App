import Slider from '../../components/Slider';

const HomePage = () => {
  const sliders = [
    { type: 'popular', title: '인기작' },
    { type: 'now_playing', title: '현재 상영작' },
    { type: 'top_rated', title: '최고 평점작' },
    { type: 'upcoming', title: '개봉 예정작' },
  ];
  return (
    <div className=''>
      {sliders.map((slider) => (
        <Slider key={slider.type} type={slider.type} title={slider.title} />
      ))}
    </div>
  );
};

export default HomePage;
