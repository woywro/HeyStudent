import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

const Card = styled.li`
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 20px;
  width: 100%;
  position: relative;
  cursor: pointer;
`;

const CardTitle = styled.h1`
  padding: 15px;
  font-size: 20px;
`;

const CardImage = styled.div`
  width: 100%;
`;

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
