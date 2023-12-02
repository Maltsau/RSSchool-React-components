import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { resetForm } from '../../store/formReducer';
import { FormStateType } from '../../types';

import emptyAvatar from '../../assets/icons/upload-icon.svg';

const Container = styled.div`
  padding: 2em;
`;

const HorizontalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const AvatarContainer = styled.div`
  padding: 0.5em;
  border: 1px solid white;
`;

const DescriptionList = styled.ul`
  width: 100%;
`;

const DescriptionRow = styled.li`
  font-size: 20px;
  display: flex;
  justify-content: space-between;
`;

const DottedSpace = styled.div`
  flex: 1 0;
  border-bottom: 1px dotted white;
  height: 1em;
  margin: 0 0.4em;
`;

const LogoutButton = styled.button`
  font-size: 20px;
  padding: 0.5em 1em;
  float: right;
`;

export default function MainPage() {
  const formData: FormStateType = useSelector(
    (state: { form: FormStateType }) => state.form
  );
  const dispatch = useDispatch();
  return (
    <Container>
      {formData.name ? (
        <>
          <HorizontalContainer>
            <AvatarContainer>
              {formData.avatar ? (
                <img src={`${formData.avatar}`} alt="Avatar" />
              ) : (
                <img
                  style={{ height: 200 }}
                  src={emptyAvatar}
                  alt="Empty avatar"
                />
              )}
            </AvatarContainer>
            <DescriptionList>
              <DescriptionRow>
                <span>Name</span>
                <DottedSpace></DottedSpace>
                <span>{formData.name}</span>
              </DescriptionRow>
              <DescriptionRow>
                <span>Genger</span>
                <DottedSpace></DottedSpace>
                <span>{formData.gender}</span>
              </DescriptionRow>
              <DescriptionRow>
                <span>Age</span>
                <DottedSpace></DottedSpace>
                <span>{formData.age}</span>
              </DescriptionRow>
              <DescriptionRow>
                <span>E-mail</span>
                <DottedSpace></DottedSpace>
                <span>{formData.email}</span>
              </DescriptionRow>
            </DescriptionList>
          </HorizontalContainer>
          <LogoutButton
            onClick={() => {
              dispatch(resetForm());
            }}
          >
            Log Out
          </LogoutButton>
        </>
      ) : (
        <h1>
          You are not registered yet.
          <br />
          Plese, use one of forms above
        </h1>
      )}
    </Container>
  );
}
