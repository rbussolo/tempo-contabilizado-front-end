import styled from "styled-components";

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