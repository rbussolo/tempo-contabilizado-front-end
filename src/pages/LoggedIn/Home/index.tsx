import { useNavigate } from "react-router-dom";
import { TitlePage } from "../../../components/TitlePage";
import { ContainerForm } from "../../../global.styles";
import { ContainerActive, ContainerTags } from "./styles";
import React, { useEffect, useState } from "react";

interface IActive {
  id: number;
  description: string;
  tags: string[];
  date: Date;
  stats: string;
  startTime: string;
  stopTime?: string;
}

interface ITag {
  name: string;
  startTime: string;
  stopTime?: string;
}

function Tag({ name, startTime, stopTime }: ITag){
  const description = startTime + (stopTime ? " - " + stopTime : "");
  const [spendTime, setSpendTime] = useState<string>("");
  
  function timeDifference(startTime: string, stopTime?: string) {
    if (stopTime) {
      const minuteStart = hoursToMinutes(startTime);
      const minuteStop = hoursToMinutes(stopTime);
      const minuteDifference = minuteStop - minuteStart;

      return minuteToHours(minuteDifference);
    }

    const date = new Date();
    const secondStart = hoursToMinutes(startTime) * 60;
    const secondStop = (date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds();
    const secondDifference = secondStop - secondStart;

    return secondsToHours(secondDifference);
  }

  function hoursToMinutes(timeString: string): number {
    if (!timeString) {
      return 0;
    }

    const times = timeString.split(":");
    return parseInt(times[0]) * 60 + parseInt(times[1]);
  }

  function minuteToHours(time: number): string {
    const hours = Math.floor(time / 60);
    const minutes = time - (hours * 60);

    return hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
  }

  function secondsToHours(time: number): string {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - (hours * 3600)) / 60);
    const seconds = time - hours * 3600 - minutes * 60;

    return hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
  }

  useEffect(() => {
    setSpendTime(timeDifference(startTime, stopTime));

    if (!stopTime) {
      setInterval(function() {
        setSpendTime(timeDifference(startTime, stopTime));
      }, 1000);
    }
  }, []);

  return (
    <div className="tag-container" key={"tag_" + name}>
      <span className="tag-name">{ name }</span>
      <span className="tag-time">{ description }</span>
      <span className="tag-total">{ spendTime }</span>
    </div>
  )
}

function Home() {
  const navigate = useNavigate();
  const activities: IActive[] = [{
    id: 1,
    description: "Trabalho",
    tags: ["trabalho", "coplan"],
    date: new Date(),
    stats: 'active',
    startTime: '10:30'
  }, 
  {
    id: 2,
    description: "Almoço",
    tags: ["almoco", "dieta"],
    date: new Date(),
    stats: 'finished',
    startTime: '12:00',
    stopTime: '13:00'
  },
  {
    id: 3,
    description: "Reunião",
    tags: ["reunião", "coplan"],
    date: new Date(),
    stats: 'active',
    startTime: '13:30'
  }];

  return (
    <ContainerForm className="container">
      <TitlePage title="Atividades do dia" action={{ description: "Nova Atividade", onClick: () => { navigate("/active/create") } }} />

      <hr />

      { activities.length ? (
        <>
          { activities.map((active, index) => {
            return (
              <React.Fragment key={active.id}>
                <ContainerActive>
                  <div className="active-header">
                    <div className="active-header-date">
                      { active.date.toLocaleDateString("pt-BR") }
                    </div>
                    <div className="active-header-time">
                      { active.startTime }
                    </div>
                  </div>
                  <div className="active-body">
                    <div className="active-body-description">
                      <span>Descrição: </span>{ active.description }
                    </div>
                    <div className="active-body-tags">
                      <span>Tags: </span>
                      { active.tags.map((tag, index) => {
                        return (
                          <div className="active-body-tag" key={"tag_" + index}>
                            { tag }
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="active-action">
                    <span>Pausar</span>
                  </div>
                </ContainerActive>
              </React.Fragment>
            );
          }) }
          
          <hr style={{marginTop: "20px"}}/>

          <div>
            <h4>Tempo gasta por tags</h4>

            <hr style={{ marginTop: "15px" }} />

            <ContainerTags>
              { activities.map((active, index) => {
                const tags = active.tags.map((tag, index) => {
                  return (
                    <Tag key={"key_" + tag} name={tag} startTime={active.startTime} stopTime={active.stopTime} />
                  )
                })

                return tags;
              }) }
            </ContainerTags>
          </div>
        </>
      ) : (
        <>
          <h5>Ainda não tem nenhuma atividade cadastrada hoje.</h5>
        </>
      ) }
    </ContainerForm>
  )
}

export { Home };