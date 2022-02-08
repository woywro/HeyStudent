import { Container } from "./style";
import { Text } from "../Text";
import { useNotificationContext } from "../../context/notifiactionContext";
import { useEffect } from "react";
import { useUserContext } from "../../context/userContext";
export const NotificationBar = () => {
  const { notifications, setNotifications } = useNotificationContext();
  const { user } = useUserContext();
  useEffect(() => {
    if (user) {
      observingNotification();
    } else {
      setNotifications([]);
    }
  }, [user]);
  const observingNotification = () => {
    if ((user.likedItems.length = 8)) {
      setNotifications(["Osiągnąłeś limit obserwowanych kierunków."]);
    }
  };
  return (
    <>
      {notifications.length !== 0 ? (
        <Container>
          <Text>{notifications[0]}</Text>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};
