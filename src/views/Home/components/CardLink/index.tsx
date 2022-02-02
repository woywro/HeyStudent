import Link from "next/link";
import { useRouter } from "next/router";
import { Card, CardTitle, CardText } from "./style";
import { Text } from "../../../../components/Text";
import { CardLinkInterface } from "../../../../types";
const backgrounds = [
  "white",
  "radial-gradient(#76b2fe, #b69efe)",
  "radial-gradient(#fbc1cc, #fa99b2)",
  "radial-gradient(#1fe4f5, #3fbafe)",
  "radial-gradient(#f588d8, #c0a3e5)",
  "radial-gradient(#60efbc, #58d5c9)",
];

export const CardLink = ({ title, toSearch, text, bg }: CardLinkInterface) => {
  const router = useRouter();
  const defineRoute = () => {
    if (router.pathname == "/") {
      return "search/[search]";
    } else {
      return "[search]";
    }
  };
  const ROUTE = defineRoute();
  return (
    <Link
      href={{
        pathname: ROUTE,
        query: { search: toSearch },
      }}
      passHref
    >
      <Card bg={backgrounds[bg]}>
        <CardTitle>{title}</CardTitle>
        <CardText>{text}</CardText>
      </Card>
    </Link>
  );
};
