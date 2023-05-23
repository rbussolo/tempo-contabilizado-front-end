/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";

import { useAuth } from "../../../contexts/AuthProvider/useAuth";
import { useNavigate } from "react-router-dom";
import { InputGroup } from "../../../components/InputGroup";
import { Button } from "../../../components/Button";
import { Option, Options } from "../../../components/Options";
import { Container } from "./styles";
import { TitlePage } from "../../../components/TitlePage";
import { useLoading } from "../../../contexts/LoadingProvider";
import { Alert } from "../../../utils/alert";
import { api } from "../../../services/api";

function NewUser(){
  const load = useLoading();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    onSubmit: ({ name, email, password }) => {
      let error_msg = "";

      if (name === "") {
        error_msg = "É necessário informar o Nome Completo!";
      } else if (email === "") {
        error_msg = "É necessário informar o E-mail!" ;
      } else if (password === "") {
        error_msg = "É necessário informar a Senha!" ;
      } else {
        load.showLoading();

        api.post('users/', { 
          name,
          email, 
          password 
        }).then(response => {
          Alert.showSuccess("Usuário criado com sucesso! Ative sua conta através do e-mail cadastrado!")
        }).catch(err => {
          Alert.showAxiosError(err);
        }).finally(() => {
          load.hideLoading();
        });
      }

      if (error_msg.length > 0) {
        Alert.showMessageError(error_msg);
      }
    }
  });

  return (
    <>
      <Container>
        <div>
          <TitlePage title="Tempo Contabilizado" description="#novoUsuário" />
        
          <form onSubmit={formik.handleSubmit}>
            <InputGroup 
              groupClass="mb-1" 
              name="name" 
              label="Nome Completo" 
              type="text" 
              placeholder="Nome Completo"
              value={formik.values.name} 
              onChange={formik.handleChange} 
            />

            <InputGroup 
              groupClass="mb-1" 
              name="email" 
              label="E-mail" 
              type="email" 
              placeholder="E-mail"
              value={formik.values.email} 
              onChange={formik.handleChange} 
            />
            
            <InputGroup
              groupClass="mb-3"
              name="password"
              label="Senha"
              type="password"
              placeholder="Senha"
              value={formik.values.password}
              onChange={formik.handleChange}
            />

            <Button type="submit" buttonClass="btn-primary" label="Cadastrar"></Button>
          </form>

          <Options>
            <Option link="/new-user" linkDescription="Clique aqui" description=" caso não tenha cadastro." />
            <Option link="/forget-password" linkDescription="Clique aqui" description=" caso tenha esquecido a senha." />
          </Options>
        </div>
      </Container>
    </>
  );
}

export { NewUser };