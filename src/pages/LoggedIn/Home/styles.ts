import styled from "styled-components";

export const ContainerActive = styled.div`
  display: flex;
  gap: 1rem;

  div.active-header {
    width: 150px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 0.75rem;
    background-color: #f5f6f6;

    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);

    > div {
      text-align: center;
    }

    .active-header-date {
      font-size: 1.25rem;
    }

    .active-header-time {
      font-weight: bold;
    }
  }

  div.active-body {
    flex-grow: 1;

    padding: 1.5rem;
    background-color: #f5f6f6;

    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);

    display: flex;

    .active-body-main {
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      .active-body-description {
        flex-grow: 1;
      }

      .active-body-tags {
        display: flex;
        gap: 0.5rem;

        .active-body-tag {
          padding: 0rem 0.25rem;
          background-color: #3498db;
          color: #fff;

          border: 1px solid #1c8bd5;
          border-radius: var(--border-radius);
        }
      }
    }

    .active-body-actions {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;

      font-size: 30px;
    }
  }

  div.active-action {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 105px;

    cursor: pointer;

    padding: 0.75rem;
    
    border-radius: var(--border-radius);

    transition: 0.3s;
    
    &.action-action-stop {
      color: #fff;
      background-color: #e74c3c;
      border: 1px solid #c0392b;
    }

    &.action-action-start {
      color: #fff;
      background-color: #27ae60;
      border: 1px solid #2ecc71;
    }

    &:hover {
      filter: brightness(80%);
    }
  }

  & + & {
    margin-top: 1rem;
  }
`;

export const ContainerTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  div.tag-container {
    min-width: 150px;
    height: 100px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 1.5rem 0.75rem;
    background-color: #f5f6f6;

    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);

    .tag-name {
      text-align: center;
      font-size: 20px;
    }

    .tag-time, .tag-total {
      text-align: center;
    }
  }
`;
