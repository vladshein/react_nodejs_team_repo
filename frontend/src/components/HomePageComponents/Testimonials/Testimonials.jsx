import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import styles from './Testimonials.module.css';
import IconQuote from '../../common/icons/IconQuote';
import Loader from '../../common/Loader/Loader';

function MainTitle({ tag = 'h2', children, className = '' }) {
  const Tag = tag;
  return <Tag className={className || undefined}>{children}</Tag>;
}

function Subtitle({ tag = 'p', children, className = '' }) {
  const Tag = tag;
  return <Tag className={className || undefined}>{children}</Tag>;
}

// const API_BASE = 'https://react-nodejs-team-repo.onrender.com';
// const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
const API_BASE = import.meta.env.VITE_API_URL;
// console.log(API_BASE);

const Testimonials = ({ onLoadingChange = () => {} }) => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    onLoadingChange(status === 'loading');
  }, [onLoadingChange, status]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setStatus('loading');

        const res = await fetch(`${API_BASE}testimonials`);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        setItems(Array.isArray(data) ? data : []);
        setStatus('ready');
      } catch (err) {
        console.error('Failed to load testimonials', err);
        setError(err.message || 'Unknown error');
        setStatus('error');
      }
    };

    fetchTestimonials();
  }, []);

  if (status === 'loading') {
    return (
      <section className={styles.section}>
        <div className="f-container">
          <div className={styles.loading} aria-busy="true" aria-live="polite">
            <Loader />
          </div>
        </div>
      </section>
    );
  }

  if (status === 'error') {
    return (
      <section className={styles.section}>
        <div className="f-container">
          <p>Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} aria-labelledby="testimonials-title">
      <div className="f-container">
        <Subtitle className={styles.subtitle}>What our customers say</Subtitle>

        <MainTitle tag="h2" id="testimonials-title" className={styles.title}>
          TESTIMONIALS
        </MainTitle>

        {items.length === 0 ? (
          <p className={styles.empty}>No testimonials yet</p>
        ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 8000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={items.length > 1}
            speed={600}>
            {items.map((t) => (
              <SwiperSlide key={t.id}>
                <div className={styles.slide}>
                  <div className={styles.iconWrap}>
                    <IconQuote className={styles.icon} />
                  </div>

                  <p className={styles.text}>{t.testimonial}</p>

                  <p className={styles.author}>{t.authorName || 'Anonymous'}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
