// Utils/GlobalApi.jsrr
import { gql, request} from 'graphql-request';

const MASTER_URL= "https://ap-south-1.cdn.hygraph.com/content/clybie0rr02g107urazvoq2vw/master";

export const getCourseList = async () => {
  const query = gql`
    query GetCategory {
      categories {
        id
        name
        icon {
          url
        }
      }
    }
  `
  const result = await request(MASTER_URL, query);
  return result;
}
