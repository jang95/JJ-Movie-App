const Footer = () => {
  return (
    <footer className='shadow sticky top-0 z-10 bg-yellow-100'>
      <div className='container flex flex-col md:flex-row items-center justify-between p-8'>
        <div className='text-center'>
          <a href='/' className='text-2xl font-bold'>
            MOVIE ENGING
          </a>
        </div>

        <div className='w-full sm:w-auto text-center'>
          <p>
            Powered by
            <a
              href='https://www.themoviedb.org/'
              target='_blank'
              rel='noopener noreferrer'
              className='underline'
            >
              TMDB API
            </a>
          </p>
          <p className='text-sm'>
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>
        </div>

        <span>
          &copy; {new Date().getFullYear()} MOVIE ENGING. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
