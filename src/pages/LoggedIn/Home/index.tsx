import { useNavigate } from "react-router-dom";
import { TitlePage } from "../../../components/TitlePage";
import { ContainerForm } from "../../../global.styles";
import { useEffect, useState } from "react";
import { useLoading } from "../../../contexts/LoadingProvider";
import { api } from "../../../services/api";
import { Alert } from "../../../utils/alert";
import { ListActivities } from "../../../components/Activity";

function Home() {
  const navigate = useNavigate();
  const load = useLoading();
  const [activities, setActivities] = useState<[]>([]);
 
  function fetchData() {
    const date = new Date();
    const filter = { date: date.toISOString() }
    
    load.showLoading();

    api.get("/activities", { params: filter }).then(response => {
      setActivities(response.data.activities);
    }).catch((err) => {
      Alert.showAxiosError(err);
    }).finally(() => {
      load.hideLoading();
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ContainerForm className="container">
      <TitlePage title="Atividades do dia" action={{ description: "Nova Atividade", onClick: () => { navigate("/active/create") } }} />

      <hr />

      <ListActivities activities={activities} handleFetchActivities={fetchData}/>
    </ContainerForm>
  )
}

export { Home };