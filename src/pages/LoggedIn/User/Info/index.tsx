/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useEffect } from "react";
import { Button } from "../../../../components/Button";
import { ButtonsFilter } from "../../../../components/Button/styles";
import { InputForm } from "../../../../components/InputGroup";
import { TitlePage } from "../../../../components/TitlePage";
import { useLoading } from "../../../../contexts/LoadingProvider";
import { ContainerForm } from "../../../../global.styles";
import { api } from "../../../../services/api";
import { User } from "../../../../services/users";
import { Alert } from "../../../../utils/alert";
import { useAuth } from "../../../../contexts/AuthProvider/useAuth";

const UserInfo = function() {
  const user_id = useAuth().getCurrentUser()!.user!.id;
  const load = useLoading();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      actualPassword: "",
      newPassword: "",
      newPasswordAgain: "",
      disabled: true,
      changingPassword: false
    },
    onSubmit: ({ name, email, actualPassword, newPassword, newPasswordAgain, changingPassword }) => {
      const form = document.querySelector("form") as HTMLFormElement;

      if (!form.checkValidity()) {
        form.classList.add('was-validated');

        return Alert.showError({ message: 'Preencha todos os campos obrigatórios!' });
      }

      form.classList.remove('was-validated');

      if (changingPassword) {
        load.showLoading();

        const method = 'post';
        const url = `/users/password`;
        const data = {
          actualPassword,
          newPassword,
          newPasswordAgain
        };

        api.request({ url, method, data }).then(response => {
          formik.setFieldValue("disabled", true);
          formik.setFieldValue("changingPassword", false);
        }).catch(err => {
          Alert.showAxiosError(err);
        }).finally(() => {
          load.hideLoading();
        });
      } else {
        load.showLoading();

        const method = 'put';
        const url = `/users/${user_id}`;
        const user = {
          id: user_id,
          name,
          email
        };

        api.request({ url, method, data: user }).then(response => {
          formik.setFieldValue("disabled", true);
        }).catch(err => {
          Alert.showAxiosError(err);
        }).finally(() => {
          load.hideLoading();
        });
      }
    }
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const editData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    formik.setFieldValue("disabled", false);
  }

  const editPassword = () => {
    formik.setFieldValue("changingPassword", true);
  }

  const cancelEditPassword = () => {
    formik.setFieldValue("actualPassword", "");
    formik.setFieldValue("newPassword", "");
    formik.setFieldValue("newPasswordAgain", "");
    formik.setFieldValue("changingPassword", false);
  }

  const loadUserData = () => {
    load.showLoading();

    api.get(`/users/${user_id}`).then(response => {
      const user = response.data as User;

      formik.setFieldValue("name", user.name);
      formik.setFieldValue("email", user.email);
      formik.setFieldValue("disabled", true);
    }).catch(err => {
      Alert.showAxiosError(err);
    }).finally(() => {
      load.hideLoading();
    });
  }

  return (
    <ContainerForm onSubmit={formik.handleSubmit} className="container needs-validation" noValidate>
      <TitlePage title="Informações do Usuário" />

      <hr />

      <InputForm label="Nome" name="name" 
        type="text"
        placeholder="Nome do usuário"
        disabled={formik.values.disabled}
        value={formik.values.name}
        onChange={(e) => formik.setFieldValue("name", e.target.value.toUpperCase())}
        required
      />

      <InputForm label="E-mail" name="email"
        type="text"
        placeholder="E-mail do usuário"
        disabled={formik.values.disabled}
        value={formik.values.email}
        onChange={(e) => formik.setFieldValue("email", e.target.value.toLowerCase())}
        required
      />

      { formik.values.changingPassword ? ( 
        <>
          <hr />

          <InputForm label="Senha Atual" name="actualPassword"
            type="password"
            placeholder="Senha atual"
            value={formik.values.actualPassword}
            onChange={formik.handleChange}
            required
          />

          <InputForm label="Nova Senha" name="newPassword"
            type="password"
            placeholder="NovaSenha"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            required
          />

          <InputForm label="Confirmação da Senha" name="newPasswordAgain"
            type="password"
            placeholder="Confirmação da Senha"
            value={formik.values.newPasswordAgain}
            onChange={formik.handleChange}
            required
          />
        </>
      ) : null }

      <ButtonsFilter>
        {
          formik.values.disabled && !formik.values.changingPassword ? (
            <>
              <Button type="button" buttonClass="btn-primary" label="Editar Dados" onClick={editData} />
              <Button type="button" buttonClass="btn-primary" label="Editar Senha" onClick={editPassword} />
            </>
          ) : formik.values.changingPassword ? (
            <>
              <Button type="submit" buttonClass="btn-primary" isLoading={false} label="Confirmar" />
              <Button type="button" buttonClass="btn-secondary" label="Cancelar" onClick={() => cancelEditPassword()} />
            </>
          ) : (
            <>
              <Button type="submit" buttonClass="btn-primary" isLoading={false} label="Confirmar" />
              <Button type="button" buttonClass="btn-secondary" label="Cancelar" onClick={() => loadUserData()} />
            </>
          )
        }
        
      </ButtonsFilter>
    </ContainerForm>
  );
}

export { UserInfo }