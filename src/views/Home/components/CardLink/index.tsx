import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Card, CardTitle, CardImage } from "./style";

interface Props {
  title: string;
  toSearch: string;
  img: any;
}

export const CardLink = ({ title, toSearch, img }: Props) => {
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
      <Card>
        <CardImage>
          <Image src={img} alt="img" objectFit="cover" />
        </CardImage>
        <CardTitle>{title}</CardTitle>
      </Card>
    </Link>
  );
};
