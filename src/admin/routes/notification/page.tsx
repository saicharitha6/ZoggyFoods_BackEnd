import { RouteConfig } from "@medusajs/admin";
import { RocketLaunch } from "@medusajs/icons";
import {
  Container,
  Input,
  Label,
  Heading,
  Button,
  Textarea,
  Text,
  Toaster,
  useToast,
} from "@medusajs/ui";
import { useState } from "react";

const SendNotification = () => {
  const api_url = process.env.MEDUSA_ADMIN_BACKEND_URL;
  const [state, setState] = useState({
    title: "",
    message: "",
    // file: null,
  });
  const [isNotified, setIsNotify] = useState(false);
  const { toast } = useToast();
  function handleChange(e) {
    if (e.target.files) {
      setState({ ...state, [e.target.name]: e.target.files[0] });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  }
  function sendNotification(e) {
    e.preventDefault();

    let formData = new FormData();
    console.log(state);
    for (let [key, value] of Object.entries(state)) {
      formData.append(key, value);
    }
    const data = Object.fromEntries(formData);
    fetch(`${api_url}/admin/notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          setIsNotify(true);
          setState({
            title: "",
            message: "",
          });
          toast({
            title: "Success",
            description: "Successfully notified",
            variant: "success",
            duration: 5000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <Container>
        <Heading level="h1">Notification </Heading>
        <hr
          style={{
            height: "3px",
            paddingBottom: "20px",
          }}
        />
        <form onSubmit={sendNotification}>
          <Label size="large" weight="plus">
            Title
          </Label>
          <Input
            name="title"
            type="title"
            placeholder="Enter title"
            onChange={handleChange}
            value={state.title}
            required
            style={{ marginBottom: "20px" }}
          />
          <Label size="large" weight="plus">
            Message
          </Label>
          <Textarea
            name="message"
            placeholder="Enter message"
            onChange={handleChange}
            value={state.message}
            required
            style={{ marginBottom: "20px" }}
          />
          <Button type="submit">Send</Button>
          {isNotified && <Toaster />}
        </form>
      </Container>
    </>
  );
};

export const config: RouteConfig = {
  link: {
    label: "Notification",
    icon: RocketLaunch,
  },
};

export default SendNotification;
