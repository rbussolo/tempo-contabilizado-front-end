/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../../components/Button";
import { ButtonsFilter } from "../../../../components/Button/styles";
import { InputForm } from "../../../../components/InputGroup";
import { TitlePage } from "../../../../components/TitlePage";
import { useLoading } from "../../../../contexts/LoadingProvider";
import { ContainerForm } from "../../../../global.styles";
import { api } from "../../../../services/api";
import { Alert } from "../../../../utils/alert";
import { maskTime } from "../../../../utils/mask";
import { useEffect } from "react";
import { Task } from "../../../../services/tasks";

const TaskEdit = function () {
  const navigate = useNavigate();
  const { task_id } = useParams();
  const load = useLoading();

  const formik = useFormik({
    initialValues: {
      description: "",
      startTime: "",
      stopTime: "",
    },
    onSubmit: ({ description, startTime, stopTime }) => {
      const form = document.querySelector("form") as HTMLFormElement;

      if (!form.checkValidity()) {
        form.classList.add('was-validated');

        return Alert.showError({ message: 'Preencha todos os campos obrigatórios!' });
      }

      form.classList.remove('was-validated');

      load.showLoading();

      const method = 'post';
      const url = `/tasks/${task_id}`;
      const task = { description, startTime, stopTime };

      api.request({ url, method, data: task }).then(response => {
        navigate("/home");
      }).catch(err => {
        Alert.showAxiosError(err);
      }).finally(() => {
        load.hideLoading();
      });
    }
  });

  useEffect(() => {
    load.showLoading();

    api.get(`/tasks/${task_id}`).then(response => {
      const task = response.data as Task;
      
      formik.setFieldValue("description", task.description);
      formik.setFieldValue("startTime", task.startTime);
      formik.setFieldValue("stopTime", task.stopTime);
    }).catch(err => {
      Alert.showAxiosError(err);
    }).finally(() => {
      load.hideLoading();
    });
  }, []);

  return (
    <ContainerForm onSubmit={formik.handleSubmit} className="container needs-validation" noValidate>
      <TitlePage title="Atualização de uma Tarefa" />

      <hr />

      <InputForm label="Descrição" name="description"
        type="text"
        placeholder="Descrição da Atividade"
        value={formik.values.description}
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

      <ButtonsFilter>
        <Button type="submit" buttonClass="btn-primary" isLoading={false} label="Confirmar" />
        <Button buttonClass="btn-secondary" label="Voltar" onClick={() => navigate("/home")} />
      </ButtonsFilter>
    </ContainerForm>
  );
}

export { TaskEdit }