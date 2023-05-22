import { Container } from "./styles"

function Footer(){
  return (
    <Container>
      <div>
        <div className="left">
          <span>Tempo Contabilizado</span>
        </div>
        <div className="right">
          <span>Contato: rbussolo91@gmail.com</span>
        </div>
      </div>
    </Container>
  )
}

export { Footer }