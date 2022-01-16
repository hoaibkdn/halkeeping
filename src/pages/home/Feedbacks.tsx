import styled from "styled-components";
import { Carousel } from "rsuite";
import review1 from "../../assets/images/review_1.png";
const Section = styled.section`
  & > div {
    max-width: 70%;
    margin: 50px auto;
    & > h4 {
      font-size: 30px;
      line-height: 35px;
      letter-spacing: 5%;
      color: #444;
      text-align: center;
      margin-bottom: 50px;
    }

    & > div {
      display: flex;
      justify-content: space-between;
    }

    & > .slide {
      & > .carousel-inner {
        width: 80%;
        margin: auto;
      }

      & > a {
        width: 50px;
        height: 50px;
        background-color: #eead4b;
        border-radius: 50%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
`;

const Feedbacks = () => {
  return (
    <Section>
      <div>
        <h4>NHẬN XÉT TỪ KHÁCH HÀNG</h4>
        <Carousel
          autoplay
          style={{ width: "716px", height: "322px", margin: "auto" }}
        >
          <div>
            <img className="d-block w-100" src={review1} alt="First slide" />
          </div>
          <div>
            <img className="d-block w-100" src={review1} alt="First slide" />
          </div>
        </Carousel>
      </div>
    </Section>
  );
};
export default Feedbacks;
