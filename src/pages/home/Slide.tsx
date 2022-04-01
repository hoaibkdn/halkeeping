import styled from "styled-components";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import slide1 from "../../assets/images/slide1.png";
import slide2 from "../../assets/images/slide2.png";
import slide3 from "../../assets/images/slide3.png";
import slide4 from "../../assets/images/slide4.png";
import slide5 from "../../assets/images/slide5.png";
import slide6 from "../../assets/images/slide6.png";

const Section = styled.section`
  & > div {
    margin: 50px auto;
    & > h4 {
      font-size: 30px;
      line-height: 35px;
      letter-spacing: 5%;
      color: #444;
      text-align: center;
      margin-bottom: 50px;
    }
  }

  & img {
    width: 100%;
    height: 295px;
    object-fit: cover;
  }

  & .image-item {
    padding-right: 20px;
  }
`;

const Slide = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3.5,
      paritialVisibilityGutter: 60,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2.5,
      paritialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 30,
    },
  };
  const image = [slide1, slide2, slide3, slide4, slide5, slide6];

  return (
    <Section>
      <div>
        <h4>HALKEEPING CÂN HẾT MỌI RÁC BẨN</h4>

        <Carousel responsive={responsive} itemClass="image-item">
          {image.map((item) => (
            <img src={item} />
          ))}
        </Carousel>
      </div>
    </Section>
  );
};

export default Slide;
