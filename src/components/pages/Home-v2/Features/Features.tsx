"use client";

// Components
import Display from "@/components/ui/Display";
import Card_v2 from "@/components/ui/Card-v2";

// Styles
import styles from "./styles.module.scss";

// Utils
import { FEATURES } from "@/utils/constants";
import { useState, useRef, useEffect } from "react";
import NextArrow from "@/components/icons/NextArrow";
import PrevArrow from "@/components/icons/PrevArrow";

const Features = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const totalSlides = FEATURES.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.children[0]?.clientWidth || 0;
      const scrollPosition = currentSlide * (slideWidth + 16);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentSlide]);

  return (
    <section className={styles.features}>
      <div className={"container-wide"}>
        <Display
          className={`display display--weight-700 ${styles.features_title}`}
          size={300}
        >
          Features
        </Display>

        <div className={styles.features_cards}>
          {FEATURES.map((card, index) => (
            <Card_v2
              key={index}
              title={card.title}
              details={card.text}
              className={styles.features_card}
              titleClassName={styles.features_card_title}
              textClassName={styles.features_card_text}
            />
          ))}
        </div>

        <div className={styles.mobile_carousel}>
          <div className={styles.carousel_container}>
            <div className={styles.carousel_track} ref={carouselRef}>
              {FEATURES.map((card, index) => (
                <div key={index} className={styles.carousel_slide}>
                  <Card_v2
                    title={card.title}
                    details={card.text}
                    className={styles.features_card}
                    titleClassName={styles.features_card_title}
                    textClassName={styles.features_card_text}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.carousel_controls}>
            <button
              className={`${styles.carousel_button} ${styles.carousel_button_prev}`}
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <PrevArrow />
            </button>

            <div className={styles.carousel_pagination}>
              {FEATURES.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.pagination_dot} ${
                    currentSlide === index ? styles.pagination_dot_active : ""
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              className={`${styles.carousel_button} ${styles.carousel_button_next}`}
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <NextArrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
