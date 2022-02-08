import { Container } from "./style";
import { Text } from "../Text";
import { useNotificationContext } from "../../context/notifiactionContext";
import { useEffect } from "react";
export const NotificationBar = () => {
  const { notifications, setNotifications } = useNotificationContext();
  useEffect(() => {
    setNotifications(["dupa"]);
  }, [notifications]);
  return (
    <Container>
      <Text>{notifications[0]}</Text>
    </Container>
  );
};
