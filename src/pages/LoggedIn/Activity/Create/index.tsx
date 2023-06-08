/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/Button";
import { ButtonsFilter } from "../../../../components/Button/styles";
import { InputForm } from "../../../../components/InputGroup";
import { TitlePage } from "../../../../components/TitlePage";
import { useLoading } from "../../../../contexts/LoadingProvider";
import { ContainerForm } from "../../../../global.styles";
import { api } from "../../../../services/api";
import { Alert } from "../../../../utils/alert";
import { maskTime } from "../../../../utils/mask";
import { getCurrentDate, getCurrentTime } from "../../../../utils/date";

const ActivityCreate = function () {
  const navigate = useNavigate();
  const load = useLoading();

  const formik = useFormik({
    initialValues: {
      date: getCurrentDate(),
      description: "",
      startTime: getCurrentTime(),
      stopTime: "",
      tags: "",
    },
    onSubmit: ({ date, description, startTime, stopTime, tags }) => {
      const form = document.querySelector("form") as HTMLFormElement;

      if (!form.checkValidity()) {
        form.classList.add('was-validated');

        return Alert.showError({ message: 'Preencha todos os campos obrigatórios!' });
      }

      form.classList.remove('was-validated');

      load.showLoading();

      const method = 'post';
      const url = "/activities";
      const active = { date, description, startTime, stopTime, tags };

      api.request({ url, method, data: active }).then(response => {
        navigate("/home");
      }).catch(err => {
        Alert.showAxiosError(err);
      }).finally(() => {
        load.hideLoading();
      });
    }
  });

  return (
    <ContainerForm onSubmit={formik.handleSubmit} className="container needs-validation" noValidate>
      <TitlePage title="Nova Atividade" />

      <hr />

      <InputForm label="Descrição" name="description"
        type="text"
        placeholder="Descrição da Atividade"
        value={formik.values.description}
        onChange={formik.handleChange}
        required
      />

      <InputForm label="Data" name="date"
        type="date"
        value={formik.values.date}
        onChange={formik.handleChange}
        required
      />

      <InputForm label="Hora de Início" name="startTime"
        type="time"
        placeholder="Hora de Início"
        value={formik.values.startTime}
        onChange={(e) => formik.setFieldValue("startTime", maskTime(e.target.value))}
        required
      />

      <InputForm label="Hora de Termino" name="stopTime"
        type="time"
        placeholder="Hora de Termino"
        value={formik.values.stopTime}
        onChange={(e) => formik.setFieldValue("stopTime", maskTime(e.target.value))}
      />

      <InputForm label="Tags" name="tags"
        type="text"
        placeholder="Tags separadas por espaço ou virgula"
        value={formik.values.tags}
        onChange={formik.handleChange}
      />

      <ButtonsFilter>
        <Button type="submit" buttonClass="btn-primary" isLoading={false} label="Confirmar" />
        <Button buttonClass="btn-secondary" label="Voltar" onClick={() => navigate("/home")} />
      </ButtonsFilter>
    </ContainerForm>
  );
}

export { ActivityCreate }