
import styled from "styled-components"
import hard_working from "../../assets/images/hard-working.png"
import consultant from "../../assets/images/consultant.png"
import listen_cus from "../../assets/images/listen-to-custumer.png"


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
  }
`

const Advantage = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > img {
    width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: 50%;
  }

  & > p {
    color: #757575;
    font-size: 18px;
    text-align: center;
    margin-top: 20px;
  }
`

const Advantages = () => {
  return <Section>
    <div>
      <h4>TẠI SAO NÊN CHỌN HALKEEPING</h4>
      <div className="services">
        <Advantage>
          <img src={hard_working}/>
          <p>Nhân viên chăm chỉ</p>
        </Advantage>
        <Advantage>
          <img src={listen_cus} />
          <p>Luon lang nghe khach hang</p>
        </Advantage>
        <Advantage>
          <img src={consultant}/>
          <p>Tư vấn tận tâm</p>
        </Advantage>
      </div>
    </div>
  </Section>
}

export default Advantages
