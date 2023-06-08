import { useEffect, useState } from "react";
import { ContainerActivity } from "./styles";
import { getDateFormatted } from "../../utils/date";
import { IconDelete, IconUpdate } from "../Table";
import { api } from "../../services/api";
import { Alert } from "../../utils/alert";
import { useLoading } from "../../contexts/LoadingProvider";
import { Link } from "react-router-dom";

interface IActivityItem {
  activity: IActivity;
  handleDeleteActivity: (id: number) => void;
  handleStartActivity: (id: number) => void;
  handleStopActivity: (id: number) => void;
  handleDeleteTask: (id: number) => void;
}

interface ITask {
  id: number;
  description: string;
  startTime: string;
  stopTime: string;
  duration?: number;
  stats: string;
}

interface IActivity {
  id: number;
  description: string;
  date: Date;
  startTime: string;
  stopTime: string;
  duration?: number;
  stats: string;
  tags: string[];
  tasks: ITask[];
}

interface IListActivities {
  activities: IActivity[];
  handleFetchActivities: () => void;
}

interface IListTasks {
  activity_id: number;
  tasks: ITask[];
  handleDeleteTask: (id: number) => void;
}

interface ITaskItem {
  task: ITask;
  handleDeleteTask: (id: number) => void;
}

function TaskItem({ task, handleDeleteTask }: ITaskItem) {
  return (
    <div className="task-item" key={task.id}>
      <div className="task-body">
        <span>{task.stopTime ? task.startTime + ' - ' + task.stopTime : task.startTime}</span>
        <span>{task.description}</span>
      </div>
      <div className="task-actions">
        <IconUpdate title="Editar" to={`/task/edit/${task.id}`} />
        <IconDelete title="Remover" onclick={() => handleDeleteTask(task.id)} />
      </div>
    </div>
  );
}

function ListTasks({ activity_id, tasks, handleDeleteTask }: IListTasks) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="activity-body-tasks">
        <span>Tarefas:</span>
        { expanded ? (
          <i className="bi bi-arrow-up-square-fill" onClick={() => setExpanded(false)}></i>
        ) : (
          <i className="bi bi-arrow-down-square-fill" onClick={() => setExpanded(true)}></i>
        ) }
        <Link to={`/task/create/${activity_id}`} title='Adicionar'>
          <i className="bi bi-plus-square-fill icon-add"></i>
        </Link>
      </div>
      <div className={`activity-body-tasks-group ${expanded ? "activity-body-tasks-show" : "activity-body-tasks-hide"}`}>
        {tasks && tasks.length ? (
          <div className="task-container">
            { tasks.map((task, index) => {
              return (
                <TaskItem key={task.id} task={task} handleDeleteTask={handleDeleteTask} />
              );
            }) }
          </div>
        ) : (
          <div>
            <span>Sem tarefas cadastradas</span>
          </div>
        )}
      </div>
    </>
  );
}

function ActivityItem({ activity, handleDeleteActivity, handleStartActivity, handleStopActivity, handleDeleteTask }: IActivityItem) {
  const d = new Date(activity.date);
  const timeDescription = activity.stopTime ? activity.startTime + ' - ' + activity.stopTime : activity.startTime;
  const durationDescription = activity.duration ? activity.duration + " min" : "Em atividade";
  
  return (
    <ContainerActivity>
      <div className="activity-header">
        <div className="activity-header-date">
          { getDateFormatted(d) }
        </div>
        <div className="activity-header-time">
          { timeDescription }
        </div>
        <div className="activity-header-duration">
          { durationDescription }
        </div>
      </div>
      <div className="activity-body">
        <div className="activity-body-main">
          <div className="activity-body-description">
            <span>Descrição: </span>{ activity.description }
          </div>
          <div className="activity-body-tags">
            <span>Tags: </span>
            { activity.tags.map((tag, index) => {
              return (
                <div className="activity-body-tag" key={"tag_" + index}>
                  {tag}
                </div>
              )
            }) }
          </div>
          <ListTasks activity_id={activity.id} tasks={activity.tasks} handleDeleteTask={handleDeleteTask} />
        </div>
        <div className="activity-body-actions">
          <IconUpdate title="Editar" to={`/activity/edit/${activity.id}`} />
          <IconDelete title="Remover" onclick={() => { handleDeleteActivity(activity.id) }} />
        </div>
      </div>
      {activity.stats !== 'in_progress' ? (
        <div className="activity-action activity-action-start" onClick={() => handleStartActivity(activity.id)}>
          <span>Continuar</span>
        </div>
      ) : (
        <div className="activity-action activity-action-stop" onClick={() => handleStopActivity(activity.id)}>
          <span>Parar</span>
        </div>
      )}
    </ContainerActivity>
  );
}

function ListActivities({ activities, handleFetchActivities }: IListActivities) {
  const load = useLoading();

  function request(method: string, url: string, data?: any){
    api.request({ method, url, data }).then(() => {
      handleFetchActivities();
    }).catch((err) => {
      Alert.showAxiosError(err);
    }).finally(() => {
      load.hideLoading();
    });
  }

  function handleStartActivity(id: number) {
    request('post', '/activities/start', { data: { id } });
  }

  function handleStopActivity(id: number) {
    request('post', '/activities/stop', { data: { id } });
  }

  function handleDeleteActivity(id: number) {
    request('delete', `/activities/${id}`);
  }

  function handleDeleteTask(id: number) {
    request('delete', `/tasks/${id}`);
  }

  return (
    <>
      { activities && activities.length > 0 ? (
        <>
          { activities.map((activity) => {
            return (
              <ActivityItem  
                key={activity.id} 
                activity={activity} 
                handleDeleteActivity={handleDeleteActivity} 
                handleStartActivity={handleStartActivity} 
                handleStopActivity={handleStopActivity}
                handleDeleteTask={handleDeleteTask} />
            );
          }) }
        </>
      ) : (
        <h5>Nenhuma atividade cadastrada.</h5>
      ) }
    </>
  )
}

export { ListActivities };